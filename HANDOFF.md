# Construct Scenery Portfolio — Session Handoff

**Date:** 2026-06-30  
**Session summary:** Migrated all seeded images to Cloudinary, fixed TypeScript build errors blocking deployment, deployed admin panel to Vercel, exposed local admin API via ngrok so the live portfolio and admin panel can reach it.  
**Portfolio repo:** https://github.com/umairusman617-gif/scenic-builds-elevated (this repo)  
**Admin repo:** https://github.com/umairusman617-gif/construct-scenery-admin (separate private repo)

---

## 1. Two Projects — Do Not Confuse Them

| Project | Local path | Port | Purpose |
|---|---|---|---|
| **Portfolio** (this repo) | `/Users/umairusman/scenic-builds-elevated` | 8080 | Public-facing TanStack Start site. Fetches ALL content from the API. |
| **Admin API** | `/Users/umairusman/construct-scenery-admin` | 4000 | Express + Prisma backend. Manages PostgreSQL data. Must be running locally. |
| **Admin frontend** | `/Users/umairusman/construct-scenery-admin/client` | 5174 (local) | React admin panel. Also deployed at https://construct-scenery-admin.vercel.app |

---

## 2. Live URLs (Production)

| Service | URL | Notes |
|---|---|---|
| Portfolio | https://scenic-builds-elevated.vercel.app | Vercel. Reads from ngrok tunnel. |
| Admin panel | https://construct-scenery-admin.vercel.app | Vercel static SPA. Reads from ngrok tunnel. |
| Admin API | https://democrat-both-cross.ngrok-free.dev | ⚠️ ngrok free — URL CHANGES every restart. See Section 9. |
| Admin API (local) | http://localhost:4000 | Must be running locally for the above to work. |

> **Critical:** The ngrok URL `https://democrat-both-cross.ngrok-free.dev` is not permanent. Every time the machine reboots or ngrok is restarted, the URL changes. When it changes you must update Vercel env vars on both Vercel projects and ALLOWED_ORIGINS in the admin `.env`. See Section 9 for the exact commands.

---

## 3. What Was Completed This Session

### Task 1 — Migrated all images to Cloudinary ✅ COMPLETE

**Problem:** All seeded images used local `/assets/*.jpg` paths (e.g. `/assets/project-3.jpg`). These worked locally via `imageResolver.ts` but would break on Vercel because Vite content-hashes filenames at build time and the paths don't exist in production.

**Solution:** Wrote and ran `prisma/upload-images.ts` — a one-shot migration script that:
1. Uploaded all 11 images from `src/assets/` in the portfolio repo to Cloudinary (`construct-scenery/` folder)
2. Updated every database record referencing a `/assets/` path with the real Cloudinary URL
3. Also found and migrated 2 projects (Clayface, Aurora Pavilion) that had `localhost:4000/uploads/` URLs from before Cloudinary was configured
4. Final state: **43/43 image URLs in the database are now Cloudinary or external — zero local paths remain**

**File created:**
- `prisma/upload-images.ts` in the admin repo — the migration script (safe to re-run, uses `overwrite: true` on Cloudinary)

**Verification:**
```bash
# Run from /Users/umairusman/construct-scenery-admin
npx tsx -e "
import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
const p = new PrismaClient();
p.project.findMany({ select: { name: true, imageUrl: true } }).then(r => { r.forEach(x => console.log(x.name, x.imageUrl)); p.\$disconnect(); });
"
```
All URLs should start with `https://res.cloudinary.com/` or `https://images.unsplash.com/`.

---

### Task 2 — Fixed TypeScript build errors ✅ COMPLETE

Both the admin API and admin client had TypeScript errors that blocked Vercel's build step.

**Admin API fixes** (`/Users/umairusman/construct-scenery-admin/`):

| File | Error | Fix |
|---|---|---|
| `src/controllers/auth.controller.ts` | `jwt.sign()` — newer `@types/jsonwebtoken` uses branded `StringValue` type for `expiresIn`, so a plain `string` env var doesn't match | Assigned options to a typed-as-`any` variable before passing to `jwt.sign()` |
| `src/controllers/worlds.controller.ts` (×5 places) | `req.params` values typed as `string \| string[]` in this Express version; worlds routes now accept `:id` for mutations and `:idOrSlug` for lookup | Wrapped param usages in `String()` and parsed numeric IDs where needed |

**Admin client fixes** (`/Users/umairusman/construct-scenery-admin/client/`):

| File | Error | Fix |
|---|---|---|
| `client/src/vite-env.d.ts` | `import.meta.env` not typed — `Property 'env' does not exist on type 'ImportMeta'` | Created `vite-env.d.ts` with `/// <reference types="vite/client" />` |
| `client/src/types/index.ts` | `WorldInput` type missing — form payloads have `gallery: [{url, order}]` but `Partial<World>` requires `gallery: WorldImage[]` (with `id` and `worldId`) | Added `WorldInput` type using `Omit<>` to strip `id`/`worldId` from sub-relation arrays |
| `client/src/api/worlds.ts` | `create`/`update` accepted `Partial<World>` — incompatible with form payloads | Changed parameter type to `WorldInput` |

**Verification:**
```bash
# Admin API — should produce zero output (zero errors)
cd /Users/umairusman/construct-scenery-admin && npx tsc --noEmit

# Admin client — should end with "built in X.Xs"
cd /Users/umairusman/construct-scenery-admin/client && npm run build
```

---

### Task 3 — Installed and configured ngrok ✅ COMPLETE

**Why ngrok:** The admin API runs locally (connects to a local PostgreSQL database). The Vercel-hosted portfolio and admin panel need to reach it. ngrok creates a public HTTPS tunnel to port 4000.

**Setup done:**
- Installed: `brew install ngrok/ngrok/ngrok`
- Auth token configured: `ngrok config add-authtoken 3Fms98T1pqkgr4NAVFBhMlSPD6d_3234p6Zab8Nep33kVgH6r`
- Config saved to: `/Users/umairusman/Library/Application Support/ngrok/ngrok.yml`

**Current tunnel:** `https://democrat-both-cross.ngrok-free.dev` → `http://localhost:4000`

**Limitation:** Free ngrok accounts get a random URL on every restart. The URL will change when ngrok is stopped and restarted. See Section 9 for the update procedure.

---

### Task 4 — Added ngrok bypass header to both frontends ✅ COMPLETE

ngrok free tier shows a browser-warning interstitial for requests that look like browser navigation. API fetch calls from JavaScript get blocked by this. The fix is to include the `ngrok-skip-browser-warning: true` header.

**Portfolio** — `src/lib/api/client.ts`:
```typescript
const EXTRA_HEADERS: Record<string, string> = BASE.includes("ngrok")
  ? { "ngrok-skip-browser-warning": "true" }
  : {};
// passed to every fetch() call
```

**Admin client** — `client/src/api/axios.ts`:
```typescript
headers: {
  "Content-Type": "application/json",
  ...(BASE.includes("ngrok") ? { "ngrok-skip-browser-warning": "true" } : {}),
}
```

Both headers are conditional on the base URL containing `"ngrok"` — they are automatically absent in local dev and will be absent when/if the backend moves to a real hosting provider.

---

### Task 5 — Deployed admin panel to Vercel ✅ COMPLETE

**Problem:** The Vercel project `construct-scenery-admin` was previously misconfigured — it deployed from the repo root (the Express API) rather than `client/` (the React SPA). Vercel tried to run the Express server as a serverless function and crashed with `FUNCTION_INVOCATION_FAILED`.

**Fix:** Added `vercel.json` to the **root** of the admin repo that redirects the entire build to `client/`:

```json
{
  "installCommand": "cd client && npm install",
  "buildCommand": "cd client && npm run build",
  "outputDirectory": "client/dist",
  "framework": null,
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

- `framework: null` — tells Vercel this is a plain static site, not an SSR framework
- `rewrites` — all paths serve `index.html` so React Router handles client-side navigation (clicking `/login`, `/projects`, etc. directly works)

**Result:** https://construct-scenery-admin.vercel.app now serves the React login page correctly.

---

### Task 6 — Set Vercel environment variables ✅ COMPLETE

**Portfolio** (`scenic-builds-elevated` Vercel project):
- `VITE_API_URL` = `https://democrat-both-cross.ngrok-free.dev`
- Set via: `vercel env add VITE_API_URL production` from `/Users/umairusman/scenic-builds-elevated`

**Admin panel** (`construct-scenery-admin` Vercel project):
- `VITE_API_URL` = `https://democrat-both-cross.ngrok-free.dev`
- Set via: `vercel env add VITE_API_URL production` from `/Users/umairusman/construct-scenery-admin`

**Vercel CLI** is installed: `brew install vercel-cli`  
**Vercel account:** `umairusman617-3450` — already logged in on this machine.

---

### Task 7 — Updated admin CORS ALLOWED_ORIGINS ✅ COMPLETE

**File:** `/Users/umairusman/construct-scenery-admin/.env`

Added all Vercel production URLs so the API accepts requests from the deployed frontends:

```
ALLOWED_ORIGINS="http://localhost:5174,http://localhost:5173,http://localhost:8080,http://localhost:8081,https://scenic-builds-elevated.vercel.app,https://constructscenery.vercel.app,https://construct-scenery-admin.vercel.app,https://construct-scenery-admin-umairusman617-3450s-projects.vercel.app"
```

**Important:** The API reads `ALLOWED_ORIGINS` once at startup. Changing `.env` requires a **full restart** of the API — `tsx watch` does NOT auto-reload on `.env` changes. Forgetting this caused the "network error" bug during this session.

---

## 4. Decisions Made and Why

| Decision | Reason |
|---|---|
| **ngrok instead of Railway** | User wanted to keep the API running locally. ngrok exposes port 4000 via a public HTTPS URL without moving the database or server. |
| **ngrok-skip-browser-warning header** | ngrok free tier intercepts browser-like requests with an interstitial page. The header bypasses it without requiring a paid plan. Added conditionally — only fires when the base URL contains "ngrok", so it self-removes when moving to a real API host. |
| **vercel.json at admin repo root** | Vercel was deploying from repo root (Express API) instead of `client/` (React SPA). Adding `vercel.json` to the root is the correct way to override Vercel's build without changing the project's GitHub integration or dashboard settings. |
| **`framework: null` in vercel.json** | Without this, Vercel detected the output directory and looked for a serverless function entrypoint. `null` tells it to treat the output as a plain static file directory. |
| **SPA rewrite in vercel.json** | React Router handles all routes client-side. Without the rewrite, navigating directly to `/login` returns a 404 from Vercel's CDN since there's no `login.html` file. The catch-all rewrite serves `index.html` for every path. |
| **CORS reads from .env at startup** | This is the existing Express CORS setup. The consequence is that every `.env` change requires a full API restart. A future improvement would be to reload from env on each request, but current volume doesn't justify it. |
| **`WorldInput` type** | The `World` response type from the API has sub-relation arrays (`gallery`, `facts`, etc.) that include DB-generated `id` and `worldId` fields. The form payload doesn't have these — only the user-provided fields. `WorldInput` is `Partial<World>` with the sub-arrays typed without `id`/`worldId`. |
| **`String(req.params.id)` / `String(req.params.idOrSlug)` cast** | Newer Express type definitions type `req.params` values as `string | string[]`, though route params are strings at runtime. Prisma `where` clauses accept `string` or `number` based on the field. `String()` plus explicit parse for numeric IDs keeps typing clear. |

---

## 4.1 Worlds API Contract Update (Important)

Please note that the worlds API now uses the record ID for update/delete operations. The slug remains the public URL value, but it is no longer the stable identifier for mutation requests. Any admin-side edit links, mutation calls, and cache invalidation logic should be updated to use the world ID rather than the slug.

### Endpoint contract

- `PUT /api/worlds/:id` (was `:slug`)
- `DELETE /api/worlds/:id` (was `:slug`)
- `GET /api/worlds/:id`
- `GET /api/worlds/:slug`

### Frontend implications

- Keep public case-study URLs slug-based (`/worlds/:slug`).
- Use world `id` for admin edit routes (`/worlds/:id/edit`), mutations, and cache invalidation.
- Treat slug as mutable. After slug edits, do not rely on previously cached slug values as stable identity keys.
- World payload is now simplified: core fields plus `gallery`, `facts`, and `credits` are supported nested sections.
- `role`, `process`, and `results` are no longer part of the required request/response contract.

---

## 5. Current File & Folder Structure

```
/Users/umairusman/scenic-builds-elevated/     (PORTFOLIO — this repo)
│
├── .env                    ✅ VITE_API_URL=http://localhost:4000 (local dev)
├── .env.example            ✅ Template
├── .env.local              ✅ Created by Vercel CLI (gitignored) — do not edit
├── vercel.json             ✅ { "framework": "tanstack-start" }
│
├── src/
│   ├── assets/             ✅ 11 local images still present (used by imageResolver fallback)
│   │
│   ├── lib/
│   │   ├── worlds-data.ts      ✅ Types only + adaptApiWorld() — no hardcoded data
│   │   └── api/
│   │       ├── client.ts       ✅ MODIFIED THIS SESSION — added ngrok bypass header
│   │       ├── types.ts        ✅ All API response interfaces
│   │       ├── imageResolver.ts ✅ /assets/*.jpg → Vite hashed URL (now a pass-through for all DB records since Cloudinary migration)
│   │       └── icons.ts        ✅ Lucide icon name → component
│   │
│   ├── routes/
│   │   ├── __root.tsx          ✅ QueryClientProvider
│   │   ├── index.tsx           ✅ Landing page
│   │   └── worlds.$slug.tsx    ✅ Async loader from API
│   │
│   └── components/
│       ├── landing/            ✅ All 10 sections use useQuery (Hero, Logos, About,
│       │                          Services, Projects, Process, Testimonials,
│       │                          Sustainability, FinalCTA, Footer)
│       │   └── Nav.tsx         ⚠️ Still hardcoded — no NavSection model in DB
│       └── worlds/             ✅ All 7 components receive World prop
│
└── (config: vite.config.ts, tsconfig.json, package.json)


/Users/umairusman/construct-scenery-admin/    (ADMIN — separate repo)
│
├── .env                    ✅ All real credentials (gitignored). ALLOWED_ORIGINS updated this session.
├── .env.local              ✅ Created by Vercel CLI (gitignored)
├── vercel.json             ✅ CREATED THIS SESSION — redirects build to client/
├── .gitignore              ✅
│
├── src/
│   ├── app.ts              ✅ CORS + /uploads static serving
│   └── controllers/
│       ├── auth.controller.ts      ✅ FIXED THIS SESSION — jwt.sign type cast
│       ├── worlds.controller.ts    ✅ FIXED THIS SESSION — request param typing/casts updated for `:id` and `:idOrSlug`
│       ├── projects.controller.ts  ✅ Auto-creates World on project save with slug
│       ├── upload.controller.ts    ✅ Cloudinary upload
│       └── (10 other controllers — unchanged)
│
├── prisma/
│   ├── schema.prisma       ✅ 19 models (unchanged)
│   ├── seed.ts             ✅ Full seed (unchanged)
│   ├── upload-images.ts    ✅ CREATED THIS SESSION — Cloudinary migration script
│   └── migrations/         ✅ Applied
│
├── uploads/                ✅ Directory for local uploads (gitignored contents)
│   └── 5b4f8cca-...png     ✅ Clayface local upload (now also in Cloudinary)
│   └── e2163831-...jpg     ✅ Aurora Pavilion local upload (now also in Cloudinary)
│
└── client/
    ├── .vercel/            ✅ Created by Vercel CLI (gitignored)
    ├── src/
    │   ├── vite-env.d.ts   ✅ CREATED THIS SESSION — Vite type reference
    │   ├── api/
    │   │   ├── axios.ts    ✅ MODIFIED THIS SESSION — ngrok bypass header
    │   │   └── worlds.ts   ✅ MODIFIED THIS SESSION — WorldInput type
    │   └── types/
    │       └── index.ts    ✅ MODIFIED THIS SESSION — added WorldInput type
    └── (14 pages, components, context — unchanged)
```

---

## 6. What Is Incomplete / Not Started

### Critical

| # | Item | Notes |
|---|---|---|
| 1 | **ngrok URL changes on every restart** | Free ngrok gives a random URL. When it restarts, both Vercel projects need their `VITE_API_URL` updated and the API needs its CORS restarted. See Section 9 for the exact commands. Consider upgrading to ngrok paid (static domain) or deploying the API to Railway. |
| 2 | **Admin API not deployed** | Runs locally on `:4000` only. If the machine sleeps or reboots, the portfolio and admin panel go dark. Deploying to Railway would eliminate this. |

### Important

| # | Item | Notes |
|---|---|---|
| 3 | **Nav links are still hardcoded** | `src/components/landing/Nav.tsx` has a hardcoded `links` array. No `NavSection` model in DB. |
| 4 | **Footer social links are dead** | Instagram, LinkedIn, Vimeo are empty strings in the DB. Go to admin Footer page → add real URLs. |
| 5 | **Vimeo IDs are placeholder** | All three worlds use `vimeoId: "76979871"`. Update each world in the admin Worlds editor with real Vimeo IDs. |
| 6 | **5 projects have no case study** | Aurora Pavilion, Bloom Couture, Vanguard Awards, The Late Edit, Maison Pop-Up have no slug and no World. Either create worlds for them or leave as `href="#contact"`. |
| 7 | **Security hardening before production** | `ADMIN_PASSWORD=admin123` is weak. `JWT_SECRET` is a placeholder. JWT stored in `localStorage` (vulnerable to XSS). No rate limiting on login. |
| 8 | **Admin dark mode** | Admin `client/` only has light-mode CSS variables. No toggle. |

### Nice to Have

| # | Item |
|---|---|
| 9 | Drag-and-drop reorder for all list sections |
| 10 | Rich text editor for long body fields |
| 11 | Mobile hamburger menu in admin sidebar |
| 12 | Dashboard cards showing real populated/empty status |
| 13 | Write a `scripts/update-ngrok-url.sh` script that automates the URL-swap procedure (see Section 9) |
| 14 | Admin user management UI |

---

## 7. Known Bugs and Issues

### Bug 1 — ngrok URL is ephemeral (KNOWN, not fixed by design)
**Symptom:** After machine reboot or ngrok restart, portfolio and admin panel show network errors.  
**Cause:** Free ngrok generates a random subdomain per session.  
**Workaround:** Follow the URL-swap procedure in Section 9.  
**Permanent fix:** Upgrade ngrok (paid static domain) or deploy API to Railway.

### Bug 2 — API must be restarted to pick up .env changes (KNOWN)
**File:** `/Users/umairusman/construct-scenery-admin/src/app.ts`  
**Symptom:** Changing `ALLOWED_ORIGINS` in `.env` has no effect until the API is killed and restarted. `tsx watch` only watches TypeScript files, not `.env`.  
**Workaround:** Always do `Ctrl+C` + `npm run dev` after `.env` changes. Killing the old process first: `lsof -ti :4000 | xargs kill -9`.

### Bug 3 — World update replaces all relation rows (KNOWN, from previous session)
**File:** `src/controllers/worlds.controller.ts` → `updateWorld`  
**Behaviour:** Every PUT to `/api/worlds/:id` deletes and recreates gallery, facts, credits, process, results. Row IDs change on every save.

### Bug 4 — Footer columns JSON can break on bad input (KNOWN, from previous session)
**File:** `client/src/pages/Footer.tsx`  
**Symptom:** Invalid JSON in the columns textarea shows a toast error but no line indicator.

### Bug 5 — No mobile layout in admin sidebar (KNOWN)
**File:** `client/src/components/layout/Sidebar.tsx`  
**Symptom:** Admin panel is unusable on screens narrower than ~900px.

### Bug 6 — Dashboard singleton cards don't show populated status (KNOWN)
**File:** `client/src/pages/Dashboard.tsx`  
**Symptom:** Hero/About/Contact/Footer/Sustainability cards always say "click to edit".

---

## 8. Environment Variables

### Portfolio — `/Users/umairusman/scenic-builds-elevated/.env` (gitignored)
```env
VITE_API_URL=http://localhost:4000
```
On Vercel this is overridden to the ngrok URL via `vercel env`.

### Admin backend — `/Users/umairusman/construct-scenery-admin/.env` (gitignored)
```env
DATABASE_URL="postgresql://umairusman@localhost:5432/construct_scenery_admin"
JWT_SECRET="cs-admin-dev-secret-key-change-in-production-2024"
JWT_EXPIRES_IN="7d"
CLOUDINARY_CLOUD_NAME="dvzkh1nal"
CLOUDINARY_API_KEY="773682671441411"
CLOUDINARY_API_SECRET="kwkBAiW1Utm2yzFsj_UEA63HKSU"
PORT=4000
NODE_ENV="development"
ALLOWED_ORIGINS="http://localhost:5174,http://localhost:5173,http://localhost:8080,http://localhost:8081,https://scenic-builds-elevated.vercel.app,https://constructscenery.vercel.app,https://construct-scenery-admin.vercel.app,https://construct-scenery-admin-umairusman617-3450s-projects.vercel.app"
ADMIN_EMAIL="admin@constructscenery.co.uk"
ADMIN_PASSWORD="admin123"
ADMIN_NAME="Admin"
```

### Admin frontend (Vercel env — not a file)
Set via `vercel env` on the `construct-scenery-admin` Vercel project:
```
VITE_API_URL=https://democrat-both-cross.ngrok-free.dev   ← changes on ngrok restart
```

### ngrok
- Auth token: `3Fms98T1pqkgr4NAVFBhMlSPD6d_3234p6Zab8Nep33kVgH6r`
- Config saved at: `/Users/umairusman/Library/Application Support/ngrok/ngrok.yml`
- Already configured on this machine — `ngrok http 4000` just works.

---

## 9. Commands to Run Everything

### Prerequisites
```bash
brew services start postgresql@16   # PostgreSQL must be running
export PATH="/opt/homebrew/bin:$PATH"
```

### Start the admin API (port 4000) — MUST be running for everything else
```bash
# Kill anything already on port 4000 first:
lsof -ti :4000 | xargs kill -9 2>/dev/null; true

cd /Users/umairusman/construct-scenery-admin
npm run dev
# Wait for: ✓ Server running on http://localhost:4000
```

### Start the ngrok tunnel (in a separate terminal)
```bash
ngrok http 4000
# Note the https URL (e.g. https://abc-123.ngrok-free.app) — you'll need it if it changed
```

### Start the admin frontend locally (optional — Vercel version is preferred)
```bash
cd /Users/umairusman/construct-scenery-admin/client
npm run dev
# Available at http://localhost:5174
```

### Start the portfolio locally (optional)
```bash
cd /Users/umairusman/scenic-builds-elevated
npm run dev
# Available at http://localhost:8080
```

### All URLs
- Portfolio (local): http://localhost:8080
- Portfolio (production): https://scenic-builds-elevated.vercel.app
- Admin panel (local): http://localhost:5174
- Admin panel (production): https://construct-scenery-admin.vercel.app
- Admin API (local): http://localhost:4000
- Admin API (via ngrok): https://democrat-both-cross.ngrok-free.dev
- Health check: http://localhost:4000/health

### Admin login
```
Email:    admin@constructscenery.co.uk
Password: admin123
```

### Database management
```bash
cd /Users/umairusman/construct-scenery-admin

npm run db:studio    # Browse database in browser UI (localhost:5555)
npm run db:seed      # Re-seed with defaults (safe — upserts admin user)
npm run db:reset     # DESTRUCTIVE — wipes everything except admin user

# If you change prisma/schema.prisma:
npx prisma migrate dev --name describe_your_change
```

---

## 10. Procedure: Updating the ngrok URL (do this every time ngrok restarts)

When ngrok restarts it gives a new URL. The new URL must be:
1. Updated in both Vercel projects as `VITE_API_URL`
2. Added to admin `ALLOWED_ORIGINS` (if the old URL was hardcoded there — it currently is not, only the `.vercel.app` domains are listed, so this step may be skippable)
3. Redeployed on both Vercel projects

```bash
NEW_URL="https://YOUR-NEW-URL.ngrok-free.app"   # ← paste the new ngrok URL here

# ── Portfolio Vercel project ──────────────────────────────────────────────────
cd /Users/umairusman/scenic-builds-elevated
vercel env rm VITE_API_URL production --yes
echo "$NEW_URL" | vercel env add VITE_API_URL production
vercel --prod

# ── Admin panel Vercel project ────────────────────────────────────────────────
cd /Users/umairusman/construct-scenery-admin
vercel env rm VITE_API_URL production --yes
echo "$NEW_URL" | vercel env add VITE_API_URL production
vercel --prod
```

Both Vercel projects are already linked (`.vercel/` directories exist) and the CLI is authenticated. These commands run without interactive prompts.

---

## 11. Next Steps (Priority Order)

### Priority 1 — Eliminate the ngrok URL problem (MOST URGENT)

Every machine reboot breaks production. Two options:

**Option A — ngrok paid plan (easiest, ~$8/mo)**
1. Upgrade at https://dashboard.ngrok.com
2. Claim a static domain: `ngrok http --domain=construct-scenery.ngrok.app 4000`
3. Update both Vercel `VITE_API_URL` to the static domain (one-time)
4. The URL never changes again

**Option B — Deploy API to Railway (proper, free tier available)**
1. Create Railway account → new project → add PostgreSQL service
2. Get the `DATABASE_URL` from Railway's PostgreSQL service
3. Set all env vars on Railway (same as `.env` but with Railway's `DATABASE_URL` and production `JWT_SECRET`)
4. Connect the `construct-scenery-admin` GitHub repo to Railway (auto-deploys)
5. Railway will run `npm run build` then `npm start`
6. Get the Railway API URL (e.g. `https://construct-scenery-admin.railway.app`)
7. Update both Vercel `VITE_API_URL` to the Railway URL (one-time)
8. Add the Railway URL to `ALLOWED_ORIGINS` — but since the API is now on Railway, CORS is not needed for the API itself (it's a server-to-server situation now — wait, no, the browser still calls the API directly, CORS is still needed)
9. Run seed against production DB: `DATABASE_URL=<railway-url> npm run db:seed`

### Priority 2 — Fill in dead content (can do anytime in the admin panel)

Go to https://construct-scenery-admin.vercel.app:
- **Footer page** → add real Instagram, LinkedIn, Vimeo URLs
- **Worlds editor (Clayface, You, Trespass)** → update `vimeoId` from `76979871` to real Vimeo IDs
- **Worlds editor** → add real intro text, gallery images, facts, credits, process steps, results
- **Projects** → decide on Aurora Pavilion, Bloom Couture, Vanguard Awards, The Late Edit, Maison Pop-Up — create case study worlds or leave as enquiry links

### Priority 3 — Security hardening (before real users or real URLs go live)

1. Generate a real `JWT_SECRET`: `openssl rand -hex 64`
2. Change `ADMIN_PASSWORD` to something strong (update `.env`, then re-seed or update via DB)
3. Move JWT from `localStorage` to `httpOnly` cookies:
   - Backend: set `Set-Cookie: token=...; HttpOnly; SameSite=Strict` instead of returning token in body
   - Frontend: remove `localStorage` reads/writes in `AuthContext.tsx`, remove axios auth interceptor
4. Add `express-rate-limit` to login route in `src/routes/auth.routes.ts`
5. Add `helmet` middleware to `src/app.ts`

### Priority 4 — Make Nav dynamic

`src/components/landing/Nav.tsx` still has a hardcoded `links` array:
1. Add `NavSection` singleton model to `prisma/schema.prisma` with `links: Json`
2. Run migration: `npx prisma migrate dev --name add_nav_section`
3. Add controller + route (`GET /api/nav`)
4. Update `Nav.tsx` to `useQuery(["nav"])` → `apiFetch<ApiNav>("/api/nav")`
5. Add a Nav page to the admin panel

---

## 12. Critical Context for the Next Session

### The ngrok URL is currently active
`https://democrat-both-cross.ngrok-free.dev` is the live tunnel. Both Vercel projects have this set as `VITE_API_URL`. If this URL stops working, follow the procedure in Section 10.

### The admin API MUST be running locally
Without `npm run dev` running in `/Users/umairusman/construct-scenery-admin`, ALL production requests from the portfolio and admin panel fail. ngrok is just a tunnel — it requires the local server to be up.

### `.env` changes require a manual API restart
`tsx watch` only watches `.ts` files. After any `.env` change, kill the process (`lsof -ti :4000 | xargs kill -9`) and restart (`npm run dev`). Not doing this caused the "network error" bug during this session.

### imageResolver.ts is still needed but is now a pass-through
`src/lib/api/imageResolver.ts` maps `/assets/*.jpg` → Vite hashed URLs. Since all DB records now use Cloudinary URLs, it's a no-op for all live data. But it's still needed:
- If `npm run db:seed` is ever re-run (seed restores `/assets/` paths)
- For any future locally-uploaded images before Cloudinary migration

**Do not remove it.**

### The Cloudinary migration script is idempotent
`prisma/upload-images.ts` in the admin repo uses `overwrite: true`. Running it again re-uploads all local images to Cloudinary and updates DB records. Safe to re-run after a seed reset.

### Vercel projects and their source
| Vercel project | Source | Root dir |
|---|---|---|
| `scenic-builds-elevated` | `scenic-builds-elevated` GitHub repo | `/` (repo root — correct, it's a TanStack Start app) |
| `construct-scenery-admin` | `construct-scenery-admin` GitHub repo | `/` (repo root) with `vercel.json` redirecting build to `client/` |

The `construct-scenery-admin` Vercel project's GitHub auto-deploy will use `vercel.json` at the repo root, which correctly builds from `client/`. Do not delete `vercel.json` from the admin repo root.

### Vercel CLI is installed and authenticated
```bash
vercel whoami   # should print: umairusman617-3450
```
Both projects are linked (`.vercel/` directories exist). `vercel --prod` from either project root deploys immediately without interactive prompts.

### PostgreSQL is local, must be running
```bash
brew services start postgresql@16
# DB name: construct_scenery_admin
# User: umairusman (no password)
```

### Git state at end of this session
- Portfolio (`scenic-builds-elevated`): last commit `d20018d` — "Add ngrok-skip-browser-warning header"
- Admin (`construct-scenery-admin`): last commit `709d8c4` — "Fix vercel.json: declare static framework and add SPA rewrite"
- Both pushed to origin/main

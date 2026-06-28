# Construct Scenery Portfolio — Session Handoff

**Date:** 2026-06-29  
**Session summary:** Connected the live portfolio (TanStack Start) to the admin API (Express + PostgreSQL) so all content is now dynamic. Fixed CORS, Cloudinary, a sustainability data-shape bug, and linked Projects to World case study pages in the admin.  
**Portfolio repo:** https://github.com/umairusman617-gif/scenic-builds-elevated (this repo)  
**Admin repo:** https://github.com/umairusman617-gif/construct-scenery-admin (separate private repo)

---

## 1. Two Projects — Do Not Confuse Them

| Project | Local path | Port | Purpose |
|---|---|---|---|
| **Portfolio** (this repo) | `/Users/umairusman/scenic-builds-elevated` | 8080 (or next available) | Public-facing TanStack Start site. Fetches ALL content from the API. |
| **Admin API** | `/Users/umairusman/construct-scenery-admin` | 4000 | Express + Prisma backend. Manages PostgreSQL data. |
| **Admin frontend** | `/Users/umairusman/construct-scenery-admin/client` | 5174 | React admin panel to edit content. |

---

## 2. What Was Completed This Session

### Task 1 — Connected portfolio to admin API ✅ COMPLETE

Replaced every hardcoded string in the portfolio with live API data. The portfolio previously read from `src/lib/worlds-data.ts` (a static TS file with hardcoded content). It now fetches from `http://localhost:4000` at runtime.

**Files created:**

| File | Purpose |
|---|---|
| `src/lib/api/client.ts` | `apiFetch<T>(path)` — base fetch wrapper. Reads `VITE_API_URL` env var. Throws on non-OK status or `success: false`. |
| `src/lib/api/types.ts` | TypeScript interfaces for every API response shape, mirroring the Prisma schema exactly (`ApiHero`, `ApiLogo`, `ApiAbout`, `ApiService`, `ApiProject`, `ApiProcessStep`, `ApiTestimonial`, `ApiSustainability`, `ApiContact`, `ApiFooter`, `ApiWorld` + sub-types). |
| `src/lib/api/imageResolver.ts` | Maps the flat `/assets/*.jpg` paths stored in the database (e.g. `/assets/project-3.jpg`) to the correct Vite content-hashed module URLs (e.g. `/assets/project-3.Dq8Z9Kab.jpg`). This is needed because the seed stored raw paths but Vite hashes asset filenames at build time. If a URL is NOT in the map (i.e. a real Cloudinary URL), it passes straight through unchanged. |
| `src/lib/api/icons.ts` | Maps Lucide icon name strings stored in the DB (`"Clapperboard"`, `"TreePine"`, etc.) to the actual React component. Used by Services and Sustainability sections. |
| `.env.example` | Documents the `VITE_API_URL` env var. |

**Files modified:**

| File | Change |
|---|---|
| `src/lib/worlds-data.ts` | Removed all hardcoded data arrays and helper functions (`worlds`, `worldBySlug`, `nextWorld`). Kept the `World`, `WorldCredit`, `WorldStat`, `WorldProcess` TypeScript types (still used by the worlds/* display components). Added `adaptApiWorld(w: ApiWorld): World` — converts the API response shape to the component shape (gallery `{ url }[]` → `string[]`, process `imageUrl` → `image`, strips DB-only fields). |
| `src/routes/worlds.$slug.tsx` | Changed loader from synchronous (reading `worlds-data.ts`) to **async** (`apiFetch<ApiWorld[]>("/api/worlds")`). Finds current world by slug from the list, derives next world from the same list. Throws `notFound()` if slug not found. |
| `src/components/landing/Hero.tsx` | `useQuery(["hero"])` → `GET /api/hero`. Video and poster stay as local assets (not CMS-managed). Text (eyebrow, headline, rotatingItems, bodyText, CTAs, trustStats) all come from API. Animate-pulse skeleton for text content during load. |
| `src/components/landing/Logos.tsx` | `useQuery(["logos"])` → `GET /api/logos`. Filters `visible: true`. Shows logo image if `imageUrl` is set, otherwise renders the name as text. Skeleton: 8 pulse bars. |
| `src/components/landing/About.tsx` | `useQuery(["about"])` → `GET /api/about`. Image URL resolved via `resolveUrl()`. Stats and pillars from JSON fields. Full skeleton while loading, `null` on error. |
| `src/components/landing/Services.tsx` | `useQuery(["services"])` → `GET /api/services`. Icon name string resolved via `getIcon()`. Section heading shows live count. Full skeleton, `null` on error. |
| `src/components/landing/Projects.tsx` | `useQuery(["projects"])` → `GET /api/projects`. No longer imports from `worlds-data.ts`. Images resolved via `resolveUrl()`. "Show more" button only appears if API returns more than 6 visible projects. |
| `src/components/landing/Process.tsx` | `useQuery(["process"])` → `GET /api/process`. Uses `step.number`, `step.title`, `step.description`. Full skeleton while loading. |
| `src/components/landing/Testimonials.tsx` | `useQuery(["testimonials"])` → `GET /api/testimonials`. Maps `imageUrl` → `image` for `TestimonialsColumn` component. Distributes into 3 columns using modulo (handles any count, not just 9). |
| `src/components/landing/Sustainability.tsx` | `useQuery(["sustainability"])` → `GET /api/sustainability`. **Critical shape fix:** API returns a flat object `{ id, headline, bodyText, imageUrl, imageAlt, items: [] }` — NOT `{ section, items }`. Bug was that the original code destructured `section` which was `undefined`, causing the root error boundary to fire. Fixed to use `data.headline`, `data.items`, etc. directly. |
| `src/components/landing/FinalCTA.tsx` | `useQuery(["contact"])` → `GET /api/contact`. CTA hrefs are `mailto:${data.cta1Email}`. Gradient background always renders during loading. |
| `src/components/landing/Footer.tsx` | `useQuery(["footer"])` → `GET /api/footer`. Social links only shown if non-empty strings in DB. Columns rendered from JSON array `{ title, links: string[] }[]`. Falls back to brand name `"Construct/Scenery"` while loading so footer always shows something. |

**Loading strategy across components:**
- `staleTime: 5 * 60_000` on all queries (5-minute cache, instant on repeat visits)
- All sections show an `animate-pulse` skeleton while `isPending`
- All sections return `null` on error (section disappears cleanly rather than crashing)
- Hero is special: video and overlay always render, only text content is gated on the query

### Task 2 — Fixed CORS ✅ COMPLETE

Portfolio dev server runs on port 8080/8081 (Vite tries each in order). Admin's `ALLOWED_ORIGINS` only listed 5173 and 5174. All API calls returned 500 (CORS rejection) in the browser even though `curl` worked fine.

**File changed:** `/Users/umairusman/construct-scenery-admin/.env`
```
ALLOWED_ORIGINS="http://localhost:5174,http://localhost:5173,http://localhost:8080,http://localhost:8081"
```

### Task 3 — Fixed Cloudinary image upload ✅ COMPLETE

Cloudinary credentials were placeholder strings. Added real credentials to the admin `.env`. The upload endpoint (`POST /api/upload`) was already correctly written — it just needed real values.

**File changed:** `/Users/umairusman/construct-scenery-admin/.env`
- `CLOUDINARY_CLOUD_NAME="dvzkh1nal"`
- `CLOUDINARY_API_KEY="773682671441411"`
- `CLOUDINARY_API_SECRET="kwkBAiW1Utm2yzFsj_UEA63HKSU"`

Uploaded images go to the `construct-scenery` Cloudinary folder and return `https://res.cloudinary.com/...` URLs that work everywhere.

### Task 4 — Linked Projects to World case study pages ✅ COMPLETE

Previously Projects and Worlds were completely independent. Creating a project with a slug did not create a World, and the Worlds editor had no awareness of which projects it was linked to.

**Backend change:** `/Users/umairusman/construct-scenery-admin/src/controllers/projects.controller.ts`

Added `ensureWorldExists(slug, project)` helper. Called in both `createProject` and `updateProject`. If a World with that slug already exists it is left untouched. If not, creates one with:
- `title` = project name
- `role` = project services string
- `year`, `category`, `tags` = from project type/year
- `heroImage` = project imageUrl
- `visible: false` (hidden draft, user fills in and publishes)
- All relation arrays (gallery, facts, credits, process, results) start empty

**Frontend change:** `/Users/umairusman/construct-scenery-admin/client/src/pages/Projects.tsx`
- Added `BookOpen` icon button per row (only on rows with a slug) → links to `/worlds/:slug/edit`
- `createMut.onSuccess` now shows different toast when slug is present: *"Project created — world case study page drafted"*
- Invalidates both `["projects"]` and `["worlds"]` queries on create

### Task 5 — Added static upload serving ✅ COMPLETE

Added `app.use("/uploads", express.static(...))` to `/Users/umairusman/construct-scenery-admin/src/app.ts` so locally-uploaded files (during development, before Cloudinary was configured) can be served. The `uploads/` directory exists with `.gitkeep` and its contents are gitignored.

---

## 3. Decisions Made and Why

| Decision | Reason |
|---|---|
| **`imageResolver.ts` — map DB paths to Vite imports** | The seed stored `/assets/project-3.jpg` but Vite content-hashes asset filenames to `/assets/project-3.Dq8Z9Kab.jpg`. Rather than copying files to `public/`, we import every asset via Vite and map the raw path to the hashed URL. When a real Cloudinary URL is stored, `resolveUrl()` passes it through unchanged — zero code change needed when images are migrated. |
| **`ApiSustainability` — flat shape, not nested** | The sustainability controller returns `{ ...sectionFields, items: [] }` (Prisma `include` inlines the relation). We initially typed it as `{ section: {...}, items: [] }` which crashed the whole page. Fixed to match the actual response. Always verify API shape before typing. |
| **`worlds.$slug.tsx` loader fetches `/api/worlds` (all worlds) rather than `/api/worlds/:slug`** | We need both `world` and `next` in the loader. One call gives us both. There are only 3–10 worlds so payload is small. Avoids two parallel requests. |
| **World auto-created with `visible: false`** | Ensures a half-filled world never goes live on the portfolio accidentally. Admin must explicitly toggle it visible. |
| **`staleTime: 5 * 60_000` on all queries** | Portfolio content changes infrequently. 5 minutes avoids refetching on every page navigation while still picking up changes within a reasonable window. |
| **`null` fallback on query error** | The portfolio should still render (mostly) if one section fails. A crashed section disappears cleanly rather than breaking the page. |
| **Hero video stays as a local bundled asset** | The video is 15 MB+ and is not CMS-managed text. Storing it in Cloudinary is overkill; it is served directly from the portfolio bundle. |

---

## 4. Current File & Folder Structure

```
/Users/umairusman/scenic-builds-elevated/     (PORTFOLIO — this repo)
│
├── .env                    ✅ Created (gitignored) — VITE_API_URL=http://localhost:4000
├── .env.example            ✅ Committed — template for new machines
├── .gitignore              ✅ Updated — added .env, .env.local
│
├── src/
│   ├── assets/             ✅ 11 local images + hero-set.jpg (all referenced via imageResolver)
│   ├── videos/
│   │   └── hero-set.mp4    ✅ Local bundled hero video
│   │
│   ├── lib/
│   │   ├── worlds-data.ts  ✅ Types only + adaptApiWorld() — NO hardcoded data
│   │   ├── api/
│   │   │   ├── client.ts       ✅ apiFetch<T> — reads VITE_API_URL
│   │   │   ├── types.ts        ✅ All API response interfaces
│   │   │   ├── imageResolver.ts ✅ /assets/*.jpg → Vite hashed URL map
│   │   │   ├── icons.ts        ✅ Lucide icon name string → component
│   │   │   └── example.functions.ts  (pre-existing, unused — ignore)
│   │   ├── utils.ts        (pre-existing, unchanged)
│   │   └── config.server.ts (pre-existing, unchanged)
│   │
│   ├── routes/
│   │   ├── __root.tsx      ✅ Root layout with QueryClientProvider (unchanged)
│   │   ├── index.tsx       ✅ Composes all landing sections (unchanged)
│   │   └── worlds.$slug.tsx ✅ Async loader — fetches from API
│   │
│   ├── components/
│   │   ├── landing/
│   │   │   ├── Hero.tsx          ✅ useQuery — dynamic text, local video
│   │   │   ├── Logos.tsx         ✅ useQuery — supports image or text logos
│   │   │   ├── About.tsx         ✅ useQuery — dynamic image, stats, pillars
│   │   │   ├── Services.tsx      ✅ useQuery — icon resolved from string
│   │   │   ├── Projects.tsx      ✅ useQuery — no worlds-data import
│   │   │   ├── Process.tsx       ✅ useQuery — number/title/description
│   │   │   ├── Testimonials.tsx  ✅ useQuery — imageUrl→image mapped
│   │   │   ├── Sustainability.tsx ✅ useQuery — flat data shape (data.items)
│   │   │   ├── FinalCTA.tsx      ✅ useQuery — mailto: CTAs from API
│   │   │   ├── Footer.tsx        ✅ useQuery — columns JSON, social links
│   │   │   └── Nav.tsx           ⚠️ Still hardcoded — no Nav model in DB
│   │   │
│   │   └── worlds/         ✅ All 7 components — receive World prop, unchanged
│   │       ├── HeroSection.tsx
│   │       ├── ProjectOverview.tsx
│   │       ├── WorldGallery.tsx
│   │       ├── ProcessNarrative.tsx
│   │       ├── VimeoShowcase.tsx
│   │       ├── ResultsStrip.tsx
│   │       └── NextProjectNav.tsx
│   │
│   └── router.tsx          ✅ QueryClient created here, passed as context (unchanged)
│
└── (config files: vite.config.ts, tsconfig.json, package.json, etc.)


/Users/umairusman/construct-scenery-admin/    (ADMIN — separate repo)
│
├── .env                    ✅ All real credentials (gitignored)
├── .gitignore              ✅ Updated — uploads/* ignored, uploads/.gitkeep tracked
├── uploads/                ✅ Directory exists for local file uploads (contents gitignored)
│   └── .gitkeep
│
├── src/
│   ├── app.ts              ✅ CORS updated + /uploads static serving added
│   ├── controllers/
│   │   ├── upload.controller.ts    ✅ Cloudinary upload (real credentials)
│   │   ├── projects.controller.ts  ✅ Auto-creates World on project save with slug
│   │   └── (11 other controllers — unchanged)
│   └── (routes, middleware, schemas, lib — all unchanged)
│
├── client/src/
│   ├── pages/
│   │   ├── Projects.tsx    ✅ BookOpen button → /worlds/:slug/edit; smart toast on create
│   │   └── (14 other pages — unchanged)
│   └── (api, components, context, types — unchanged)
│
└── prisma/
    ├── schema.prisma       ✅ 19 models (unchanged this session)
    ├── seed.ts             ✅ Full seed (unchanged)
    └── migrations/         ✅ Init migration applied
```

---

## 5. What Is Incomplete / Not Started

### Critical

| # | Item | Notes |
|---|---|---|
| 1 | **Upload real Cloudinary images for existing content** | All seeded images are `/assets/project-*.jpg` paths that map to local Vite assets. This works locally but will break in production (Vercel won't have those assets accessible at those paths). Upload all images from `src/assets/` to Cloudinary, update records in the admin, and the `imageResolver.ts` will pass Cloudinary URLs straight through. |
| 2 | **Deploy** | Neither the admin API nor the admin frontend are deployed. Portfolio is on Vercel. See Priority 2 below for full deployment steps. |

### Important

| # | Item | Notes |
|---|---|---|
| 3 | **Nav links are still hardcoded** | `src/components/landing/Nav.tsx` has a hardcoded `links` array. There is no `NavSection` model in the admin. Either add a model or leave as-is (nav links change rarely). |
| 4 | **Footer social links are dead** | All three social links (Instagram, LinkedIn, Vimeo) are empty strings in the DB. The Footer component hides them when empty and falls back to `href="#"` links. Go to the admin Footer page and add real URLs. |
| 5 | **Vimeo IDs are placeholder** | All three worlds use `vimeoId: "76979871"` (a generic placeholder). Update each world in the admin Worlds editor with real Vimeo video IDs. |
| 6 | **5 projects have no case study** | Aurora Pavilion, Bloom Couture, Vanguard Awards, The Late Edit, Maison Pop-Up have no slug and no World. Either create worlds for them or leave them as `href="#contact"` enquiry links. |
| 7 | **Security hardening before production** | Change `ADMIN_PASSWORD` from `admin123`. Change `JWT_SECRET` to a 64-char random string. Move JWT from `localStorage` to httpOnly cookies. Add `express-rate-limit` to `POST /api/auth/login`. |
| 8 | **Admin dark mode** | Admin panel (`client/`) only has light mode CSS variables in `index.css`. No dark mode toggle. |
| 9 | **Logo reorder UI** | Backend has `PUT /api/logos/reorder` but the admin Logos page has no drag-and-drop. Order is set via the number field in the edit dialog. |
| 10 | **Admin user management** | Only one admin user exists (from seed). No UI to add users or reset the password. The `User` model exists in Prisma. |

### Nice to Have

| # | Item |
|---|---|
| 11 | Drag-and-drop reorder for all list sections |
| 12 | Rich text editor for long body fields (world intro, process body) |
| 13 | Preview link to live portfolio from each admin section |
| 14 | Activity log / audit trail |
| 15 | Dashboard singleton cards showing real populated/empty status |
| 16 | Mobile hamburger menu in admin sidebar |

---

## 6. Known Bugs and Issues

### Bug 1 — Sustainability data shape (FIXED this session)
**Symptom:** Entire portfolio page showed "This page didn't load" (root error boundary).  
**Root cause:** `ApiSustainability` was typed as `{ section: {...}, items: [] }` but the actual API response is a flat object `{ id, headline, bodyText, imageUrl, imageAlt, items: [] }`. Accessing `data.section.headline` threw, crashing the component tree.  
**Fix applied:** Updated `src/lib/api/types.ts` and `src/components/landing/Sustainability.tsx` to use `data.headline`, `data.bodyText`, `data.items` directly.

### Bug 2 — CORS blocked all API calls (FIXED this session)
**Symptom:** All API requests returned 500 in the browser network tab; `curl` worked fine.  
**Root cause:** Portfolio dev server runs on port 8080/8081 but `ALLOWED_ORIGINS` only contained 5173/5174.  
**Fix applied:** Added 8080 and 8081 to `ALLOWED_ORIGINS` in admin `.env`.

### Bug 3 — World update replaces all relation rows on every save (KNOWN, unfixed)
**File:** `src/controllers/worlds.controller.ts` → `updateWorld`  
**Behaviour:** Every PUT to `/api/worlds/:slug` deletes and recreates gallery, facts, credits, process, results if included. Row IDs change on each save. Safe for current use but would break any external reference to sub-table IDs.

### Bug 4 — Footer columns JSON can break on bad input (KNOWN, unfixed)
**File:** `client/src/pages/Footer.tsx` in admin  
**Symptom:** Invalid JSON in the columns textarea shows a toast error but no line indicator.

### Bug 5 — No mobile layout in admin sidebar (KNOWN, unfixed)
**File:** `client/src/components/layout/Sidebar.tsx`  
**Symptom:** Admin panel is unusable on screens narrower than ~900px.

### Bug 6 — Dashboard singleton cards don't show populated status (KNOWN, unfixed)
**File:** `client/src/pages/Dashboard.tsx`  
**Symptom:** Hero/About/Contact/Footer/Sustainability cards always say "click to edit" regardless of whether they have real content.

---

## 7. Environment Variables

### Portfolio — `/Users/umairusman/scenic-builds-elevated/.env` (gitignored)
```env
VITE_API_URL=http://localhost:4000
```
In production this becomes your deployed API URL, e.g.:
```env
VITE_API_URL=https://construct-scenery-admin.railway.app
```

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
ALLOWED_ORIGINS="http://localhost:5174,http://localhost:5173,http://localhost:8080,http://localhost:8081"
ADMIN_EMAIL="admin@constructscenery.co.uk"
ADMIN_PASSWORD="admin123"
ADMIN_NAME="Admin"
```

### Admin frontend — `/Users/umairusman/construct-scenery-admin/client/.env` (gitignored)
```env
VITE_API_URL=http://localhost:4000
```

---

## 8. Commands to Run Everything

### Prerequisites
```bash
brew services start postgresql@16   # PostgreSQL must be running
# gh CLI is at /opt/homebrew/bin/gh — add to PATH if needed
export PATH="/opt/homebrew/bin:$PATH"
```

### Starting the admin API (port 4000)
```bash
cd /Users/umairusman/construct-scenery-admin
npm run dev
```

### Starting the admin frontend (port 5174)
```bash
cd /Users/umairusman/construct-scenery-admin/client
npm run dev
```

### Starting the portfolio (port 8080)
```bash
cd /Users/umairusman/scenic-builds-elevated
npm run dev
```

### All three URLs when running locally
- Portfolio: http://localhost:8080
- Admin panel: http://localhost:5174
- Admin API: http://localhost:4000
- API health check: http://localhost:4000/health

### Admin login credentials
```
Email:    admin@constructscenery.co.uk
Password: admin123
```

### Database management
```bash
cd /Users/umairusman/construct-scenery-admin

# Browse DB in browser UI
npm run db:studio

# Reset all content to seed defaults (DESTRUCTIVE — wipes everything except admin user)
npm run db:reset

# Re-seed without resetting (safe, uses upsert for admin user)
npm run db:seed

# Create a new migration after changing schema.prisma
npx prisma migrate dev --name describe_your_change
```

### First-time setup on a new machine
```bash
# 1. Clone both repos
git clone https://github.com/umairusman617-gif/scenic-builds-elevated.git
git clone https://github.com/umairusman617-gif/construct-scenery-admin.git

# 2. Admin backend setup
cd construct-scenery-admin
cp .env.example .env          # then fill in all values
npm install
createdb construct_scenery_admin
npx prisma generate
npx prisma migrate dev --name init
npm run db:seed

# 3. Admin frontend setup
cd client
cp .env.example .env          # VITE_API_URL=http://localhost:4000
npm install

# 4. Portfolio setup
cd ../../scenic-builds-elevated
cp .env.example .env          # VITE_API_URL=http://localhost:4000
npm install
```

---

## 9. Next Steps (Priority Order)

### Priority 1 — Upload images to Cloudinary (unblocks production)

The seeded image paths (`/assets/project-1.jpg` etc.) resolve correctly in local dev via `imageResolver.ts`. They will NOT work in production on Vercel because those files aren't served at those paths in a deployed build.

**Steps:**
1. Open the admin panel at http://localhost:5174
2. Log in and go to each section (Projects, Worlds, About, Sustainability)
3. Use the ImageUpload component to upload the corresponding image from `src/assets/`
4. The component will upload to Cloudinary and store the `res.cloudinary.com` URL in the DB
5. Once done, `imageResolver.ts` is bypassed for those entries — Cloudinary URLs pass through unchanged

**Images to upload:**
- `src/assets/project-1.jpg` → used by Trespass Against Us hero + gallery
- `src/assets/project-2.jpg` → used by Aurora Pavilion + You gallery
- `src/assets/project-3.jpg` → used by Clayface hero + gallery
- `src/assets/project-4.jpg` → used by Bloom Couture + Trespass gallery
- `src/assets/project-5.jpg` → used by You hero + gallery
- `src/assets/project-6.jpg` → used by Vanguard Awards + gallery
- `src/assets/project-7.jpg` → used by The Late Edit
- `src/assets/project-8.jpg` → used by Maison Pop-Up + gallery
- `src/assets/about-craft.jpg` → About section + Clayface process step
- `src/assets/sustainability.jpg` → Sustainability section + Trespass process step
- `src/assets/hero-set.jpg` → Hero video poster (less critical — video plays over it)

### Priority 2 — Deploy

**Recommended stack:**

| Service | What |
|---|---|
| Railway | Admin API (Express) + PostgreSQL |
| Vercel | Admin frontend (`client/`) |
| Vercel | Portfolio (already here) |

**Steps:**
1. Create Railway project → add PostgreSQL service → get `DATABASE_URL`
2. Deploy admin API to Railway — set all env vars (use production JWT_SECRET, change ADMIN_PASSWORD)
3. Run seed against production DB: `DATABASE_URL=<prod> npm run db:seed`
4. Deploy admin `client/` to Vercel — build command: `npm run build`, output: `dist`, env: `VITE_API_URL=https://your-api.railway.app`
5. Update portfolio Vercel env: `VITE_API_URL=https://your-api.railway.app`
6. Update admin `ALLOWED_ORIGINS` to include the deployed portfolio and admin frontend URLs
7. Redeploy both

### Priority 3 — Fill in dead content

In the admin panel (http://localhost:5174):
- **Footer page** → add real Instagram, LinkedIn, Vimeo URLs
- **Worlds editor (Clayface, You, Trespass)** → update `vimeoId` from `76979871` to real Vimeo video IDs
- **Worlds editor** → add real intro text, gallery images, facts, credits, process steps, results for each world
- **Projects** → decide on the 5 projects without case studies (Aurora Pavilion, Bloom Couture, Vanguard Awards, The Late Edit, Maison Pop-Up) — either create worlds for them or leave as enquiry links

### Priority 4 — Security hardening (before real users hit production)

1. Generate new `JWT_SECRET`: `openssl rand -hex 64`
2. Change `ADMIN_PASSWORD` to something strong (update in both `.env` and re-run seed or change via DB directly)
3. Move JWT from `localStorage` to `httpOnly` cookies:
   - Backend: remove `Authorization` header, set `Set-Cookie: token=...; HttpOnly; SameSite=Strict`
   - Frontend: remove `localStorage` reads/writes in `AuthContext.tsx`, remove the axios interceptor that sets the header
4. Add `express-rate-limit` to the login route in `src/routes/auth.routes.ts`
5. Add `helmet` middleware to `src/app.ts`

### Priority 5 — Nav dynamic content

`src/components/landing/Nav.tsx` still has a hardcoded `links` array. To make it dynamic:
- Add a `NavSection` singleton model to `prisma/schema.prisma` with a `links: Json` field
- Run migration
- Add controller + route (`GET /api/nav`)
- Update `Nav.tsx` to `useQuery(["nav"])`
- Add a Nav page to the admin panel

---

## 10. Critical Context for the Next Session

### The imageResolver is the key to images working locally
`src/lib/api/imageResolver.ts` maps plain `/assets/*.jpg` strings (stored in the DB) to Vite's content-hashed module imports. Without this, all images in the portfolio would be broken paths. Once Cloudinary URLs replace the seeded paths, this file becomes a no-op (pass-through). **Do not remove it** — it's still needed for any path that starts with `/assets/`.

### The Sustainability API response is flat — not nested
`GET /api/sustainability` returns `{ id, headline, bodyText, imageUrl, imageAlt, items: [...] }` — the section fields and items are all at the top level. This was a bug earlier in the session (the type was wrong). `src/lib/api/types.ts` now correctly types it as `ApiSustainability` without a `section` wrapper.

### Projects and Worlds are linked by slug
When a project is saved with a slug in the admin, `ensureWorldExists()` runs automatically. It creates a hidden World draft pre-filled from the project. The World is never overwritten on subsequent project saves — it is only created if it doesn't exist. The admin Projects page has a `BookOpen` icon button per row to jump directly to the World editor for that slug.

### World update replaces all relation rows
Every PUT to `/api/worlds/:slug` with a `gallery`, `facts`, `credits`, `process`, or `results` key deletes all existing rows for that relation and recreates them. This is intentional (no diffing). World sub-table IDs change on every save — don't store them externally.

### PostgreSQL is local, must be running
```bash
brew services start postgresql@16
# DB name: construct_scenery_admin
# User: umairusman (no password)
```

### Three servers must all be running for the full system
- Port 4000: admin API (`npm run dev` in `/construct-scenery-admin`)
- Port 5174: admin frontend (`npm run dev` in `/construct-scenery-admin/client`)
- Port 8080+: portfolio (`npm run dev` in `/scenic-builds-elevated`)

### Cloudinary account
- Cloud: `dvzkh1nal`
- Uploads go to the `construct-scenery` folder
- Credentials are in the admin `.env` — do NOT commit this file

### Git state
- Portfolio (`scenic-builds-elevated`): last commit `0ab8973` — "Connect portfolio to admin API"
- Admin (`construct-scenery-admin`): last commit `66d41c5` — "Wire Cloudinary uploads, link projects to world pages"
- Both pushed to origin/main

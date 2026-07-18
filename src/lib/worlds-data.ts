import type { ApiWorld } from "@/lib/api/types";
import { resolveUrl } from "@/lib/api/imageResolver";

export type WorldCredit = { role: string; name: string };
export type WorldStat = { value: string; label: string };
export type WorldProcess = { title: string; body: string; image: string };

export type World = {
  id: number;
  slug: string;
  title: string;
  summary: string;
  role: string;
  year: string;
  tags: string[];
  category: string;
  heroImage: string;
  gallery: string[];
  vimeoId: string;
  intro: string;
  facts: { label: string; value: string }[];
  credits?: WorldCredit[];
  process: WorldProcess[];
  results: WorldStat[];
};

export function adaptApiWorld(w: ApiWorld): World {
  return {
    id: w.id,
    slug: w.slug,
    title: w.title,
    summary: w.summary,
    role: w.role,
    year: w.year,
    tags: w.tags,
    category: w.category,
    heroImage: resolveUrl(w.heroImage),
    gallery: w.gallery.map((g) => resolveUrl(g.url)),
    vimeoId: w.vimeoId,
    intro: w.intro,
    facts: w.facts.map((f) => ({ label: f.label, value: f.value })),
    credits: w.credits.map((c) => ({ role: c.role, name: c.name })),
    process: w.process.map((p) => ({
      title: p.title,
      body: p.body,
      image: resolveUrl(p.imageUrl),
    })),
    results: w.results.map((r) => ({ value: r.value, label: r.label })),
  };
}

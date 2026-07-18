import { createFileRoute, notFound, redirect } from "@tanstack/react-router";
import { Nav } from "@/components/landing/Nav";
import { Footer } from "@/components/landing/Footer";
import { HeroSection } from "@/components/worlds/HeroSection";
import { ProjectOverview } from "@/components/worlds/ProjectOverview";
import { WorldGallery } from "@/components/worlds/WorldGallery";
import { ProcessNarrative } from "@/components/worlds/ProcessNarrative";
import { VimeoShowcase } from "@/components/worlds/VimeoShowcase";
import { ResultsStrip } from "@/components/worlds/ResultsStrip";
import { NextProjectNav } from "@/components/worlds/NextProjectNav";
import { apiFetch } from "@/lib/api/client";
import type { ApiWorld } from "@/lib/api/types";
import { adaptApiWorld } from "@/lib/worlds-data";

function normalizeWorldSlug(slug: string) {
  try {
    return decodeURIComponent(slug);
  } catch {
    return slug;
  }
}

export const Route = createFileRoute("/worlds/$slug")({
  loader: async ({ params }) => {
    const apiWorlds = await apiFetch<ApiWorld[]>("/api/worlds");
    const requestedSlug = normalizeWorldSlug(params.slug);
    const idx = apiWorlds.findIndex((w) => w.slug === requestedSlug);
    if (idx === -1) throw notFound();

    const world = adaptApiWorld(apiWorlds[idx]);

    if (params.slug !== world.slug) {
      throw redirect({
        to: "/worlds/$slug",
        params: { slug: world.slug },
        replace: true,
      });
    }

    const nextIndex = apiWorlds.findIndex((candidate) => candidate.id === world.id);
    const next = adaptApiWorld(apiWorlds[(nextIndex + 1) % apiWorlds.length]);
    return { world, next };
  },
  head: ({ loaderData }) => {
    const w = loaderData?.world;
    if (!w) return { meta: [{ title: "World — Construct Scenery" }] };
    const title = `${w.title} — Construct Scenery`;
    return {
      meta: [
        { title },
        { name: "description", content: w.summary },
        { property: "og:title", content: title },
        { property: "og:description", content: w.summary },
        { property: "og:image", content: w.heroImage },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: w.heroImage },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <p className="text-ink-soft">World not found.</p>
    </div>
  ),
  component: WorldPage,
});

function WorldPage() {
  const { world, next } = Route.useLoaderData();
  return (
    <main className="bg-background text-foreground">
      <Nav />
      <HeroSection world={world} />
      <ProjectOverview world={world} />
      <WorldGallery world={world} />
      <ProcessNarrative world={world} />
      <VimeoShowcase world={world} />
      <ResultsStrip world={world} />
      <NextProjectNav next={next} />
      <Footer />
    </main>
  );
}

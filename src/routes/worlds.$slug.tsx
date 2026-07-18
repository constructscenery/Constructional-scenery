import { createFileRoute, notFound, redirect } from "@tanstack/react-router";
import { Nav } from "@/components/landing/Nav";
import { Footer } from "@/components/landing/Footer";
import { HeroSection } from "@/components/worlds/HeroSection";
import { ProjectOverview } from "@/components/worlds/ProjectOverview";
import { WorldGallery } from "@/components/worlds/WorldGallery";
import { VimeoShowcase } from "@/components/worlds/VimeoShowcase";
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
    const publicWorlds = apiWorlds.filter((w) => w.visible);
    if (publicWorlds.length === 0) throw notFound();

    const requestedSlug = normalizeWorldSlug(params.slug);
    const idx = publicWorlds.findIndex((w) => w.slug === requestedSlug);
    if (idx === -1) throw notFound();

    const world = adaptApiWorld(publicWorlds[idx]);

    if (params.slug !== world.slug) {
      throw redirect({
        to: "/worlds/$slug",
        params: { slug: world.slug },
        replace: true,
      });
    }

    const next = publicWorlds.length > 1
      ? adaptApiWorld(publicWorlds[(idx + 1) % publicWorlds.length])
      : null;

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
      <VimeoShowcase world={world} />
      {next ? <NextProjectNav next={next} /> : null}
      <Footer />
    </main>
  );
}

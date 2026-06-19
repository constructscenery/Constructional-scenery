import { createFileRoute, notFound } from "@tanstack/react-router";
import { Nav } from "@/components/landing/Nav";
import { Footer } from "@/components/landing/Footer";
import { HeroSection } from "@/components/worlds/HeroSection";
import { ProjectOverview } from "@/components/worlds/ProjectOverview";
import { WorldGallery } from "@/components/worlds/WorldGallery";
import { ProcessNarrative } from "@/components/worlds/ProcessNarrative";
import { VimeoShowcase } from "@/components/worlds/VimeoShowcase";
import { ResultsStrip } from "@/components/worlds/ResultsStrip";
import { NextProjectNav } from "@/components/worlds/NextProjectNav";
import { nextWorld, worldBySlug } from "@/lib/worlds-data";

export const Route = createFileRoute("/worlds/$slug")({
  loader: ({ params }) => {
    const world = worldBySlug(params.slug);
    if (!world) throw notFound();
    return { world, next: nextWorld(params.slug) };
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

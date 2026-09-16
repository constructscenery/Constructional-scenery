import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/landing/Nav";
import { Hero } from "@/components/landing/Hero";
import { Logos } from "@/components/landing/Logos";
import { About } from "@/components/landing/About";
import { Projects } from "@/components/landing/Projects";
import { Process } from "@/components/landing/Process";
import { Testimonials } from "@/components/landing/Testimonials";
import { Sustainability } from "@/components/landing/Sustainability";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { Footer } from "@/components/landing/Footer";
import { apiFetch } from "@/lib/api/client";
import type {
  ApiAbout,
  ApiContact,
  ApiFooter,
  ApiHero,
  ApiLogo,
  ApiProcessStep,
  ApiProject,
  ApiSustainability,
  ApiTestimonial,
} from "@/lib/api/types";

const homepageQueries = [
  { queryKey: ["hero"], queryFn: () => apiFetch<ApiHero>("/api/hero") },
  { queryKey: ["logos"], queryFn: () => apiFetch<ApiLogo[]>("/api/logos") },
  { queryKey: ["about"], queryFn: () => apiFetch<ApiAbout>("/api/about") },
  { queryKey: ["projects"], queryFn: () => apiFetch<ApiProject[]>("/api/projects") },
  { queryKey: ["process"], queryFn: () => apiFetch<ApiProcessStep[]>("/api/process") },
  { queryKey: ["testimonials"], queryFn: () => apiFetch<ApiTestimonial[]>("/api/testimonials") },
  { queryKey: ["sustainability"], queryFn: () => apiFetch<ApiSustainability>("/api/sustainability") },
  { queryKey: ["contact"], queryFn: () => apiFetch<ApiContact>("/api/contact") },
  { queryKey: ["footer"], queryFn: () => apiFetch<ApiFooter>("/api/footer") },
] as const;

export const Route = createFileRoute("/")({
  loader: async ({ context }) => {
    await Promise.all(
      homepageQueries.map((query) =>
        context.queryClient.ensureQueryData(query).catch(() => undefined),
      ),
    );
  },
  head: () => ({
    meta: [
      { title: "Construct Scenery — We Build Worlds That Audiences Believe" },
      {
        name: "description",
        content:
          "Uk set construction for film and television",
      },
      { property: "og:title", content: "Construct Scenery — We Build Worlds" },
      {
        property: "og:description",
        content:
          "Uk set construction for film and television",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="bg-background text-foreground">
      <Nav />
      <Hero />
      <Logos />
      <About />
      <Projects />
      <Process />
      <Testimonials />
      <Sustainability />
      <FinalCTA />
      <Footer />
    </main>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/landing/Nav";
import { Hero } from "@/components/landing/Hero";
import { Logos } from "@/components/landing/Logos";
import { About } from "@/components/landing/About";
import { Services } from "@/components/landing/Services";
import { Projects } from "@/components/landing/Projects";
import { Process } from "@/components/landing/Process";
import { Testimonials } from "@/components/landing/Testimonials";
import { Sustainability } from "@/components/landing/Sustainability";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { Footer } from "@/components/landing/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Construct Scenery — We Build Worlds That Audiences Believe" },
      {
        name: "description",
        content:
          "Premium UK scenic construction for film, television, brands and live experiences. From concept to camera-ready.",
      },
      { property: "og:title", content: "Construct Scenery — We Build Worlds" },
      {
        property: "og:description",
        content:
          "Premium UK scenic construction for film, television, brands and live experiences.",
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
      <Services />
      <Projects />
      <Process />
      <Testimonials />
      <Sustainability />
      <FinalCTA />
      <Footer />
    </main>
  );
}

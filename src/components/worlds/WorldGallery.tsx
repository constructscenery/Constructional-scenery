import { motion } from "motion/react";
import { ZoomParallax } from "@/components/ui/zoom-parallax";
import type { World } from "@/lib/worlds-data";

export function WorldGallery({ world }: { world: World }) {
  const images = world.gallery.slice(0, 7).map((src, i) => ({
    src,
    alt: `${world.title} — frame ${i + 1}`,
  }));

  return (
    <section className="relative bg-background">
      <div className="container-x pt-24 pb-12 md:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <p className="mb-4 text-[11px] uppercase tracking-[0.3em] text-chrome">Inside the build</p>
          <h2 className="font-display text-4xl md:text-6xl tracking-tight text-ink text-balance">
            Explore the world.
          </h2>
        </motion.div>
      </div>
      <ZoomParallax images={images} />
    </section>
  );
}

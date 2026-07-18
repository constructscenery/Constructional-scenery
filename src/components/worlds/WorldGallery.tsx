import { useRef } from "react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ScrollVelocity, type ScrollVelocityHandle } from "@/components/ui/scroll-velocity";
import type { World } from "@/lib/worlds-data";

export function WorldGallery({ world }: { world: World }) {
  const images = world.gallery;
  const half = Math.ceil(images.length / 2);
  const rowA = images.slice(0, half);
  const rowB = images.slice(half).concat(images.slice(0, Math.max(0, half - (images.length - half))));
  const rows: { items: string[]; velocity: number }[] = [
    { items: [...rowA, ...rowA], velocity: 1.2 },
    { items: [...rowB, ...rowB], velocity: -1.2 },
  ];

  const apiRefs = [useRef<ScrollVelocityHandle>(null), useRef<ScrollVelocityHandle>(null)];

  const nudgeAll = (dir: 1 | -1) => {
    apiRefs.forEach((r) => r.current?.nudge(dir * 20));
  };

  return (
    <section id="explore" className="relative bg-background py-24 md:py-32">
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <p className="mb-4 text-[11px] uppercase tracking-[0.3em] text-chrome">
            Inside the build
          </p>
          <h2 className="font-display text-4xl md:text-6xl tracking-tight text-ink text-balance">
            Explore the world.
          </h2>
        </motion.div>
      </div>

      <div className="relative flex flex-col gap-6">
        {rows.map((row, ri) => (
          <ScrollVelocity key={ri} velocity={row.velocity} apiRef={apiRefs[ri]}>
            {row.items.map((src, i) => (
              <figure
                key={`${ri}-${i}`}
                className="relative h-[42vh] w-[64vw] shrink-0 overflow-hidden rounded-lg md:h-[56vh] md:w-[40vw]"
              >
                <img
                  src={src}
                  alt={`${world.title} — frame ${i + 1}`}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </figure>
            ))}
          </ScrollVelocity>
        ))}

        <button
          type="button"
          onClick={() => nudgeAll(1)}
          aria-label="Scroll gallery left"
          className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-background/80 p-3 text-ink shadow-lg backdrop-blur transition hover:bg-background"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          type="button"
          onClick={() => nudgeAll(-1)}
          aria-label="Scroll gallery right"
          className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-background/80 p-3 text-ink shadow-lg backdrop-blur transition hover:bg-background"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
    </section>
  );
}

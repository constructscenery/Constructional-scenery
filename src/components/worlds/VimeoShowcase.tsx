import { useState } from "react";
import { motion } from "motion/react";
import { Play } from "lucide-react";
import type { World } from "@/lib/worlds-data";

export function VimeoShowcase({ world }: { world: World }) {
  const [playing, setPlaying] = useState(false);

  return (
    <section id="motion" className="bg-background py-32 md:py-48">
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 max-w-2xl"
        >
          <p className="mb-6 text-[11px] uppercase tracking-[0.3em] text-chrome">Showreel</p>
          <h2 className="font-display text-4xl md:text-6xl tracking-tight text-ink text-balance">
            See it in motion.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative aspect-video w-full overflow-hidden rounded-2xl bg-ink"
        >
          {playing ? (
            <iframe
              src={`https://player.vimeo.com/video/${world.vimeoId}?autoplay=1&title=0&byline=0&portrait=0`}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
              title={`${world.title} — showreel`}
            />
          ) : (
            <>
              <img
                src={world.heroImage}
                alt={`${world.title} — video poster`}
                className="absolute inset-0 h-full w-full object-cover opacity-70"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60" />
              <button
                type="button"
                onClick={() => setPlaying(true)}
                aria-label={`Play ${world.title} showreel`}
                className="group absolute inset-0 flex items-center justify-center"
              >
                <span className="flex h-20 w-20 md:h-24 md:w-24 items-center justify-center rounded-full bg-white text-black transition-transform duration-500 group-hover:scale-110 shadow-elevated">
                  <Play className="h-6 w-6 md:h-7 md:w-7 fill-black translate-x-0.5" />
                </span>
              </button>
              <div className="pointer-events-none absolute bottom-6 left-6 text-[11px] uppercase tracking-[0.3em] text-white/70">
                {world.title} · Showreel
              </div>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}

import { motion } from "motion/react";
import type { World } from "@/lib/worlds-data";

export function ProcessNarrative({ world }: { world: World }) {
  return (
    <section className="bg-background py-32 md:py-48">
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20 max-w-2xl"
        >
          <p className="mb-6 text-[11px] uppercase tracking-[0.3em] text-chrome">Craft notes</p>
          <h2 className="font-display text-4xl md:text-6xl leading-[0.95] tracking-tight text-ink text-balance">
            How it was made.
          </h2>
        </motion.div>

        <div className="space-y-32 md:space-y-48">
          {world.process.map((step, i) => {
            const reverse = i % 2 === 1;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className={`grid items-center gap-10 md:gap-16 md:grid-cols-12 ${reverse ? "md:[direction:rtl]" : ""}`}
              >
                <div className={`md:col-span-7 [direction:ltr]`}>
                  <div className="overflow-hidden rounded-2xl bg-fog">
                    <img
                      src={step.image}
                      alt={step.title}
                      loading="lazy"
                      className="h-full w-full object-cover aspect-[4/3]"
                    />
                  </div>
                </div>
                <div className="md:col-span-5 [direction:ltr]">
                  <div className="text-[11px] uppercase tracking-[0.3em] text-chrome">
                    Step {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="mt-4 font-display text-3xl md:text-4xl leading-tight tracking-tight text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-6 text-base md:text-lg leading-relaxed text-ink-soft">
                    {step.body}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import { motion } from "motion/react";
import type { World } from "@/lib/worlds-data";

export function ResultsStrip({ world }: { world: World }) {
  if (!world.results?.length) return null;

  return (
    <section className="bg-zinc-950 text-white py-32 md:py-40">
      <div className="container-x">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-[11px] uppercase tracking-[0.3em] text-white/50"
        >
          Outcomes
        </motion.p>
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {world.results.map((r, i) => (
            <motion.div
              key={r.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.9, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="font-display text-6xl md:text-7xl tracking-tight">{r.value}</div>
              <div className="mt-3 text-[11px] uppercase tracking-[0.25em] text-white/50">
                {r.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

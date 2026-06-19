import { motion } from "motion/react";
import type { World } from "@/lib/worlds-data";

export function ProjectOverview({ world }: { world: World }) {
  return (
    <section className="bg-background py-32 md:py-48">
      <div className="container-x grid gap-16 md:grid-cols-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="md:col-span-7"
        >
          <p className="mb-6 text-[11px] uppercase tracking-[0.3em] text-chrome">Overview</p>
          <p className="font-display text-2xl md:text-4xl leading-tight tracking-tight text-ink text-balance">
            {world.intro}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="md:col-span-5 md:col-start-8"
        >
          <div className="rounded-2xl border border-border bg-fog p-8">
            <p className="mb-6 text-[11px] uppercase tracking-[0.3em] text-chrome">By the numbers</p>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-8">
              {world.facts.map((f) => (
                <div key={f.label}>
                  <dt className="text-[10px] uppercase tracking-[0.25em] text-chrome">{f.label}</dt>
                  <dd className="mt-2 font-display text-3xl text-ink">{f.value}</dd>
                </div>
              ))}
            </dl>

            {world.credits && (
              <>
                <div className="my-8 h-px bg-border" />
                <p className="mb-5 text-[11px] uppercase tracking-[0.3em] text-chrome">Credits</p>
                <dl className="space-y-3">
                  {world.credits.map((c, idx) => (
                    <div key={`${c.role}-${idx}`} className="flex items-baseline justify-between gap-4">
                      <dt className="text-[11px] uppercase tracking-[0.2em] text-chrome">{c.role}</dt>
                      <dd className="text-sm text-ink">{c.name}</dd>
                    </div>
                  ))}
                </dl>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

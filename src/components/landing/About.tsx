import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import { apiFetch } from "@/lib/api/client";
import type { ApiAbout } from "@/lib/api/types";
import { resolveUrl } from "@/lib/api/imageResolver";

export function About() {
  const { data, isPending, isError } = useQuery({
    queryKey: ["about"],
    queryFn: () => apiFetch<ApiAbout>("/api/about"),
    staleTime: 5 * 60_000,
  });

  if (isPending) {
    return (
      <section id="about" className="bg-background py-32 md:py-48">
        <div className="container-x animate-pulse space-y-12">
          <div className="max-w-4xl space-y-4">
            <div className="h-3 w-24 rounded bg-muted/40" />
            <div className="h-16 w-3/4 rounded-xl bg-muted/40" />
          </div>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-7">
              <div className="aspect-[4/5] rounded-2xl bg-muted/30" />
            </div>
            <div className="lg:col-span-5 space-y-6">
              <div className="h-4 w-full rounded bg-muted/30" />
              <div className="h-4 w-5/6 rounded bg-muted/30" />
              <div className="h-4 w-4/5 rounded bg-muted/30" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (isError || !data) return null;

  const stats = data.stats as { value: string; label: string }[];
  const pillars = data.pillars as { title: string; description: string }[];

  return (
    <section id="about" className="bg-background py-32 md:py-48">
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 max-w-4xl"
        >
          <p className="mb-6 text-[11px] uppercase tracking-[0.3em] text-chrome">The Studio</p>
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl text-balance leading-[0.95]">
            {data.headline}
          </h2>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, scale: 1.02 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <div className="relative overflow-hidden rounded-2xl bg-fog aspect-[4/5]">
              <img
                src={resolveUrl(data.imageUrl)}
                alt={data.imageAlt}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </motion.div>

          <div className="lg:col-span-5 flex flex-col justify-center">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.1 }}
              className="text-lg md:text-xl text-ink-soft leading-relaxed"
            >
              {data.bodyText}
            </motion.p>

            <div className="mt-10 grid grid-cols-2 gap-6 border-t border-border pt-8">
              {stats.map((s, idx) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 + idx * 0.08 }}
                >
                  <div className="font-display text-4xl md:text-5xl">{s.value}</div>
                  <div className="mt-1 text-xs uppercase tracking-[0.2em] text-chrome">{s.label}</div>
                </motion.div>
              ))}
            </div>

            <ul className="mt-12 space-y-4 border-t border-border pt-8">
              {pillars.map((p, idx) => (
                <motion.li
                  key={p.title}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className="flex items-start gap-4 group"
                >
                  <span className="mt-2 h-1 w-1 rounded-full bg-ink shrink-0" />
                  <div>
                    <div className="font-display text-base text-ink">{p.title}</div>
                    <div className="text-sm text-chrome">{p.description}</div>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

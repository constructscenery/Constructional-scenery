import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, Plus } from "lucide-react";
import { apiFetch } from "@/lib/api/client";
import type { ApiProject } from "@/lib/api/types";
import { resolveUrl } from "@/lib/api/imageResolver";

export function Projects() {
  const { data, isPending, isError } = useQuery({
    queryKey: ["projects"],
    queryFn: () => apiFetch<ApiProject[]>("/api/projects"),
    staleTime: 5 * 60_000,
  });

  const [showAll, setShowAll] = useState(false);

  const allProjects = data?.filter((p) => p.visible) ?? [];
  const visible = showAll ? allProjects : allProjects.slice(0, 12);

  if (isPending) {
    return (
      <section id="work" className="bg-background pt-32 pb-16 md:pt-48 md:pb-24">
        <div className="container-x animate-pulse space-y-12">
          <div className="space-y-4">
            <div className="h-3 w-28 rounded bg-muted/40" />
            <div className="h-14 w-1/2 rounded-xl bg-muted/40" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-[260px] md:auto-rows-[320px] gap-4 md:gap-6">
            {Array.from({ length: 6 }).map((_, k) => (
              <div key={k} className="rounded-2xl bg-muted/30" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (isError || allProjects.length === 0) return null;

  return (
    <section id="work" className="bg-background pt-32 pb-16 md:pt-48 md:pb-24">
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-8"
        >
          <div>
            <p className="mb-6 text-[11px] uppercase tracking-[0.3em] text-chrome">Selected Work</p>
            <h2 className="font-display text-5xl md:text-7xl text-balance leading-[0.95] max-w-3xl">
              Worlds we&apos;ve built.
            </h2>
          </div>
          <p className="md:max-w-xs text-ink-soft">
            A selection of recent productions from our workshop floor.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-[260px] md:auto-rows-[320px] gap-4 md:gap-6">
          <AnimatePresence>
            {visible.map((p, idx) => {
              const Cmp: any = p.slug ? Link : "a";
              const linkProps = p.slug
                ? { to: "/worlds/$slug", params: { slug: p.slug } }
                : { href: "#contact" };
              return (
                <motion.div
                  key={p.id}
                  layout
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, delay: (idx % 12) * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  className={`group relative overflow-hidden rounded-2xl bg-fog ${p.span ?? ""}`}
                >
                  <Cmp {...linkProps} className="absolute inset-0 block">
                    <img
                      src={resolveUrl(p.imageUrl)}
                      alt={`${p.name} — ${p.type}`}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 text-white">
                      <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.25em] text-white/60 mb-2">
                        <span>{p.type}</span>
                        <span>{p.year}</span>
                      </div>
                      <h3 className="font-display text-2xl md:text-3xl mb-1">{p.name}</h3>
                      <div className="overflow-hidden max-h-0 group-hover:max-h-20 transition-[max-height] duration-500">
                        <p className="pt-2 text-sm text-white/70">{p.services}</p>
                        <div className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-white">
                          {p.slug ? "View case study" : "Enquire"}{" "}
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </div>
                      </div>
                    </div>
                  </Cmp>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {!showAll && allProjects.length > 12 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-16 flex justify-center"
          >
            <button
              onClick={() => setShowAll(true)}
              className="group inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3.5 text-sm font-medium text-ink transition hover:bg-ink hover:text-background"
            >
              <Plus className="h-4 w-4 transition-transform group-hover:rotate-90" />
              Show more projects
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}

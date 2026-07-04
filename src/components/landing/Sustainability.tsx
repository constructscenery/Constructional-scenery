import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import { apiFetch } from "@/lib/api/client";
import type { ApiSustainability } from "@/lib/api/types";
import { resolveUrl } from "@/lib/api/imageResolver";
import { getIcon } from "@/lib/api/icons";

export function Sustainability() {
  const { data, isPending, isError } = useQuery({
    queryKey: ["sustainability"],
    queryFn: () => apiFetch<ApiSustainability>("/api/sustainability"),
  });

  if (isPending) {
    return (
      <section className="bg-background py-32 md:py-48">
        <div className="container-x animate-pulse">
          <div className="grid gap-16 lg:grid-cols-12 lg:gap-20 items-center">
            <div className="lg:col-span-6 order-2 lg:order-1">
              <div className="aspect-[4/5] rounded-2xl bg-muted/30" />
            </div>
            <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
              <div className="h-3 w-28 rounded bg-muted/40" />
              <div className="h-14 w-2/3 rounded-xl bg-muted/40" />
              <div className="h-4 w-full rounded bg-muted/30" />
              <div className="grid sm:grid-cols-2 gap-4 mt-8">
                {Array.from({ length: 4 }).map((_, k) => (
                  <div key={k} className="h-28 rounded-2xl bg-muted/30" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (isError || !data) return null;

  return (
    <section className="bg-background py-32 md:py-48">
      <div className="container-x">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 1.02 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1 }}
            className="lg:col-span-6 order-2 lg:order-1"
          >
            <div className="relative overflow-hidden rounded-2xl aspect-[4/5] bg-fog">
              <img
                src={resolveUrl(data.imageUrl)}
                alt={data.imageAlt}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </motion.div>

          <div className="lg:col-span-6 order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
            >
              <p className="mb-6 text-[11px] uppercase tracking-[0.3em] text-chrome">Sustainability</p>
              <h2 className="font-display text-5xl md:text-7xl text-balance leading-[0.95]">
                {data.headline}
              </h2>
              <p className="mt-8 text-lg text-ink-soft leading-relaxed max-w-lg">
                {data.bodyText}
              </p>
            </motion.div>

            <div className="mt-12 grid sm:grid-cols-2 gap-px bg-border rounded-2xl overflow-hidden border border-border">
              {data.items.map((item, idx) => {
                const Icon = getIcon(item.iconName);
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.08 }}
                    className="bg-background p-6"
                  >
                    <Icon className="h-5 w-5 text-ink mb-4" />
                    <div className="font-display text-lg mb-1">{item.title}</div>
                    <div className="text-sm text-chrome leading-relaxed">{item.description}</div>
                  </motion.div>
                );
              })}
              {data.items.length % 2 !== 0 && (
                <div className="bg-background" aria-hidden="true" />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

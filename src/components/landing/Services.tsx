import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { apiFetch } from "@/lib/api/client";
import type { ApiService } from "@/lib/api/types";
import { getIcon } from "@/lib/api/icons";

export function Services() {
  const { data, isPending, isError } = useQuery({
    queryKey: ["services"],
    queryFn: () => apiFetch<ApiService[]>("/api/services"),
    staleTime: 5 * 60_000,
  });

  const services = data?.filter((s) => s.visible) ?? [];

  if (isPending) {
    return (
      <section id="services" className="relative bg-zinc-950 text-white py-32 md:py-48 overflow-hidden">
        <div className="container-x animate-pulse space-y-16">
          <div className="space-y-4 max-w-3xl">
            <div className="h-3 w-24 rounded bg-white/10" />
            <div className="h-14 w-2/3 rounded-xl bg-white/10" />
          </div>
          <div className="grid gap-px bg-white/10 md:grid-cols-2 lg:grid-cols-3 rounded-2xl overflow-hidden border border-white/10">
            {Array.from({ length: 6 }).map((_, k) => (
              <div key={k} className="bg-zinc-950 p-8 md:p-10 space-y-4">
                <div className="h-7 w-7 rounded bg-white/10" />
                <div className="h-6 w-40 rounded bg-white/10" />
                <div className="h-4 w-full rounded bg-white/10" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (isError || services.length === 0) return null;

  return (
    <section id="services" className="relative bg-zinc-950 text-white py-32 md:py-48 overflow-hidden">
      <div className="container-x">
        <div className="mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
          >
            <p className="mb-6 text-[11px] uppercase tracking-[0.3em] text-white/40">Capabilities</p>
            <h2 className="font-display text-5xl md:text-7xl text-balance leading-[0.95] max-w-3xl">
              {services.length} disciplines. One workshop.
            </h2>
          </motion.div>
          <p className="md:max-w-sm text-white/60 leading-relaxed">
            Every craft brought under one roof, so creative ambition never gets handed off.
          </p>
        </div>

        <div className="grid gap-px bg-white/10 md:grid-cols-2 lg:grid-cols-3 rounded-2xl overflow-hidden border border-white/10">
          {services.map((s, idx) => {
            const Icon = getIcon(s.iconName);
            return (
              <motion.a
                key={s.id}
                href="#contact"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: idx * 0.06 }}
                className="group relative bg-zinc-950 p-8 md:p-10 transition-all duration-500 hover:bg-white/[0.04]"
              >
                <div className="flex items-start justify-between mb-12">
                  <Icon className="h-7 w-7 text-white/70 transition-all duration-500 group-hover:text-white group-hover:scale-110" />
                  <ArrowUpRight className="h-5 w-5 text-white/30 transition-all duration-500 group-hover:text-white group-hover:-translate-y-1 group-hover:translate-x-1" />
                </div>
                <h3 className="font-display text-2xl md:text-3xl mb-3">{s.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed max-w-xs">{s.description}</p>
                <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

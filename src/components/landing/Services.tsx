import { motion } from "motion/react";
import { Clapperboard, Tv, Megaphone, Sparkles, Paintbrush2, Hammer, ArrowUpRight } from "lucide-react";

const services = [
  { icon: Clapperboard, t: "Film Set Construction", d: "Studio and location builds for feature productions, engineered to spec." },
  { icon: Tv, t: "TV Production Sets", d: "Long-running series, dramas and entertainment formats." },
  { icon: Megaphone, t: "Commercial Builds", d: "Hero sets and product environments for global campaigns." },
  { icon: Sparkles, t: "Experiential Events", d: "Brand activations and immersive installations." },
  { icon: Paintbrush2, t: "Scenic Painting", d: "Trompe-l’œil, ageing, period finishes and large-scale backings." },
  { icon: Hammer, t: "Bespoke Fabrication", d: "Sculptural builds, props, metalwork and prototyping." },
];

export function Services() {
  return (
    <section id="services" className="relative bg-ink text-background py-32 md:py-48 overflow-hidden">
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
              Six disciplines. One workshop.
            </h2>
          </motion.div>
          <p className="md:max-w-sm text-white/60 leading-relaxed">
            Every craft brought under one roof, so creative ambition never gets handed off.
          </p>
        </div>

        <div className="grid gap-px bg-white/10 md:grid-cols-2 lg:grid-cols-3 rounded-2xl overflow-hidden border border-white/10">
          {services.map((s, idx) => {
            const Icon = s.icon;
            return (
              <motion.a
                key={s.t}
                href="#contact"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: idx * 0.06 }}
                className="group relative bg-ink p-8 md:p-10 transition-all duration-500 hover:bg-white/[0.04]"
              >
                <div className="flex items-start justify-between mb-12">
                  <Icon className="h-7 w-7 text-white/70 transition-all duration-500 group-hover:text-white group-hover:scale-110" />
                  <ArrowUpRight className="h-5 w-5 text-white/30 transition-all duration-500 group-hover:text-white group-hover:-translate-y-1 group-hover:translate-x-1" />
                </div>
                <h3 className="font-display text-2xl md:text-3xl mb-3">{s.t}</h3>
                <p className="text-sm text-white/60 leading-relaxed max-w-xs">{s.d}</p>
                <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

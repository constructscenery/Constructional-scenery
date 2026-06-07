import { motion } from "motion/react";
import { Leaf, Recycle, TreePine, Wind } from "lucide-react";
import img from "@/assets/sustainability.jpg";

const items = [
  { icon: TreePine, t: "Sustainable sourcing", d: "FSC-certified timber and responsibly sourced materials as standard." },
  { icon: Recycle, t: "Material recycling", d: "A circular workshop. We strip, store and rebuild — not skip." },
  { icon: Wind, t: "Reduced waste", d: "Digital cutting, modular builds and shared component libraries." },
  { icon: Leaf, t: "Carbon commitment", d: "Measuring and reducing our build footprint, project by project." },
];

export function Sustainability() {
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
                src={img}
                alt="Reclaimed timber stacked in a sustainable scenic workshop"
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
                Building responsibly.
              </h2>
              <p className="mt-8 text-lg text-ink-soft leading-relaxed max-w-lg">
                Scenic construction has a footprint. We&apos;ve spent a decade reducing ours — through
                materials we choose, the way we build, and what happens after wrap.
              </p>
            </motion.div>

            <div className="mt-12 grid sm:grid-cols-2 gap-px bg-border rounded-2xl overflow-hidden border border-border">
              {items.map((it, idx) => {
                const Icon = it.icon;
                return (
                  <motion.div
                    key={it.t}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.08 }}
                    className="bg-background p-6"
                  >
                    <Icon className="h-5 w-5 text-ink mb-4" />
                    <div className="font-display text-lg mb-1">{it.t}</div>
                    <div className="text-sm text-chrome leading-relaxed">{it.d}</div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

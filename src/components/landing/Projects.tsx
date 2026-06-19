import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, Plus } from "lucide-react";
import p2 from "@/assets/project-2.jpg";
import p4 from "@/assets/project-4.jpg";
import p6 from "@/assets/project-6.jpg";
import p7 from "@/assets/project-7.jpg";
import p8 from "@/assets/project-8.jpg";
import { worlds } from "@/lib/worlds-data";

type Project = {
  slug?: string;
  img: string;
  name: string;
  type: string;
  services: string;
  year: string;
  span?: string;
};

const projects: Project[] = [
  { slug: "clayface", img: worlds[0].heroImage, name: "Clayface", type: "DC Feature Film", services: "Sculpting · Standby · Hero build", year: "2025", span: "row-span-2" },
  { img: p2, name: "Aurora Pavilion", type: "Brand Activation", services: "Fabrication · Installation", year: "2025" },
  { slug: "you", img: worlds[1].heroImage, name: "You", type: "Netflix Series", services: "Recurring interiors · Standby", year: "2024", span: "row-span-2" },
  { img: p4, name: "Bloom Couture", type: "Commercial", services: "Scenic · Sculptural backdrop", year: "2024" },
  { slug: "trespass-against-us", img: worlds[2].heroImage, name: "Trespass Against Us", type: "Feature Film", services: "Location build · Scenic finishing", year: "2024", span: "row-span-2" },
  { img: p6, name: "Vanguard Awards", type: "Live Event", services: "Stage architecture", year: "2024" },
  { img: p7, name: "The Late Edit", type: "Studio Format", services: "LED set · Furniture", year: "2025" },
  { img: p8, name: "Maison Pop-Up", type: "Experiential Retail", services: "Sculptural fabrication", year: "2024", span: "row-span-2" },
];

export function Projects() {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? projects : projects.slice(0, 6);

  return (
    <section id="work" className="bg-background py-32 md:py-48">
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
                  key={p.name}
                  layout
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, delay: (idx % 6) * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  className={`group relative overflow-hidden rounded-2xl bg-fog ${p.span ?? ""}`}
                >
                  <Cmp {...linkProps} className="absolute inset-0 block">
                    <img
                      src={p.img}
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
                          {p.slug ? "View case study" : "Enquire"} <ArrowUpRight className="h-3.5 w-3.5" />
                        </div>
                      </div>
                    </div>
                  </Cmp>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {!showAll && (
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

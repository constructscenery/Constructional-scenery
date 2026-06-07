import { motion } from "motion/react";
import aboutImg from "@/assets/about-craft.jpg";

const pillars = [
  ["Scenic Construction", "Structural builds engineered to camera tolerances."],
  ["Set Fabrication", "Bespoke joinery, sculpture, metal & resin work."],
  ["Scenic Finishing", "Painted finishes, ageing, gilding, plasterwork."],
  ["Installation", "On-site teams, rigging, transport, deinstall."],
  ["Production Support", "Standby crew, modifications, problem solving."],
];

const stats = [
  ["20+", "Years"],
  ["120", "Craftspeople"],
  ["500+", "Builds"],
  ["48hr", "Turnaround"],
];

export function About() {
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
            From concept
            <br />
            <span className="text-chrome">to camera ready.</span>
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
                src={aboutImg}
                alt="A scenic carpenter shaping a gilded panel in the workshop"
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
              We are a workshop of designers, fabricators, scenic artists and project leads. Every
              brief begins with a conversation and ends with something real on stage, on location,
              or in the lens. Craft is the point.
            </motion.p>

            <div className="mt-10 grid grid-cols-2 gap-6 border-t border-border pt-8">
              {stats.map(([n, l], idx) => (
                <motion.div
                  key={l}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 + idx * 0.08 }}
                >
                  <div className="font-display text-4xl md:text-5xl">{n}</div>
                  <div className="mt-1 text-xs uppercase tracking-[0.2em] text-chrome">{l}</div>
                </motion.div>
              ))}
            </div>

            <ul className="mt-12 space-y-4 border-t border-border pt-8">
              {pillars.map(([t, d], idx) => (
                <motion.li
                  key={t}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className="flex items-start gap-4 group"
                >
                  <span className="mt-2 h-1 w-1 rounded-full bg-ink shrink-0" />
                  <div>
                    <div className="font-display text-base text-ink">{t}</div>
                    <div className="text-sm text-chrome">{d}</div>
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

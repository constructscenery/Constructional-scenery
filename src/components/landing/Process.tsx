import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

const steps = [
  ["01", "Discovery", "We sit with directors, designers and producers to understand the vision, the schedule, and the budget."],
  ["02", "Design Collaboration", "Working drawings, materials, finishes and engineering — agreed before a single cut is made."],
  ["03", "Fabrication", "Carpentry, metal, sculpture, paint and finishing all happen under one roof in our UK workshop."],
  ["04", "Installation", "Our install crews deliver, rig and finish on stage or location to your call sheet."],
  ["05", "Production Ready", "Standby crew stay through shoot, ready for changes, repairs and last-minute creative pivots."],
];

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 20%"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="process" className="bg-fog py-32 md:py-48">
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="mb-20 max-w-3xl"
        >
          <p className="mb-6 text-[11px] uppercase tracking-[0.3em] text-chrome">Process</p>
          <h2 className="font-display text-5xl md:text-7xl text-balance leading-[0.95]">
            How we bring
            <br />
            <span className="text-chrome">worlds to life.</span>
          </h2>
        </motion.div>

        <div ref={ref} className="relative grid gap-12 md:gap-20">
          {/* timeline rail */}
          <div className="absolute left-[18px] md:left-1/2 top-2 bottom-2 w-px bg-border md:-translate-x-1/2">
            <motion.div
              style={{ height: lineHeight }}
              className="w-px bg-ink origin-top"
            />
          </div>

          {steps.map(([n, t, d], idx) => (
            <motion.div
              key={n}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className={`relative grid md:grid-cols-2 gap-6 md:gap-16 items-start ${
                idx % 2 === 0 ? "" : "md:[direction:rtl]"
              }`}
            >
              <div className="md:[direction:ltr] pl-12 md:pl-0 md:pr-12 md:text-right">
                <div className="font-display text-7xl md:text-9xl text-ink/10 leading-none">{n}</div>
              </div>
              <div className="md:[direction:ltr] pl-12 md:pl-12">
                <div className="absolute left-0 md:left-1/2 top-1 h-9 w-9 -translate-x-0 md:-translate-x-1/2 rounded-full bg-background border border-border flex items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-ink" />
                </div>
                <h3 className="font-display text-3xl md:text-4xl mb-3">{t}</h3>
                <p className="text-ink-soft leading-relaxed max-w-md">{d}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

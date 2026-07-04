import { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, useScroll, useTransform } from "motion/react";
import { apiFetch } from "@/lib/api/client";
import type { ApiProcessStep } from "@/lib/api/types";

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 20%"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const { data, isPending, isError } = useQuery({
    queryKey: ["process"],
    queryFn: () => apiFetch<ApiProcessStep[]>("/api/process"),
  });

  const steps = (!isPending && !isError && data?.length) ? data : null;

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

        {/* ref is always mounted so useScroll attaches correctly */}
        <div ref={ref} className="relative grid gap-12 md:gap-20">
          {isPending && (
            <div className="animate-pulse space-y-16">
              {Array.from({ length: 5 }).map((_, k) => (
                <div key={k} className="grid md:grid-cols-2 gap-16">
                  <div className="h-24 w-28 rounded-xl bg-muted/30" />
                  <div className="space-y-3">
                    <div className="h-8 w-48 rounded bg-muted/40" />
                    <div className="h-4 w-full rounded bg-muted/30" />
                    <div className="h-4 w-5/6 rounded bg-muted/30" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {steps && (
            <>
              {/* timeline rail */}
              <div className="absolute left-[18px] md:left-1/2 top-2 bottom-2 w-px bg-border md:-translate-x-1/2">
                <motion.div style={{ height: lineHeight }} className="w-px bg-ink origin-top" />
              </div>

              {steps.map((step, idx) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className={`relative grid md:grid-cols-2 gap-6 md:gap-16 items-start ${
                    idx % 2 === 0 ? "" : "md:[direction:rtl]"
                  }`}
                >
                  <div className="md:[direction:ltr] pl-12 md:pl-0 md:pr-12 md:text-right">
                    <div className="font-display text-7xl md:text-9xl text-ink/10 leading-none">{step.number}</div>
                  </div>
                  <div className="md:[direction:ltr] pl-12 md:pl-12">
                    <div className="absolute left-0 md:left-1/2 top-1 h-9 w-9 -translate-x-0 md:-translate-x-1/2 rounded-full bg-background border border-border flex items-center justify-center">
                      <div className="h-2 w-2 rounded-full bg-ink" />
                    </div>
                    <h3 className="font-display text-3xl md:text-4xl mb-3">{step.title}</h3>
                    <p className="text-ink-soft leading-relaxed max-w-md">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </>
          )}
        </div>
      </div>
    </section>
  );
}

import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { apiFetch } from "@/lib/api/client";
import type { ApiContact } from "@/lib/api/types";

export function FinalCTA() {
  const { data, isPending, isError } = useQuery({
    queryKey: ["contact"],
    queryFn: () => apiFetch<ApiContact>("/api/contact"),
  });

  return (
    <section id="contact" className="relative overflow-hidden bg-zinc-950 text-white py-40 md:py-56">
      {/* animated gradient — always visible */}
      <div className="absolute inset-0 opacity-60">
        <motion.div
          animate={{ x: [0, 100, 0], y: [0, -50, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-1/3 -left-1/4 h-[700px] w-[700px] rounded-full"
          style={{ background: "radial-gradient(circle, oklch(0.4 0.05 270) 0%, transparent 60%)" }}
        />
        <motion.div
          animate={{ x: [0, -120, 0], y: [0, 80, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-1/3 -right-1/4 h-[700px] w-[700px] rounded-full"
          style={{ background: "radial-gradient(circle, oklch(0.35 0.04 30) 0%, transparent 60%)" }}
        />
      </div>

      <div className="relative container-x text-center">
        {isPending ? (
          <div className="animate-pulse mx-auto max-w-5xl space-y-8">
            <div className="h-20 md:h-32 w-3/4 rounded-2xl bg-white/10 mx-auto" />
            <div className="h-20 md:h-32 w-1/2 rounded-2xl bg-white/10 mx-auto" />
            <div className="h-5 w-96 max-w-full rounded bg-white/10 mx-auto" />
            <div className="flex justify-center gap-3 pt-4">
              <div className="h-14 w-44 rounded-full bg-white/10" />
              <div className="h-14 w-44 rounded-full bg-white/10" />
            </div>
          </div>
        ) : isError || !data ? null : (
          <>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-5xl md:text-8xl lg:text-9xl text-balance leading-[0.95] mx-auto max-w-5xl"
            >
              {data.headline}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="mx-auto mt-8 max-w-2xl text-white/60 leading-relaxed"
            >
              {data.bodyText}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.35 }}
              className="mt-12 flex flex-wrap justify-center gap-3"
            >
              <a
                href={`mailto:${data.cta1Email}`}
                className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-medium text-black transition hover:bg-white/90"
              >
                {data.cta1Label}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href={`mailto:${data.cta2Email}`}
                className="inline-flex items-center gap-2 rounded-full glass-dark px-7 py-4 text-sm font-medium text-white transition hover:bg-white/10"
              >
                {data.cta2Label}
              </a>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
}

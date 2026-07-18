import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import type { World } from "@/lib/worlds-data";

export function HeroSection({ world }: { world: World }) {
  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden bg-black text-white">
      <motion.div
        initial={{ scale: 1.12 }}
        animate={{ scale: 1.02 }}
        transition={{ duration: 14, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <img
          src={world.heroImage}
          alt={`${world.title} — hero still`}
          className="h-full w-full object-cover opacity-75"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/30" />

      <div className="relative z-10 container-x flex min-h-[100svh] flex-col justify-end pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.8 }}
          className="flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-white/55"
        >
          <span className="h-px w-10 bg-white/40" />
          {world.category} · {world.year}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 font-display text-[14vw] leading-[0.9] tracking-tight md:text-[clamp(72px,9vw,168px)] text-balance"
        >
          {world.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.9 }}
          className="mt-6 max-w-2xl text-lg md:text-2xl text-white/80 leading-snug text-balance"
        >
          {world.summary}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.85, duration: 1 }}
          className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-white/10 pt-6 text-[11px] uppercase tracking-[0.25em] text-white/55"
        >
          <div>
            <div className="text-white/40">Year</div>
            <div className="mt-1 text-white/85 normal-case tracking-normal text-sm">{world.year}</div>
          </div>
          <div className="flex flex-wrap gap-2">
            {world.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/20 px-3 py-1 text-[10px] tracking-[0.2em] text-white/70"
              >
                {t}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="pointer-events-none absolute bottom-6 left-1/2 z-20 -translate-x-1/2">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-white/50"
        >
          <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </div>
    </section>
  );
}

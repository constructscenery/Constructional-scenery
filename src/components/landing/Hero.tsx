import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Play } from "lucide-react";
import heroImg from "@/assets/hero-set.jpg";

const rotating = ["For Film.", "For Television.", "For Brands.", "For Events."];

export function Hero() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % rotating.length), 2400);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden bg-black text-white">
      {/* Cinematic background */}
      <motion.div
        initial={{ scale: 1.15 }}
        animate={{ scale: 1.02 }}
        transition={{ duration: 14, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <img
          src={heroImg}
          alt="A film set under construction inside a sound stage"
          className="h-full w-full object-cover opacity-70"
        />
      </motion.div>

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/40" />

      {/* Grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-overlay"
        style={{
          backgroundImage:
            'url("data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22160%22 height=%22160%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%222%22/></filter><rect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22 opacity=%220.6%22/></svg>")',
        }}
      />

      <div className="relative z-10 container-x flex min-h-[100svh] flex-col justify-between pt-32 pb-12">
        {/* eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-white/60"
        >
          <span className="h-px w-10 bg-white/40" />
          UK Scenic Construction · Est. 2003
        </motion.div>

        {/* headline block */}
        <div className="max-w-5xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[14vw] leading-[0.9] tracking-tight md:text-[clamp(72px,9vw,168px)] text-balance"
          >
            We Build
            <br />
            <span className="inline-flex items-baseline gap-4">
              <span>Worlds</span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -24, filter: "blur(8px)" }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-block text-white/60 italic font-normal text-[clamp(28px,4vw,72px)]"
                >
                  {rotating[i]}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.9 }}
            className="mt-8 max-w-xl text-base md:text-lg text-white/70 leading-relaxed"
          >
            For over 20 years we&apos;ve partnered with production companies, studios, agencies and
            creatives to bring ambitious ideas to life through world-class scenic construction.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.9 }}
            className="mt-10 flex flex-wrap gap-3"
          >
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-medium text-black transition hover:bg-white/90"
            >
              Discuss your project
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#work"
              className="group inline-flex items-center gap-2 rounded-full glass-dark px-6 py-3.5 text-sm font-medium text-white transition hover:bg-white/10"
            >
              <Play className="h-3.5 w-3.5 fill-white" />
              Explore portfolio
            </a>
          </motion.div>
        </div>

        {/* trust + scroll */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-12 border-t border-white/10 pt-8"
        >
          {[
            ["20+", "Years experience"],
            ["500+", "Projects delivered"],
            ["UK", "Wide coverage"],
            ["BAFTA", "Award winning"],
          ].map(([n, l]) => (
            <div key={l}>
              <div className="font-display text-3xl md:text-4xl">{n}</div>
              <div className="mt-1 text-[11px] uppercase tracking-[0.2em] text-white/50">{l}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* scroll indicator */}
      <div className="pointer-events-none absolute bottom-6 left-1/2 z-20 -translate-x-1/2">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="h-10 w-6 rounded-full border border-white/30 flex items-start justify-center pt-1.5"
        >
          <div className="h-1.5 w-1 rounded-full bg-white/60" />
        </motion.div>
      </div>
    </section>
  );
}

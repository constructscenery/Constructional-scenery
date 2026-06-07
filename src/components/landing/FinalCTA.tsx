import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

export function FinalCTA() {
  return (
    <section id="contact" className="relative overflow-hidden bg-ink text-background py-40 md:py-56">
      {/* animated gradient */}
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
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-5xl md:text-8xl lg:text-9xl text-balance leading-[0.95] mx-auto max-w-5xl"
        >
          Let&apos;s build something
          <br />
          <span className="italic font-normal text-white/60">extraordinary.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="mx-auto mt-8 max-w-2xl text-white/60 leading-relaxed"
        >
          Whether you&apos;re producing a television series, building a commercial campaign, or
          creating an immersive experience, we&apos;re ready to bring your vision to life.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.35 }}
          className="mt-12 flex flex-wrap justify-center gap-3"
        >
          <a
            href="mailto:hello@constructscenery.co.uk"
            className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-medium text-black transition hover:bg-white/90"
          >
            Start your project
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href="mailto:hello@constructscenery.co.uk"
            className="inline-flex items-center gap-2 rounded-full glass-dark px-7 py-4 text-sm font-medium text-white transition hover:bg-white/10"
          >
            Book a consultation
          </a>
        </motion.div>
      </div>
    </section>
  );
}

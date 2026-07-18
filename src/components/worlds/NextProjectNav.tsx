import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import type { World } from "@/lib/worlds-data";

export function NextProjectNav({ next }: { next: World }) {
  return (
    <section id="suggestions" className="bg-background py-24 md:py-32">
      <div className="container-x">
        <Link
          to="/worlds/$slug"
          params={{ slug: next.slug }}
          className="group block"
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden rounded-3xl bg-fog aspect-[16/9] md:aspect-[21/9]"
          >
            <img
              src={next.heroImage}
              alt={`${next.title} — next project`}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />
            <div className="absolute inset-0 flex flex-col justify-between p-8 md:p-14 text-white">
              <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-white/70">
                <span>Next world</span>
                <span>{next.year}</span>
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-[0.3em] text-white/60 mb-3">
                  {next.category}
                </div>
                <div className="flex items-end justify-between gap-6 flex-wrap">
                  <h3 className="font-display text-5xl md:text-7xl leading-[0.95] tracking-tight">
                    {next.title}
                  </h3>
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-2.5 text-sm font-medium transition group-hover:bg-white group-hover:text-black">
                    Continue
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </Link>
      </div>
    </section>
  );
}

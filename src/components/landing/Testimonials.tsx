import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";
import { apiFetch } from "@/lib/api/client";
import type { ApiTestimonial } from "@/lib/api/types";

export function Testimonials() {
  const { data, isPending, isError } = useQuery({
    queryKey: ["testimonials"],
    queryFn: () => apiFetch<ApiTestimonial[]>("/api/testimonials"),
  });

  const all = (data?.filter((t) => t.visible) ?? []).map((t) => ({
    text: t.text,
    image: t.imageUrl,
    name: t.name,
    role: t.role,
  }));

  const col1 = all.filter((_, i) => i % 3 === 0);
  const col2 = all.filter((_, i) => i % 3 === 1);
  const col3 = all.filter((_, i) => i % 3 === 2);

  if (isPending) {
    return (
      <section className="bg-background py-32 md:py-40 relative overflow-hidden">
        <div className="container-x animate-pulse space-y-12">
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <div className="h-3 w-24 rounded bg-muted/40 mx-auto" />
            <div className="h-12 w-3/4 rounded-xl bg-muted/40 mx-auto" />
            <div className="h-4 w-full rounded bg-muted/30" />
          </div>
          <div className="flex justify-center gap-6 max-h-[740px] overflow-hidden">
            {Array.from({ length: 3 }).map((_, k) => (
              <div key={k} className="w-72 space-y-4">
                {Array.from({ length: 3 }).map((__, j) => (
                  <div key={j} className="h-48 rounded-2xl bg-muted/30" />
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (isError || all.length === 0) return null;

  return (
    <section className="bg-background py-32 md:py-40 relative overflow-hidden">
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="max-w-2xl mx-auto text-center mb-16"
        >
          <p className="mb-6 text-[11px] uppercase tracking-[0.3em] text-chrome">Testimonials</p>
          <h2 className="font-display text-5xl md:text-6xl text-balance leading-[1.0]">
            What industry leaders say.
          </h2>
          <p className="mt-6 text-ink-soft leading-relaxed">
            The people behind award-winning productions trust Construct Scenery to deliver
            exceptional results under demanding timelines.
          </p>
        </motion.div>

        <div className="flex justify-center gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={col1} duration={18} />
          {col2.length > 0 && (
            <TestimonialsColumn testimonials={col2} className="hidden md:block" duration={22} />
          )}
          {col3.length > 0 && (
            <TestimonialsColumn testimonials={col3} className="hidden lg:block" duration={20} />
          )}
        </div>
      </div>
    </section>
  );
}

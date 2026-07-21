"use client";
import { motion } from "motion/react";

type Testimonial = {
  text: string;
  image?: string | null;
  name: string;
  role: string;
};

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{ translateY: "-50%" }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[...new Array(2)].fill(0).map((_, idx) => (
          <div key={idx} className="flex flex-col gap-6">
            {props.testimonials.map(({ text, image, name, role }, i) => (
              <div
                className="p-8 rounded-2xl border border-border shadow-elevated bg-background max-w-sm w-full"
                key={i}
              >
                <div className="text-ink-soft leading-relaxed">{text}</div>
                <div className="flex items-center gap-3 mt-6">
                  {image ? (
                    <img
                      width={44}
                      height={44}
                      src={image}
                      alt={name}
                      loading="lazy"
                      className="h-11 w-11 rounded-full object-cover"
                    />
                  ) : null}
                  <div className="flex flex-col">
                    <div className="font-medium tracking-tight leading-5 text-ink">{name}</div>
                    <div className="leading-5 text-chrome text-sm tracking-tight">{role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from "motion/react";

export type ZoomParallaxImage = {
  src: string;
  alt?: string;
};

const positions = [
  "inset-0",
  "top-[-30vh] left-[5vw] w-[35vw] h-[30vh]",
  "top-[-10vh] left-[-25vw] w-[20vw] h-[45vh]",
  "left-[27.5vw] top-[-25vh] w-[25vw] h-[25vh]",
  "left-[5vw] top-[27.5vh] w-[20vw] h-[25vh]",
  "left-[-22.5vw] top-[27.5vh] w-[30vw] h-[25vh]",
  "left-[25vw] top-[27.5vh] w-[25vw] h-[27vh]",
];

const scales = [4, 5, 6, 5, 6, 8, 9];

function Picture({
  src,
  alt,
  className,
  scale,
}: {
  src: string;
  alt: string;
  className: string;
  scale: MotionValue<number>;
}) {
  return (
    <motion.div
      style={{ scale }}
      className={`absolute flex items-center justify-center ${className}`}
    >
      <div className="relative h-full w-full overflow-hidden rounded-lg">
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>
    </motion.div>
  );
}

export function ZoomParallax({ images }: { images: ZoomParallaxImage[] }) {
  const container = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const s1 = useTransform(scrollYProgress, [0, 1], [1, reduced ? 1 : scales[0]]);
  const s2 = useTransform(scrollYProgress, [0, 1], [1, reduced ? 1 : scales[1]]);
  const s3 = useTransform(scrollYProgress, [0, 1], [1, reduced ? 1 : scales[2]]);
  const s4 = useTransform(scrollYProgress, [0, 1], [1, reduced ? 1 : scales[3]]);
  const s5 = useTransform(scrollYProgress, [0, 1], [1, reduced ? 1 : scales[4]]);
  const s6 = useTransform(scrollYProgress, [0, 1], [1, reduced ? 1 : scales[5]]);
  const s7 = useTransform(scrollYProgress, [0, 1], [1, reduced ? 1 : scales[6]]);

  const scaleMVs = [s1, s2, s3, s4, s5, s6, s7];
  const picks = images.slice(0, 7);

  return (
    <div ref={container} className="relative h-[300vh] bg-background">
      <div className="sticky top-0 h-screen overflow-hidden">
        {picks.map((img, i) => (
          <Picture
            key={i}
            src={img.src}
            alt={img.alt ?? ""}
            className={positions[i]}
            scale={scaleMVs[i]}
          />
        ))}
      </div>
    </div>
  );
}

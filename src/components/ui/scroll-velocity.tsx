"use client";

import * as React from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
  wrap,
} from "motion/react";
import { cn } from "@/lib/utils";

interface ScrollVelocityProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode[] | string;
  velocity?: number;
  movable?: boolean;
  clamp?: boolean;
}

export interface ScrollVelocityHandle {
  nudge: (delta: number) => void;
}

const ScrollVelocity = React.forwardRef<HTMLDivElement, ScrollVelocityProps & { apiRef?: React.Ref<ScrollVelocityHandle> }>(
  (
    { children, velocity = 5, movable = true, clamp = false, className, apiRef, ...props },
    ref,
  ) => {
    const baseX = useMotionValue(0);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
      damping: 50,
      stiffness: 100,
    });
    const velocityFactor = useTransform(smoothVelocity, [0, 10000], [0, 5], {
      clamp,
    });

    const x = useTransform(baseX, (v) => `${wrap(0, -50, v)}%`);

    const directionFactor = React.useRef(1);
    const scrollThreshold = React.useRef(5);
    const nudgeOffset = React.useRef(0);

    React.useImperativeHandle(
      apiRef,
      () => ({
        nudge: (delta: number) => {
          nudgeOffset.current += delta;
        },
      }),
      [],
    );

    useAnimationFrame((_t, delta) => {
      if (movable) {
        move(delta);
      } else if (Math.abs(scrollVelocity.get()) >= scrollThreshold.current) {
        move(delta);
      }
      if (nudgeOffset.current !== 0) {
        const step = nudgeOffset.current * Math.min(1, delta / 200);
        nudgeOffset.current -= step;
        baseX.set(baseX.get() + step);
      }
    });

    function move(delta: number) {
      let moveBy = directionFactor.current * velocity * (delta / 1000);
      if (velocityFactor.get() < 0) {
        directionFactor.current = -1;
      } else if (velocityFactor.get() > 0) {
        directionFactor.current = 1;
      }
      moveBy += directionFactor.current * moveBy * velocityFactor.get();
      baseX.set(baseX.get() + moveBy);
    }

    return (
      <div
        ref={ref}
        className={cn("relative w-full overflow-hidden", className)}
        {...props}
      >
        <motion.div className="flex w-max flex-nowrap gap-6" style={{ x }}>
          {typeof children === "string" ? (
            <>
              {Array.from({ length: 5 }).map((_, idx) => (
                <span
                  key={idx}
                  className="whitespace-nowrap font-display text-7xl md:text-9xl tracking-tight text-ink"
                >
                  {children}
                </span>
              ))}
            </>
          ) : (
            children
          )}
        </motion.div>
      </div>
    );
  },
);

ScrollVelocity.displayName = "ScrollVelocity";

export { ScrollVelocity, type ScrollVelocityProps };

"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/cn";

export type HeroSlide = {
  src: string;
  alt: string;
};

/**
 * A slow, cinematic cross-fading background carousel used behind the
 * homepage hero. Each slide fades in over ~1.5s and holds for `interval`,
 * with a subtle Ken-Burns zoom to keep the frame feeling alive.
 *
 * Respects `prefers-reduced-motion` (no zoom, no auto-advance).
 */
export function HeroBackgroundCycle({
  slides,
  interval = 6500,
  className,
}: {
  slides: HeroSlide[];
  interval?: number;
  className?: string;
}) {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || slides.length <= 1) return;
    const t = setInterval(
      () => setI((x) => (x + 1) % slides.length),
      interval,
    );
    return () => clearInterval(t);
  }, [interval, reduce, slides.length]);

  if (slides.length === 0) return null;

  return (
    <div
      aria-hidden
      className={cn("absolute inset-0 -z-10 overflow-hidden bg-charcoal-950", className)}
    >
      <AnimatePresence mode="sync">
        <motion.div
          key={i}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className="absolute inset-0"
            initial={{ scale: reduce ? 1 : 1.08 }}
            animate={{ scale: reduce ? 1 : 1 }}
            transition={{
              duration: reduce ? 0 : (interval + 2000) / 1000,
              ease: "linear",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={asset(slides[i].src)}
              alt={slides[i].alt}
              className="absolute inset-0 h-full w-full object-cover"
              loading={i === 0 ? "eager" : "lazy"}
              draggable={false}
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Readability overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-charcoal-950/85 via-charcoal-950/70 to-charcoal-950/55" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-charcoal-950/85 to-transparent" />

      {/* Ambient progress ticks (bottom-right) */}
      {slides.length > 1 && (
        <div className="absolute bottom-5 right-5 md:bottom-7 md:right-7 flex items-center gap-1.5">
          {slides.map((_, idx) => {
            const active = idx === i;
            return (
              <span
                key={idx}
                className={cn(
                  "block h-1 rounded-full transition-all duration-500",
                  active ? "w-8 bg-white/90" : "w-1.5 bg-white/40",
                )}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

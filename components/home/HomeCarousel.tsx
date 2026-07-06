"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Camera } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Section } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { FadeUp } from "@/components/motion/Motion";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/cn";

export type CarouselSlide = {
  src: string;
  alt: string;
  caption?: string;
  eyebrow?: string;
};

const easeOut = [0.16, 1, 0.3, 1] as const;

export function HomeCarousel({
  slides,
  interval = 5500,
  eyebrow = "Life in AIS",
  title = "Moments from the community.",
  description = "Pitch nights, hackathons, fireside chats, community dinners — a snapshot of what a semester in the Africa Innovators Society looks like.",
}: {
  slides: CarouselSlide[];
  interval?: number;
  eyebrow?: string;
  title?: string;
  description?: string;
}) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reduce = useReducedMotion();
  const count = slides.length;

  const go = useCallback(
    (next: number) => {
      setDirection(next > index ? 1 : -1);
      setIndex(((next % count) + count) % count);
    },
    [index, count],
  );

  const next = useCallback(() => go(index + 1), [go, index]);
  const prev = useCallback(() => go(index - 1), [go, index]);

  useEffect(() => {
    if (paused || reduce || count <= 1) return;
    timerRef.current = setTimeout(next, interval);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [index, paused, reduce, interval, next, count]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  if (count === 0) return null;
  const slide = slides[index];

  return (
    <Section id="community-moments" className="!py-16 md:!py-20">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8 md:mb-10">
        <FadeUp>
          <Badge tone="crimson" className="mb-3">
            <Camera className="h-3 w-3" /> {eyebrow}
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-balance leading-tight">
            {title}
          </h2>
          <p className="mt-3 text-charcoal-600 max-w-2xl">{description}</p>
        </FadeUp>
      </div>

      <div
        className="relative rounded-3xl overflow-hidden bg-charcoal-950 shadow-[var(--shadow-strong)] group"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        aria-roledescription="carousel"
        aria-label="AIS community moments"
      >
        {/* Frame */}
        <div className="relative aspect-[16/10] sm:aspect-[16/9] md:aspect-[21/9] w-full">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={index}
              custom={direction}
              variants={{
                enter: (dir: number) => ({
                  opacity: 0,
                  x: reduce ? 0 : dir > 0 ? 40 : -40,
                  scale: reduce ? 1 : 1.03,
                }),
                center: { opacity: 1, x: 0, scale: 1 },
                exit: (dir: number) => ({
                  opacity: 0,
                  x: reduce ? 0 : dir > 0 ? -40 : 40,
                  scale: reduce ? 1 : 1.01,
                }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.7, ease: easeOut }}
              className="absolute inset-0"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={asset(slide.src)}
                alt={slide.alt}
                className="absolute inset-0 h-full w-full object-cover"
                loading={index === 0 ? "eager" : "lazy"}
                draggable={false}
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-charcoal-950/85 via-charcoal-950/30 to-transparent"
              />
              {(slide.eyebrow || slide.caption) && (
                <div className="absolute left-0 right-0 bottom-0 p-6 md:p-8 lg:p-10 text-white">
                  {slide.eyebrow && (
                    <motion.p
                      className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-soft mb-1.5"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2, ease: easeOut }}
                    >
                      {slide.eyebrow}
                    </motion.p>
                  )}
                  {slide.caption && (
                    <motion.p
                      className="text-lg md:text-2xl font-semibold text-white text-balance max-w-3xl leading-snug"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.28, ease: easeOut }}
                    >
                      {slide.caption}
                    </motion.p>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Arrows */}
          {count > 1 && (
            <>
              <button
                type="button"
                onClick={prev}
                aria-label="Previous slide"
                className="absolute top-1/2 -translate-y-1/2 left-3 sm:left-4 h-11 w-11 rounded-full inline-flex items-center justify-center bg-white/85 hover:bg-white text-charcoal-900 shadow-[var(--shadow-soft)] backdrop-blur opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next slide"
                className="absolute top-1/2 -translate-y-1/2 right-3 sm:right-4 h-11 w-11 rounded-full inline-flex items-center justify-center bg-white/85 hover:bg-white text-charcoal-900 shadow-[var(--shadow-soft)] backdrop-blur opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}
        </div>

        {/* Dots + progress */}
        {count > 1 && (
          <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 sm:gap-2 z-10">
            {slides.map((_, i) => {
              const active = i === index;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  aria-current={active}
                  className={cn(
                    "relative overflow-hidden rounded-full transition-all",
                    active ? "w-7 sm:w-9 h-1.5 bg-white/40" : "w-1.5 h-1.5 bg-white/40 hover:bg-white/70",
                  )}
                >
                  {active && !reduce && !paused && (
                    <motion.span
                      key={`progress-${index}`}
                      aria-hidden
                      className="absolute inset-y-0 left-0 bg-white rounded-full"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: interval / 1000, ease: "linear" }}
                    />
                  )}
                  {active && (reduce || paused) && (
                    <span aria-hidden className="absolute inset-0 bg-white rounded-full" />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </Section>
  );
}

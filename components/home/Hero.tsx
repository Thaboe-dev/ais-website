"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/content/site.config";
import { HeroBackgroundCycle, type HeroSlide } from "@/components/home/HeroBackgroundCycle";

const easeOut = [0.16, 1, 0.3, 1] as const;

const heroSlides: HeroSlide[] = [
  {
    src: "/images/home/home-page-1.png",
    alt: "AIS members and Prof. João Barros with the CMU-Africa community",
  },
  {
    src: "/images/home/home-page-2.png",
    alt: "AIS executive team photographed together at CMU-Africa",
  },
  {
    src: "/images/home/home-page-3.png",
    alt: "Fireside chat with Matteo Rizzi and Stephen David",
  },
  {
    src: "/images/home/home-page-4.png",
    alt: "High-school students at the Future Founders Pitch Competition",
  },
  {
    src: "/images/home/home-page-5.png",
    alt: "Panelists at the AIS Leadership Summit 2026",
  },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-24 pb-24 md:pt-32 md:pb-32 lg:pt-40 lg:pb-40 min-h-[640px] md:min-h-[720px] flex items-center">
      <HeroBackgroundCycle slides={heroSlides} />

      <div className="container-page w-full">
        <motion.div
          className="max-w-4xl text-white"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
          }}
        >
          {/* Eyebrow pill */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 12 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
            }}
            className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-3.5 py-1.5 text-xs font-semibold text-white backdrop-blur-md shadow-[var(--shadow-soft)] mb-6"
          >
            <motion.span
              animate={{ rotate: [0, 14, -10, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              className="inline-flex"
            >
              <Sparkles className="h-3.5 w-3.5 text-amber-soft" />
            </motion.span>
            <span>A student-led innovation society at {siteConfig.affiliation}</span>
          </motion.div>

          {/* H1 */}
          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeOut } },
            }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance leading-[1.05] text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.35)]"
          >
            Where Africa&apos;s next{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-amber-soft">innovators</span>
              <motion.span
                aria-hidden
                className="absolute inset-x-0 bottom-1 md:bottom-2 h-3 md:h-4 bg-crimson-700/60 -z-0 rounded-sm origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.9, ease: easeOut, delay: 1 }}
              />
            </span>{" "}
            are made.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } },
            }}
            className="mt-6 text-lg md:text-xl text-white/90 max-w-2xl leading-relaxed text-pretty drop-shadow-[0_1px_10px_rgba(0,0,0,0.35)]"
          >
            {siteConfig.description}
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
            }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
              <Button href={siteConfig.forms.membership} size="lg" withArrow>
                Join AIS
              </Button>
            </motion.div>
            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
              <Button
                href="/programs"
                variant="outline"
                size="lg"
                className="!bg-white/10 !text-white !border-white/30 hover:!bg-white hover:!text-charcoal-900 hover:!border-white backdrop-blur-md"
              >
                Explore programs
              </Button>
            </motion.div>
          </motion.div>

          {/* Avatar stack + count */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
            }}
            className="mt-12 flex items-center gap-4 text-sm text-white/80"
          >
            <div className="flex -space-x-2">
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="h-9 w-9 rounded-full ring-2 ring-charcoal-950 gradient-brand"
                  style={{ filter: `hue-rotate(${i * 18}deg)` }}
                  initial={{ opacity: 0, scale: 0.5, x: -8 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  transition={{ duration: 0.5, ease: easeOut, delay: 1.1 + i * 0.08 }}
                />
              ))}
            </div>
            <span>
              Join <span className="font-semibold text-white">100+ CMU-Africa students</span>{" "}
              building what&apos;s next.
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        aria-hidden
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-white/60 text-xs font-medium"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.6 }}
      >
        <span className="uppercase tracking-[0.2em]">Scroll</span>
        <motion.div
          className="h-9 w-[2px] rounded-full bg-gradient-to-b from-amber-soft to-transparent"
          animate={{ scaleY: [0.4, 1, 0.4], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "top" }}
        />
      </motion.div>
    </section>
  );
}

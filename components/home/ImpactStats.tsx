"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Container";
import { siteConfig } from "@/content/site.config";
import { CountUp, FadeUp, Stagger, StaggerItem } from "@/components/motion/Motion";

export function ImpactStats() {
  return (
    <Section className="!py-12 md:!py-16">
      <div className="rounded-3xl bg-charcoal-950 text-white px-6 py-10 md:px-12 md:py-14 shadow-[var(--shadow-strong)] relative overflow-hidden">
        {/* Animated gradient orbs */}
        <motion.div
          aria-hidden
          className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-crimson-700/30 blur-3xl"
          animate={{ x: [0, 18, -8, 0], y: [0, -12, 8, 0], scale: [1, 1.05, 0.97, 1] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden
          className="absolute -left-24 -bottom-16 h-64 w-64 rounded-full bg-amber-soft/15 blur-3xl"
          animate={{ x: [0, -12, 14, 0], y: [0, 14, -10, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative">
          <FadeUp>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-soft mb-3">
              The numbers behind AIS
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-white max-w-2xl">
              A society built by students.
            </h2>
          </FadeUp>
          <Stagger className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-8" amount={0.3}>
            {siteConfig.stats.map((s) => (
              <StaggerItem key={s.label}>
                <div>
                  <div className="text-4xl md:text-5xl font-bold font-[var(--font-display)] text-white leading-none">
                    <CountUp value={s.value} />
                  </div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="mt-2 text-xs font-medium uppercase tracking-wider text-charcoal-300"
                  >
                    {s.label}
                  </motion.div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </Section>
  );
}

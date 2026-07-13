"use client";

import { motion } from "framer-motion";
import { Target, Eye } from "lucide-react";
import { siteConfig } from "@/content/site.config";
import { ValuesOrbit } from "@/components/about/ValuesOrbit";

const easeOut = [0.16, 1, 0.3, 1] as const;

export function OriginStory() {
  return (
    <motion.div
      className="mt-6 space-y-5 text-lg text-charcoal-700 leading-relaxed text-pretty"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.12 } },
      }}
    >
      {siteConfig.originStory.map((p, i) => (
        <motion.p
          key={i}
          variants={{
            hidden: { opacity: 0, y: 16 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } },
          }}
        >
          {p}
        </motion.p>
      ))}
    </motion.div>
  );
}

export function MissionVisionValues() {
  return (
    <div className="grid md:grid-cols-2 gap-10 lg:gap-14 items-center">
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: easeOut }}
        >
          <div className="inline-flex items-center gap-2 text-crimson-700 mb-3">
            <motion.span
              animate={{ rotate: [0, 8, 0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="inline-flex"
            >
              <Target className="h-5 w-5" />
            </motion.span>
            <span className="text-xs font-semibold uppercase tracking-[0.18em]">Mission</span>
          </div>
          <p className="text-2xl md:text-3xl font-semibold text-charcoal-900 leading-snug text-balance">
            {siteConfig.mission}
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: easeOut, delay: 0.1 }}
        >
          <div className="inline-flex items-center gap-2 text-crimson-700 mb-3">
            <Eye className="h-5 w-5" />
            <span className="text-xs font-semibold uppercase tracking-[0.18em]">Vision</span>
          </div>
          <p className="text-xl md:text-2xl text-charcoal-700 leading-snug text-balance">
            {siteConfig.vision}
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: easeOut, delay: 0.15 }}
        className="flex justify-center lg:justify-end"
      >
        <ValuesOrbit />
      </motion.div>
    </div>
  );
}

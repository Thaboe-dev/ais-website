"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Heart, Shield, Sparkles, Sprout } from "lucide-react";
import { siteConfig } from "@/content/site.config";
import { cn } from "@/lib/cn";

const easeOut = [0.16, 1, 0.3, 1] as const;

const valueIcons = [Shield, Sparkles, Sprout] as const;

/** Evenly space 3 nodes around a circle, starting from the top (-90°). */
function orbitPosition(index: number, total: number, radiusPercent: number) {
  const angleDeg = (360 / total) * index - 90;
  const rad = (angleDeg * Math.PI) / 180;
  return {
    x: 50 + radiusPercent * Math.cos(rad),
    y: 50 + radiusPercent * Math.sin(rad),
    angleDeg,
  };
}

function OrbitConnector({
  x,
  y,
  delay,
  reduce,
}: {
  x: number;
  y: number;
  delay: number;
  reduce: boolean;
}) {
  return (
    <motion.line
      x1={50}
      y1={50}
      x2={x}
      y2={y}
      stroke="url(#orbit-line-gradient)"
      strokeWidth="0.4"
      strokeLinecap="round"
      initial={reduce ? { opacity: 0.35 } : { opacity: 0, pathLength: 0 }}
      whileInView={{ opacity: 0.5, pathLength: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.9, ease: easeOut, delay }}
    />
  );
}

function ValueNode({
  title,
  description,
  index,
  x,
  y,
  reduce,
}: {
  title: string;
  description: string;
  index: number;
  x: number;
  y: number;
  reduce: boolean;
}) {
  const Icon = valueIcons[index] ?? Sparkles;

  return (
    <motion.div
      className="absolute z-20 w-[min(100%,11.5rem)] sm:w-44 md:w-48 -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${x}%`, top: `${y}%` }}
      initial={reduce ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.88, y: 12 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.65, ease: easeOut, delay: 0.25 + index * 0.14 }}
      whileHover={{ y: -4, scale: 1.02 }}
    >
      <div className="group relative rounded-2xl bg-white/90 backdrop-blur-md border border-charcoal-100/80 shadow-[var(--shadow-soft)] hover:border-crimson-200 hover:shadow-[var(--shadow-strong)] transition-shadow p-4 md:p-5">
        <div
          aria-hidden
          className="absolute -inset-px rounded-2xl bg-gradient-to-br from-crimson-200/40 via-transparent to-amber-soft/30 opacity-0 group-hover:opacity-100 transition-opacity -z-10"
        />
        <div className="flex items-center gap-2.5 mb-2">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-crimson-50 text-crimson-700 ring-1 ring-crimson-100">
            <Icon className="h-4 w-4" />
          </span>
          <h4 className="font-bold text-charcoal-900 text-sm md:text-base leading-tight">{title}</h4>
        </div>
        <p className="text-xs md:text-sm text-charcoal-600 leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}

export function ValuesOrbit() {
  const reduce = useReducedMotion();
  const values = siteConfig.values;
  const radius = 38; // % of container from center to node

  const nodes = values.map((v, i) => ({
    ...v,
    ...orbitPosition(i, values.length, radius),
  }));

  return (
    <div className="w-full">
      <div className="inline-flex items-center gap-2 text-crimson-700 mb-6 md:mb-8 mx-auto md:mx-0">
        <motion.span
          animate={reduce ? undefined : { scale: [1, 1.1, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          className="inline-flex"
        >
          <Heart className="h-4 w-4" />
        </motion.span>
        <span className="text-xs font-semibold uppercase tracking-[0.18em]">Values</span>
      </div>

      {/* Orbit stage */}
      <div className="relative mx-auto w-full max-w-xl aspect-square min-h-[320px] sm:min-h-[380px] md:min-h-[440px]">
        {/* Ambient glow */}
        <div
          aria-hidden
          className="absolute inset-[18%] rounded-full bg-crimson-100/40 blur-3xl"
        />

        {/* SVG rings + connectors */}
        <svg
          aria-hidden
          className="absolute inset-0 h-full w-full overflow-visible"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="orbit-line-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--color-crimson-700)" stopOpacity="0.5" />
              <stop offset="100%" stopColor="var(--color-amber-soft)" stopOpacity="0.35" />
            </linearGradient>
          </defs>

          {/* Outer orbit ring */}
          <motion.circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="var(--color-crimson-200)"
            strokeWidth="0.35"
            strokeDasharray="2 1.8"
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: easeOut }}
            style={{ transformOrigin: "50% 50%" }}
          />

          {/* Inner pulse ring */}
          <motion.circle
            cx="50"
            cy="50"
            r={radius * 0.72}
            fill="none"
            stroke="var(--color-crimson-100)"
            strokeWidth="0.5"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          />

          {nodes.map((node, i) => (
            <OrbitConnector
              key={node.title}
              x={node.x}
              y={node.y}
              delay={0.2 + i * 0.1}
              reduce={!!reduce}
            />
          ))}
        </svg>

        {/* Slow-rotating decorative ring */}
        {!reduce && (
          <motion.div
            aria-hidden
            className="absolute inset-[10%] rounded-full border border-dashed border-crimson-200/60"
            animate={{ rotate: 360 }}
            transition={{ duration: 48, repeat: Infinity, ease: "linear" }}
          />
        )}

        {/* Center heart hub */}
        <motion.div
          className="absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2"
          initial={reduce ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: easeOut, delay: 0.1 }}
        >
          <div className="relative flex h-24 w-24 sm:h-28 sm:w-28 md:h-32 md:w-32 items-center justify-center">
            {!reduce && (
              <motion.span
                aria-hidden
                className="absolute inset-0 rounded-full bg-crimson-700/20"
                animate={{ scale: [1, 1.18, 1], opacity: [0.45, 0.15, 0.45] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
              />
            )}
            <div
              className={cn(
                "relative flex h-full w-full flex-col items-center justify-center rounded-full",
                "gradient-brand text-white shadow-[0_8px_32px_rgba(196,18,48,0.35)]",
                "ring-4 ring-white ring-offset-2 ring-offset-[var(--color-cream)]",
              )}
            >
              <motion.span
                animate={reduce ? undefined : { scale: [1, 1.08, 1] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                className="inline-flex"
              >
                <Heart className="h-8 w-8 sm:h-9 sm:w-9 fill-white/20" strokeWidth={1.75} />
              </motion.span>
              <span className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white/90">
                Core
              </span>
            </div>
          </div>
        </motion.div>

        {/* Value nodes */}
        {nodes.map((node, i) => (
          <ValueNode
            key={node.title}
            title={node.title}
            description={node.description}
            index={i}
            x={node.x}
            y={node.y}
            reduce={!!reduce}
          />
        ))}
      </div>

      {/* Mobile-friendly list fallback for very narrow screens — hidden when orbit fits */}
      <p className="sr-only">
        {values.map((v) => `${v.title}: ${v.description}`).join(" ")}
      </p>
    </div>
  );
}

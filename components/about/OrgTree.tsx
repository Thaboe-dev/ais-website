"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Mail, Linkedin, X } from "lucide-react";
import { useEffect } from "react";
import { Avatar } from "@/components/ui/Avatar";
import { cn } from "@/lib/cn";
import type { Leader } from "@/content/leadership";

const easeOut = [0.16, 1, 0.3, 1] as const;

/* -------------------------------------------------------------------------- */
/*                              Node card                                     */
/* -------------------------------------------------------------------------- */

type Tier = "president" | "vp" | "lead";

const tierConfig: Record<
  Tier,
  {
    width: string;
    badgeBg: string;
    avatarSize: number;
    titleClass: string;
  }
> = {
  president: {
    width: "w-72 sm:w-80",
    badgeBg: "gradient-brand text-white",
    avatarSize: 72,
    titleClass: "text-lg",
  },
  vp: {
    width: "w-64 sm:w-72",
    badgeBg: "bg-amber-deep text-white",
    avatarSize: 64,
    titleClass: "text-base",
  },
  lead: {
    width: "w-60 sm:w-64",
    badgeBg: "bg-charcoal-900 text-white",
    avatarSize: 56,
    titleClass: "text-base",
  },
};

/** Short, badge-friendly version of a leader's role. */
function shortRole(role: string): string {
  // "Minister of Partnerships" -> "Partnerships"
  const ministerMatch = role.match(/^Minister of (.+)$/i);
  if (ministerMatch) return ministerMatch[1];
  // "Communications Minister" -> "Communications"
  const ministerSuffix = role.match(/^(.+) Minister$/i);
  if (ministerSuffix) return ministerSuffix[1];
  // Strip parenthetical season qualifiers like "(Spring 2025)"
  const stripped = role.replace(/\s*\(.+\)\s*$/, "");
  return stripped;
}

function NodeCard({
  leader,
  tier,
  onClick,
}: {
  leader: Leader;
  tier: Tier;
  onClick: () => void;
}) {
  const cfg = tierConfig[tier];
  const badgeLabel =
    tier === "president" ? "President" : tier === "vp" ? "Vice President" : shortRole(leader.role);
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      className={cn(
        "group relative text-left rounded-2xl bg-white border border-charcoal-100 shadow-[var(--shadow-soft)] hover:border-crimson-200 hover:shadow-[var(--shadow-strong)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson-700 focus-visible:ring-offset-2 transition-shadow overflow-hidden",
        cfg.width,
      )}
      aria-label={`${leader.name}, ${leader.role} — view details`}
    >
      <div
        className={cn(
          "px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-center",
          cfg.badgeBg,
        )}
      >
        <span className="truncate block">{badgeLabel}</span>
      </div>
      <div className="p-4 sm:p-5 flex items-center gap-3">
        <Avatar name={leader.name} src={leader.photo} size={cfg.avatarSize} className="shrink-0" />
        <div className="min-w-0">
          <div className={cn("font-bold leading-tight truncate", cfg.titleClass)}>
            {leader.name}
          </div>
          <div className="text-xs text-crimson-700 font-semibold mt-0.5 truncate">
            {leader.role}
          </div>
          {leader.program && (
            <div className="text-[11px] text-charcoal-500 mt-1 truncate">{leader.program}</div>
          )}
        </div>
      </div>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-transparent group-hover:ring-crimson-200 transition"
      />
    </motion.button>
  );
}

/* -------------------------------------------------------------------------- */
/*                              Connector lines                               */
/* -------------------------------------------------------------------------- */

function VerticalLine({ delay = 0 }: { delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      aria-hidden
      className="w-px bg-gradient-to-b from-crimson-200 via-crimson-200 to-crimson-100 origin-top"
      style={{ height: 36 }}
      initial={reduce ? { scaleY: 1, opacity: 1 } : { scaleY: 0, opacity: 0 }}
      whileInView={{ scaleY: 1, opacity: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.5, ease: easeOut, delay }}
    />
  );
}

/**
 * Branch connector (the "T" shape that goes:
 *   - vertical drop from the parent
 *   - horizontal trunk
 *   - vertical drops to each child)
 */
function BranchConnector({ count }: { count: number }) {
  const reduce = useReducedMotion();
  if (count <= 0) return null;

  // Horizontal trunk spans from the center of the leftmost child to the center
  // of the rightmost child. Each child column is 1/count wide, so its center
  // sits at (k + 0.5) / count of the total width.
  const leftPct = 100 * (0.5 / count);
  const rightPct = 100 * (0.5 / count);

  return (
    <div className="relative w-full pointer-events-none" style={{ height: 56 }}>
      {/* Drop from parent center */}
      <motion.div
        aria-hidden
        className="absolute left-1/2 top-0 w-px bg-crimson-200 origin-top"
        style={{ height: 24, transform: "translateX(-50%)" }}
        initial={reduce ? { scaleY: 1 } : { scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.45, ease: easeOut }}
      />

      {/* Horizontal trunk — only when more than 1 child (single child is just a vertical line) */}
      {count > 1 && (
        <motion.div
          aria-hidden
          className="absolute h-px bg-crimson-200 origin-center"
          style={{
            top: 24,
            left: `${leftPct}%`,
            right: `${rightPct}%`,
          }}
          initial={reduce ? { scaleX: 1 } : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.55, ease: easeOut, delay: 0.25 }}
        />
      )}

      {/* Drops to each child */}
      {Array.from({ length: count }).map((_, i) => {
        const centerPct = 100 * ((i + 0.5) / count);
        return (
          <motion.div
            key={i}
            aria-hidden
            className="absolute w-px bg-crimson-200 origin-top"
            style={{
              top: 24,
              left: `${centerPct}%`,
              transform: "translateX(-50%)",
              height: 32,
            }}
            initial={reduce ? { scaleY: 1 } : { scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{
              duration: 0.4,
              ease: easeOut,
              delay: 0.5 + i * 0.06,
            }}
          />
        );
      })}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                              Modal                                         */
/* -------------------------------------------------------------------------- */

export function LeaderModal({
  leader,
  onClose,
}: {
  leader: Leader | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!leader) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [leader, onClose]);

  return (
    <AnimatePresence>
      {leader && (
        <motion.div
          key="leader-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="leader-modal-title"
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
      <motion.div
        aria-hidden
        className="absolute inset-0 bg-charcoal-950/60 backdrop-blur-sm"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      <motion.div
        className="relative w-full max-w-lg rounded-3xl bg-white shadow-[var(--shadow-strong)] overflow-hidden"
        initial={{ opacity: 0, scale: 0.95, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 8 }}
        transition={{ duration: 0.3, ease: easeOut }}
      >
        <div className="gradient-brand h-2" />
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 w-9 h-9 inline-flex items-center justify-center rounded-full bg-white/70 hover:bg-white text-charcoal-700 hover:text-charcoal-900 transition-colors backdrop-blur"
        >
          <X className="h-4 w-4" />
        </button>
        <div className="p-7 sm:p-8">
          <div className="flex items-start gap-4">
            <Avatar name={leader.name} src={leader.photo} size={88} className="shrink-0" />
            <div className="min-w-0 mt-1">
              <h2 id="leader-modal-title" className="text-xl sm:text-2xl font-bold text-charcoal-900 leading-tight">
                {leader.name}
              </h2>
              <p className="mt-1 text-sm font-semibold text-crimson-700">{leader.role}</p>
              {leader.program && (
                <p className="mt-1 text-sm text-charcoal-600">{leader.program}</p>
              )}
            </div>
          </div>
          <p className="mt-5 text-sm sm:text-base text-charcoal-600 leading-relaxed">
            {leader.bio}
          </p>
          {(leader.linkedin || leader.email) && (
            <div className="mt-6 flex items-center gap-2 pt-5 border-t border-charcoal-100">
              {leader.linkedin && (
                <a
                  href={leader.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${leader.name} on LinkedIn`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-charcoal-100 text-charcoal-800 hover:bg-crimson-700 hover:text-white text-sm font-semibold transition-colors"
                >
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </a>
              )}
              {leader.email && (
                <a
                  href={`mailto:${leader.email}`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-charcoal-100 text-charcoal-800 hover:bg-crimson-700 hover:text-white text-sm font-semibold transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  Email
                </a>
              )}
            </div>
          )}
        </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* -------------------------------------------------------------------------- */
/*                              The org tree                                  */
/* -------------------------------------------------------------------------- */

function NodeReveal({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.55, ease: easeOut, delay }}
      className="flex flex-col items-center"
    >
      {children}
    </motion.div>
  );
}

export function OrgTree({
  team,
  onSelect,
}: {
  team: Leader[];
  onSelect: (leader: Leader) => void;
}) {
  const sorted = [...team].sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
  const president = sorted.find((m) => (m.order ?? 99) === 1);
  const vp = sorted.find((m) => (m.order ?? 99) === 2);
  const leads = sorted.filter((m) => (m.order ?? 99) >= 3);

  // Edge case: no president defined — promote VP to top
  const top = president ?? vp ?? sorted[0];
  const second = president ? vp : undefined;
  const bottoms = president ? leads : sorted.filter((m) => m !== top);

  if (!top) return null;

  return (
    <div className="flex flex-col items-center w-full overflow-hidden">
      {/* Tier 1 */}
      <NodeReveal>
        <NodeCard leader={top} tier="president" onClick={() => onSelect(top)} />
      </NodeReveal>

      {/* Connector to VP (if VP exists) */}
      {second && (
        <>
          <VerticalLine delay={0.2} />
          <NodeReveal delay={0.1}>
            <NodeCard leader={second} tier="vp" onClick={() => onSelect(second)} />
          </NodeReveal>
        </>
      )}

      {/* Branch + bottom row */}
      {bottoms.length > 0 && (
        <>
          {/* Desktop: full T-branch connector */}
          <div className="hidden sm:block w-full">
            <BranchConnector count={bottoms.length} />
          </div>
          {/* Mobile: a single vertical stem from VP down to the first card */}
          <div className="sm:hidden w-px h-8 bg-crimson-200 my-2" />

          <motion.div
            className="w-full flex flex-col sm:grid gap-3 sm:gap-5 justify-items-center"
            style={{
              gridTemplateColumns: `repeat(${bottoms.length}, minmax(0, 1fr))`,
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
            }}
          >
            {bottoms.map((m, i) => (
              <motion.div
                key={m.name + m.role}
                variants={{
                  hidden: { opacity: 0, y: 24, scale: 0.96 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: { duration: 0.55, ease: easeOut },
                  },
                }}
                className="flex flex-col items-center w-full"
              >
                {/* Mobile-only stem connecting to the card above */}
                {i > 0 && <div className="sm:hidden w-px h-5 bg-crimson-200 mb-2" />}
                <NodeCard leader={m} tier="lead" onClick={() => onSelect(m)} />
              </motion.div>
            ))}
          </motion.div>
        </>
      )}
    </div>
  );
}

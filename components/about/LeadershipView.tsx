"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Linkedin, Mail, Users } from "lucide-react";
import { useState } from "react";
import { Card, CardBody } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/cn";
import type { Leader, LeadershipYear } from "@/content/leadership";
import { OrgTree, LeaderModal } from "./OrgTree";

const easeOut = [0.16, 1, 0.3, 1] as const;

/* -------------------------------------------------------------------------- */
/*                          Permanent leadership cards                        */
/* -------------------------------------------------------------------------- */

function LeaderLinks({ leader }: { leader: Leader }) {
  if (!leader.linkedin && !leader.email) return null;
  return (
    <div className="mt-4 flex items-center gap-2">
      {leader.linkedin && (
        <a
          href={leader.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${leader.name} on LinkedIn`}
          className="w-9 h-9 inline-flex items-center justify-center rounded-full bg-charcoal-100 text-charcoal-700 hover:bg-crimson-700 hover:text-white transition-colors"
        >
          <Linkedin className="h-4 w-4" />
        </a>
      )}
      {leader.email && (
        <a
          href={`mailto:${leader.email}`}
          aria-label={`Email ${leader.name}`}
          className="w-9 h-9 inline-flex items-center justify-center rounded-full bg-charcoal-100 text-charcoal-700 hover:bg-crimson-700 hover:text-white transition-colors"
        >
          <Mail className="h-4 w-4" />
        </a>
      )}
    </div>
  );
}

function PermanentCard({
  leader,
  variant,
  delay = 0,
}: {
  leader: Leader;
  variant: "founder" | "advisor";
  delay?: number;
}) {
  const isFounder = variant === "founder";
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: easeOut, delay }}
      whileHover={{ y: -3 }}
    >
      <Card
        className={cn(
          "overflow-hidden h-full",
          isFounder ? "ring-1 ring-crimson-100" : "ring-1 ring-amber-100",
        )}
      >
        <div
          className={cn(
            "px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white text-center",
            isFounder ? "gradient-brand" : "bg-amber-deep",
          )}
        >
          {isFounder ? "Founder" : "Faculty Advisor"}
        </div>
        <CardBody className="!p-7 md:!p-8">
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <Avatar name={leader.name} src={leader.photo} size={96} className="shrink-0" />
            <div>
              <h3 className="text-lg sm:text-xl font-bold leading-tight">{leader.name}</h3>
              <p className="text-sm text-crimson-700 font-semibold mt-1">{leader.role}</p>
              {leader.program && (
                <p className="text-xs text-charcoal-500 mt-0.5">{leader.program}</p>
              )}
              <p className="mt-3 text-sm text-charcoal-600 leading-relaxed">{leader.bio}</p>
              <LeaderLinks leader={leader} />
            </div>
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*                              Main view                                     */
/* -------------------------------------------------------------------------- */

export function LeadershipView({
  founder,
  facultyAdvisor,
  years,
  defaultYearId,
}: {
  founder: Leader;
  facultyAdvisor: Leader;
  years: LeadershipYear[];
  defaultYearId: string;
}) {
  const [activeId, setActiveId] = useState<string>(defaultYearId);
  const [selected, setSelected] = useState<Leader | null>(null);
  const active = years.find((y) => y.id === activeId) ?? years[0];

  return (
    <>
      <div className="grid gap-14 md:gap-20">
        {/* Permanent leadership — Founder + Faculty Advisor (no badge above them) */}
        <div className="grid lg:grid-cols-2 gap-6">
          <PermanentCard leader={founder} variant="founder" />
          <PermanentCard leader={facultyAdvisor} variant="advisor" delay={0.1} />
        </div>

        {/* Year-aware org chart */}
        <div className="grid gap-8">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: easeOut }}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          >
            <Badge tone="crimson" className="self-start">
              <Users className="h-3 w-3" /> Executive teams by year
            </Badge>

            <div
              role="tablist"
              aria-label="Select leadership year"
              className="inline-flex flex-wrap p-1 rounded-full bg-charcoal-100 self-start"
            >
              {years.map((y) => (
                <button
                  key={y.id}
                  role="tab"
                  aria-selected={activeId === y.id}
                  onClick={() => setActiveId(y.id)}
                  className={cn(
                    "relative px-4 sm:px-5 py-2 text-sm font-semibold rounded-full transition-colors",
                    activeId === y.id
                      ? "text-charcoal-900"
                      : "text-charcoal-600 hover:text-charcoal-900",
                  )}
                >
                  {activeId === y.id && (
                    <motion.span
                      layoutId="leadership-tab-pill"
                      className="absolute inset-0 bg-white rounded-full shadow-[var(--shadow-soft)]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 inline-flex items-center gap-2">
                    {y.label}
                    {y.isCurrent && (
                      <span className="inline-flex items-center justify-center px-1.5 h-5 rounded-full bg-crimson-100 text-crimson-700 text-[10px] font-bold uppercase tracking-wider">
                        Current
                      </span>
                    )}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: easeOut }}
              className="grid gap-3"
            >
              <p className="text-sm text-charcoal-500">{active.range}</p>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={active.id + "-tree"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: easeOut }}
              className="pt-4 pb-2"
            >
              <OrgTree team={active.team} onSelect={(l) => setSelected(l)} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <LeaderModal leader={selected} onClose={() => setSelected(null)} />
    </>
  );
}

"use client";

import { useState } from "react";
import { Crown, GraduationCap, Linkedin, Mail, Users } from "lucide-react";
import { Card, CardBody } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/cn";
import type { Leader, LeadershipYear } from "@/content/leadership";

type Variant = "founder" | "advisor" | "default";

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

function FeatureCard({
  leader,
  variant,
}: {
  leader: Leader;
  variant: "founder" | "advisor";
}) {
  const isFounder = variant === "founder";
  return (
    <Card
      className={cn(
        "overflow-hidden",
        isFounder ? "ring-1 ring-crimson-100" : "ring-1 ring-amber-100",
      )}
    >
      <div
        className={cn(
          "px-6 py-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white",
          isFounder ? "gradient-brand" : "bg-amber-deep",
        )}
      >
        {isFounder ? <Crown className="h-4 w-4" /> : <GraduationCap className="h-4 w-4" />}
        {isFounder ? "Founder" : "Faculty Advisor"}
      </div>
      <CardBody className="!p-8">
        <div className="flex flex-col sm:flex-row gap-6 items-start">
          <Avatar name={leader.name} src={leader.photo} size={120} className="shrink-0" />
          <div>
            <h3 className="text-xl font-bold">{leader.name}</h3>
            <p className="text-sm text-crimson-700 font-semibold mt-1">{leader.role}</p>
            <p className="mt-3 text-sm text-charcoal-600 leading-relaxed">{leader.bio}</p>
            <LeaderLinks leader={leader} />
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

function TeamMemberCard({ leader }: { leader: Leader }) {
  return (
    <Card className="overflow-hidden hover:border-crimson-200 transition-colors h-full">
      <CardBody>
        <div className="flex flex-col items-center text-center">
          <Avatar name={leader.name} src={leader.photo} size={96} className="shrink-0" />
          <div className="mt-4 w-full">
            <h3 className="font-bold">{leader.name}</h3>
            <p className="text-sm text-crimson-700 font-semibold mt-1">{leader.role}</p>
            <p className="mt-3 text-sm text-charcoal-600 leading-relaxed">{leader.bio}</p>
            <LeaderLinks leader={leader} />
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

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
  const active = years.find((y) => y.id === activeId) ?? years[0];
  const sortedTeam = [...active.team].sort(
    (a, b) => (a.order ?? 99) - (b.order ?? 99),
  );

  return (
    <div className="grid gap-12">
      <div className="grid gap-6">
        <Badge tone="amber" className="self-start">
          Permanent leadership
        </Badge>
        <div className="grid lg:grid-cols-2 gap-6">
          <FeatureCard leader={founder} variant="founder" />
          <FeatureCard leader={facultyAdvisor} variant="advisor" />
        </div>
      </div>

      <div className="grid gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
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
                  "px-4 sm:px-5 py-2 text-sm font-semibold rounded-full transition-colors",
                  activeId === y.id
                    ? "bg-white text-charcoal-900 shadow-[var(--shadow-soft)]"
                    : "text-charcoal-600 hover:text-charcoal-900",
                )}
              >
                {y.label}
                {y.isCurrent && (
                  <span className="ml-2 inline-flex items-center justify-center px-1.5 h-5 rounded-full bg-crimson-100 text-crimson-700 text-[10px] font-bold uppercase tracking-wider">
                    Current
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        <p className="text-sm text-charcoal-500">{active.range}</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedTeam.map((leader) => (
            <TeamMemberCard key={leader.name + leader.role} leader={leader} />
          ))}
        </div>
      </div>
    </div>
  );
}

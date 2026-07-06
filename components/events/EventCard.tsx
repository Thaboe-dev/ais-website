"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CalendarDays, MapPin, ArrowUpRight } from "lucide-react";
import { Card, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { formatEventDate, formatEventTime } from "@/lib/format";
import { asset } from "@/lib/asset";
import type { EventFrontmatter } from "@/lib/content";

export function EventCard({
  slug,
  frontmatter,
  variant = "default",
}: {
  slug: string;
  frontmatter: EventFrontmatter;
  variant?: "default" | "past";
}) {
  const hasCover = !!frontmatter.cover;
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
      className="h-full"
    >
      <Link href={`/events/${slug}`} className="group block h-full">
        <Card className="overflow-hidden h-full hover:border-crimson-200 hover:shadow-[var(--shadow-strong)] transition-shadow">
          <div className="relative h-44 overflow-hidden">
            {hasCover ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={asset(frontmatter.cover)}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.07]"
                  loading="lazy"
                  draggable={false}
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-charcoal-950/85 via-charcoal-950/25 to-transparent"
                />
              </>
            ) : (
              <>
                <div aria-hidden className="absolute inset-0 gradient-brand" />
                <motion.div
                  aria-hidden
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.6) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(255,255,255,0.3) 0%, transparent 50%)",
                  }}
                  animate={{ scale: [1, 1.06, 1] }}
                  transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
                />
              </>
            )}
            <div className="absolute inset-0 flex items-end justify-start p-5">
              <p className="text-white text-xl font-bold leading-tight font-[var(--font-display)] line-clamp-3 drop-shadow-md group-hover:translate-y-[-2px] transition-transform duration-500">
                {frontmatter.title}
              </p>
            </div>
            {variant === "past" && (
              <div className="absolute top-3 right-3">
                <Badge tone="charcoal" className="!bg-charcoal-950/80 !text-white !ring-white/10">
                  Past event
                </Badge>
              </div>
            )}
          </div>
          <CardBody>
            <div className="flex items-center gap-4 text-xs text-charcoal-500 mb-3">
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="h-3.5 w-3.5" />
                {formatEventDate(frontmatter.date)}
              </span>
              {formatEventTime(frontmatter.date) && (
                <span>{formatEventTime(frontmatter.date)}</span>
              )}
            </div>
            <h3 className="font-bold text-lg text-charcoal-900 group-hover:text-crimson-700 transition-colors line-clamp-2">
              {frontmatter.title}
            </h3>
            <p className="mt-2 text-sm text-charcoal-600 line-clamp-2 leading-relaxed">
              {frontmatter.description}
            </p>
            <div className="mt-4 flex items-center justify-between gap-3">
              <span className="inline-flex items-center gap-1.5 text-xs text-charcoal-500 truncate">
                <MapPin className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">{frontmatter.location}</span>
              </span>
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-crimson-700 shrink-0">
                View
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </div>
          </CardBody>
        </Card>
      </Link>
    </motion.div>
  );
}

import Link from "next/link";
import { CalendarDays, MapPin, ArrowUpRight } from "lucide-react";
import { Section } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { getAllEvents } from "@/lib/content";
import { formatEventDate, formatEventTime, isUpcoming } from "@/lib/format";
import { asset } from "@/lib/asset";
import { FeaturedEventClient } from "./FeaturedEventClient";

export function FeaturedEvent() {
  const events = getAllEvents();
  const upcoming = events
    .filter((e) => isUpcoming(e.frontmatter.date))
    .sort((a, b) => +new Date(a.frontmatter.date) - +new Date(b.frontmatter.date));
  const past = events
    .filter((e) => !isUpcoming(e.frontmatter.date))
    .sort((a, b) => +new Date(b.frontmatter.date) - +new Date(a.frontmatter.date));

  const featured =
    upcoming.find((e) => e.frontmatter.featured) ??
    upcoming[0] ??
    past.find((e) => e.frontmatter.featured) ??
    past[0];

  if (!featured) return null;

  const { frontmatter, slug } = featured;
  const isPast = !isUpcoming(frontmatter.date);

  return (
    <Section className="!py-16 md:!py-20">
      <FeaturedEventClient>
        <div className="rounded-3xl overflow-hidden gradient-brand text-white p-1 shadow-[var(--shadow-strong)]">
          <div className="rounded-[calc(1.5rem-2px)] bg-charcoal-950 p-8 md:p-12 lg:p-14 relative overflow-hidden">
            {frontmatter.cover && (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  aria-hidden
                  src={asset(frontmatter.cover)}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover opacity-40"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-r from-charcoal-950 via-charcoal-950/85 to-charcoal-950/40"
                />
              </>
            )}
            <div className="relative grid lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-16 items-end">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-5">
                  <Badge tone="amber">{isPast ? "Recently at AIS" : "Featured event"}</Badge>
                  {frontmatter.tags?.slice(0, 2).map((t) => (
                    <Badge key={t} tone="charcoal" className="!bg-white/10 !text-white !ring-white/10">
                      {t}
                    </Badge>
                  ))}
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-balance leading-tight">
                  {frontmatter.title}
                </h2>
                <p className="mt-4 text-lg text-charcoal-200 max-w-2xl leading-relaxed">
                  {frontmatter.description}
                </p>

                <div className="mt-7 flex flex-wrap gap-x-8 gap-y-3 text-sm text-charcoal-200">
                  <div className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-amber-soft" />
                    <span>
                      {formatEventDate(frontmatter.date)} · {formatEventTime(frontmatter.date)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-amber-soft" />
                    <span>{frontmatter.location}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 lg:items-end">
                {isPast ? (
                  <Button href={`/events/${slug}`} size="lg" className="w-full lg:w-auto" withArrow>
                    See how it went
                  </Button>
                ) : (
                  <>
                    {frontmatter.registrationUrl && (
                      <Button
                        href={frontmatter.registrationUrl}
                        size="lg"
                        className="w-full lg:w-auto"
                        withArrow
                      >
                        Register
                      </Button>
                    )}
                    <Link
                      href={`/events/${slug}`}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-white hover:text-amber-soft transition-colors group"
                    >
                      Event details
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </FeaturedEventClient>
    </Section>
  );
}

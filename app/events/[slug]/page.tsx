import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { CalendarDays, MapPin, Mic, ArrowLeft } from "lucide-react";
import { getAllEvents, getEventBySlug } from "@/lib/content";
import { formatEventDate, formatEventTime, isUpcoming } from "@/lib/format";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Container";
import { mdxComponents } from "@/components/mdx/mdx-components";
import { EventGallery } from "@/components/events/EventGallery";
import { asset } from "@/lib/asset";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/content/site.config";

export function generateStaticParams() {
  return getAllEvents().map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) return buildMetadata({ title: "Event not found" });
  return buildMetadata({
    title: event.frontmatter.title,
    description: event.frontmatter.description,
    path: `/events/${slug}`,
  });
}

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) notFound();

  const { frontmatter, content } = event;
  const upcoming = isUpcoming(frontmatter.date);
  const cover = frontmatter.cover;
  const gallery = frontmatter.gallery ?? [];

  return (
    <>
      <article>
        <header className="relative overflow-hidden pt-12 pb-10 md:pt-16 md:pb-14">
          {cover ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                aria-hidden
                src={asset(cover)}
                alt=""
                className="absolute inset-0 -z-10 h-full w-full object-cover"
              />
              <div aria-hidden className="absolute inset-0 -z-10 bg-charcoal-950/70" />
              <div
                aria-hidden
                className="absolute inset-0 -z-10 bg-gradient-to-b from-crimson-800/30 via-transparent to-charcoal-950/50"
              />
            </>
          ) : (
            <>
              <div aria-hidden className="absolute inset-0 -z-10 gradient-brand opacity-95" />
              <div aria-hidden className="absolute inset-0 -z-10 bg-charcoal-950/40" />
            </>
          )}

          <div className="container-page text-white">
            <Link
              href="/events"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-white/80 hover:text-white mb-6"
            >
              <ArrowLeft className="h-4 w-4" />
              All events
            </Link>
            <div className="flex flex-wrap items-center gap-2 mb-5">
              <Badge tone="amber">{upcoming ? "Upcoming" : "Past event"}</Badge>
              {frontmatter.tags?.map((t) => (
                <Badge
                  key={t}
                  tone="charcoal"
                  className="!bg-white/10 !text-white !ring-white/15 capitalize"
                >
                  {t}
                </Badge>
              ))}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-balance leading-[1.05] max-w-4xl">
              {frontmatter.title}
            </h1>
            <p className="mt-5 text-lg md:text-xl text-white/85 max-w-3xl leading-relaxed">
              {frontmatter.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm text-white/90">
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
              {frontmatter.speaker && (
                <div className="flex items-center gap-2">
                  <Mic className="h-4 w-4 text-amber-soft" />
                  <span>{frontmatter.speaker}</span>
                </div>
              )}
            </div>

            {upcoming && frontmatter.registrationUrl && (
              <div className="mt-8">
                <Button href={frontmatter.registrationUrl} size="lg" withArrow>
                  Register for this event
                </Button>
              </div>
            )}
          </div>
        </header>

        <Section className="!pt-12 md:!pt-16">
          <div className="max-w-3xl mx-auto">
            <MDXRemote source={content} components={mdxComponents} />
          </div>
        </Section>

        {gallery.length > 0 && (
          <Section className="bg-white border-t border-charcoal-100 !pt-12 md:!pt-14">
            <EventGallery images={gallery} title={frontmatter.title} />
          </Section>
        )}
      </article>

      <Section className="bg-white border-t border-charcoal-100">
        <div className="rounded-2xl bg-[var(--color-cream)] p-8 md:p-10 text-center">
          <h2 className="text-2xl md:text-3xl font-bold">Want first access to events like this?</h2>
          <p className="mt-3 text-charcoal-600 max-w-2xl mx-auto">
            Join the AIS community to hear about pitch nights, workshops, and founder dinners before
            they fill up.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button href={siteConfig.forms.membership} size="md">
              Join AIS
            </Button>
            <Button href="/events" size="md" variant="outline">
              Browse events
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}

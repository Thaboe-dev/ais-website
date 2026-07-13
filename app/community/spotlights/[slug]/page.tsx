import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ArrowLeft, Linkedin, Globe } from "lucide-react";
import { getAllSpotlights, getSpotlightBySlug } from "@/lib/content";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Container";
import { mdxComponents } from "@/components/mdx/mdx-components";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/content/site.config";

export function generateStaticParams() {
  if (!siteConfig.features.showCommunity) {
    // Static export requires at least one param; page always 404s while hidden.
    return [{ slug: "__hidden__" }];
  }
  return getAllSpotlights().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = getSpotlightBySlug(slug);
  if (!s) return buildMetadata({ title: "Spotlight not found" });
  return buildMetadata({
    title: `${s.frontmatter.name} — Spotlight`,
    description: s.frontmatter.excerpt,
    path: `/community/spotlights/${slug}`,
  });
}

export default async function SpotlightDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!siteConfig.features.showCommunity || slug === "__hidden__") notFound();
  const spotlight = getSpotlightBySlug(slug);
  if (!spotlight) notFound();

  const { frontmatter, content } = spotlight;

  return (
    <>
      <header className="pt-12 pb-8 md:pt-16 md:pb-10">
        <div className="container-page max-w-3xl">
          <Link
            href="/community"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-charcoal-500 hover:text-charcoal-900 mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to community
          </Link>

          <div className="flex items-center gap-5">
            <Avatar name={frontmatter.name} src={frontmatter.photo} size={96} />
            <div>
              <Badge tone="amber" className="mb-2">Member spotlight</Badge>
              <h1 className="text-3xl md:text-4xl font-bold leading-tight">
                {frontmatter.name}
              </h1>
              {frontmatter.role && (
                <p className="text-charcoal-600 mt-1">
                  {frontmatter.role}
                  {frontmatter.venture && (
                    <>
                      {" "}
                      at <span className="text-crimson-700 font-semibold">{frontmatter.venture}</span>
                    </>
                  )}
                </p>
              )}
              {frontmatter.cohort && (
                <p className="text-xs text-charcoal-500 mt-0.5">{frontmatter.cohort}</p>
              )}
            </div>
          </div>

          <p className="mt-6 text-lg md:text-xl text-charcoal-700 leading-relaxed">
            {frontmatter.excerpt}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            {frontmatter.tags?.map((t) => (
              <Badge key={t} tone="outline" className="capitalize">{t}</Badge>
            ))}
            <div className="grow" />
            {frontmatter.linkedin && (
              <a
                href={frontmatter.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 inline-flex items-center justify-center rounded-full bg-charcoal-100 text-charcoal-700 hover:bg-crimson-700 hover:text-white transition-colors"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            )}
            {frontmatter.website && (
              <a
                href={frontmatter.website}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Website"
                className="w-9 h-9 inline-flex items-center justify-center rounded-full bg-charcoal-100 text-charcoal-700 hover:bg-crimson-700 hover:text-white transition-colors"
              >
                <Globe className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
      </header>

      <Section className="!pt-2 md:!pt-4">
        <div className="max-w-3xl mx-auto">
          <MDXRemote source={content} components={mdxComponents} />
        </div>
      </Section>

      <Section className="bg-white border-t border-charcoal-100">
        <div className="rounded-2xl bg-[var(--color-cream)] p-8 md:p-10 text-center">
          <h2 className="text-2xl md:text-3xl font-bold">Your story could be next.</h2>
          <p className="mt-3 text-charcoal-600 max-w-2xl mx-auto">
            Every member here started with one workshop, one pitch, or one cold email. Take the first step.
          </p>
          <div className="mt-6">
            <Button href={siteConfig.forms.membership} size="md" withArrow>
              Join AIS
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}

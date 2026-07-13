import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { SpotlightCard } from "@/components/community/SpotlightCard";
import { MentorCard } from "@/components/community/MentorCard";
import { VentureCard } from "@/components/community/VentureCard";
import { getAllSpotlights } from "@/lib/content";
import { mentors, ventures } from "@/content/partners";
import { siteConfig } from "@/content/site.config";
import { buildMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";

export const metadata = buildMetadata({
  title: "Community",
  path: "/community",
  description:
    "Meet the members, mentors, alumni ventures, and operators that make up the Africa Innovators Society community.",
});

export default function CommunityPage() {
  if (!siteConfig.features.showCommunity) notFound();

  const spotlights = getAllSpotlights();

  return (
    <>
      <PageHero
        eyebrow="Community"
        title="The people behind the ventures."
        description="AIS is more than a club — it's a network of builders, mentors, and alumni who back each other long after graduation. Meet a few of them."
      />

      <Section className="!pt-4" id="spotlights">
        <SectionHeading
          eyebrow="Member spotlights"
          title="Stories from our community"
          description="Real CMU-Africa students, real ventures, real lessons. Click through to read the full story."
        />
        {spotlights.length > 0 ? (
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {spotlights.map((s) => (
              <SpotlightCard key={s.slug} slug={s.slug} frontmatter={s.frontmatter} />
            ))}
          </div>
        ) : (
          <p className="mt-8 text-charcoal-500">Spotlights coming soon.</p>
        )}
      </Section>

      <Section id="ventures" className="bg-white border-y border-charcoal-100">
        <SectionHeading
          eyebrow="Alumni & ventures"
          title="The startup portfolio"
          description="A growing list of ventures founded, co-founded, or shipped by AIS members and alumni."
        />
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {ventures.map((v) => (
            <VentureCard key={v.name} venture={v} />
          ))}
        </div>
      </Section>

      <Section id="mentors">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <SectionHeading
            eyebrow="Mentor directory"
            title="Operators, founders, and investors in our corner."
            description="A snapshot of the mentor network. Become a member to get matched 1:1."
          />
          <Button href={siteConfig.forms.mentorship} variant="outline" size="md">
            Become a mentor
          </Button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {mentors.map((m) => (
            <MentorCard key={m.name} mentor={m} />
          ))}
        </div>
      </Section>

      <Section className="!pt-8">
        <div className="rounded-3xl gradient-brand text-white p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-balance">
            Want to be the next AIS spotlight?
          </h2>
          <p className="mt-3 text-white/90 max-w-2xl mx-auto">
            Join the community, ship the work, and we'll be the first to celebrate you.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Button href={siteConfig.forms.membership} variant="secondary" size="lg" withArrow>
              Join AIS
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}

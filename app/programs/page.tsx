import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ProgramCard } from "@/components/programs/ProgramCard";
import { YearRhythm } from "@/components/programs/YearRhythm";
import { programs } from "@/content/programs";
import { siteConfig } from "@/content/site.config";
import { ArrowUpRight } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";

export const metadata = buildMetadata({
  title: "Programs",
  path: "/programs",
  description:
    "Workshops, pitch competitions, mentorship, and networking — the four pillars of AIS programming.",
});

export default function ProgramsPage() {
  if (!siteConfig.features.showPrograms) notFound();

  return (
    <>
      <PageHero
        eyebrow="Programs"
        title="Four pillars. One pipeline of African founders."
        description="From your first workshop to your venture's first cheque, our programs are built to take you from idea to impact."
      />

      <Section className="!pt-4">
        <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
          {programs.map((p, i) => (
            <ProgramCard key={p.slug} program={p} index={i} />
          ))}
        </div>
      </Section>

      <Section className="bg-white border-y border-charcoal-100">
        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-10 lg:gap-14 items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-crimson-700 mb-3">
              How a year in AIS looks
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-balance leading-tight">
              An academic year inside the society.
            </h2>
            <p className="mt-4 text-lg text-charcoal-600 max-w-2xl">
              The rhythm of AIS is intentional. Every term layers programming so members go from learning to building to shipping — fast.
            </p>
          </div>

          <YearRhythm />
        </div>
      </Section>

      <Section>
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-balance">Ready to step into a program?</h2>
          <p className="mt-4 text-lg text-charcoal-600">
            All AIS programs are open to current CMU-Africa students. Membership is free — applications take less than three minutes.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/contact" variant="outline" size="lg">
              Get in touch
              <ArrowUpRight className="h-4 w-4" />
            </Button>
            <Button href={programs[0].ctaUrl} size="lg" withArrow>
              Join AIS
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}

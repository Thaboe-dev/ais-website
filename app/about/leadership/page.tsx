import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Container";
import { LeadershipView } from "@/components/about/LeadershipView";
import {
  founder,
  facultyAdvisor,
  leadershipYears,
  currentLeadershipYear,
} from "@/content/leadership";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Leadership",
  path: "/about/leadership",
  description:
    "Meet the founder, faculty advisor, and elected student leadership behind the Africa Innovators Society — across every academic year since the club's founding.",
});

export default function LeadershipPage() {
  return (
    <>
      <PageHero eyebrow="About" title="Leadership" />

      <Section className="!pt-4">
        <LeadershipView
          founder={founder}
          facultyAdvisor={facultyAdvisor}
          years={leadershipYears}
          defaultYearId={currentLeadershipYear.id}
        />
      </Section>
    </>
  );
}

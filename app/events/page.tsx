import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Container";
import { EventsView } from "@/components/events/EventsView";
import { getAllEvents } from "@/lib/content";
import { isUpcoming } from "@/lib/format";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Events",
  path: "/events",
  description:
    "Upcoming and past events from the Africa Innovators Society — pitch nights, workshops, founder dinners, and more.",
});

export default function EventsPage() {
  const all = getAllEvents();
  const upcoming = all
    .filter((e) => isUpcoming(e.frontmatter.date))
    .sort((a, b) => +new Date(a.frontmatter.date) - +new Date(b.frontmatter.date));
  const past = all
    .filter((e) => !isUpcoming(e.frontmatter.date))
    .sort((a, b) => +new Date(b.frontmatter.date) - +new Date(a.frontmatter.date));

  return (
    <>
      <PageHero
        eyebrow="Events"
        title="Where the AIS community shows up."
      />
      <Section className="!pt-4">
        <EventsView upcoming={upcoming} past={past} />
      </Section>
    </>
  );
}

import { Hero } from "@/components/home/Hero";
import { MissionSnapshot } from "@/components/home/MissionSnapshot";
import { ImpactStats } from "@/components/home/ImpactStats";
import { FeaturedEvent } from "@/components/home/FeaturedEvent";
import { Testimonial } from "@/components/home/Testimonial";
import { PartnerStrip } from "@/components/home/PartnerStrip";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <ImpactStats />
      <MissionSnapshot />
      <FeaturedEvent />
      <Testimonial />
      <PartnerStrip />
    </>
  );
}

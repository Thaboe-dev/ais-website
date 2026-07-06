import { Hero } from "@/components/home/Hero";
import { MissionSnapshot } from "@/components/home/MissionSnapshot";
import { ImpactStats } from "@/components/home/ImpactStats";
import { FeaturedEvent } from "@/components/home/FeaturedEvent";
import { Testimonial } from "@/components/home/Testimonial";
import { PartnerStrip } from "@/components/home/PartnerStrip";
import { HomeCarousel, type CarouselSlide } from "@/components/home/HomeCarousel";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  path: "/",
});

const carouselSlides: CarouselSlide[] = [
  {
    src: "/images/home/home-page-1.png",
    alt: "AIS members and Prof. João Barros with the CMU-Africa community",
    eyebrow: "CMU-Africa · AIS Community",
    caption: "Where the founders, faculty, and future of African innovation meet.",
  },
  {
    src: "/images/home/home-page-2.png",
    alt: "AIS executive team photographed together at CMU-Africa",
    eyebrow: "Executive Team",
    caption: "The 2025–26 board that keeps the society building every week.",
  },
  {
    src: "/images/home/home-page-3.png",
    alt: "Fireside chat with Matteo Rizzi and Stephen David",
    eyebrow: "Fireside Chat · Matteo Rizzi",
    caption: "World-class operators, in the same room as our members.",
  },
  {
    src: "/images/home/home-page-4.png",
    alt: "High-school students at the Future Founders Pitch Competition",
    eyebrow: "Future Founders · Feb 2026",
    caption: "Training the continent's next founders — starting in high school.",
  },
  {
    src: "/images/home/home-page-5.png",
    alt: "Panelists at the AIS Leadership Summit 2026",
    eyebrow: "Leadership Summit · Feb 2026",
    caption: "Forging resilient futures — tech-enabled, human-led.",
  },
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <HomeCarousel slides={carouselSlides} />
      <ImpactStats />
      <MissionSnapshot />
      <FeaturedEvent />
      <Testimonial />
      <PartnerStrip />
    </>
  );
}

/**
 * AIS Site Configuration
 * ----------------------
 * Edit this file to update mission, vision, contact, social, stats, and form URLs.
 * Mission, vision, and values match the official AIS reports.
 */

export const siteConfig = {
  name: "Africa Innovators Society",
  shortName: "AIS",
  tagline: "Integrity. Innovation. Growth.",
  // Override at build time with NEXT_PUBLIC_SITE_URL if deploying somewhere
  // other than the eventual production domain.
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://africainnovators.cmu.edu",
  description:
    "The Africa Innovators Society (AIS) is the official entrepreneurship club of Carnegie Mellon University Africa. We connect CMU-Africa students with Africa's innovation ecosystem through fireside chats, hackathons, summits, and ventures that turn bold ideas into real impact.",
  affiliation: "Carnegie Mellon University Africa",
  patron: "Prof. Jesse Thornburg",

  // Mission — official version (AIS 2024-25 Annual Report).
  mission:
    "To cultivate an entrepreneurial spirit within CMU-Africa by empowering students through skills workshops, networking events, pitch competitions, and mentorship programs that support the development of sustainable ventures and impactful solutions to African challenges.",

  // Vision — official version (AIS 2024-25 Annual Report).
  vision:
    "AIS envisions an Africa where CMU-Africa graduates lead as innovative entrepreneurs transforming communities through ethical entrepreneurship and technology-driven solutions.",

  // Three core values — Integrity, Innovation, Growth (per AIS reports).
  values: [
    {
      title: "Integrity",
      description:
        "We make ethical personal, professional, and business decisions that uphold our standards and act in good faith to build trust.",
    },
    {
      title: "Innovation",
      description:
        "We foster an environment where creative thinking and inspired ideas are welcomed — innovation is the heart of successful entrepreneurship.",
    },
    {
      title: "Growth",
      description:
        "Through continuous learning and skills development, we empower our members to expand their capabilities and grow as entrepreneurs.",
    },
  ],

  originStory: [
    "The Africa Innovators Society was officially launched at Carnegie Mellon University Africa on November 7, 2023 as the Student Entrepreneurship Club. The launch event drew 80 students from CMU-Africa, the African Leadership University, Davis College, and the University of Rwanda — featuring industry leaders from Jasiri, 250 Startups, and CHARIS UAS.",
    "The founding team — led by Muhammad Aliyu — built the early flagship programs: the AI Revolution Bootcamp with Prof. João Barros, the first FlutterFlow rapid prototyping bootcamp, and the Tartans Innovate and Jenga hackathons. Successive executive teams have since deepened AIS's role as a practical bridge between CMU-Africa and Africa's startup ecosystem — coordinating delegations to Africa's Business Heroes, supporting wins at FemSTEM Africa, and convening 100+ leaders at the AIS Leadership Summit.",
  ],

  stats: [
    { label: "Active members", value: "100+" },
    { label: "Events delivered", value: "30+" },
    { label: "Ventures supported", value: "10+" },
    { label: "Value to students", value: "$30K+" },
  ],

  contact: {
    email: "ais@africa.cmu.edu", // {TODO confirm real email}
    address: "Plot No A8, Kigali Special Economic Zone Phase II, Kigali, Rwanda",
    addressShort: "CMU-Africa · Kigali, Rwanda",
  },

  social: {
    linkedin: "https://www.linkedin.com/company/aisentreprenuershipclub/",
    instagram: "https://www.instagram.com/ais_cmuafrica/",
    twitter: "",
    youtube: "",
  },

  // Replace with real Google Form URLs before launch.
  forms: {
    membership: "https://forms.gle/REPLACE_MEMBERSHIP",
    general: "https://forms.gle/REPLACE_GENERAL_CONTACT",
    mentorship: "https://forms.gle/REPLACE_MENTORSHIP",
    sponsorship: "https://forms.gle/REPLACE_SPONSORSHIP",
  },

  testimonial: {
    quote:
      "AIS at CMU-Africa has been a game-changer. It's where tech skills meet entrepreneurship — and where ideas turn into real solutions. We're not just students here; we're the future tech leaders of Africa.",
    name: "Sheila Wafula",
    role: "MS IT '26 · AIS Member",
    photo: "/images/sheila-wafula.png",
  },

  /** Toggle sections that are not ready for public launch. */
  features: {
    showCommunity: false,
    showPrograms: false,
  },
} as const;

export type SiteConfig = typeof siteConfig;

export type Partner = {
  name: string;
  logo?: string;
  url?: string;
  tier?: "platinum" | "gold" | "silver" | "community";
  /** CSS class(es) for the tile background — defaults to white when omitted. */
  tileBg?: string;
  /** Approximate intrinsic logo dimensions, used to render via next/image. */
  width?: number;
  height?: number;
};

export const partners: Partner[] = [
  {
    name: "Carnegie Mellon University Africa",
    logo: "/logos/cmu-africa.png",
    url: "https://www.africa.engineering.cmu.edu",
    width: 600,
    height: 600,
    tier: "platinum",
  },
  {
    name: "CMU-Africa Innovation Hub",
    logo: "/logos/cmu-africa-innovation-hub.png",
    width: 199,
    height: 205,
    tier: "gold",
  },
  {
    name: "Africa's Business Heroes",
    logo: "/logos/africas-business-heroes.png",
    url: "https://africabusinessheroes.org",
    width: 1024,
    height: 406,
    tileBg: "bg-white",
    tier: "gold",
  },
  {
    name: "Inclusive FinTech Forum",
    logo: "/logos/inclusive-fintech-forum.png",
    url: "https://inclusivefintechforum.com",
    width: 1024,
    height: 614,
    tileBg: "bg-[linear-gradient(135deg,#7c3aed_0%,#ec4899_100%)]",
    tier: "gold",
  },
];

export type Mentor = {
  name: string;
  title: string;
  org: string;
  photo?: string;
  linkedin?: string;
  expertise?: string[];
};

export const mentors: Mentor[] = [
  {
    name: "{TODO Mentor Name}",
    title: "{TODO Title}",
    org: "{TODO Company}",
    photo: "",
    linkedin: "",
    expertise: ["Fintech", "Fundraising"],
  },
  {
    name: "{TODO Mentor Name}",
    title: "{TODO Title}",
    org: "{TODO Company}",
    photo: "",
    linkedin: "",
    expertise: ["Product", "Growth"],
  },
  {
    name: "{TODO Mentor Name}",
    title: "{TODO Title}",
    org: "{TODO Company}",
    photo: "",
    linkedin: "",
    expertise: ["Climate", "Hardware"],
  },
  {
    name: "{TODO Mentor Name}",
    title: "{TODO Title}",
    org: "{TODO Company}",
    photo: "",
    linkedin: "",
    expertise: ["AI/ML", "Healthtech"],
  },
];

export type Venture = {
  name: string;
  founder: string;
  cohort?: string;
  sector: string;
  description: string;
  url?: string;
  logo?: string;
};

export const ventures: Venture[] = [
  {
    name: "{TODO Venture Name}",
    founder: "{TODO Founder}",
    cohort: "Class of 2024",
    sector: "Fintech",
    description: "{TODO 1 sentence describing what they do and the impact they're making.}",
    url: "",
  },
  {
    name: "{TODO Venture Name}",
    founder: "{TODO Founder}",
    cohort: "Class of 2024",
    sector: "Climate",
    description: "{TODO 1 sentence describing what they do.}",
    url: "",
  },
  {
    name: "{TODO Venture Name}",
    founder: "{TODO Founder}",
    cohort: "Class of 2023",
    sector: "Healthtech",
    description: "{TODO 1 sentence describing what they do.}",
    url: "",
  },
  {
    name: "{TODO Venture Name}",
    founder: "{TODO Founder}",
    cohort: "Class of 2023",
    sector: "Agritech",
    description: "{TODO 1 sentence describing what they do.}",
    url: "",
  },
];

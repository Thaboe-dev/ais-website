/**
 * AIS Leadership
 * --------------
 * Founder + Faculty Advisor are pinned and shown on every leadership view.
 * `leadershipYears` lists each elected executive team by academic year,
 * with the most recent year first. Set `isCurrent: true` on the academic
 * year that should be the default when the page loads.
 */

export type Leader = {
  name: string;
  role: string;
  bio: string;
  photo?: string;
  linkedin?: string;
  email?: string;
  order?: number;
};

export const founder: Leader = {
  name: "Muhammad Aliyu",
  role: "Founder · Founding President",
  bio: "Muhammad founded the Africa Innovators Society at CMU-Africa to unleash the entrepreneurial potential of the continent's future leaders. He is also the Founder of Ignite Research Academy and a passionate advocate for GenAI and entrepreneurship across Africa.",
  photo: "",
  linkedin: "",
};

export const facultyAdvisor: Leader = {
  name: "Prof. Jesse Thornburg",
  role: "Faculty Advisor",
  bio: "Assistant Teaching Professor at Carnegie Mellon University Africa and the Africa Innovators Society's faculty advisor since the founding year. His support and mentorship have anchored AIS through every chapter — from the November 2023 launch through the Tartans Innovate hackathons and the AIS Leadership Summit.",
  photo: "",
  linkedin: "",
};

export type LeadershipYear = {
  /** Stable id used as the year selector key */
  id: string;
  /** Pill-button label, e.g. "2025–26" */
  label: string;
  /** Sub-label shown under the team grid, e.g. "August 2025 – Present" */
  range: string;
  /** Marks the team that should be selected by default */
  isCurrent?: boolean;
  team: Leader[];
};

export const leadershipYears: LeadershipYear[] = [
  {
    id: "2025-2026",
    label: "2025–26",
    range: "August 2025 – Present · Current Executive Team",
    isCurrent: true,
    team: [
      {
        name: "Stephen David Mhya",
        role: "President",
        bio: "Stephen leads AIS in 2025-26, securing a landmark community partnership with the Inclusive Fintech Forum, convening 100+ leaders at the AIS Leadership Summit, and representing AIS as a panelist at the Inclusive Fintech Forum in Kigali in March 2026.",
        photo: "",
        linkedin: "",
        order: 1,
      },
      {
        name: "Bruce Mugizi",
        role: "Vice President",
        bio: "Bruce co-leads AIS as Vice President — supporting strategic execution across programming, member engagement, and partnership delivery for the 2025-26 cohort.",
        photo: "",
        linkedin: "",
        order: 2,
      },
      {
        name: "Sunday Ajayi",
        role: "Minister of Partnerships",
        bio: "Sunday builds and stewards the partnerships behind AIS — from the Inclusive Fintech Forum to fireside chats with leading African investors and operators.",
        photo: "",
        linkedin: "",
        order: 3,
      },
      {
        name: "Wanchi Lucia Yen",
        role: "Minister of Communication",
        bio: "Lucia leads AIS's external voice — across the website, newsletter, social channels, and the storytelling that turns members' wins into community momentum.",
        photo: "",
        linkedin: "",
        order: 4,
      },
      {
        name: "Thabolezwe Mabandla",
        role: "Community and Ventures Lead",
        bio: "Thabolezwe holds the AIS community together — from member onboarding and venture spotlights to the alumni connections that compound long after graduation.",
        photo: "",
        linkedin: "",
        order: 5,
      },
    ],
  },
  {
    id: "2024-2025",
    label: "2024–25",
    range: "Spring 1 2025 – Fall 2025",
    team: [
      {
        name: "Wasajja Kimuli Julius",
        role: "President",
        bio: "Wasajja led AIS through the 2024-25 academic year — coordinating CMU-Africa's official 25-student delegation to the Africa's Business Heroes Grand Finale, supporting wins at FemSTEM Africa, and partnering with the Industry Innovation Lab on Tartans Innovate 2025.",
        photo: "",
        email: "jwasajja@andrew.cmu.edu",
        order: 1,
      },
      {
        name: "Maimona Nadjiru",
        role: "Vice President",
        bio: "Maimona served as Vice President in 2024-25, supporting day-to-day execution and helping AIS deliver a busy programming calendar across two semesters.",
        photo: "",
        email: "mnadjiru@andrew.cmu.edu",
        order: 2,
      },
      {
        name: "Ulrich Armel Codjia",
        role: "Minister of Partnerships",
        bio: "Ulrich led AIS's partnerships across the 2024-25 year and hosted the Tuesday Innov 'Startup Ideation and Validation' workshop in Fall 2025.",
        photo: "",
        email: "acodjia@andrew.cmu.edu",
        order: 3,
      },
      {
        name: "John Bosco Thuo",
        role: "Communications Minister",
        bio: "John Bosco served as Communications Minister in 2024-25, leading AIS's external presence and event communications throughout the year.",
        photo: "",
        email: "jthuo@andrew.cmu.edu",
        order: 4,
      },
      {
        name: "Nick Azaria",
        role: "Community & Ventures Leader (Spring 2025)",
        bio: "Nick led the Community & Ventures portfolio for AIS in Spring 2025 — supporting member ventures and ecosystem connections.",
        photo: "",
        email: "mazaria@andrew.cmu.edu",
        order: 5,
      },
      {
        name: "Addisu Seteye",
        role: "Community & Ventures Leader (Fall 2025)",
        bio: "Addisu led the Community & Ventures portfolio for AIS in Fall 2025, building on the momentum of the year's hackathons and external delegations.",
        photo: "",
        email: "ayimam@andrew.cmu.edu",
        order: 6,
      },
    ],
  },
  {
    id: "founding-2023-2024",
    label: "Founding (2023–24)",
    range: "November 2023 – Spring 2024 · The team that started AIS",
    team: [
      {
        name: "Cynthia A. Kamikazi",
        role: "Founding Vice President",
        bio: "Cynthia served as the Founding Vice President of AIS, helping launch the club in November 2023. She is a Full-Stack Software Engineer with expertise in Machine Learning and Data Science.",
        photo: "",
        order: 1,
      },
      {
        name: "Brian Bosho",
        role: "Founding Partnership Lead",
        bio: "Brian was the Founding Partnership Lead for AIS, building the club's earliest relationships across Kigali's startup ecosystem. He is also the Co-Founder & CEO of SWYNG Carpool, and an AI/ML expert.",
        photo: "",
        order: 2,
      },
      {
        name: "Abel Tessema",
        role: "Founding Communications Lead",
        bio: "Abel led communications for the founding team of AIS. He is a Big Data Engineer at Safaricom Telecommunications Ethiopia PLC.",
        photo: "",
        order: 3,
      },
      {
        name: "Samuel Malum",
        role: "Founding Community & Ventures Lead",
        bio: "Samuel served as the Founding Community & Ventures Lead for AIS. He is a former Product Manager at Nethermind in the United Kingdom.",
        photo: "",
        order: 4,
      },
    ],
  },
];

/**
 * Convenience: the team that should render as the default selection.
 */
export const currentLeadershipYear =
  leadershipYears.find((y) => y.isCurrent) ?? leadershipYears[0];

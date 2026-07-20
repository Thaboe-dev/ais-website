# Africa Innovators Society — Website

The official website for the **Africa Innovators Society** at **Carnegie Mellon University Africa**.

Built with Next.js 15, Tailwind CSS v4, and an MDX-driven content layer that any AIS officer can edit without touching code.

---

## Quick start

```bash
# 1. Install dependencies
npm install

# 2. Run the dev server
npm run dev
# → http://localhost:3000

# 3. Build for production
npm run build
npm run start
```

Requires **Node.js 20+**.

---

## Project structure

```
.
├── app/                     # Next.js App Router pages
│   ├── page.tsx             # Home
│   ├── about/               # About + leadership
│   ├── programs/
│   ├── events/              # Events list + /[slug] detail
│   ├── community/           # Spotlights, ventures, mentors
│   ├── contact/
│   ├── blog/
│   ├── sitemap.ts
│   ├── robots.ts
│   └── opengraph-image.tsx  # auto-generated social share image
├── components/
│   ├── layout/              # Header, Footer, MobileNav, PageHero
│   ├── ui/                  # Button, Card, Badge, Stat, ...
│   ├── home/                # Hero, ImpactStats, FeaturedEvent, ...
│   ├── events/              # EventCard, EventsView (tabs + filter)
│   ├── community/           # SpotlightCard, MentorCard, VentureCard
│   └── mdx/                 # MDX rendering styles
├── content/                 # ALL EDITABLE CONTENT LIVES HERE
│   ├── site.config.ts       # mission, vision, contact, social, forms
│   ├── programs.ts          # 4 program cards
│   ├── leadership.ts        # founder + current board
│   ├── partners.ts          # sponsors, mentors, ventures
│   ├── events/              # *.mdx — one file per event
│   ├── spotlights/          # *.mdx — one file per member story
│   └── blog/                # *.mdx — one file per post
├── lib/                     # Utilities (content loaders, formatters, seo)
└── public/                  # Static assets (images, logos)
```

---

## Editing content (no code required)

All editable content lives in [`content/`](./content). Open any file in GitHub, GitLab, or VS Code and edit it like a Google Doc.

### To update the mission, contact info, social links, or impact stats

Open [`content/site.config.ts`](./content/site.config.ts) and edit the fields. Anything marked `{TODO ...}` should be replaced before launch.

### To update Google Form URLs

In [`content/site.config.ts`](./content/site.config.ts), find the `forms:` block:

```ts
forms: {
  membership: "https://forms.gle/...",
  general: "https://forms.gle/...",
  mentorship: "https://forms.gle/...",
  sponsorship: "https://forms.gle/...",
},
```

Paste in your real Google Form URLs. That's it — every "Join AIS", "Apply", and "Sponsor" button across the site updates automatically.

### To add or update leadership

Open [`content/leadership.ts`](./content/leadership.ts) and edit `founders` or `currentTeam`. Each entry needs:

```ts
{
  name: "Their Name",
  role: "Their Role",
  bio: "1-2 sentence bio.",
  photo: "/images/team/their-name.jpg",   // optional, drop file in public/images/team/
  linkedin: "https://linkedin.com/in/...",
  order: 1,                                // controls grid order
}
```

If `photo` is empty, the site falls back to a beautiful gradient avatar with the person's initials.

### To add a new event

Create a new file in [`content/events/`](./content/events/) — e.g. `content/events/my-event.mdx`:

```mdx
---
title: "Event Title"
date: "2026-09-12T18:30:00+02:00"          # ISO date with timezone
endDate: "2026-09-12T21:00:00+02:00"        # optional
location: "Where it's happening"
description: "One-line summary that appears in cards and OG previews."
cover: ""                                   # optional image path
registrationUrl: "https://forms.gle/..."    # optional
speaker: "Optional speaker name"
tags: ["pitch", "competition"]              # for filter chips
featured: true                              # show as the home page hero event
---

## Body content

Write event details here in standard Markdown — headings, lists, bold, links — all work.

> Pull quotes look like this.
```

The file appears automatically on `/events` and at `/events/my-event`.

**Tip**: `date` controls whether the event shows up under "Upcoming" or "Past" — anything in the future = upcoming, anything in the past = past.

### To add a member spotlight

Create a file in [`content/spotlights/`](./content/spotlights/) — e.g. `content/spotlights/jane-doe.mdx`:

```mdx
---
name: "Jane Doe"
role: "Founder & CEO"
cohort: "Class of 2025"
venture: "Sankofa AI"
photo: "/images/spotlights/jane-doe.jpg"
excerpt: "1-2 sentence summary that appears in the card."
linkedin: "https://linkedin.com/in/janedoe"
website: "https://sankofa.ai"
tags: ["ai", "alumni"]
---

## The story

Long-form story here in Markdown.
```

### To publish a blog post

Create a file in [`content/blog/`](./content/blog/) — same pattern, see [`content/blog/welcome-to-ais.mdx`](./content/blog/welcome-to-ais.mdx) for a template.

### Important: MDX placeholder syntax

Avoid using `{` and `}` inside MDX **body content** — MDX interprets them as code. Use square brackets `[like this]` instead. (You can use `{}` freely in YAML frontmatter at the top of the file.)

---

## Brand & design tokens

All colours, fonts, and radii are defined in [`app/globals.css`](./app/globals.css) under `@theme`:

```css
--color-crimson-700: #c41230;  /* primary brand */
--color-charcoal-900: #1f2937; /* dark text */
--color-amber-soft: #f59e0b;   /* accent */
```

Change them once, and the whole site updates.

The logo lives in [`components/layout/Logo.tsx`](./components/layout/Logo.tsx) as an inline SVG (so it's tiny and themeable). Replace the SVG paths with the real AIS logo when ready.

---

## Deploying to Vercel

1. Push this repo to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
3. Vercel auto-detects Next.js — no config needed. Hit **Deploy**.
4. (Optional) Add a custom domain in **Project Settings → Domains**.

### Connecting `africainnovators.cmu.edu`

CMU subdomains require a CNAME record added by CMU IT. Once configured:

1. In Vercel → Domains → Add `africainnovators.cmu.edu`
2. Point the CMU CNAME record to `cname.vercel-dns.com`
3. Vercel will provision an HTTPS certificate automatically

---

## SEO & social sharing

- **Metadata** is generated per-page via `buildMetadata()` in [`lib/seo.ts`](./lib/seo.ts)
- **Sitemap**: auto-generated at `/sitemap.xml` from all events, spotlights, and blog posts
- **robots.txt**: at `/robots.txt`
- **OpenGraph image**: auto-generated at `/opengraph-image` — appears when the site is shared on LinkedIn, WhatsApp, Twitter, Slack, etc.
- **JSON-LD `Organization` schema** is embedded in the root layout for Google rich results

To customize the OG image, edit [`app/opengraph-image.tsx`](./app/opengraph-image.tsx).

---

## Accessibility

- WCAG 2.1 AA target
- Semantic HTML (`<header>`, `<main>`, `<nav>`, `<article>`)
- Skip-to-content link
- Visible focus rings (`:focus-visible`)
- Respects `prefers-reduced-motion`
- All interactive icons have `aria-label`s

If you spot any a11y issues, please open an issue.

---

## Scripts

| Command           | What it does                                         |
| ----------------- | ---------------------------------------------------- |
| `npm run dev`     | Start the dev server on http://localhost:3000        |
| `npm run build`   | Production build                                     |
| `npm run start`   | Serve the production build locally                   |
| `npm run lint`    | Run ESLint                                           |
| `npm run typecheck` | Run TypeScript type checker                        |

---

## Pre-launch checklist

Before going live, replace these:

- [ ] Real Google Form URLs in `content/site.config.ts` → `forms`
- [ ] Real email + address in `content/site.config.ts` → `contact`
- [ ] Real social URLs in `content/site.config.ts` → `social`
- [ ] Real mission / vision / values / origin story
- [ ] Real impact stats
- [ ] Founder + current team in `content/leadership.ts` (photos in `public/images/team/`)
- [ ] Real upcoming events as `content/events/*.mdx`
- [ ] At least 2 member spotlights as `content/spotlights/*.mdx`
- [ ] Real partner names + logos in `content/partners.ts` (logos in `public/logos/`)
- [ ] Real testimonial quote (or hide that section)
- [ ] Replace the AIS logo SVG in `components/layout/Logo.tsx`
- [ ] Set `siteConfig.url` to the live domain
- [ ] Add a favicon: drop `favicon.ico` in `app/`

---

## License

© Africa Innovators Society. All content is property of AIS and CMU-Africa.

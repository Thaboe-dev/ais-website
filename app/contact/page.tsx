import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Container";
import { ContactRoutes, type ContactRoute } from "@/components/contact/ContactRoutes";
import { SocialCards } from "@/components/contact/SocialCards";
import { siteConfig } from "@/content/site.config";
import { Mail, MapPin } from "lucide-react";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact",
  path: "/contact",
  description:
    "Get in touch with the Africa Innovators Society — for membership, mentorship, sponsorship, or general enquiries.",
});

const contactRoutes: ContactRoute[] = [
  {
    key: "general",
    title: "General enquiries",
    description: "Got a question, a story, or just want to say hi? Drop us a message.",
    cta: "Open form",
    url: siteConfig.forms.general,
  },
  {
    key: "mentor",
    title: "Mentorship",
    description: "Operators, founders, and investors — apply to mentor the next generation of African founders.",
    cta: "Apply to mentor",
    url: siteConfig.forms.mentorship,
  },
  {
    key: "partner",
    title: "Sponsorship & partnership",
    description: "Companies, funds, and organisations who want to back AIS — let's build something together.",
    cta: "Start the conversation",
    url: siteConfig.forms.sponsorship,
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's start a conversation."
      />

      <Section className="!pt-4">
        <ContactRoutes routes={contactRoutes} />
      </Section>

      <Section className="bg-white border-y border-charcoal-100">
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-crimson-700 mb-3">
              Reach us directly
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-balance leading-tight">
              Old-school always works too.
            </h2>
            <p className="mt-4 text-charcoal-600 max-w-md">
              Prefer email? Want to walk into our office hours on campus? Here's where to find us.
            </p>

            <ul className="mt-8 space-y-5">
              <li className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-full bg-crimson-50 text-crimson-700 inline-flex items-center justify-center shrink-0">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-charcoal-500 font-semibold">Email</div>
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="text-charcoal-900 font-medium hover:text-crimson-700 transition-colors break-all"
                  >
                    {siteConfig.contact.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-full bg-crimson-50 text-crimson-700 inline-flex items-center justify-center shrink-0">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-charcoal-500 font-semibold">Where we are</div>
                  <div className="text-charcoal-900 font-medium">{siteConfig.contact.address}</div>
                </div>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-crimson-700 mb-3">
              On social
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-balance leading-tight">
              Come hang out where we hang out.
            </h2>
            <p className="mt-4 text-charcoal-600 max-w-md">
              The fastest way to keep up with AIS day-to-day — follow us across the channels you already use.
            </p>

            <SocialCards
              links={[
                ...(siteConfig.social.linkedin
                  ? [{ key: "linkedin" as const, url: siteConfig.social.linkedin }]
                  : []),
                ...(siteConfig.social.instagram
                  ? [{ key: "instagram" as const, url: siteConfig.social.instagram }]
                  : []),
                ...(siteConfig.social.twitter
                  ? [{ key: "twitter" as const, url: siteConfig.social.twitter }]
                  : []),
                ...(siteConfig.social.youtube
                  ? [{ key: "youtube" as const, url: siteConfig.social.youtube }]
                  : []),
              ]}
            />
          </div>
        </div>
      </Section>
    </>
  );
}

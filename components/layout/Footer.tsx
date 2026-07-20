import Link from "next/link";
import { Linkedin, Instagram, Twitter, Youtube, Mail, MapPin } from "lucide-react";
import { siteConfig } from "@/content/site.config";
import { Logo } from "./Logo";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 bg-charcoal-950 text-charcoal-200">
      <div className="container-page py-16 grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <div className="mb-5">
            <div className="inline-flex items-center justify-center bg-white rounded-xl px-4 py-3 shadow-[var(--shadow-soft)]">
              <Logo variant="full" className="h-9 w-auto" />
            </div>
            <div className="text-[11px] uppercase tracking-[0.18em] text-charcoal-400 mt-3">
              {siteConfig.affiliation}
            </div>
          </div>
          <p className="text-sm text-charcoal-300 max-w-sm leading-relaxed">
            {siteConfig.description}
          </p>
          <div className="flex items-center gap-3 mt-6">
            {siteConfig.social.linkedin && (
              <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-9 h-9 inline-flex items-center justify-center rounded-full bg-white/5 hover:bg-crimson-700 transition-colors">
                <Linkedin className="h-4 w-4" />
              </a>
            )}
            {siteConfig.social.instagram && (
              <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-9 h-9 inline-flex items-center justify-center rounded-full bg-white/5 hover:bg-crimson-700 transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
            )}
            {siteConfig.social.twitter && (
              <a href={siteConfig.social.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter / X" className="w-9 h-9 inline-flex items-center justify-center rounded-full bg-white/5 hover:bg-crimson-700 transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
            )}
            {siteConfig.social.youtube && (
              <a href={siteConfig.social.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="w-9 h-9 inline-flex items-center justify-center rounded-full bg-white/5 hover:bg-crimson-700 transition-colors">
                <Youtube className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>

        <div>
          <h3 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">Explore</h3>
          <ul className="space-y-2.5 text-sm">
            <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
            {siteConfig.features.showPrograms && (
              <li><Link href="/programs" className="hover:text-white transition-colors">Programs</Link></li>
            )}
            <li><Link href="/events" className="hover:text-white transition-colors">Events</Link></li>
            {siteConfig.features.showCommunity && (
              <li><Link href="/community" className="hover:text-white transition-colors">Community</Link></li>
            )}
            <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">Engage</h3>
          <ul className="space-y-2.5 text-sm">
            <li><a href={siteConfig.forms.membership} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Join AIS</a></li>
            <li><a href={siteConfig.forms.mentorship} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Become a Mentor</a></li>
            <li><a href={siteConfig.forms.sponsorship} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Sponsor AIS</a></li>
            <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">Reach us</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2.5">
              <Mail className="h-4 w-4 mt-0.5 shrink-0 text-crimson-400" />
              <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-white transition-colors break-all">{siteConfig.contact.email}</a>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-crimson-400" />
              <span className="text-charcoal-300">{siteConfig.contact.address}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page py-6 text-xs text-charcoal-400">
          <p>
            © {year} {siteConfig.name}. A student organisation at {siteConfig.affiliation}.
          </p>
        </div>
      </div>
    </footer>
  );
}

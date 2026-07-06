"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { siteConfig } from "@/content/site.config";
import { cn } from "@/lib/cn";
import { MobileNav } from "./MobileNav";
import { Logo } from "./Logo";

export const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/programs", label: "Programs" },
  { href: "/events", label: "Events" },
  { href: "/community", label: "Community" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // On the home page, the hero has a photo background — the header sits
  // over that photo when at the top of the page, and switches to the
  // normal cream-on-dark treatment once the user scrolls past the hero
  // OR the mobile menu opens (so the drawer visually connects to the header).
  const transparent = isHome && !scrolled && !mobileOpen;

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-[background-color,border-color,color] duration-300",
        transparent
          ? "bg-transparent border-b border-transparent text-white"
          : "bg-[var(--color-cream)]/85 backdrop-blur-md border-b border-charcoal-100 text-charcoal-900",
      )}
    >
      <div className="container-page flex items-center justify-between h-16 md:h-20">
        <Link
          href="/"
          className={cn(
            "flex items-center group",
            transparent && "drop-shadow-[0_1px_6px_rgba(0,0,0,0.45)]",
          )}
          aria-label={`${siteConfig.name} home`}
        >
          <Logo
            variant="mark"
            className="h-10 w-auto sm:hidden transition-transform group-hover:scale-105"
          />
          <Logo
            variant="full"
            className="hidden sm:block h-9 md:h-10 w-auto transition-transform group-hover:scale-[1.02]"
            priority
          />
        </Link>

        <nav aria-label="Primary" className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                transparent
                  ? "text-white/90 hover:text-white hover:bg-white/10"
                  : "text-charcoal-700 hover:text-crimson-700 hover:bg-crimson-50",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href={siteConfig.forms.membership}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "hidden sm:inline-flex items-center gap-1.5 rounded-full text-sm font-semibold px-4 py-2 transition-colors shadow-[var(--shadow-soft)]",
              transparent
                ? "bg-white text-charcoal-900 hover:bg-amber-soft hover:text-charcoal-900"
                : "bg-crimson-700 hover:bg-crimson-800 text-white",
            )}
          >
            Join AIS
          </Link>
          <MobileNav
            variant={transparent ? "onDark" : "onLight"}
            onOpenChange={setMobileOpen}
          />
        </div>
      </div>
    </header>
  );
}

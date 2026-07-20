"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { siteConfig } from "@/content/site.config";
import { navItems } from "@/lib/nav";
import { cn } from "@/lib/cn";
import { MobileNav } from "./MobileNav";
import { Logo } from "./Logo";

export { navItems };

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
          className="group inline-flex"
          aria-label={`${siteConfig.name} home`}
        >
          <span
            className={cn(
              "inline-flex items-center justify-center bg-white rounded-xl shadow-[var(--shadow-soft)] transition-all group-hover:shadow-[var(--shadow-strong)] group-hover:-translate-y-[1px]",
              // Tighter padding on mobile mark, slightly more on desktop full logo
              "p-1.5 sm:px-3 sm:py-2",
              transparent && "ring-1 ring-white/20",
            )}
          >
            <Logo variant="mark" className="h-8 w-auto sm:hidden" />
            <Logo variant="full" className="hidden sm:block h-7 md:h-8 w-auto" priority />
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => {
            const isEvents = item.href === "/events";
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href || pathname.startsWith(`${item.href}/`);

            if (isEvents) {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative ml-1 inline-flex items-center overflow-hidden rounded-full px-3.5 py-1.5 text-sm font-semibold transition-all",
                    "shadow-[var(--shadow-soft)] hover:-translate-y-px hover:shadow-[var(--shadow-strong)]",
                    transparent
                      ? "bg-white text-charcoal-900 hover:bg-amber-soft"
                      : "bg-crimson-700 text-white hover:bg-crimson-800",
                    isActive && transparent && "bg-amber-soft",
                  )}
                >
                  <span
                    aria-hidden
                    className={cn(
                      "pointer-events-none absolute inset-0 rounded-full",
                      "animate-[events-glow_2.4s_ease-in-out_infinite]",
                      transparent ? "ring-2 ring-white/70" : "ring-2 ring-crimson-400/70",
                    )}
                  />
                  <span className="relative">{item.label}</span>
                </Link>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  transparent
                    ? "text-white/90 hover:text-white hover:bg-white/10"
                    : "text-charcoal-700 hover:text-crimson-700 hover:bg-crimson-50",
                  isActive && !transparent && "text-crimson-700 bg-crimson-50",
                )}
              >
                {item.label}
              </Link>
            );
          })}
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

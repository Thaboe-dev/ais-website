"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { navItems } from "./Header";
import { siteConfig } from "@/content/site.config";
import { cn } from "@/lib/cn";

export function MobileNav({
  variant = "onLight",
  onOpenChange,
}: {
  variant?: "onLight" | "onDark";
  onOpenChange?: (open: boolean) => void;
}) {
  const [open, setOpen] = useState(false);
  const onDark = variant === "onDark" && !open;

  useEffect(() => {
    onOpenChange?.(open);
  }, [open, onOpenChange]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-md transition-colors",
          onDark
            ? "text-white hover:bg-white/15"
            : "text-charcoal-800 hover:bg-charcoal-100",
        )}
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {open && (
        <div
          id="mobile-nav"
          className="lg:hidden fixed inset-x-0 top-16 bottom-0 z-40 bg-[var(--color-cream)] border-t border-charcoal-100 overflow-y-auto"
        >
          <nav aria-label="Mobile" className="container-page py-8 flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="px-4 py-4 rounded-lg text-lg font-semibold text-charcoal-800 hover:bg-crimson-50 hover:text-crimson-700 transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={siteConfig.forms.membership}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="mt-6 inline-flex items-center justify-center rounded-full bg-crimson-700 hover:bg-crimson-800 text-white font-semibold px-6 py-3.5 transition-colors"
            >
              Join AIS
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}

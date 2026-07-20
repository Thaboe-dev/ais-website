import { siteConfig } from "@/content/site.config";

const allNavItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/programs", label: "Programs" },
  { href: "/events", label: "Events" },
  { href: "/community", label: "Community" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
] as const;

/** Primary navigation — omits routes hidden by feature flags. */
export const navItems = allNavItems.filter((item) => {
  if (item.href === "/community" && !siteConfig.features.showCommunity) return false;
  if (item.href === "/programs" && !siteConfig.features.showPrograms) return false;
  return true;
});

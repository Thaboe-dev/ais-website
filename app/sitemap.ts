import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/site.config";
import { getAllEvents, getAllSpotlights, getAllPosts } from "@/lib/content";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const base = siteConfig.url;

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/about",
    "/about/leadership",
    "/programs",
    "/events",
    ...(siteConfig.features.showCommunity ? (["/community"] as const) : []),
    "/contact",
    "/blog",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7,
  }));

  const eventRoutes: MetadataRoute.Sitemap = getAllEvents().map((e) => ({
    url: `${base}/events/${e.slug}`,
    lastModified: new Date(e.frontmatter.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const spotlightRoutes: MetadataRoute.Sitemap = siteConfig.features.showCommunity
    ? getAllSpotlights().map((s) => ({
        url: `${base}/community/spotlights/${s.slug}`,
        lastModified: now,
        changeFrequency: "yearly" as const,
        priority: 0.5,
      }))
    : [];

  const blogRoutes: MetadataRoute.Sitemap = getAllPosts().map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: new Date(p.frontmatter.date),
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticRoutes, ...eventRoutes, ...spotlightRoutes, ...blogRoutes];
}

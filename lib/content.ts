import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type EventFrontmatter = {
  title: string;
  date: string; // ISO datetime
  endDate?: string;
  location: string;
  description: string;
  cover?: string;
  gallery?: string[];
  registrationUrl?: string;
  speaker?: string;
  tags?: string[];
  featured?: boolean;
};

export type SpotlightFrontmatter = {
  name: string;
  role?: string;
  cohort?: string;
  venture?: string;
  photo?: string;
  excerpt: string;
  linkedin?: string;
  website?: string;
  tags?: string[];
};

export type BlogFrontmatter = {
  title: string;
  date: string;
  author: string;
  excerpt: string;
  cover?: string;
  tags?: string[];
};

export type ContentEntry<T> = {
  slug: string;
  frontmatter: T;
  content: string;
};

const CONTENT_ROOT = path.join(process.cwd(), "content");

function readDir(dir: string): string[] {
  const full = path.join(CONTENT_ROOT, dir);
  if (!fs.existsSync(full)) return [];
  return fs.readdirSync(full).filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));
}

function readEntry<T>(dir: string, file: string): ContentEntry<T> {
  const full = path.join(CONTENT_ROOT, dir, file);
  const raw = fs.readFileSync(full, "utf8");
  const { data, content } = matter(raw);
  const slug = file.replace(/\.mdx?$/, "");
  return { slug, frontmatter: data as T, content };
}

export function getAllEvents(): ContentEntry<EventFrontmatter>[] {
  return readDir("events")
    .map((f) => readEntry<EventFrontmatter>("events", f))
    .sort((a, b) => +new Date(b.frontmatter.date) - +new Date(a.frontmatter.date));
}

export function getEventBySlug(slug: string): ContentEntry<EventFrontmatter> | null {
  const file = readDir("events").find((f) => f.replace(/\.mdx?$/, "") === slug);
  if (!file) return null;
  return readEntry<EventFrontmatter>("events", file);
}

export function getAllSpotlights(): ContentEntry<SpotlightFrontmatter>[] {
  return readDir("spotlights").map((f) => readEntry<SpotlightFrontmatter>("spotlights", f));
}

export function getSpotlightBySlug(slug: string): ContentEntry<SpotlightFrontmatter> | null {
  const file = readDir("spotlights").find((f) => f.replace(/\.mdx?$/, "") === slug);
  if (!file) return null;
  return readEntry<SpotlightFrontmatter>("spotlights", file);
}

export function getAllPosts(): ContentEntry<BlogFrontmatter>[] {
  return readDir("blog")
    .map((f) => readEntry<BlogFrontmatter>("blog", f))
    .sort((a, b) => +new Date(b.frontmatter.date) - +new Date(a.frontmatter.date));
}

export function getPostBySlug(slug: string): ContentEntry<BlogFrontmatter> | null {
  const file = readDir("blog").find((f) => f.replace(/\.mdx?$/, "") === slug);
  if (!file) return null;
  return readEntry<BlogFrontmatter>("blog", file);
}

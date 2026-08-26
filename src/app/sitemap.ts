import type { MetadataRoute } from "next";
import { posts } from "@/lib/blog";
import { mediaArticles } from "@/lib/data";

export const dynamic = "force-static";

/**
 * Same fallback pattern as layout.tsx's OG image: once a custom domain is
 * decided (see CLAUDE.md "Deploy target"), set NEXT_PUBLIC_SITE_URL and this
 * picks it up automatically. Until then it defaults to the GitHub Pages
 * project URL the deploy workflow actually publishes to.
 */
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? `https://indragiri-ai.github.io${BASE_PATH}`
).replace(/\/$/, "");

const staticRoutes = [
  "",
  "/ai",
  "/ai/training",
  "/ai/research-policy",
  "/ai/research-workflow",
  "/blog",
  "/gallery",
  "/journey",
  "/projects",
  "/publications",
  "/research",
  "/teaching",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const pages = staticRoutes.map((path) => ({
    url: `${SITE_URL}${path}/`,
    lastModified,
  }));

  const blogPages = posts.map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}/`,
    lastModified,
  }));

  const pressPages = mediaArticles.map((m) => ({
    url: `${SITE_URL}/publications/press/${m.slug}/`,
    lastModified,
  }));

  return [...pages, ...blogPages, ...pressPages];
}

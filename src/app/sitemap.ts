import type { MetadataRoute } from "next";
import { posts } from "@/lib/blog";
import { mediaArticles } from "@/lib/data";
import { absUrl } from "@/lib/site";

export const dynamic = "force-static";

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
  // Static pages have no tracked edit date, so lastModified is left out rather
  // than reporting the build time as if the page had just changed.
  const pages = staticRoutes.map((path) => ({ url: absUrl(path) }));

  const blogPages = posts.map((p) => ({
    url: absUrl(`/blog/${p.slug}`),
    lastModified: new Date(p.modified ?? p.date),
  }));

  const pressPages = mediaArticles.map((m) => {
    const d = new Date(m.date);
    return {
      url: absUrl(`/publications/press/${m.slug}`),
      ...(Number.isNaN(d.getTime()) ? {} : { lastModified: d }),
    };
  });

  return [...pages, ...blogPages, ...pressPages];
}

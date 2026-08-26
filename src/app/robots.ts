import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? `https://indragiri-ai.github.io${BASE_PATH}`
).replace(/\/$/, "");

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}

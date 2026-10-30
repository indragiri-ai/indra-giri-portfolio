import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

// One rule for every crawler. AI crawlers (GPTBot, ClaudeBot, PerplexityBot,
// Google-Extended) are deliberately NOT blocked: being cited by AI assistants
// is a goal of the site.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}

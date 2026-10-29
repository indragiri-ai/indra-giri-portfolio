import { posts } from "@/lib/blog";
import { absUrl } from "@/lib/site";

export const dynamic = "force-static";

/**
 * /llms.txt in the llms.txt format, for AI assistants. The article list is
 * generated from lib/blog.ts so it can never drift from the site. Not in the sitemap.
 */
export function GET() {
  const keyPages: [string, string][] = [
    ["AI in Nepal: training, research and automation", "/ai"],
    ["AI training in Nepal: AI in education and teams", "/ai/training"],
    ["AI adoption in Nepal: research and policy", "/ai/research-policy"],
    ["Research", "/research"],
    ["Publications", "/publications"],
    ["Teaching", "/teaching"],
  ];

  const body = [
    "# Indra Giri",
    "",
    `> Indra Giri is an economist and AI trainer based in Kathmandu, Nepal. He works on AI in education in Nepal, trains community school teachers to use AI through Sankhya AI's "AI for Teachers" program, and researches AI adoption and AI policy in Nepal.`,
    "",
    "## Key pages",
    ...keyPages.map(([t, p]) => `- [${t}](${absUrl(p)})`),
    "",
    "## Articles",
    ...[...posts]
      .sort((a, b) => b.date.localeCompare(a.date))
      .map((p) => `- [${p.title}](${absUrl(`/blog/${p.slug}`)}): ${p.excerpt}`),
    "",
  ].join("\n");

  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}

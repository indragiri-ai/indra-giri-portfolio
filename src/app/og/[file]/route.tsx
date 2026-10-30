import { ImageResponse } from "next/og";
import { posts, getPost } from "@/lib/blog";
import { OG_SIZE, ogColors, ogFont } from "@/lib/og";

/**
 * Social share card for each blog post, written at build time to
 * /og/<slug>.png. The folder segment is "<slug>.png" (not a bare slug) so the
 * static export emits a real .png file: GitHub Pages sets the image content
 * type from the extension, and link scrapers rely on it. New posts in
 * lib/blog.ts get a card automatically.
 */
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((p) => ({ file: `${p.slug}.png` }));
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ file: string }> },
) {
  const { file } = await params;
  const post = getPost(file.replace(/\.png$/, ""));
  if (!post) return new Response("Not found", { status: 404 });
  const c = ogColors();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: c.bg,
          color: c.fg,
          padding: "64px 80px",
          fontFamily: "Fraunces",
        }}
      >
        <div style={{ display: "flex", fontSize: 44, letterSpacing: -0.5 }}>
          <span>Indra&nbsp;</span>
          <span style={{ color: c.gold }}>Giri</span>
        </div>

        <div
          style={{
            display: "block",
            fontSize: 68,
            lineHeight: 1.12,
            letterSpacing: -1,
            lineClamp: 3,
          }}
        >
          {post.title}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 34,
            borderTop: `1px solid ${c.rule}`,
            paddingTop: 28,
          }}
        >
          <span style={{ color: c.fgSoft }}>indragiri.com.np</span>
          <span style={{ color: c.gold }}>{post.category}</span>
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts: [{ name: "Fraunces", data: ogFont(), weight: 600, style: "normal" }] },
  );
}

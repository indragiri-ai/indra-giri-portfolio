import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { posts, getPost } from "@/lib/blog";
import { profile } from "@/lib/data";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: `Blog | ${profile.name}` };
  return {
    title: `${post.title} | ${profile.name}`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date));
  const idx = sorted.findIndex((p) => p.slug === post.slug);
  const next = sorted[idx + 1] ?? sorted[0];

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-3xl px-6 pb-28 pt-36 sm:px-10 lg:pt-44">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted transition-colors hover:text-accent-text"
        >
          <IconArrowLeft size={14} /> All articles
        </Link>

        <header className="mt-10">
          <div className="flex flex-wrap items-center gap-3 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-muted">
            <span className="text-accent-text">{post.category}</span>
            <span>·</span>
            <span>{post.displayDate}</span>
            <span>·</span>
            <span>{post.readTime}</span>
          </div>
          <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.1] tracking-tight text-fg sm:text-5xl">
            {post.title}
          </h1>
          <p className="mt-6 border-l-2 border-accent pl-5 text-lg leading-relaxed text-muted">
            {post.excerpt}
          </p>
        </header>

        <figure className="mt-10 overflow-hidden rounded-2xl border border-line/10 bg-surface">
          <img
            src={post.cover}
            alt={post.coverAlt}
            className="aspect-[21/10] w-full object-cover"
          />
        </figure>

        <article className="article-body mt-12">
          {post.sections.map((s, i) => (
            <section key={i}>
              {s.heading && <h2>{s.heading}</h2>}
              {s.paragraphs.map((p, j) => (
                <p key={j}>{p}</p>
              ))}
            </section>
          ))}
        </article>

        {/* tags */}
        <div className="mt-12 flex flex-wrap gap-2">
          {post.tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-line/15 px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.1em] text-muted"
            >
              {t}
            </span>
          ))}
        </div>

        {/* author */}
        <div className="panel mt-14 flex flex-col gap-5 p-7 sm:flex-row sm:items-center">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-accent/40 bg-accent/10 font-display text-lg font-semibold text-accent-text">
            {profile.initials}
          </div>
          <div className="flex-1">
            <div className="font-display text-lg font-semibold text-fg">{profile.name}</div>
            <p className="mt-1 text-sm leading-relaxed text-muted">{profile.tagline}</p>
          </div>
          <Link href="/#contact" className="btn-ghost whitespace-nowrap !px-6 !py-3">
            Get in touch
          </Link>
        </div>

        {/* next article */}
        {next && next.slug !== post.slug && (
          <Link
            href={`/blog/${next.slug}`}
            className="group mt-8 flex items-center justify-between rounded-2xl border border-line/10 bg-surface p-7 transition-colors hover:border-accent/40"
          >
            <div>
              <div className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-muted">
                Read next
              </div>
              <div className="mt-2 font-display text-xl font-semibold text-fg transition-colors group-hover:text-accent-text">
                {next.title}
              </div>
            </div>
            <IconArrowRight
              size={20}
              className="shrink-0 text-accent-text transition-transform group-hover:translate-x-1"
            />
          </Link>
        )}
      </main>
      <Footer />
    </>
  );
}

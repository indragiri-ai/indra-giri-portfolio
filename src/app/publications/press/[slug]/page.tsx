import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { IconArrowLeft, IconNews } from "@tabler/icons-react";
import { profile, mediaArticles } from "@/lib/data";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export function generateStaticParams() {
  return mediaArticles.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = mediaArticles.find((m) => m.slug === slug);
  if (!article) return { title: `Publications | ${profile.name}` };
  return {
    title: `${article.title} | ${profile.name}`,
    description: `${article.venue} · ${article.meta}`,
  };
}

export default async function PressArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = mediaArticles.find((m) => m.slug === slug);
  if (!article) notFound();

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-3xl px-6 pb-28 pt-36 sm:px-10 lg:pt-44">
        <Link
          href="/publications"
          className="inline-flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted transition-colors hover:text-accent-text"
        >
          <IconArrowLeft size={14} /> All publications
        </Link>

        <header className="mt-10">
          <div className="flex flex-wrap items-center gap-3 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-muted">
            <span className="inline-flex items-center gap-2 text-accent-text">
              <IconNews size={13} /> {article.venue}
            </span>
            <span>·</span>
            <span>{article.meta}</span>
          </div>
          <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.1] tracking-tight text-fg sm:text-5xl">
            {article.title}
          </h1>
        </header>

        <article className="article-body mt-12">
          {article.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </article>

        <p className="mt-12 border-t border-line/10 pt-6 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-muted">
          Published in {article.venue}, {article.place} · {article.date}
        </p>

        <div className="mt-14">
          <Link href="/publications" className="btn-ghost">
            Back to publications
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}

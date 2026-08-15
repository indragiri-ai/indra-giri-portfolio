import type { Metadata } from "next";
import Link from "next/link";
import { IconArrowRight } from "@tabler/icons-react";
import { posts, blogIntro } from "@/lib/blog";
import { profile } from "@/lib/data";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Reveal from "@/components/ui/Reveal";
import { asset } from "@/lib/utils";

export const metadata: Metadata = {
  title: `Blog & Articles | ${profile.name}`,
  description: blogIntro,
};

export default function BlogPage() {
  const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date));
  const [featured, ...rest] = sorted;

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-content px-6 pb-28 pt-36 sm:px-10 lg:pt-44">
        <Reveal>
          <div className="fig-label mb-5">Writing</div>
          <h1 className="font-display text-5xl font-semibold leading-[1.05] tracking-tight text-fg sm:text-6xl lg:text-7xl">
            Blog & <em className="italic text-accent-text">articles</em>
          </h1>
          <p className="mt-6 max-w-2xl leading-relaxed text-muted">{blogIntro}</p>
        </Reveal>

        {/* featured post */}
        {featured && (
          <Reveal delay={0.08}>
            <Link
              href={`/blog/${featured.slug}`}
              className="group mt-16 grid grid-cols-1 overflow-hidden rounded-2xl border border-accent/25 bg-surface transition-colors hover:border-accent/50 lg:grid-cols-[1.05fr_1fr]"
            >
              <div className="relative overflow-hidden">
                <img
                  src={asset(featured.cover)}
                  alt={featured.coverAlt}
                  className="aspect-[16/10] h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] lg:aspect-auto lg:min-h-full"
                />
                <span className="absolute left-5 top-5 rounded-full border border-accent/40 bg-bg/70 px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-accent-text backdrop-blur">
                  Latest
                </span>
              </div>
              <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-12">
                <div className="mb-5 flex flex-wrap items-center gap-3 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-muted">
                  <span className="text-accent-text">{featured.category}</span>
                  <span>·</span>
                  <span>{featured.displayDate}</span>
                  <span>·</span>
                  <span>{featured.readTime}</span>
                </div>
                <h2 className="font-display text-3xl font-semibold leading-snug text-fg transition-colors group-hover:text-accent-text sm:text-4xl">
                  {featured.title}
                </h2>
                <p className="mt-4 leading-relaxed text-muted">{featured.excerpt}</p>
                <span className="btn-primary mt-8 self-start whitespace-nowrap">
                  Read article <IconArrowRight size={15} />
                </span>
              </div>
            </Link>
          </Reveal>
        )}

        {/* the rest */}
        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((p, i) => (
            <Reveal key={p.slug} delay={0.1 + i * 0.05}>
              <Link
                href={`/blog/${p.slug}`}
                className="panel group flex h-full flex-col overflow-hidden transition-colors hover:border-accent/40"
              >
                <div className="overflow-hidden border-b border-line/10">
                  <img
                    src={asset(p.cover)}
                    alt={p.coverAlt}
                    className="aspect-[16/10] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <div className="mb-4 flex flex-wrap items-center gap-3 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-muted">
                    <span className="text-accent-text">{p.category}</span>
                    <span>·</span>
                    <span>{p.displayDate}</span>
                  </div>
                  <h3 className="font-display text-xl font-semibold leading-snug text-fg transition-colors group-hover:text-accent-text">
                    {p.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{p.excerpt}</p>
                  <div className="mt-5 flex items-center justify-between border-t border-line/10 pt-4 font-mono text-[0.62rem] uppercase tracking-[0.15em] text-muted">
                    {p.readTime}
                    <IconArrowRight
                      size={15}
                      className="text-accent-text transition-transform group-hover:translate-x-1"
                    />
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}

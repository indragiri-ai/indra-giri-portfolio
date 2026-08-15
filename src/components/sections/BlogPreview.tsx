import Link from "next/link";
import { IconArrowRight } from "@tabler/icons-react";
import { posts } from "@/lib/blog";
import SectionHead from "@/components/ui/SectionHead";
import Reveal from "@/components/ui/Reveal";
import { asset } from "@/lib/utils";

export default function BlogPreview() {
  const latest = [...posts].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);

  return (
    <section id="writing" className="border-y border-line/10 bg-surface/40">
      <div className="mx-auto max-w-content px-6 py-20 sm:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead
            fig="08"
            tag="Writing"
            title={
              <>
                Blog & <em>articles</em>
              </>
            }
            intro="Essays and field notes on AI, research methods and Nepal's data driven future."
          />
          <Reveal className="pb-12">
            <Link
              href="/blog"
              className="btn-ghost whitespace-nowrap"
            >
              View all articles <IconArrowRight size={15} />
            </Link>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {latest.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.07}>
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
                  <div className="mb-4 flex items-center gap-3 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-muted">
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
      </div>
    </section>
  );
}

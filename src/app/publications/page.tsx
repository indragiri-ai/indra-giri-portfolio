import type { Metadata } from "next";
import Link from "next/link";
import { IconExternalLink } from "@tabler/icons-react";
import {
  profile,
  featuredPaper,
  workingPapers,
  conferencePapers,
  mediaArticles,
} from "@/lib/data";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/ui/PageHeader";
import Reveal from "@/components/ui/Reveal";

const intro =
  "Peer-reviewed and working papers, conference presentations and writing in the national press. Where the research ends up once the fieldwork is done.";

export const metadata: Metadata = {
  title: `Publications | ${profile.name}`,
  description: intro,
};

export default function PublicationsPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-content px-6 pb-28 pt-36 sm:px-10 lg:pt-44">
        <PageHeader
          backHref="/#publications"
          eyebrow="Publications"
          title={
            <>
              Papers, ideas &amp; <em>public voice</em>
            </>
          }
          intro={intro}
        />

        {/* Featured paper */}
        <Reveal delay={0.06}>
          <div className="relative mt-14 overflow-hidden rounded-2xl border border-accent/30 bg-surface p-8 sm:p-10">
            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/15 blur-[70px]" />
            <div className="relative z-10">
              <div className="mb-5 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-accent-text">
                Featured working paper · arXiv 2602.00138
              </div>
              <h2 className="mb-4 max-w-3xl font-display text-2xl font-bold leading-snug text-fg sm:text-3xl">
                {featuredPaper.title}
              </h2>
              <p className="mb-7 max-w-2xl text-sm leading-loose text-muted">{featuredPaper.desc}</p>

              <div className="mb-8 flex flex-wrap gap-x-8 gap-y-4">
                {featuredPaper.coauthors.map((a) => (
                  <div key={a.name} className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-accent/40 font-mono text-xs font-semibold text-accent-text">
                      {a.initials}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-fg">{a.name}</div>
                      <div className="font-mono text-[0.62rem] uppercase tracking-[0.08em] text-muted">
                        {a.aff}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <a
                href={featuredPaper.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Read on arXiv <IconExternalLink size={15} />
              </a>
            </div>
          </div>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-x-10 gap-y-12 md:grid-cols-3">
          <Reveal>
            <div className="fig-label mb-6">Working &amp; research papers</div>
            <ul>
              {workingPapers.map((w) => (
                <li
                  key={w.title}
                  className="group border-t border-line/10 py-5 first:border-t-0 first:pt-0"
                >
                  <div className="font-display text-lg font-bold leading-snug text-fg transition-colors group-hover:text-accent-text">
                    {w.title}
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">
                    {w.venue && <span className="text-accent-text">{w.venue} · </span>}
                    {w.meta}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {w.chips.map((c) => (
                      <span
                        key={c}
                        className="rounded-full border border-line/15 px-2.5 py-0.5 font-mono text-[0.58rem] uppercase tracking-[0.1em] text-muted"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="fig-label mb-6">Conference papers</div>
            <ul>
              {conferencePapers.map((c) => (
                <li
                  key={c.title}
                  className="group border-t border-line/10 py-5 first:border-t-0 first:pt-0"
                >
                  <div className="font-display text-lg font-bold leading-snug text-fg transition-colors group-hover:text-accent-text">
                    {c.title}
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">
                    <span className="text-accent-text">{c.venue}</span> · {c.meta}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="fig-label mb-6">In the media</div>
            <ul>
              {mediaArticles.map((m) => (
                <li
                  key={m.title}
                  className="group border-t border-line/10 py-5 first:border-t-0 first:pt-0"
                >
                  <div className="font-display text-lg font-bold leading-snug text-fg transition-colors group-hover:text-accent-text">
                    {m.title}
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">
                    <span className="text-accent-text">{m.venue}</span> · {m.meta}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.16}>
          <p className="mt-14 max-w-3xl border-l-2 border-accent pl-6 text-sm leading-loose text-muted">
            Collaborating with researchers at{" "}
            <strong className="font-semibold text-fg">Stanford&apos;s Hoover Institution</strong>,
            presenting at national economic forums, and publishing op-eds shaping Nepal&apos;s{" "}
            <strong className="font-semibold text-fg">AI &amp; digital policy</strong> conversation.
          </p>
        </Reveal>

        <Reveal>
          <div className="mt-16">
            <Link href="/#publications" className="btn-ghost">
              Back to the site
            </Link>
          </div>
        </Reveal>
      </main>
      <Footer />
    </>
  );
}

"use client";

import { IconExternalLink } from "@tabler/icons-react";
import { featuredPaper, workingPapers, conferencePapers, mediaArticles } from "@/lib/data";
import SectionHead from "@/components/ui/SectionHead";
import Reveal from "@/components/ui/Reveal";
import MagneticButton from "@/components/ui/MagneticButton";

export default function Publications() {
  return (
    <section id="publications" className="mx-auto max-w-content px-6 py-28 sm:px-10">
      <SectionHead
        fig="05"
        tag="Bibliography"
        title={
          <>
            Papers, ideas &<br />
            <em>public voice</em>
          </>
        }
      />

      {/* featured paper */}
      <Reveal>
        <div className="relative mb-12 overflow-hidden rounded-2xl border border-accent/30 bg-surface p-8 sm:p-10">
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/15 blur-[70px]" />
          <div className="relative z-10">
            <div className="mb-5 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-accent-text">
              ★ Featured working paper · arXiv 2602.00138
            </div>
            <h3 className="mb-4 max-w-3xl font-display text-2xl font-bold leading-snug text-fg sm:text-3xl">
              {featuredPaper.title}
            </h3>
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

            <MagneticButton className="inline-block">
              <a
                href={featuredPaper.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 font-mono text-xs font-semibold uppercase tracking-[0.12em] text-accent-ink transition-shadow hover:shadow-[0_12px_36px_rgb(var(--accent)/0.35)]"
              >
                Read on arXiv <IconExternalLink size={15} />
              </a>
            </MagneticButton>
          </div>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        <Reveal>
          <div className="fig-label mb-6">Working & research papers</div>
          {workingPapers.map((w) => (
            <div key={w.title} className="group border-b border-line/10 py-5 transition-all hover:pl-2">
              <div className="mb-1.5 font-display text-lg font-bold leading-snug text-fg group-hover:text-accent-text">
                {w.title}
              </div>
              <p className="text-sm leading-relaxed text-muted">
                {w.venue && <span className="text-accent-text">{w.venue}</span>}
                {w.venue && " — "}
                {w.meta}
              </p>
              <div className="mt-2.5 flex gap-2">
                {w.chips.map((c) => (
                  <span
                    key={c}
                    className="rounded-full border border-line/15 px-2.5 py-0.5 font-mono text-[0.58rem] uppercase tracking-[0.1em] text-muted"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          ))}

          <div className="fig-label mb-6 mt-10">Conference papers</div>
          {conferencePapers.map((c) => (
            <div key={c.title} className="group border-b border-line/10 py-5 transition-all last:border-0 hover:pl-2">
              <div className="mb-1 font-display text-lg font-bold leading-snug text-fg group-hover:text-accent-text">
                {c.title}
              </div>
              <p className="text-sm text-muted">
                <span className="text-accent-text">{c.venue}</span> · {c.meta}
              </p>
            </div>
          ))}
        </Reveal>

        <Reveal delay={0.08}>
          <div className="fig-label mb-6">In the media</div>
          {mediaArticles.map((m) => (
            <div key={m.title} className="group border-b border-line/10 py-5 transition-all hover:pl-2">
              <div className="mb-1 font-display text-lg font-bold leading-snug text-fg group-hover:text-accent-text">
                {m.title}
              </div>
              <p className="text-sm text-muted">
                <span className="text-accent-text">{m.venue}</span> · {m.meta}
              </p>
            </div>
          ))}

          <div className="fig-label mb-6 mt-10">Recognition</div>
          <p className="text-sm leading-loose text-muted">
            Collaborating with researchers at{" "}
            <strong className="font-semibold text-fg">Stanford&apos;s Hoover Institution</strong>,
            presenting at national economic forums, and publishing op-eds shaping Nepal&apos;s{" "}
            <strong className="font-semibold text-fg">AI &amp; digital policy</strong> conversation.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { IconArrowRight, IconCalendar } from "@tabler/icons-react";
import { teachingMetrics, universities, trainings } from "@/lib/data";
import SectionHead from "@/components/ui/SectionHead";
import Reveal from "@/components/ui/Reveal";

export default function Teaching() {
  return (
    <section id="teaching" className="mx-auto max-w-content px-6 py-20 sm:px-10">
      <SectionHead
        fig="04"
        tag="Teaching"
        title={
          <>
            Educating the <em>next generation</em>
          </>
        }
        intro="From university lecture halls to professional AI workshops. Economics, research methods, data analysis and the tools of modern evidence based work."
      />

      <Reveal>
        <div className="mb-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line/10 bg-line/10 md:grid-cols-4">
          {teachingMetrics.map((m) => (
            <div key={m.label} className="bg-surface px-6 py-6 text-center">
              <div className="font-display text-4xl font-bold text-accent-text">{m.num}</div>
              <div className="mt-1.5 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-muted">
                {m.label}
              </div>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal>
        <div className="fig-label mb-6">University faculty</div>
      </Reveal>
      <div className="mb-16">
        {universities.map((u, i) => (
          <Reveal key={u.name} delay={i * 0.05}>
            <div className="group grid grid-cols-1 gap-4 border-t border-line/10 py-7 transition-colors last:border-b hover:bg-surface/60 sm:grid-cols-[1.2fr_0.8fr_1fr] sm:items-center sm:gap-6 sm:px-4">
              <div>
                <h3 className="font-display text-xl font-bold text-fg transition-colors group-hover:text-accent-text">
                  {u.name}
                </h3>
                <div className="mt-0.5 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-muted">
                  {u.aff}
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <span className="font-semibold text-fg">{u.role}</span>
                <span className="inline-flex items-center gap-1.5 font-mono text-xs text-muted">
                  <IconCalendar size={13} className="text-accent-text" />
                  {u.period}
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5 sm:justify-end">
                {u.courses.map((c) => (
                  <span
                    key={c}
                    className="rounded-full border border-line/15 px-2.5 py-1 font-mono text-[0.58rem] uppercase tracking-[0.08em] text-muted"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Three programs as a taster; the full set lives on /training. Five
          cards across one row squeezed each into a column too narrow to read. */}
      <Reveal>
        <div className="fig-label mb-6">Training &amp; workshops · Sankhya AI</div>
      </Reveal>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {trainings.slice(0, 3).map((t, i) => (
          <Reveal key={t.title} delay={i * 0.06}>
            <div className="group h-full rounded-2xl border border-accent/25 bg-accent/[0.06] p-7 transition-all hover:-translate-y-1 hover:border-accent/60">
              <div className="mb-4 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-accent-text">
                W·0{i + 1}
              </div>
              <h3 className="font-display text-xl font-bold leading-snug text-fg">{t.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{t.sub}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.18}>
        <div className="mt-12 flex flex-wrap items-center gap-6 border-t border-line/10 pt-8">
          <Link href="/training" className="btn-primary">
            All {trainings.length} programs <IconArrowRight size={15} />
          </Link>
          <p className="max-w-md text-sm leading-relaxed text-muted">
            Generative AI, analytics, survey design and Excel, delivered to
            professionals, faculty and student cohorts.
          </p>
        </div>
      </Reveal>
    </section>
  );
}

"use client";

import Link from "next/link";
import { IconArrowRight, IconCalendar } from "@tabler/icons-react";
import { teachingMetrics, universities } from "@/lib/data";
import SectionHead from "@/components/ui/SectionHead";
import Reveal from "@/components/ui/Reveal";

export default function Teaching() {
  return (
    <section id="teaching" className="mx-auto max-w-content px-6 py-20 sm:px-10">
      <SectionHead
        fig="05"
        tag="Teaching"
        title={
          <>
            Educating the <em>next generation</em>
          </>
        }
        intro="University lecture halls: economics, research methods, data analysis and the tools of modern evidence based work."
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

      <Reveal delay={0.1}>
        <div className="border-t border-line/10 pt-8">
          <Link href="/teaching" className="btn-primary">
            Full teaching story <IconArrowRight size={15} />
          </Link>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
            University faculty roles across {universities.length} institutions.
            AI training and workshop programs are on the AI practice page.
          </p>
        </div>
      </Reveal>
    </section>
  );
}

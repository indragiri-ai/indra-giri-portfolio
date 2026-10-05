"use client";

import Link from "next/link";
import { IconArrowRight } from "@tabler/icons-react";
import { teachingMetrics, universities } from "@/lib/data";
import SectionHead from "@/components/ui/SectionHead";
import Reveal from "@/components/ui/Reveal";
import UniversityList from "@/components/ui/UniversityList";

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
              <div className="mt-1.5 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-muted">
                {m.label}
              </div>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal>
        <div className="fig-label mb-6">University faculty</div>
      </Reveal>
      <UniversityList />

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

"use client";

import { tools, researchMethods, analyticalTechniques, languages } from "@/lib/data";
import SectionHead from "@/components/ui/SectionHead";
import Reveal from "@/components/ui/Reveal";

function ChipCloud({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2.5">
      {items.map((label) => (
        <span
          key={label}
          className="rounded-full border border-line/15 bg-surface px-4 py-2 font-mono text-[0.68rem] uppercase tracking-[0.1em] text-fg transition-all hover:-translate-y-0.5 hover:border-accent hover:text-accent-text"
        >
          {label}
        </span>
      ))}
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-content px-6 py-20 sm:px-10">
      <SectionHead
        fig="04"
        tag="Skills"
        title={
          <>
            The analytical <em>toolkit</em>
          </>
        }
        intro="Statistical software, AI tools, research methods and analytical techniques. The instruments behind every evidence based decision."
      />

      {/* Stacked bands rather than two tall columns. The old side-by-side
          layout left a hole under Languages because the software list was
          always taller than the chip stack, and no amount of tuning fixes an
          imbalance that depends on how many tools there are. */}
      <Reveal>
        <div className="fig-label mb-6">Software &amp; AI proficiency</div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {tools.map((t) => (
            <div
              key={t.name}
              className="panel flex h-full flex-col p-5 transition-colors hover:border-accent/40"
            >
              <div className="font-mono text-[0.58rem] uppercase tracking-[0.18em] text-accent-text">
                {t.tier}
              </div>
              <div className="mt-2 font-display text-lg font-bold leading-snug text-fg">
                {t.name}
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted">{t.use}</p>
            </div>
          ))}
        </div>
      </Reveal>

      <div className="mt-14 grid grid-cols-1 gap-12 md:grid-cols-2">
        <Reveal delay={0.05}>
          <div className="fig-label mb-5">Research methods</div>
          <ChipCloud items={researchMethods} />
        </Reveal>
        <Reveal delay={0.1}>
          <div className="fig-label mb-5">Analytical techniques</div>
          <ChipCloud items={analyticalTechniques} />
        </Reveal>
      </div>

      <Reveal delay={0.15}>
        <div className="mt-14">
          <div className="fig-label mb-5">Languages</div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {languages.map((l) => (
              <div key={l.name} className="panel flex items-baseline justify-between px-5 py-4">
                <span className="font-display text-lg font-bold text-fg">{l.name}</span>
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.15em] text-accent-text">
                  {l.level}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

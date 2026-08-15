"use client";

import Link from "next/link";
import { IconSchool, IconBulb, IconRobot, IconArrowRight, type Icon } from "@tabler/icons-react";
import { aiPractice } from "@/lib/data";
import { aiServices } from "@/lib/ai";
import SectionHead from "@/components/ui/SectionHead";
import Reveal from "@/components/ui/Reveal";

const icons: Record<string, Icon> = {
  school: IconSchool,
  bulb: IconBulb,
  robot: IconRobot,
};

export default function AIPractice() {
  return (
    <section id="ai" className="border-y border-line/10 bg-surface/40">
      <div className="mx-auto max-w-content px-6 py-20 sm:px-10">
        <SectionHead
          fig="02"
          tag="AI Practice"
          title={
            <>
              Artificial intelligence,
              <br />
              applied with <em>rigour</em>
            </>
          }
          intro={aiPractice.intro}
        />

        {/* offerings */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {aiPractice.offerings.map((o, i) => {
            const IconCmp = icons[o.icon] ?? IconRobot;
            return (
              <Reveal key={o.title} delay={i * 0.07}>
                {/* Each offering now opens its own page under /ai */}
                <Link
                  href={`/ai/${aiServices[i]?.slug ?? ""}`}
                  className="panel group flex h-full flex-col p-7 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40"
                >
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 text-accent-text">
                    <IconCmp size={22} stroke={1.6} />
                  </div>
                  <h3 className="font-display text-xl font-semibold leading-snug text-fg transition-colors group-hover:text-accent-text">
                    {o.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{o.desc}</p>
                  <ul className="mt-5 flex flex-1 flex-col gap-2.5 border-t border-line/10 pt-5">
                    {o.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-2.5 text-sm text-muted">
                        <span className="mt-[0.45rem] h-1 w-1 shrink-0 rounded-full bg-accent" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-6 inline-flex items-center gap-2 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-accent-text transition-transform group-hover:translate-x-1">
                    Learn more <IconArrowRight size={13} />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>

        {/* toolkit */}
        <Reveal delay={0.1}>
          <div className="fig-label mb-5 mt-14">AI toolkit</div>
          <div className="flex flex-wrap gap-2.5">
            {aiPractice.toolkit.map((t) => (
              <span
                key={t}
                className="rounded-full border border-line/15 bg-surface px-4 py-2 font-mono text-[0.68rem] uppercase tracking-[0.1em] text-fg transition-colors hover:border-accent hover:text-accent-text"
              >
                {t}
              </span>
            ))}
          </div>
        </Reveal>

        {/* proof points */}
        <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line/10 bg-line/10 md:grid-cols-3">
          {aiPractice.highlights.map((h, i) => (
            <Reveal key={h.label} delay={0.12 + i * 0.06} className="h-full">
              <div className="h-full bg-surface p-7">
                <div className="mb-3 font-mono text-[0.6rem] uppercase tracking-[0.22em] text-accent-text">
                  {h.label}
                </div>
                <p className="text-sm leading-relaxed text-muted">{h.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-12 flex flex-wrap items-center gap-6 border-t border-line/10 pt-8">
            <Link href="/ai" className="btn-primary">
              Explore the AI practice <IconArrowRight size={15} />
            </Link>
            <p className="max-w-md text-sm leading-relaxed text-muted">
              Training programs, the Kathmandu AI readiness report, and how AI
              runs inside the research workflow.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

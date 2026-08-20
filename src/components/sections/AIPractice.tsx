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

        {/* offerings: brighter than the site's other cards on purpose. This
            is the section that should feel alive, not just informative, so
            each card carries its own tinted gradient wash, a glowing icon
            badge and a stronger lift on hover instead of the flat .panel
            treatment used everywhere else. */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {aiPractice.offerings.map((o, i) => {
            const IconCmp = icons[o.icon] ?? IconRobot;
            return (
              <Reveal key={o.title} delay={i * 0.07}>
                {/* Each offering now opens its own page under /ai */}
                <Link
                  href={`/ai/${aiServices[i]?.slug ?? ""}`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-accent/20 bg-gradient-to-b from-accent/[0.09] via-surface to-surface p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/60 hover:shadow-[0_24px_60px_-20px_rgb(var(--accent)/0.45)]"
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent/25 blur-3xl transition-opacity duration-300 group-hover:opacity-100"
                  />
                  <div className="relative mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-accent/40 bg-accent text-accent-ink shadow-[0_10px_30px_-8px_rgb(var(--accent)/0.6)] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <IconCmp size={26} stroke={1.7} />
                  </div>
                  <h3 className="relative font-display text-xl font-bold leading-snug text-fg transition-colors group-hover:text-accent-text">
                    {o.title}
                  </h3>
                  <p className="relative mt-2 text-sm leading-relaxed text-muted">{o.desc}</p>
                  <ul className="relative mt-5 flex flex-1 flex-col gap-2.5 border-t border-accent/15 pt-5">
                    {o.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-2.5 text-sm text-muted">
                        <span className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-accent shadow-[0_0_8px_rgb(var(--accent)/0.8)]" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                  <span className="relative mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-accent bg-accent px-4 py-2 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-accent-ink transition-all group-hover:gap-3 group-hover:shadow-[0_8px_24px_-6px_rgb(var(--accent)/0.7)]">
                    Learn more <IconArrowRight size={13} />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

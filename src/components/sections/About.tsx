"use client";

import { about, profile } from "@/lib/data";
import SectionHead from "@/components/ui/SectionHead";
import Reveal from "@/components/ui/Reveal";
import NepalMap from "@/components/ui/NepalMap";

export default function About() {
  return (
    <section id="about" className="py-20">
      <div className="mx-auto max-w-content px-6 sm:px-10">
      <SectionHead
        fig="01"
        tag="About"
        title={
          <>
            Where rigorous <em>research</em>
            <br />
            meets applied <em>AI</em>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        {/* quote */}
        <Reveal>
          <blockquote className="border-l-2 border-accent pl-6">
            <p className="font-display text-2xl font-medium italic leading-snug text-fg">
              &ldquo;{about.lead}&rdquo;
            </p>
            <footer className="mt-3 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-muted">
              {profile.name}
            </footer>
          </blockquote>
        </Reveal>

        {/* paragraphs + pillars */}
        <div>
          <Reveal delay={0.08}>
            <div className="space-y-6">
              {about.paragraphs.map((p) => (
                <p key={p.slice(0, 24)} className="leading-loose text-muted">
                  {p}
                </p>
              ))}
            </div>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {about.pillars.map((pill, i) => (
              <Reveal key={pill.title} delay={0.1 + i * 0.06}>
                <div className="panel h-full p-6 transition-colors hover:border-accent/40">
                  <div className="mb-4 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-accent-text">
                    0{i + 1}
                  </div>
                  <h3 className="font-display text-lg font-semibold text-fg">{pill.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{pill.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      </div>

      {/* Field footprint. Deliberately OUTSIDE the max-w-content wrapper: Nepal
          is a 1.7:1 landscape country, so the map needs the full viewport width
          to be legible. Only the heading and the list below it stay measured. */}
      <div className="mt-20 border-t border-line/10 pt-14">
        <Reveal>
          <div className="mx-auto max-w-content px-6 sm:px-10">
            <div className="fig-label mb-4">{about.mapLabel}</div>
            <h3 className="max-w-2xl font-display text-3xl font-semibold leading-tight text-fg sm:text-4xl">
              {about.mapTitle}
            </h3>
            <p className="mt-4 max-w-2xl leading-relaxed text-muted">{about.mapIntro}</p>
          </div>
        </Reveal>

        <Reveal delay={0.08} className="mt-12">
          <NepalMap />
        </Reveal>
      </div>
    </section>
  );
}

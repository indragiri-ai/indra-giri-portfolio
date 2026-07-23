"use client";

import { about, profile } from "@/lib/data";
import SectionHead from "@/components/ui/SectionHead";
import Reveal from "@/components/ui/Reveal";

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-content px-6 py-28 sm:px-10">
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
        {/* photo + quote */}
        <Reveal>
          <figure className="overflow-hidden rounded-2xl border border-line/15 bg-surface">
            {/* Replace public/images/about.svg with a photo of you at work */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={profile.aboutPhoto}
              alt={about.photoCaption}
              className="aspect-[4/5] w-full object-cover"
            />
          </figure>
          <figcaption className="mt-3 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-muted">
            {about.photoCaption}
          </figcaption>

          <blockquote className="mt-10 border-l-2 border-accent pl-6">
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
    </section>
  );
}

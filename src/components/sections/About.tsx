"use client";

import Link from "next/link";
import { IconArrowRight } from "@tabler/icons-react";
import { about, profile } from "@/lib/data";
import SectionHead from "@/components/ui/SectionHead";
import Reveal from "@/components/ui/Reveal";
import JourneyStrip from "@/components/ui/JourneyStrip";
import { asset } from "@/lib/utils";

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

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-16">
          <Reveal>
            <figure className="overflow-hidden rounded-2xl border border-line/15 bg-surface">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={asset(profile.aboutPhoto)}
                alt={profile.name}
                width={900}
                height={1125}
                loading="lazy"
                decoding="async"
                className="aspect-[4/5] w-full object-cover"
              />
            </figure>
            <figcaption className="mt-4 font-mono text-xs uppercase tracking-[0.16em] text-muted">
              {about.photoCaption}
            </figcaption>
          </Reveal>

          <Reveal delay={0.08}>
            <blockquote className="border-l-2 border-accent pl-6">
              <p className="font-display text-2xl font-medium italic leading-snug text-fg">
                &ldquo;{about.lead}&rdquo;
              </p>
              <footer className="mt-3 font-mono text-xs uppercase tracking-[0.16em] text-muted">
                {profile.name}
              </footer>
            </blockquote>
            <p className="mt-6 leading-loose text-muted">{about.paragraph}</p>
          </Reveal>
        </div>

        {/* Journey preview: every step from +2 to today as small tiles with
            one detail panel, so the whole path fits in less space than two
            big cards did. The full timeline lives on /journey. */}
        <div className="mt-20 border-t border-line/10 pt-16">
          <div className="fig-label mb-8">The journey so far</div>
          <JourneyStrip />
          <Reveal delay={0.15}>
            <div className="mt-10 flex justify-end">
              <Link href="/journey" className="btn-primary">
                Full journey <IconArrowRight size={15} />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

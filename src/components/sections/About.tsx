"use client";

import Link from "next/link";
import { IconArrowRight } from "@tabler/icons-react";
import { about, profile, journey } from "@/lib/data";
import SectionHead from "@/components/ui/SectionHead";
import Reveal from "@/components/ui/Reveal";
import JourneyTimeline from "@/components/ui/JourneyTimeline";
import { asset } from "@/lib/utils";

export default function About() {
  const recentJourney = journey.filter((j) => j.type !== "edu").slice(0, 2);

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
                className="aspect-[4/5] w-full object-cover"
              />
            </figure>
            <figcaption className="mt-4 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-muted">
              {about.photoCaption}
            </figcaption>
          </Reveal>

          <Reveal delay={0.08}>
            <blockquote className="border-l-2 border-accent pl-6">
              <p className="font-display text-2xl font-medium italic leading-snug text-fg">
                &ldquo;{about.lead}&rdquo;
              </p>
              <footer className="mt-3 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-muted">
                {profile.name}
              </footer>
            </blockquote>
            <p className="mt-6 leading-loose text-muted">{about.paragraph}</p>
          </Reveal>
        </div>

        {/* Journey preview: the fullest timeline lives on /journey. Two most
            recent roles are enough here to say "there is a decade behind
            this" without turning About into a second Journey section. */}
        <div className="mt-20 border-t border-line/10 pt-16">
          <div className="fig-label mb-8">The journey so far</div>
          <JourneyTimeline items={recentJourney} orientation="horizontal" />
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

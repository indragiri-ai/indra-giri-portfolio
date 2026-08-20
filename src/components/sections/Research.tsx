"use client";

import Link from "next/link";
import { IconArrowRight } from "@tabler/icons-react";
import { fieldworkIntro } from "@/lib/data";
import SectionHead from "@/components/ui/SectionHead";
import Reveal from "@/components/ui/Reveal";
import ResearchMarquee from "@/components/ui/ResearchMarquee";
import NepalMap from "@/components/ui/NepalMap";
import FeaturedPaperCard from "@/components/ui/FeaturedPaperCard";

/**
 * The Nepal fieldwork map, then every project as a rolling band, the same
 * marquee mechanic as the press mentions in Publications: pauses on
 * hover/focus, collapses to a static grid under prefers-reduced-motion. The
 * filterable, grouped catalogue lives at /research.
 */
export default function Research() {
  return (
    <section id="research" className="py-20">
      <div className="mx-auto max-w-content px-6 sm:px-10">
        <SectionHead
          fig="04"
          tag="Research"
          title={
            <>
              Research that
              <br />
              moves <em>decisions</em>
            </>
          }
          intro="A decade of applied research for international organisations, governments and universities across South Asia."
        />

        <div className="fig-label mb-4">{fieldworkIntro.label}</div>
        <h3 className="max-w-2xl font-display text-3xl font-semibold leading-tight text-fg sm:text-4xl">
          {fieldworkIntro.title}
        </h3>
        <p className="mt-4 max-w-2xl leading-relaxed text-muted">{fieldworkIntro.intro}</p>
      </div>

      {/* Full bleed: Nepal's bbox is 1.7:1 and needs the full viewport width
          to stay legible. */}
      <Reveal delay={0.08} className="mt-12">
        <NepalMap />
      </Reveal>

      <div className="mx-auto max-w-content px-6 pt-16 sm:px-10">
        <div className="fig-label mb-6">Research conducted</div>

        <Reveal delay={0.06}>
          <ResearchMarquee />
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-12 border-t border-line/10 pt-8">
            <Link href="/research" className="btn-primary">
              View all research projects <IconArrowRight size={15} />
            </Link>
          </div>
        </Reveal>

        {/* Papers and articles belong here too: they are the other place the
            research ends up, alongside the studies above. */}
        <div className="mt-16 border-t border-line/10 pt-14">
          <Reveal>
            <div className="fig-label mb-6">Published research</div>
          </Reveal>
          <Reveal delay={0.06}>
            <FeaturedPaperCard />
          </Reveal>
          <Reveal delay={0.14}>
            <div className="mt-8">
              <Link href="/publications" className="btn-primary">
                All publications <IconArrowRight size={15} />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

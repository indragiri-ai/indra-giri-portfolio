"use client";

import Link from "next/link";
import { IconArrowRight } from "@tabler/icons-react";
import { projects } from "@/lib/data";
import SectionHead from "@/components/ui/SectionHead";
import Reveal from "@/components/ui/Reveal";
import ProjectCard from "@/components/ui/ProjectCard";
import FeaturedPaperCard from "@/components/ui/FeaturedPaperCard";

/**
 * Three selected studies (flagged `home` in data.ts) as a static grid.
 * The full fieldwork map lives on the dedicated research page. This used to be a marquee of all twelve, but
 * research cards need reading time and a moving target is hard to compare,
 * especially on touch. The filterable, grouped catalogue lives at /research.
 */
const selected = projects.filter((p) => p.home);
export default function Research() {
  return (
    <section id="research" className="py-20">
      <div className="mx-auto max-w-content px-6 sm:px-10">
        <SectionHead
          fig="03"
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

        <div className="fig-label mb-6">Selected studies</div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {selected.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.06} className="h-full">
              <ProjectCard p={p} className="h-full" />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-12 border-t border-line/10 pt-8">
            <Link href="/research" className="btn-primary">
              View all {projects.length} research projects <IconArrowRight size={15} />
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

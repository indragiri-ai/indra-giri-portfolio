"use client";

import { projects } from "@/lib/data";
import ProjectCard from "@/components/ui/ProjectCard";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Every research project as a rolling band, the same marquee mechanic as
 * PressMarquee: the track pauses on hover/focus (CSS `animation-play-state`,
 * no JS) and collapses to a static wrap under prefers-reduced-motion. Runs
 * slower than the press band (110s vs 28s) since the set is wider (12 project
 * cards vs 3 press cards) and a fixed pixel speed would otherwise race by.
 * The filterable, grouped catalogue still lives at /research.
 */
export default function ResearchMarquee() {
  if (projects.length === 0) return null;
  const reduced = usePrefersReducedMotion();

  const Card = ({ p, keySuffix = "" }: { p: (typeof projects)[number]; keySuffix?: string }) => (
    <div key={p.title + keySuffix} className="w-[20rem] shrink-0 sm:w-[22rem]">
      <ProjectCard p={p} className="h-full" />
    </div>
  );

  if (reduced) {
    return (
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <ProjectCard key={p.title} p={p} />
        ))}
      </div>
    );
  }

  return (
    <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)]">
      <div className="flex w-max animate-marquee-slow gap-5 hover:[animation-play-state:paused] focus-within:[animation-play-state:paused]">
        {projects.map((p) => (
          <Card key={p.title} p={p} />
        ))}
        {/* duplicated set: the loop shifts exactly one set's width, so the
            seam between the two copies is where the loop resets */}
        {projects.map((p) => (
          <Card key={p.title} p={p} keySuffix="-dup" />
        ))}
      </div>
    </div>
  );
}

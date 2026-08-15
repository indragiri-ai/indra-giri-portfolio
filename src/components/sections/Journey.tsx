"use client";

import { IconMapPin, IconBriefcase, IconSchool, IconStar } from "@tabler/icons-react";
import { journey, type JourneyItem } from "@/lib/data";
import SectionHead from "@/components/ui/SectionHead";
import Reveal from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

function TimelineEntry({
  item,
  index,
  last,
}: {
  item: JourneyItem;
  index: number;
  last: boolean;
}) {
  const isEdu = item.type === "edu";
  const isCurrent = item.type === "current";
  const Marker = isCurrent ? IconStar : isEdu ? IconSchool : IconBriefcase;

  return (
    <Reveal delay={Math.min(index * 0.04, 0.2)}>
      <div className="relative grid grid-cols-[3rem_1fr] gap-x-5 pb-12 last:pb-0 sm:grid-cols-[10rem_3rem_1fr] sm:gap-x-6">
        {/* period (desktop, left column) */}
        <div className="hidden pt-1 text-right sm:block">
          <div
            className={cn(
              "font-mono text-xs tracking-wide",
              isCurrent ? "font-semibold text-accent-text" : "text-muted"
            )}
          >
            {item.period}
          </div>
          <div className="mt-1 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-muted/70">
            {isCurrent ? "Current" : isEdu ? "Education" : "Experience"}
          </div>
        </div>

        {/* rail + marker */}
        <div className="relative flex justify-center">
          {!last && (
            <span aria-hidden className="absolute -bottom-2 top-10 w-px bg-line/15" />
          )}
          <span
            className={cn(
              "z-10 flex h-10 w-10 items-center justify-center rounded-full border",
              isCurrent
                ? "border-accent bg-accent text-accent-ink"
                : "border-line/20 bg-surface text-accent-text"
            )}
          >
            <Marker size={17} stroke={1.7} />
          </span>
        </div>

        {/* card */}
        <div
          className={cn(
            "panel p-6 transition-colors hover:border-accent/40 sm:p-7",
            isCurrent && "border-accent/40 bg-accent/[0.05]"
          )}
        >
          <div className="mb-2 flex flex-wrap items-center gap-x-4 gap-y-1 sm:hidden">
            <span className="font-mono text-xs text-accent-text">{item.period}</span>
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-muted/70">
              {isCurrent ? "Current" : isEdu ? "Education" : "Experience"}
            </span>
          </div>
          <h3 className="font-display text-xl font-semibold leading-snug text-fg sm:text-2xl">
            {item.role}
          </h3>
          <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
            <span className="font-semibold text-accent-text">{item.org}</span>
            <span className="inline-flex items-center gap-1.5 font-mono text-[0.62rem] uppercase tracking-[0.1em] text-muted">
              <IconMapPin size={12} />
              {item.loc}
            </span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-muted">{item.desc}</p>
          {item.tools.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {item.tools.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-line/15 px-2.5 py-0.5 font-mono text-[0.58rem] uppercase tracking-[0.1em] text-muted"
                >
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Reveal>
  );
}

export default function Journey() {
  return (
    <section id="journey" className="mx-auto max-w-content px-6 py-20 sm:px-10">
      <SectionHead
        fig="08"
        tag="Journey"
        title={
          <>
            A decade across
            <br />
            research, data & <em>borders</em>
          </>
        }
        intro="From Delhi classrooms to Nepali field sites, and from spreadsheets to AI systems. The path so far."
      />

      <div className="mx-auto max-w-4xl">
        {journey.map((j, i) => (
          <TimelineEntry key={j.org + i} item={j} index={i} last={i === journey.length - 1} />
        ))}
      </div>
    </section>
  );
}

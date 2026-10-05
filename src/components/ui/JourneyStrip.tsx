"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import { IconMapPin, IconBriefcase, IconSchool, IconStar } from "@tabler/icons-react";
import { journey, type JourneyItem } from "@/lib/data";
import { cn } from "@/lib/utils";

/** First year of the period, or its first word ("Early career" to "Early") so the tile label stays on one line. */
const yearOf = (j: JourneyItem) => j.period.match(/\d{4}/)?.[0] ?? j.period.split(" ")[0];
const kindOf = (j: JourneyItem) =>
  j.type === "current" ? "Current" : j.type === "edu" ? "Education" : "Experience";

/**
 * The home page's compact career strip: every step from +2 to today as a
 * small tile, newest on the left, with ONE shared detail panel underneath.
 * Hover, tap or keyboard focus selects a tile and fills the panel, so the
 * details are reachable on touch screens and by keyboard, not just by mouse.
 * The panel starts on the current role and stays on the last tile chosen
 * (it does not snap back on mouse leave, which would make it flicker).
 *
 * Built as an ARIA tablist: arrow keys move between tiles, and every panel
 * is in the HTML (inactive ones `hidden`), so the full history is still in
 * the static page. Entries without a `short` label are left off the strip.
 */
export default function JourneyStrip({ items = journey }: { items?: JourneyItem[] }) {
  const steps = items.filter((j) => j.short);
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const uid = useId();

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const next =
      e.key === "ArrowRight" || e.key === "ArrowDown"
        ? (i + 1) % steps.length
        : e.key === "ArrowLeft" || e.key === "ArrowUp"
          ? (i - 1 + steps.length) % steps.length
          : e.key === "Home"
            ? 0
            : e.key === "End"
              ? steps.length - 1
              : null;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <div>
      <div className="relative">
        {/* the rail the tiles sit on (desktop, where they form one row) */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-4 top-1/2 hidden h-px bg-gradient-to-r from-accent/60 via-accent/30 to-line/15 lg:block"
        />
        <div
          role="tablist"
          aria-label="Career and education, newest to oldest"
          className="relative grid grid-cols-3 gap-2 sm:grid-cols-5 lg:grid-cols-9"
        >
          {steps.map((j, i) => {
            const selected = i === active;
            const isCurrent = j.type === "current";
            const Icon = isCurrent ? IconStar : j.type === "edu" ? IconSchool : IconBriefcase;
            return (
              <button
                key={j.org + j.period}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`${uid}-tab-${i}`}
                aria-selected={selected}
                aria-controls={`${uid}-panel-${i}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className={cn(
                  "group flex min-h-[6.5rem] flex-col rounded-xl border p-3 text-left transition-all duration-300 motion-safe:hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
                  selected
                    ? "border-accent bg-raised shadow-[0_14px_30px_-14px_rgb(var(--accent)/0.55)] motion-safe:-translate-y-1 motion-safe:scale-[1.04]"
                    : isCurrent
                      ? "border-accent/40 bg-surface hover:border-accent/70"
                      : "border-line/15 bg-surface hover:border-accent/50"
                )}
              >
                <span className="flex items-center justify-between gap-1">
                  <span
                    className={cn(
                      "font-mono text-xs",
                      selected || isCurrent ? "text-accent-text" : "text-muted"
                    )}
                  >
                    {yearOf(j)}
                  </span>
                  <Icon
                    size={14}
                    stroke={1.7}
                    aria-hidden
                    className={selected || isCurrent ? "text-accent-text" : "text-muted/70"}
                  />
                </span>
                <span className="mt-2 font-display text-sm font-semibold leading-tight text-fg">
                  {j.short}
                </span>
                <span className="mt-1 text-xs leading-snug text-muted">{j.orgShort}</span>
              </button>
            );
          })}
        </div>
      </div>

      {steps.map((j, i) => (
        <div
          key={j.org + j.period}
          role="tabpanel"
          id={`${uid}-panel-${i}`}
          aria-labelledby={`${uid}-tab-${i}`}
          hidden={i !== active}
          className={cn(
            "panel mt-5 animate-fade-in p-6 sm:p-7",
            j.type === "current" && "border-accent/40 bg-accent/[0.05]"
          )}
        >
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
            <h3 className="font-display text-xl font-semibold leading-snug text-fg sm:text-2xl">
              {j.role}
            </h3>
            <span className="font-mono text-xs uppercase tracking-[0.1em] text-muted">
              {j.period} · {kindOf(j)}
            </span>
          </div>
          <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
            <span className="font-semibold text-accent-text">{j.org}</span>
            <span className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.1em] text-muted">
              <IconMapPin size={12} aria-hidden />
              {j.loc}
            </span>
          </div>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">{j.desc}</p>
          {j.tools.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {j.tools.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-line/15 px-2.5 py-0.5 font-mono text-[0.72rem] uppercase tracking-[0.1em] text-muted"
                >
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

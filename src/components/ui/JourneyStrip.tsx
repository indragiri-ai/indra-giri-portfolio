"use client";

import { useEffect, useId, useRef, useState, type MouseEvent } from "react";
import { IconMapPin, IconBriefcase, IconSchool, IconStar } from "@tabler/icons-react";
import { journey, type JourneyItem } from "@/lib/data";
import { cn } from "@/lib/utils";

const yearOf = (j: JourneyItem) => j.period.match(/\d{4}/)?.[0] ?? j.period;
const kindOf = (j: JourneyItem) =>
  j.type === "current" ? "Current" : j.type === "edu" ? "Education" : "Experience";

/**
 * The home page's compact career strip: every step from +2 to today as a
 * small tile, newest on the left. Details float in a small card over the
 * page ONLY while a tile is hovered (or keyboard focused, or tapped on a
 * touch screen) and disappear again, so the strip takes no extra space.
 *
 * Every detail card is always in the HTML: visually hidden (sr-only) when
 * closed, so screen readers and crawlers still get the full history. Each
 * tile is a button with aria-expanded. Escape or a tap elsewhere closes it.
 * Entries without a `short` label are left off the strip.
 */
export default function JourneyStrip({ items = journey }: { items?: JourneyItem[] }) {
  const steps = items.filter((j) => j.short);
  const [open, setOpen] = useState<number | null>(null);
  const [alignRight, setAlignRight] = useState(false);
  const listRef = useRef<HTMLOListElement>(null);
  const uid = useId();

  /** Open a tile, flipping the card to the tile's right edge on the right
      half of the screen so it never runs off the side. */
  const show = (i: number, el: HTMLElement) => {
    const r = el.getBoundingClientRect();
    setAlignRight(r.left + r.width / 2 > window.innerWidth / 2);
    setOpen(i);
  };

  useEffect(() => {
    if (open === null) return;
    const onDown = (e: PointerEvent) => {
      if (!listRef.current?.contains(e.target as Node)) setOpen(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="relative">
      {/* the rail the tiles sit on (desktop, where they form one row) */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-4 top-1/2 hidden h-px bg-gradient-to-r from-accent/60 via-accent/30 to-line/15 lg:block"
      />
      <ol
        ref={listRef}
        aria-label="Career and education, newest to oldest"
        className="relative grid grid-cols-3 gap-2 sm:grid-cols-5 lg:grid-cols-9"
      >
        {steps.map((j, i) => {
          const isOpen = open === i;
          const isCurrent = j.type === "current";
          const Icon = isCurrent ? IconStar : j.type === "edu" ? IconSchool : IconBriefcase;
          const detailId = `${uid}-detail-${i}`;
          return (
            <li
              key={j.org + j.period}
              className={cn("relative", isOpen && "z-30")}
              onMouseLeave={() => setOpen((cur) => (cur === i ? null : cur))}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                  setOpen((cur) => (cur === i ? null : cur));
                }
              }}
            >
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={detailId}
                onMouseEnter={(e) => show(i, e.currentTarget)}
                onFocus={(e) => show(i, e.currentTarget)}
                onClick={(e: MouseEvent<HTMLButtonElement>) => {
                  // mouse: hover already opened it, a click keeps it open.
                  // touch/keyboard: a tap or Enter toggles.
                  const type = (e.nativeEvent as PointerEvent).pointerType;
                  if (type === "mouse") return show(i, e.currentTarget);
                  if (isOpen) setOpen(null);
                  else show(i, e.currentTarget);
                }}
                className={cn(
                  "flex h-full w-full flex-col rounded-lg border px-2.5 py-2 text-left transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
                  isOpen
                    ? "border-accent bg-raised motion-safe:-translate-y-0.5"
                    : isCurrent
                      ? "border-accent/40 bg-surface"
                      : "border-line/15 bg-surface hover:border-accent/50"
                )}
              >
                <span className="flex items-center justify-between gap-1">
                  <span
                    className={cn(
                      "font-mono text-[0.72rem]",
                      isOpen || isCurrent ? "text-accent-text" : "text-muted"
                    )}
                  >
                    {yearOf(j)}
                  </span>
                  <Icon
                    size={12}
                    stroke={1.7}
                    aria-hidden
                    className={isOpen || isCurrent ? "text-accent-text" : "text-muted/70"}
                  />
                </span>
                <span className="mt-1 line-clamp-2 font-display text-[0.8rem] font-semibold leading-tight text-fg">
                  {j.short}
                </span>
                <span className="mt-0.5 line-clamp-2 text-[0.72rem] leading-snug text-muted">{j.orgShort}</span>
              </button>

              {/* Details: a floating card while open, screen-reader-only text
                  otherwise. pt-2 is a hover bridge so moving the mouse from
                  the tile into the card does not close it. */}
              <div
                id={detailId}
                className={
                  isOpen
                    ? cn(
                        "absolute top-full w-[min(20rem,calc(100vw-2rem))] pt-2",
                        alignRight ? "right-0" : "left-0"
                      )
                    : "sr-only"
                }
              >
                <div
                  className={cn(
                    isOpen &&
                      "animate-pop-in rounded-xl border border-line/15 bg-raised p-4 shadow-[0_24px_50px_-20px_rgb(0_0_0/0.6)]"
                  )}
                >
                  <div className="font-mono text-[0.72rem] uppercase tracking-[0.1em] text-muted">
                    {j.period} · {kindOf(j)}
                  </div>
                  <h3 className="mt-1 font-display text-base font-semibold leading-snug text-fg">
                    {j.role}
                  </h3>
                  <div className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs">
                    <span className="font-semibold text-accent-text">{j.org}</span>
                    <span className="inline-flex items-center gap-1 text-muted">
                      <IconMapPin size={11} aria-hidden />
                      {j.loc}
                    </span>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-muted">{j.desc}</p>
                  {j.tools.length > 0 && (
                    <div className="mt-2.5 flex flex-wrap gap-1">
                      {j.tools.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-line/15 px-2 py-0.5 font-mono text-[0.7rem] uppercase tracking-[0.06em] text-muted"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

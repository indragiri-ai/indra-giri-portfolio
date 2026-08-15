"use client";

import { useLayoutEffect, useMemo, useRef, useState } from "react";
import {
  districtShapes,
  NEPAL_VIEWBOX,
  NEPAL_OUTLINE_PATH,
  MAP_ATTRIBUTION,
} from "@/lib/nepal-map";
import { fieldwork, groupFieldwork, type FieldEntry } from "@/lib/fieldwork";

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

/**
 * Nepal's 77 districts as an interactive SVG. Districts with fieldwork are
 * filled in gold and respond to hover, tap and keyboard focus; the rest are
 * inert background. Boundaries follow Nepal's updated map (Darchula includes
 * Kalapani, Lipulekh and Limpiyadhura), see scripts/build-nepal-map.mjs.
 *
 * The district list under the map is not decoration: it is the accessible and
 * crawlable version of the same information, and the only version on a device
 * with no pointer.
 */
export default function NepalMap() {
  const { byDistrict, unmatched } = useMemo(() => groupFieldwork(fieldwork), []);
  const [active, setActive] = useState<string | null>(null);

  const wrapRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const tipRef = useRef<HTMLDivElement>(null);
  const [tipPos, setTipPos] = useState<{ left: number; top: number } | null>(null);

  if (process.env.NODE_ENV === "development" && unmatched.length > 0) {
    console.warn(
      `[NepalMap] district names not matched to the official list: ${unmatched.join(", ")}`
    );
  }

  const activeEntries: FieldEntry[] = active ? byDistrict.get(active) ?? [] : [];
  const activeShape = active ? districtShapes.find((d) => d.name === active) : null;
  const visitedCount = byDistrict.size;

  /**
   * Place the tooltip from the district's real on-screen position, then keep it
   * inside the map box. Measured rather than guessed because a district with
   * four projects makes a tall card: a fixed "always above" rule pushed it off
   * the top of the screen and under the sticky header.
   */
  useLayoutEffect(() => {
    if (!activeShape || !wrapRef.current || !svgRef.current || !tipRef.current) {
      setTipPos(null);
      return;
    }
    const wrap = wrapRef.current.getBoundingClientRect();
    const svg = svgRef.current.getBoundingClientRect();
    const tip = tipRef.current.getBoundingClientRect();
    /* The svg can be narrower than its wrapper once max-height clamps it. */
    const scale = svg.width / NEPAL_VIEWBOX.width;
    const x = svg.left - wrap.left + activeShape.cx * scale;
    const y = svg.top - wrap.top + activeShape.cy * scale;

    const GAP = 16;
    const HEADER = 76; // fixed navbar, so the card never hides behind it

    let top = y - tip.height - GAP; // above the district by default
    if (top < 0) top = y + GAP; // not enough room, drop below

    /* Clamp against the map box AND the viewport: a district with four
       projects makes a card tall enough to escape both. */
    const minTop = Math.max(0, HEADER - wrap.top);
    const maxTop = Math.min(
      wrap.height - tip.height,
      window.innerHeight - 8 - wrap.top - tip.height
    );
    top = clamp(top, minTop, Math.max(minTop, maxTop));

    const half = tip.width / 2;
    const left = clamp(x, half, Math.max(half, wrap.width - half));

    setTipPos({ left, top });
  }, [activeShape]);

  return (
    <div>
      {/* Full bleed: the map spans the viewport, capped so it always fits on
          screen in one piece. Everything below returns to the text measure. */}
      <div ref={wrapRef} className="relative px-3 sm:px-6">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${NEPAL_VIEWBOX.width} ${NEPAL_VIEWBOX.height}`}
          className="mx-auto block max-h-[90vh] w-full"
          role="img"
          aria-label={`Map of Nepal showing fieldwork in ${visitedCount} districts`}
          onMouseLeave={() => setActive(null)}
        >
          {districtShapes.map((shape) => {
            const worked = byDistrict.has(shape.name);
            const isActive = active === shape.name;

            return (
              <path
                key={shape.name}
                d={shape.d}
                tabIndex={worked ? 0 : undefined}
                role={worked ? "button" : undefined}
                aria-label={
                  worked
                    ? `${shape.name}: ${byDistrict
                        .get(shape.name)!
                        .map((e) => `${e.project}, ${e.year}`)
                        .join("; ")}`
                    : undefined
                }
                onMouseEnter={worked ? () => setActive(shape.name) : undefined}
                onFocus={worked ? () => setActive(shape.name) : undefined}
                onBlur={worked ? () => setActive(null) : undefined}
                onClick={
                  worked
                    ? () => setActive((cur) => (cur === shape.name ? null : shape.name))
                    : undefined
                }
                className={
                  worked
                    ? "cursor-pointer outline-none transition-[fill] duration-200"
                    : "transition-[fill] duration-200"
                }
                fill={
                  worked
                    ? isActive
                      ? "rgb(var(--map-work-active))"
                      : "rgb(var(--map-work))"
                    : "rgb(var(--map-land))"
                }
                stroke="rgb(var(--map-border))"
                strokeWidth={isActive ? 1.8 : 0.9}
                vectorEffect="non-scaling-stroke"
              />
            );
          })}

          {/* National edge last, so it reads over every district fill. This is
              what holds the country's shape together on the pale background. */}
          <path
            d={NEPAL_OUTLINE_PATH}
            fill="none"
            stroke="rgb(var(--map-edge))"
            strokeWidth={1.4}
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
            pointerEvents="none"
          />

          {/* Marker on the focused district, so keyboard users get the same cue */}
          {activeShape && (
            <circle
              cx={activeShape.cx}
              cy={activeShape.cy}
              r={4}
              fill="rgb(var(--bg))"
              stroke="rgb(var(--map-work-active))"
              strokeWidth={2}
              vectorEffect="non-scaling-stroke"
              pointerEvents="none"
            />
          )}
        </svg>

        {/* Tooltip. Position is measured in the layout effect above, so it is
            rendered hidden on the first pass and revealed once placed. */}
        {activeShape && activeEntries.length > 0 && (
          <div
            ref={tipRef}
            className="pointer-events-none absolute z-10 w-[min(17rem,72vw)] -translate-x-1/2 rounded-xl border border-line/15 bg-surface p-4 shadow-lg"
            style={{
              left: tipPos ? `${tipPos.left}px` : 0,
              top: tipPos ? `${tipPos.top}px` : 0,
              visibility: tipPos ? "visible" : "hidden",
            }}
          >
            <div className="font-display text-base font-bold text-fg">
              {activeShape.name}
            </div>
            <div className="mt-0.5 font-mono text-[0.58rem] uppercase tracking-[0.16em] text-muted">
              {activeShape.province}
            </div>
            <ul className="mt-3 space-y-2.5">
              {activeEntries.map((e) => (
                <li key={`${e.project}-${e.year}`}>
                  <div className="text-sm leading-snug text-fg">{e.project}</div>
                  <div className="mt-0.5 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-accent-text">
                    {e.org} · {e.year}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="mx-auto mt-8 flex max-w-content flex-wrap items-center gap-x-7 gap-y-3 px-6 sm:px-10">
        <span className="flex items-center gap-2.5 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-muted">
          <span
            className="h-3 w-3 rounded-sm"
            style={{ backgroundColor: "rgb(var(--map-work))" }}
          />
          Fieldwork district
        </span>
        <span className="flex items-center gap-2.5 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-muted">
          <span
            className="h-3 w-3 rounded-sm"
            style={{
              backgroundColor: "rgb(var(--map-land))",
              outline: "1px solid rgb(var(--map-edge))",
            }}
          />
          No fieldwork yet
        </span>
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-accent-text">
          {visitedCount} of {districtShapes.length} districts
        </span>
      </div>

      {/* The visible district list was removed at the owner's request: the map
          carries it. Each worked district still has an aria-label naming the
          district, its projects and years, so screen readers and crawlers can
          still read the whole dataset out of the markup. */}

      <p className="mx-auto mt-8 max-w-content px-6 font-mono text-[0.55rem] uppercase tracking-[0.16em] text-muted sm:px-10">
        {MAP_ATTRIBUTION}
      </p>
    </div>
  );
}

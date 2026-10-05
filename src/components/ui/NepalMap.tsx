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
 * The tooltip is a small card placed BESIDE the district's real outline (or
 * above/below it when there is no side room), never on top of it, and the
 * active district is redrawn last with a heavy outline so neighbouring borders
 * cannot hide which one is selected.
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
   * Place the tooltip from the district's real on-screen outline, then keep it
   * inside the map box and the viewport. Tries right of the district, then
   * left, then above, then below, and takes the first spot that does not
   * cover the district; the selected district must stay visible.
   */
  useLayoutEffect(() => {
    if (!activeShape || !wrapRef.current || !svgRef.current || !tipRef.current) {
      setTipPos(null);
      return;
    }
    const path = svgRef.current.querySelector<SVGPathElement>(
      `[data-district="${CSS.escape(activeShape.name)}"]`
    );
    if (!path) return;
    const wrap = wrapRef.current.getBoundingClientRect();
    const tip = tipRef.current.getBoundingClientRect();
    const r = path.getBoundingClientRect();
    /* district box in wrapper coordinates */
    const d = {
      left: r.left - wrap.left,
      right: r.right - wrap.left,
      top: r.top - wrap.top,
      bottom: r.bottom - wrap.top,
      cx: (r.left + r.right) / 2 - wrap.left,
      cy: (r.top + r.bottom) / 2 - wrap.top,
    };

    const GAP = 12;
    const HEADER = 76; // fixed navbar, so the card never hides behind it
    const minTop = Math.max(0, HEADER - wrap.top);
    const maxTop = Math.max(
      minTop,
      Math.min(wrap.height - tip.height, window.innerHeight - 8 - wrap.top - tip.height)
    );
    const maxLeft = Math.max(0, wrap.width - tip.width);
    const place = (left: number, top: number) => ({
      left: clamp(left, 0, maxLeft),
      top: clamp(top, minTop, maxTop),
    });
    const overlaps = (p: { left: number; top: number }) =>
      p.left < d.right &&
      p.left + tip.width > d.left &&
      p.top < d.bottom &&
      p.top + tip.height > d.top;

    const candidates = [
      place(d.right + GAP, d.cy - tip.height / 2), // right
      place(d.left - GAP - tip.width, d.cy - tip.height / 2), // left
      place(d.cx - tip.width / 2, d.top - GAP - tip.height), // above
      place(d.cx - tip.width / 2, d.bottom + GAP), // below
    ];
    setTipPos(candidates.find((p) => !overlaps(p)) ?? candidates[0]);
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
                data-district={shape.name}
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
                    ? "cursor-pointer transition-[fill] duration-200"
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

          {/* The selected district, redrawn on top of everything with a heavy
              outline: in the base layer its border is shared with (and partly
              painted over by) its neighbours, so a fill change alone was easy
              to miss. Same cue for hover, tap and keyboard focus. */}
          {activeShape && (
            <path
              d={activeShape.d}
              fill="rgb(var(--map-work-active))"
              stroke="rgb(var(--fg))"
              strokeWidth={2.5}
              strokeLinejoin="round"
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
            className="pointer-events-none absolute z-10 w-[min(13.5rem,62vw)] rounded-lg border border-line/15 bg-surface/95 px-3 py-2.5 shadow-lg backdrop-blur-sm"
            style={{
              left: tipPos ? `${tipPos.left}px` : 0,
              top: tipPos ? `${tipPos.top}px` : 0,
              visibility: tipPos ? "visible" : "hidden",
            }}
          >
            <div className="flex items-baseline justify-between gap-2">
              <span className="font-display text-sm font-bold text-fg">{activeShape.name}</span>
              <span className="truncate font-mono text-[0.7rem] uppercase tracking-[0.1em] text-muted">
                {activeShape.province}
              </span>
            </div>
            <ul className="mt-1.5 space-y-1.5">
              {activeEntries.map((e) => (
                <li key={`${e.project}-${e.year}`}>
                  <div className="text-xs leading-snug text-fg">{e.project}</div>
                  <div className="font-mono text-[0.7rem] uppercase tracking-[0.1em] text-accent-text">
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
        <span className="flex items-center gap-2.5 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-muted">
          <span
            className="h-3 w-3 rounded-sm"
            style={{ backgroundColor: "rgb(var(--map-work))" }}
          />
          Fieldwork district
        </span>
        <span className="flex items-center gap-2.5 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-muted">
          <span
            className="h-3 w-3 rounded-sm"
            style={{
              backgroundColor: "rgb(var(--map-land))",
              outline: "1px solid rgb(var(--map-edge))",
            }}
          />
          No fieldwork yet
        </span>
        <span className="font-mono text-[0.72rem] uppercase tracking-[0.16em] text-accent-text">
          {visitedCount} of {districtShapes.length} districts
        </span>
      </div>

      {/* The visible district list was removed at the owner's request: the map
          carries it. Each worked district still has an aria-label naming the
          district, its projects and years, so screen readers and crawlers can
          still read the whole dataset out of the markup. */}

      <p className="mx-auto mt-8 max-w-content px-6 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-muted sm:px-10">
        {MAP_ATTRIBUTION}
      </p>
    </div>
  );
}

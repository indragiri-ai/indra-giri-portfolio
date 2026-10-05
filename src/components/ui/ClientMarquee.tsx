"use client";

import { useState } from "react";
import { IconPlayerPause, IconPlayerPlay } from "@tabler/icons-react";
import { clients } from "@/lib/data";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * "Trusted by" as one slim, slowly scrolling row: client names set like logo
 * text (serif, not tiny monospace caps), separated by gold dots. Short names
 * are fine to keep moving, unlike research cards that need reading time.
 *
 * Same rules as PressMarquee: the second copy that makes the loop seamless is
 * aria-hidden and inert, the track pauses on hover/focus, there is an
 * explicit pause button (WCAG 2.2.2), and under prefers-reduced-motion it is
 * a static wrapped list instead.
 */
export default function ClientMarquee() {
  const reduced = usePrefersReducedMotion();
  const [paused, setPaused] = useState(false);

  const label = (
    <span className="shrink-0 font-mono text-xs uppercase tracking-[0.16em] text-accent-text">
      Trusted by
    </span>
  );

  const names = clients.map((c) => (
    <li key={c} className="flex shrink-0 items-center gap-6 pr-6">
      <span className="whitespace-nowrap font-display text-base font-medium text-fg/75">
        {c}
      </span>
      <span aria-hidden className="h-1 w-1 rounded-full bg-accent/70" />
    </li>
  ));

  if (reduced) {
    return (
      <div className="mx-auto flex max-w-content flex-wrap items-center gap-x-6 gap-y-2 px-6 py-4 sm:px-10">
        {label}
        <ul className="flex flex-wrap items-center gap-y-2">
          {names}
        </ul>
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-content items-center gap-5 px-6 py-4 sm:px-10">
      {label}
      <div className="min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
        <div
          className="flex w-max animate-marquee hover:[animation-play-state:paused] focus-within:[animation-play-state:paused]"
          style={{ animationDuration: "60s", animationPlayState: paused ? "paused" : undefined }}
        >
          <ul className="flex items-center">
            {names}
          </ul>
          {/* duplicate set for a seamless loop; hidden from assistive tech */}
          <ul className="flex items-center" aria-hidden inert>
            {names}
          </ul>
        </div>
      </div>
      <button
        type="button"
        onClick={() => setPaused((v) => !v)}
        aria-pressed={paused}
        aria-label={paused ? "Play client list" : "Pause client list"}
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line/15 text-muted transition-colors hover:border-accent/50 hover:text-fg"
      >
        {paused ? <IconPlayerPlay size={12} /> : <IconPlayerPause size={12} />}
      </button>
    </div>
  );
}

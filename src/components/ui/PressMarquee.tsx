"use client";

import { useState } from "react";
import Link from "next/link";
import { IconNews, IconArrowRight, IconPlayerPause, IconPlayerPlay } from "@tabler/icons-react";
import { mediaArticles } from "@/lib/data";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * A rolling band of press mentions rather than a plain list: this is proof
 * that shows up in the national press, so it gets a band, not three quiet
 * lines. Each card is styled like a clipping of the article itself (masthead
 * line, serif headline, opening line) so it matches the article page it
 * links to, instead of reducing the story to an icon and a title. The track
 * pauses on hover/focus (CSS `animation-play-state`, no JS) so a moving
 * target never has to be clicked, has an explicit pause button (WCAG 2.2.2),
 * and collapses to a static wrap under prefers-reduced-motion. The second
 * copy that makes the loop seamless is aria-hidden and inert, so screen
 * readers and keyboard users meet each story once.
 */
export default function PressMarquee() {
  const reduced = usePrefersReducedMotion();
  const [paused, setPaused] = useState(false);
  if (mediaArticles.length === 0) return null;

  const Card = ({ m }: { m: (typeof mediaArticles)[number] }) => (
    <Link
      href={`/publications/press/${m.slug}`}
      className="group flex w-[19rem] shrink-0 flex-col gap-3 rounded-2xl border border-line/15 bg-surface p-6 transition-colors hover:border-accent/50 hover:bg-accent/[0.06] sm:w-[22rem]"
    >
      <div className="flex flex-wrap items-center gap-2 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-accent-text">
        <IconNews size={13} stroke={1.8} />
        {m.venue}
        <span className="text-muted">· {m.meta}</span>
      </div>
      <h3 className="font-display text-lg font-bold leading-snug text-fg">{m.title}</h3>
      <p className="line-clamp-2 text-sm leading-relaxed text-muted">{m.body[0]}</p>
      <span className="mt-1 inline-flex items-center gap-1.5 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-accent-text opacity-0 transition-opacity group-hover:opacity-100">
        Read the story <IconArrowRight size={12} />
      </span>
    </Link>
  );

  if (reduced) {
    return (
      <div className="flex flex-wrap gap-4">
        {mediaArticles.map((m) => (
          <Card key={m.slug} m={m} />
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)]">
        <div
          className="flex w-max animate-marquee hover:[animation-play-state:paused] focus-within:[animation-play-state:paused]"
          style={paused ? { animationPlayState: "paused" } : undefined}
        >
          <div className="flex gap-4 pr-4">
            {mediaArticles.map((m) => (
              <Card key={m.slug} m={m} />
            ))}
          </div>
          {/* duplicated set: the loop shifts exactly one set's width, so the
              seam between the two copies is where the loop resets */}
          <div className="flex gap-4 pr-4" aria-hidden inert>
            {mediaArticles.map((m) => (
              <Card key={m.slug} m={m} />
            ))}
          </div>
        </div>
      </div>
      <button
        type="button"
        onClick={() => setPaused((v) => !v)}
        aria-pressed={paused}
        className="mt-4 inline-flex items-center gap-2 rounded-full border border-line/20 px-4 py-2 font-mono text-xs uppercase tracking-[0.1em] text-muted transition-colors hover:border-accent/50 hover:text-fg"
      >
        {paused ? <IconPlayerPlay size={13} /> : <IconPlayerPause size={13} />}
        {paused ? "Play" : "Pause"}
      </button>
    </div>
  );
}

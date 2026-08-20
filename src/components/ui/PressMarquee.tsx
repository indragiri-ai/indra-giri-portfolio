"use client";

import Link from "next/link";
import { IconNews, IconArrowRight } from "@tabler/icons-react";
import { mediaArticles } from "@/lib/data";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * A rolling band of press mentions rather than a plain list: this is proof
 * that shows up in the national press, so it gets a band, not three quiet
 * lines. Each card is styled like a clipping of the article itself (masthead
 * line, serif headline, opening line) so it matches the article page it
 * links to, instead of reducing the story to an icon and a title. The track
 * pauses on hover/focus (CSS `animation-play-state`, no JS) so a moving
 * target never has to be clicked, and collapses to a static wrap under
 * prefers-reduced-motion.
 */
export default function PressMarquee() {
  if (mediaArticles.length === 0) return null;
  const reduced = usePrefersReducedMotion();

  const Card = ({ m, keySuffix = "" }: { m: (typeof mediaArticles)[number]; keySuffix?: string }) => (
    <Link
      key={m.slug + keySuffix}
      href={`/publications/press/${m.slug}`}
      className="group flex w-[19rem] shrink-0 flex-col gap-3 rounded-2xl border border-line/15 bg-surface p-6 transition-colors hover:border-accent/50 hover:bg-accent/[0.06] sm:w-[22rem]"
    >
      <div className="flex flex-wrap items-center gap-2 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-accent-text">
        <IconNews size={13} stroke={1.8} />
        {m.venue}
        <span className="text-muted">· {m.meta}</span>
      </div>
      <h3 className="font-display text-lg font-bold leading-snug text-fg">{m.title}</h3>
      <p className="line-clamp-2 text-sm leading-relaxed text-muted">{m.body[0]}</p>
      <span className="mt-1 inline-flex items-center gap-1.5 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-accent-text opacity-0 transition-opacity group-hover:opacity-100">
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
    <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)]">
      <div className="flex w-max animate-marquee gap-4 hover:[animation-play-state:paused] focus-within:[animation-play-state:paused]">
        {mediaArticles.map((m) => (
          <Card key={m.slug} m={m} />
        ))}
        {/* duplicated set: the loop shifts exactly one set's width, so the
            seam between the two copies is where the loop resets */}
        {mediaArticles.map((m) => (
          <Card key={m.slug} m={m} keySuffix="-dup" />
        ))}
      </div>
    </div>
  );
}

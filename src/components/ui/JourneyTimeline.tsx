"use client";

import { motion } from "framer-motion";
import { IconMapPin, IconBriefcase, IconSchool, IconStar } from "@tabler/icons-react";
import { journey, type JourneyItem } from "@/lib/data";
import Reveal from "@/components/ui/Reveal";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

const CARD_EASE = [0.16, 1, 0.3, 1] as const;

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
  const reduced = usePrefersReducedMotion();

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
            <span
              aria-hidden
              className="absolute -bottom-2 top-10 w-px bg-gradient-to-b from-accent/35 via-line/15 to-line/15"
            />
          )}
          <span
            className={cn(
              "relative z-10 flex h-10 w-10 items-center justify-center rounded-full border transition-shadow duration-500",
              isCurrent
                ? "border-accent bg-accent text-accent-ink shadow-[0_0_0_6px_rgb(var(--accent)/0.14),0_0_28px_-4px_rgb(var(--accent)/0.55)]"
                : "border-line/20 bg-surface text-accent-text shadow-[0_4px_16px_-6px_rgb(var(--fg)/0.25)]"
            )}
          >
            <Marker size={17} stroke={1.7} />
          </span>
        </div>

        {/* card: tilts up out of the page as it enters view, like a panel
            being raised into place rather than just fading in */}
        <div className="[perspective:1400px]">
          <motion.div
            initial={reduced ? { opacity: 0 } : { opacity: 0, rotateX: -20, y: 30, scale: 0.96 }}
            whileInView={reduced ? { opacity: 1 } : { opacity: 1, rotateX: 0, y: 0, scale: 1 }}
            whileHover={reduced ? undefined : { rotateX: -3, y: -5 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.65, ease: CARD_EASE }}
            style={{ transformStyle: "preserve-3d", transformOrigin: "50% 0%" }}
            className={cn(
              "panel relative p-6 shadow-[0_20px_45px_-20px_rgb(var(--fg)/0.35)] transition-colors hover:border-accent/40 sm:p-7",
              isCurrent && "border-accent/40 bg-accent/[0.05]"
            )}
          >
            {/* faux depth layer, receded behind the card in 3D space */}
            <span
              aria-hidden
              className="absolute inset-x-3 -bottom-2 -z-10 h-full rounded-2xl bg-fg/[0.035] blur-md"
              style={{ transform: "translateZ(-32px) scale(0.96)" }}
            />
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
          </motion.div>
        </div>
      </div>
    </Reveal>
  );
}

function HorizontalEntry({ item, index }: { item: JourneyItem; index: number }) {
  const isEdu = item.type === "edu";
  const isCurrent = item.type === "current";
  const Marker = isCurrent ? IconStar : isEdu ? IconSchool : IconBriefcase;
  const reduced = usePrefersReducedMotion();

  return (
    <Reveal delay={Math.min(index * 0.06, 0.2)}>
      <div className="relative flex flex-col items-center text-center sm:items-start sm:text-left">
        <div className="mb-5 flex items-center gap-3">
          <span
            className={cn(
              "relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-shadow duration-500",
              isCurrent
                ? "border-accent bg-accent text-accent-ink shadow-[0_0_0_6px_rgb(var(--accent)/0.14),0_0_28px_-4px_rgb(var(--accent)/0.55)]"
                : "border-line/20 bg-surface text-accent-text shadow-[0_4px_16px_-6px_rgb(var(--fg)/0.25)]"
            )}
          >
            <Marker size={17} stroke={1.7} />
          </span>
          <div>
            <div
              className={cn(
                "font-mono text-xs tracking-wide",
                isCurrent ? "font-semibold text-accent-text" : "text-muted"
              )}
            >
              {item.period}
            </div>
            <div className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-muted/70">
              {isCurrent ? "Current" : isEdu ? "Education" : "Experience"}
            </div>
          </div>
        </div>

        <motion.div
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.97 }}
          whileInView={reduced ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
          whileHover={reduced ? undefined : { y: -4 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6, ease: CARD_EASE }}
          className={cn(
            "panel w-full p-6 text-left shadow-[0_20px_45px_-20px_rgb(var(--fg)/0.35)] transition-colors hover:border-accent/40 sm:p-7",
            isCurrent && "border-accent/40 bg-accent/[0.05]"
          )}
        >
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
        </motion.div>
      </div>
    </Reveal>
  );
}

/**
 * The career timeline: period rail, icon markers and cards. Lives on /journey
 * in full (vertical, the default); the About preview asks for `orientation="horizontal"`
 * so its short, curated slice reads as steps moving left to right instead of
 * a stack, which suits two or three entries better than a vertical rail.
 *
 * Cards animate in with a slight backward-to-flat rotateX tilt (a perspective
 * on the list root gives every entry the same vanishing point) rather than a
 * plain fade, and settle forward a couple degrees on hover. Both skip to a
 * plain fade under prefers-reduced-motion.
 */
export default function JourneyTimeline({
  items = journey,
  orientation = "vertical",
}: {
  items?: JourneyItem[];
  orientation?: "vertical" | "horizontal";
}) {
  if (orientation === "horizontal") {
    return (
      <div className="relative">
        <span
          aria-hidden
          className="pointer-events-none absolute left-5 right-5 top-5 hidden h-px bg-gradient-to-r from-line/15 via-accent/30 to-line/15 sm:block"
        />
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-8">
          {items.map((j, i) => (
            <HorizontalEntry key={j.org + i} item={j} index={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl" style={{ perspective: 1400 }}>
      {items.map((j, i) => (
        <TimelineEntry key={j.org + i} item={j} index={i} last={i === items.length - 1} />
      ))}
    </div>
  );
}

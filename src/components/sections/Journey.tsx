"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { IconMapPin } from "@tabler/icons-react";
import { journey, type JourneyItem } from "@/lib/data";
import Reveal from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

function JourneyCard({ item, index }: { item: JourneyItem; index: number }) {
  const isEdu = item.type === "edu";
  const isCurrent = item.type === "current";
  return (
    <article
      className={cn(
        "relative flex w-full shrink-0 flex-col rounded-2xl border p-7 lg:w-[420px]",
        isCurrent
          ? "border-accent/50 bg-accent/[0.07]"
          : "border-line/10 bg-surface"
      )}
    >
      <div className="mb-5 flex items-center justify-between">
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-muted">
          {String(index + 1).padStart(2, "0")} / {String(journey.length).padStart(2, "0")} ·{" "}
          {isEdu ? "education" : "experience"}
        </span>
        <span
          className={cn(
            "rounded-full px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.12em]",
            isCurrent
              ? "bg-accent text-accent-ink"
              : isEdu
              ? "border border-accent/30 text-accent-text"
              : "border border-line/15 text-muted"
          )}
        >
          {item.period}
        </span>
      </div>
      <h3 className="font-display text-2xl font-bold leading-tight text-fg">{item.role}</h3>
      <div className="mt-1 text-sm font-semibold text-accent-text">{item.org}</div>
      <div className="mt-1 inline-flex items-center gap-1.5 font-mono text-[0.62rem] uppercase tracking-[0.1em] text-muted">
        <IconMapPin size={12} className="text-accent-text" />
        {item.loc}
      </div>
      <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">{item.desc}</p>
      {item.tools.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-1.5">
          {item.tools.map((t) => (
            <span
              key={t}
              className="rounded-full border border-line/15 px-2.5 py-0.5 font-mono text-[0.56rem] uppercase tracking-[0.1em] text-muted"
            >
              {t}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}

export default function Journey() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    mm.add(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
      () => {
        const wrap = wrapRef.current;
        const track = trackRef.current;
        if (!wrap || !track) return;

        const tween = gsap.to(track, {
          x: () => -(track.scrollWidth - window.innerWidth + 80),
          ease: "none",
          scrollTrigger: {
            trigger: wrap,
            start: "top top",
            end: () => `+=${track.scrollWidth - window.innerWidth + 80}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });

        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
        };
      }
    );

    return () => mm.revert();
  }, []);

  return (
    <section id="journey" ref={wrapRef} className="overflow-hidden py-28 lg:h-screen lg:py-0">
      <div className="mx-auto max-w-content px-6 sm:px-10 lg:pt-24">
        <Reveal>
          <div className="fig-label mb-5">FIG. 06 — Longitudinal record</div>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="section-title">
              A decade across
              <br />
              <em>research, data &amp; borders</em>
            </h2>
            <p className="hidden max-w-xs pb-2 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted lg:block">
              Scroll → the record advances horizontally
            </p>
          </div>
        </Reveal>
      </div>

      <div
        ref={trackRef}
        className="mt-12 flex flex-col gap-5 px-6 sm:px-10 lg:w-max lg:flex-row lg:items-stretch lg:gap-6 lg:pl-10 lg:pr-20"
      >
        {journey.map((j, i) => (
          <JourneyCard key={j.org + i} item={j} index={i} />
        ))}
      </div>
    </section>
  );
}

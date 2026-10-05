"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * The real value is what ships in the static HTML and what assistive tech
 * reads, so a visitor without JS (or a crawler) never sees "0+". The count-up
 * only runs for counters that start BELOW the fold: those reset to 0 just
 * before they scroll in and climb once half visible. A counter already
 * visible on load (the hero stats) just stays put, so there is no flash of
 * the real number dropping to 0.
 */
export default function Counter({
  value,
  suffix = "",
  className,
}: {
  value: number;
  suffix?: string;
  className?: string;
}) {
  const reduced = usePrefersReducedMotion();
  const [n, setN] = useState(value);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    let timer: ReturnType<typeof setInterval> | null = null;
    // Step 1: drop to 0 only once the counter is about to scroll into view,
    // so a tab that never renders (hidden, prerendered) keeps the real value.
    const arm = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        setN(0);
        arm.disconnect();
      },
      { rootMargin: "0px 0px 300px 0px" }
    );
    // Step 2: count up once it is half visible.
    const obs = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        let cur = 0;
        const step = value / 50;
        timer = setInterval(() => {
          cur = Math.min(cur + step, value);
          setN(Math.round(cur));
          if (cur >= value && timer) {
            clearInterval(timer);
            timer = null;
          }
        }, 24);
        obs.disconnect();
      },
      { threshold: 0.5 }
    );
    arm.observe(el);
    obs.observe(el);
    return () => {
      arm.disconnect();
      obs.disconnect();
      if (timer) clearInterval(timer);
      setN(value);
    };
  }, [value, reduced]);

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">
        {value}
        {suffix}
      </span>
      <span aria-hidden>
        {n}
        {suffix}
      </span>
    </span>
  );
}

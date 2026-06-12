"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { tools, researchMethods, analyticalTechniques, languages } from "@/lib/data";
import SectionHead from "@/components/ui/SectionHead";
import Reveal from "@/components/ui/Reveal";

function Meter({ name, val, tier, go, idx }: { name: string; val: number; tier: string; go: boolean; idx: number }) {
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!go) return;
    const delay = idx * 90;
    const t = setTimeout(() => {
      let cur = 0;
      const step = val / 45;
      const iv = setInterval(() => {
        cur = Math.min(cur + step, val);
        setN(Math.round(cur));
        if (cur >= val) clearInterval(iv);
      }, 22);
    }, delay);
    return () => clearTimeout(t);
  }, [go, val, idx]);

  return (
    <div className="border-b border-line/10 py-5 last:border-b-0">
      <div className="mb-2.5 flex items-baseline justify-between">
        <span className="font-display text-lg font-bold text-fg">{name}</span>
        <span className="font-mono text-xs text-muted">
          <span className="text-accent-text">{n}</span> / 100 · {tier}
        </span>
      </div>
      <div className="h-[5px] overflow-hidden rounded-full bg-line/10">
        <motion.div
          className="h-full rounded-full bg-accent"
          initial={{ width: 0 }}
          animate={go ? { width: `${val}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay: idx * 0.09, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  );
}

function ChipCloud({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2.5">
      {items.map((label) => (
        <span
          key={label}
          className="rounded-full border border-line/15 bg-surface px-4 py-2 font-mono text-[0.68rem] uppercase tracking-[0.1em] text-fg transition-all hover:-translate-y-0.5 hover:border-accent hover:text-accent-text"
        >
          {label}
        </span>
      ))}
    </div>
  );
}

export default function Skills() {
  const [go, setGo] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setGo(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="skills" className="mx-auto max-w-content px-6 py-28 sm:px-10">
      <SectionHead
        fig="03"
        tag="Instruments"
        title={
          <>
            The analytical <em>toolkit</em>
          </>
        }
        intro="Statistical software, research methods, and analytical techniques — the instruments behind every evidence-based decision."
      />

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        {/* instrument readouts */}
        <Reveal>
          <div ref={ref} className="panel px-7 py-3">
            <div className="border-b border-line/10 py-4 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-muted">
              Readout · statistical & analytical software
            </div>
            {tools.map((t, i) => (
              <Meter key={t.name} {...t} go={go} idx={i} />
            ))}
          </div>
        </Reveal>

        <div className="flex flex-col gap-10">
          <Reveal delay={0.05}>
            <div className="fig-label mb-5">Research methods</div>
            <ChipCloud items={researchMethods} />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="fig-label mb-5">Analytical techniques</div>
            <ChipCloud items={analyticalTechniques} />
          </Reveal>
          <Reveal delay={0.15}>
            <div className="fig-label mb-5">Languages</div>
            <div className="grid grid-cols-3 gap-3">
              {languages.map((l) => (
                <div key={l.name} className="panel px-4 py-4 text-center">
                  <div className="font-display text-base font-bold text-fg">{l.name}</div>
                  <div className="mt-0.5 font-mono text-[0.6rem] uppercase tracking-[0.15em] text-accent-text">
                    {l.level}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

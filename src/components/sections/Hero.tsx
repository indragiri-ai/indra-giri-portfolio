"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { profile, roles, stats, clients } from "@/lib/data";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import Counter from "@/components/ui/Counter";
import MagneticButton from "@/components/ui/MagneticButton";

const HeroCanvas = dynamic(() => import("@/components/effects/HeroCanvas"), {
  ssr: false,
});

const EASE = [0.16, 1, 0.3, 1] as const;

function KineticWord({ word, delay, accent }: { word: string; delay: number; accent?: boolean }) {
  return (
    <span className="inline-block overflow-hidden align-bottom">
      {word.split("").map((ch, i) => (
        <motion.span
          key={i}
          className={`inline-block ${accent ? "text-accent-text" : ""}`}
          initial={{ y: "110%" }}
          animate={{ y: 0 }}
          transition={{ duration: 0.9, delay: delay + i * 0.045, ease: EASE }}
          whileHover={{ y: -8, transition: { duration: 0.25 } }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
}

function RoleFlipper() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const iv = setInterval(() => setIdx((i) => (i + 1) % roles.length), 2400);
    return () => clearInterval(iv);
  }, []);
  return (
    <span className="relative inline-flex h-[1.5em] min-w-[230px] overflow-hidden align-bottom">
      <AnimatePresence mode="wait">
        <motion.span
          key={idx}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.45, ease: EASE }}
          className="text-fg"
        >
          {roles[idx]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default function Hero() {
  const reduced = usePrefersReducedMotion();

  return (
    <section id="top" className="relative flex min-h-screen flex-col overflow-hidden">
      {/* WebGL data-field (skipped under reduced motion) */}
      <div className="hero-canvas absolute inset-0 -z-10">
        {!reduced && <HeroCanvas />}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg" />
      </div>

      <div className="mx-auto flex w-full max-w-content flex-1 flex-col justify-center px-6 pb-10 pt-32 sm:px-10">
        {/* ledger header line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="mb-8 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[0.65rem] uppercase tracking-[0.22em] text-muted"
        >
          <span>FIG. 00 — Subject record</span>
          <span className="hidden h-px flex-1 bg-line/15 sm:block" />
          <span>{profile.location}</span>
          <span className="inline-flex items-center gap-2 text-accent-text">
            <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-accent" />
            {profile.availability}
          </span>
        </motion.div>

        {/* kinetic headline */}
        <h1 className="font-display text-[17vw] font-extrabold uppercase leading-[0.92] tracking-tight text-fg sm:text-[12vw] lg:text-[9.5rem]">
          <KineticWord word="Indra" delay={1.7} />
          <br />
          <KineticWord word="Giri" delay={1.95} accent />
        </h1>

        {/* role + thesis */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.3, duration: 0.8, ease: EASE }}
          className="mt-8 max-w-2xl"
        >
          <div className="font-display text-xl font-semibold text-muted sm:text-2xl">
            <RoleFlipper />
          </div>
          <p className="mt-4 leading-relaxed text-muted">
            Turning <strong className="font-semibold text-fg">data into decisions</strong> and{" "}
            <strong className="font-semibold text-fg">evidence into impact</strong> — across
            Nepal, South Asia, and beyond. A decade of rigorous research, meaningful teaching, and
            applied analytics.
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 0.8, ease: EASE }}
          className="mt-9 flex flex-wrap items-center gap-4"
        >
          <MagneticButton>
            <a
              href="#research"
              className="inline-block rounded-full bg-accent px-8 py-4 font-mono text-xs font-semibold uppercase tracking-[0.15em] text-accent-ink transition-shadow hover:shadow-[0_12px_36px_rgb(var(--accent)/0.35)]"
            >
              Explore the research ↗
            </a>
          </MagneticButton>
          <MagneticButton>
            <a
              href="#contact"
              className="inline-block rounded-full border border-line/25 px-8 py-4 font-mono text-xs font-semibold uppercase tracking-[0.15em] text-fg transition-colors hover:border-accent hover:text-accent-text"
            >
              Start a conversation
            </a>
          </MagneticButton>
        </motion.div>

        {/* stats ledger */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.7, duration: 0.8, ease: EASE }}
          className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line/10 bg-line/10 sm:grid-cols-4"
        >
          {stats.map((s) => (
            <div key={s.label} className="bg-surface px-6 py-5">
              <div className="font-display text-3xl font-bold text-accent-text">
                <Counter value={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-1 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-muted">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* client marquee */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
        className="border-t border-line/10 py-5"
      >
        <div className="flex overflow-hidden whitespace-nowrap [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex animate-marquee items-center gap-12 pr-12">
            {[...clients, ...clients].map((c, i) => (
              <span
                key={i}
                className="flex items-center gap-12 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-muted"
              >
                {c}
                <span className="text-accent-text">·</span>
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

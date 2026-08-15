"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { profile, roles, stats, clients } from "@/lib/data";
import Counter from "@/components/ui/Counter";
import { asset } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

function RoleFlipper() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const iv = setInterval(() => setIdx((i) => (i + 1) % roles.length), 2600);
    return () => clearInterval(iv);
  }, []);
  return (
    <span className="relative inline-flex h-[1.5em] min-w-[240px] overflow-hidden align-bottom">
      <AnimatePresence mode="wait">
        <motion.span
          key={idx}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.45, ease: EASE }}
          className="text-accent-text"
        >
          {roles[idx]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* quiet background: soft radial glow, no motion */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(900px 500px at 80% -10%, rgb(var(--accent)/0.09), transparent 60%), radial-gradient(700px 400px at -10% 30%, rgb(var(--accent)/0.05), transparent 60%)",
        }}
      />

      <div className="mx-auto grid w-full max-w-content grid-cols-1 items-center gap-14 px-6 pb-16 pt-32 sm:px-10 lg:grid-cols-[1.1fr_0.72fr] lg:gap-20 lg:pt-40">
        {/* ── Left: intro ── */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="mb-7 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[0.65rem] uppercase tracking-[0.22em] text-muted"
          >
            <span>{profile.location}</span>
            <span className="inline-flex items-center gap-2 text-accent-text">
              <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-accent" />
              {profile.availability}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
            className="font-display text-6xl font-semibold leading-[1.02] tracking-tight text-fg sm:text-7xl lg:text-[5.5rem]"
          >
            Indra <em className="italic text-accent-text">Giri</em>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: EASE }}
            className="mt-6 font-display text-2xl font-medium text-fg sm:text-3xl"
          >
            <RoleFlipper />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: EASE }}
            className="mt-6 max-w-xl leading-relaxed text-muted"
          >
            {profile.heroIntro}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: EASE }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <a href="#ai" className="btn-primary">
              Explore my work
            </a>
            <a href="#contact" className="btn-ghost">
              Get in touch
            </a>
          </motion.div>

          {/* stats */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55, ease: EASE }}
            className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line/10 bg-line/10 sm:grid-cols-4"
          >
            {stats.map((s) => (
              <div key={s.label} className="bg-surface px-5 py-5">
                <div className="font-display text-3xl font-semibold text-accent-text">
                  <Counter value={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-1 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-muted">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Right: portrait ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: EASE }}
          className="relative mx-auto w-full max-w-sm lg:max-w-none"
        >
          {/* offset frame behind the photo */}
          <div
            aria-hidden
            className="absolute -right-4 top-4 h-full w-full rounded-t-[10rem] rounded-b-2xl border border-accent/30"
          />
          <figure className="relative overflow-hidden rounded-t-[10rem] rounded-b-2xl border border-line/15 bg-surface">
            {/* Real portrait at public/images/portrait.jpg (3:4, wired via
                profile.portrait). The frame is an ARCH: keep any replacement
                3:4 with the head centred and roughly 15-20% down from the top,
                or the rounded corners will bite into it. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={asset(profile.portrait)}
              alt={`Portrait of ${profile.name}`}
              className="aspect-[3/4] w-full object-cover"
            />
          </figure>
          <figcaption className="mt-4 flex items-center justify-between font-mono text-[0.62rem] uppercase tracking-[0.2em] text-muted">
            <span>{profile.name}</span>
            <span>{profile.location}</span>
          </figcaption>
        </motion.div>
      </div>

      {/* trusted by */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="border-t border-line/10"
      >
        <div className="mx-auto flex max-w-content flex-wrap items-center gap-x-10 gap-y-3 px-6 py-6 sm:px-10">
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.24em] text-accent-text">
            Trusted by
          </span>
          {clients.map((c) => (
            <span
              key={c}
              className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted"
            >
              {c}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { profile, stats } from "@/lib/data";
import Counter from "@/components/ui/Counter";
import ClientMarquee from "@/components/ui/ClientMarquee";
import { asset } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

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

      <div className="mx-auto grid w-full max-w-content grid-cols-1 items-center gap-10 px-6 pb-12 pt-24 sm:px-10 lg:grid-cols-[1.1fr_0.72fr] lg:gap-20 lg:pt-40">
        {/* ── Left: intro ── */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="mb-5 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-xs uppercase tracking-[0.16em] text-muted"
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
            className="font-display text-5xl font-semibold leading-[1.02] tracking-tight text-fg sm:text-7xl lg:text-[5.5rem]"
          >
            Indra <em className="italic text-accent-text">Giri</em>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: EASE }}
            className="mt-5 max-w-xl font-display text-2xl font-medium leading-snug text-accent-text sm:mt-6 sm:text-3xl"
          >
            {profile.positioning}
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: EASE }}
            className="mt-4 max-w-xl leading-relaxed text-muted"
          >
            {profile.heroIntro}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: EASE }}
            className="mt-6 flex flex-wrap items-center gap-4"
          >
            <a href="#work" className="btn-primary">
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
            className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line/10 bg-line/10 sm:grid-cols-4"
          >
            {stats.map((s) => (
              <div key={s.label} className="bg-surface px-5 py-5">
                <div className="font-display text-3xl font-semibold text-accent-text">
                  <Counter value={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-1 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-muted">
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
          {/* Gold arch frame wrapping the photo with an even gap on every
              side. It used to be an offset copy shifted right and down, which
              left the photo poking out on the left and the caption sitting
              inside the frame's bottom edge. */}
          <div className="rounded-t-[10.75rem] rounded-b-[1.4rem] border border-accent/35 p-2.5">
            <figure className="relative overflow-hidden rounded-t-[10rem] rounded-b-2xl border border-line/15 bg-surface">
              {/* Real portrait at public/images/portrait.jpg (3:4, wired via
                  profile.portrait). The frame is an ARCH: keep any replacement
                  3:4 with the head centred and roughly 15-20% down from the top,
                  or the rounded corners will bite into it. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={asset(profile.portrait)}
                alt={`Portrait of ${profile.name}`}
                width={1086}
                height={1448}
                fetchPriority="high"
                decoding="async"
                className="aspect-[3/4] w-full object-cover"
              />
            </figure>
          </div>
          <div className="mt-4 flex items-center justify-between px-2.5 font-mono text-xs uppercase tracking-[0.16em] text-muted">
            <span>{profile.name}</span>
            <span>{profile.location}</span>
          </div>
        </motion.div>
      </div>

      {/* trusted by */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="border-t border-line/10"
      >
        <ClientMarquee />
      </motion.div>
    </section>
  );
}

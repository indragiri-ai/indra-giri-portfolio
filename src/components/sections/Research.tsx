"use client";

import { useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconMapPin } from "@tabler/icons-react";
import { projects, projectFilters, type ProjectCategory, type Project } from "@/lib/data";
import SectionHead from "@/components/ui/SectionHead";
import Reveal from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

type FilterKey = "all" | ProjectCategory;

function SpotlightCard({ p, index }: { p: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
  };

  return (
    <motion.div
      layout
      ref={ref}
      onMouseMove={onMove}
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.45, delay: index * 0.03, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-line/10 bg-surface p-7 transition-colors duration-300 hover:border-accent/40",
        p.big && "md:col-span-2"
      )}
    >
      {/* cursor spotlight */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(420px circle at var(--mx) var(--my), rgb(var(--accent) / 0.08), transparent 45%)",
        }}
      />

      <div className="relative z-10 flex flex-1 flex-col">
        <div className="mb-5 flex items-start justify-between gap-4">
          <span className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-muted">
            {p.org}
          </span>
          <span
            className={cn(
              "flex items-center gap-1.5 whitespace-nowrap font-mono text-[0.6rem] uppercase tracking-[0.15em]",
              p.status === "ongoing" ? "text-accent-text" : "text-muted"
            )}
          >
            <span
              className={cn(
                "h-1.5 w-1.5 rounded-full",
                p.status === "ongoing" ? "animate-pulse-dot bg-accent" : "bg-muted/50"
              )}
            />
            {p.status}
          </span>
        </div>

        <h3
          className={cn(
            "mb-3 font-display font-bold leading-tight text-fg",
            p.big ? "text-2xl sm:text-3xl" : "text-xl"
          )}
        >
          {p.title}
        </h3>
        <p className="mb-6 flex-1 text-sm leading-relaxed text-muted">{p.desc}</p>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line/10 pt-4">
          <span className="inline-flex items-center gap-1.5 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-muted">
            <IconMapPin size={13} className="text-accent-text" />
            {p.loc}
          </span>
          <div className="flex flex-wrap gap-1.5">
            {p.tags.slice(0, 3).map((t) => (
              <span
                key={t}
                className="rounded-full border border-line/15 px-2.5 py-0.5 font-mono text-[0.58rem] uppercase tracking-[0.1em] text-muted"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Research() {
  const [active, setActive] = useState<FilterKey>("all");

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: projects.length };
    (["impact", "valuechain", "social", "market", "ai"] as const).forEach(
      (k) => (c[k] = projects.filter((p) => p.cat.includes(k)).length)
    );
    return c;
  }, []);

  const visible = projects.filter((p) => active === "all" || p.cat.includes(active));

  return (
    <section id="research" className="mx-auto max-w-content px-6 py-28 sm:px-10">
      <SectionHead
        fig="02"
        tag="Dataset"
        title={
          <>
            Eleven studies.
            <br />
            <em>Real consequences.</em>
          </>
        }
        intro="A decade of applied research for international organisations, governments and universities across South Asia — each card a study that moved a decision."
      />

      <Reveal>
        <div className="mb-10 flex flex-wrap gap-2.5">
          {projectFilters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActive(f.key)}
              className={cn(
                "rounded-full border px-4 py-2 font-mono text-[0.65rem] uppercase tracking-[0.12em] transition-all",
                active === f.key
                  ? "border-accent bg-accent text-accent-ink"
                  : "border-line/20 text-muted hover:border-accent/50 hover:text-fg"
              )}
            >
              {f.label} <span className="opacity-60">{counts[f.key]}</span>
            </button>
          ))}
        </div>
      </Reveal>

      <motion.div layout className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((p, i) => (
            <SpotlightCard key={p.title} p={p} index={i} />
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

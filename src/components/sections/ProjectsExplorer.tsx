"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { projects, projectFilters, type ProjectCategory } from "@/lib/data";
import ProjectCard from "@/components/ui/ProjectCard";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

type FilterKey = "all" | ProjectCategory;

/** The full project catalogue with category filters. Lives only on /research. */
export default function ProjectsExplorer() {
  const [active, setActive] = useState<FilterKey>("all");
  const reduced = usePrefersReducedMotion();

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: projects.length };
    (["impact", "valuechain", "social", "market", "ai"] as const).forEach(
      (k) => (c[k] = projects.filter((p) => p.cat.includes(k)).length)
    );
    return c;
  }, []);

  const visible = projects.filter((p) => active === "all" || p.cat.includes(active));
  const ongoing = visible.filter((p) => p.status === "ongoing");
  const completed = visible.filter((p) => p.status === "completed");

  return (
    <>
      <div className="mb-12 flex flex-wrap gap-2.5">
        {projectFilters.map((f) => (
          <button
            key={f.key}
            onClick={() => setActive(f.key)}
            aria-pressed={active === f.key}
            className={cn(
              "rounded-full border px-4 py-2 font-mono text-xs uppercase tracking-[0.1em] transition-colors",
              active === f.key
                ? "border-accent bg-accent text-accent-ink"
                : "border-line/20 text-muted hover:border-accent/50 hover:text-fg"
            )}
          >
            {f.label} <span className="opacity-60">{counts[f.key]}</span>
          </button>
        ))}
      </div>

      {/* Grouped by status so "what is live now" is readable at a glance */}
      {[
        { label: "Ongoing", items: ongoing },
        { label: "Completed", items: completed },
      ].map((group) =>
        group.items.length === 0 ? null : (
          <div key={group.label} className="mb-16 last:mb-0">
            <div className="fig-label mb-6">
              {group.label} · {group.items.length}
            </div>
            {/* Plain filtering, no exit/layout animation: AnimatePresence kept
                filtered-out cards in the DOM until their exit animation ended,
                which never happens in a throttled tab, so the filter looked
                broken. Keying the grid on the filter replays the entrance. */}
            <div
              key={active}
              className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
            >
              {group.items.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={reduced ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={
                    reduced
                      ? { duration: 0 }
                      : { duration: 0.35, delay: i * 0.03, ease: [0.16, 1, 0.3, 1] }
                  }
                >
                  <ProjectCard p={p} />
                </motion.div>
              ))}
            </div>
          </div>
        )
      )}
    </>
  );
}

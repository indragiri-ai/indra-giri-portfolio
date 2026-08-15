import { IconMapPin } from "@tabler/icons-react";
import type { Project } from "@/lib/data";
import { cn } from "@/lib/utils";

/**
 * One research project. Used by the Research section on the home page (which
 * shows only current work) and by /projects (which shows everything), so the
 * two never drift apart visually.
 */
export default function ProjectCard({
  p,
  className,
}: {
  p: Project;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "group flex h-full flex-col rounded-2xl border border-line/10 bg-surface p-7 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_18px_50px_rgb(var(--fg)/0.06)]",
        className
      )}
    >
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

      <h3 className="mb-3 font-display text-xl font-bold leading-tight text-fg transition-colors group-hover:text-accent-text">
        {p.title}
      </h3>
      <p className="mb-6 flex-1 text-sm leading-relaxed text-muted">{p.desc}</p>

      <div className="mt-auto border-t border-line/10 pt-4">
        <span className="inline-flex items-center gap-1.5 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-muted">
          <IconMapPin size={13} className="text-accent-text" />
          {p.loc}
        </span>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {p.tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-line/15 px-2.5 py-0.5 font-mono text-[0.58rem] uppercase tracking-[0.1em] text-muted"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

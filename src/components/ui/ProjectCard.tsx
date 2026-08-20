import { IconMapPin, IconChartBar } from "@tabler/icons-react";
import type { Project } from "@/lib/data";
import { cn } from "@/lib/utils";

/**
 * One research project. Used by the Research section on the home page (which
 * shows only current work) and by /projects (which shows everything), so the
 * two never drift apart visually. Styled to match the press-mention cards in
 * PressMarquee: icon badge, bordered surface panel, tint-on-hover rather than
 * lift-and-shadow.
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
        "group flex h-full flex-col gap-5 rounded-2xl border border-line/15 bg-surface p-7 transition-colors hover:border-accent/50 hover:bg-accent/[0.06]",
        className
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-accent/30 bg-accent/10 text-accent-text">
          <IconChartBar size={16} stroke={1.7} />
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

      <div>
        <div className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-accent-text">
          {p.org}
        </div>
        <h3 className="mt-1.5 font-display text-xl font-bold leading-tight text-fg">
          {p.title}
        </h3>
      </div>

      <p className="flex-1 text-sm leading-relaxed text-muted">{p.desc}</p>

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

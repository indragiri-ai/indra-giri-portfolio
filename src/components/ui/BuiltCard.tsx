import { IconExternalLink } from "@tabler/icons-react";
import type { BuiltProject } from "@/lib/data";

/**
 * A thing Indra built and published elsewhere (the Nepal Data Portal, the AI
 * for Teachers handbook), as opposed to a study he ran. Shared by the Research
 * section on the home page and /projects so the two cannot drift apart.
 */
export default function BuiltCard({ b }: { b: BuiltProject }) {
  return (
    <a
      href={b.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full flex-col rounded-2xl border border-accent/25 bg-accent/[0.06] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-accent/60"
    >
      <div className="mb-4 flex items-center justify-between gap-4">
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-muted">
          {b.meta}
        </span>
        <span className="flex items-center gap-1.5 whitespace-nowrap font-mono text-[0.6rem] uppercase tracking-[0.15em] text-accent-text">
          <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-accent" />
          {b.status}
        </span>
      </div>

      <h3 className="font-display text-2xl font-bold leading-snug text-fg transition-colors group-hover:text-accent-text">
        {b.title}
      </h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{b.desc}</p>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-accent/20 pt-4">
        <div className="flex flex-wrap gap-1.5">
          {b.tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-line/15 px-2.5 py-0.5 font-mono text-[0.58rem] uppercase tracking-[0.1em] text-muted"
            >
              {t}
            </span>
          ))}
        </div>
        <span className="inline-flex items-center gap-1.5 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-accent-text transition-transform group-hover:translate-x-1">
          Visit <IconExternalLink size={13} />
        </span>
      </div>
    </a>
  );
}

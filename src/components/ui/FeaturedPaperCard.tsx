import { IconExternalLink } from "@tabler/icons-react";
import { featuredPaper } from "@/lib/data";

/**
 * The featured arXiv paper, as a self-contained card. Shared by the Research
 * section on the home page and /research so publications and studies live in
 * one place rather than being split into their own top-level section.
 */
export default function FeaturedPaperCard() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-accent/30 bg-surface p-8 sm:p-10">
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/15 blur-[70px]" />
      <div className="relative z-10">
        <div className="mb-5 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-accent-text">
          Featured working paper · arXiv 2602.00138
        </div>
        <h3 className="mb-4 max-w-3xl font-display text-2xl font-bold leading-snug text-fg sm:text-3xl">
          {featuredPaper.title}
        </h3>
        <p className="mb-7 max-w-2xl text-sm leading-loose text-muted">{featuredPaper.desc}</p>

        <div className="mb-8 flex flex-wrap gap-x-8 gap-y-4">
          {featuredPaper.coauthors.map((a) => (
            <div key={a.name} className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-accent/40 font-mono text-xs font-semibold text-accent-text">
                {a.initials}
              </div>
              <div>
                <div className="text-sm font-semibold text-fg">{a.name}</div>
                <div className="font-mono text-[0.62rem] uppercase tracking-[0.08em] text-muted">
                  {a.aff}
                </div>
              </div>
            </div>
          ))}
        </div>

        <a href={featuredPaper.url} target="_blank" rel="noopener noreferrer" className="btn-primary">
          Read on arXiv <IconExternalLink size={15} />
        </a>
      </div>
    </div>
  );
}

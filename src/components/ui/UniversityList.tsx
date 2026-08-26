import { IconCalendar } from "@tabler/icons-react";
import { universities } from "@/lib/data";
import Reveal from "@/components/ui/Reveal";

/**
 * The university faculty roster: name, affiliation, role, period and course
 * chips. Shared by the Teaching section on the home page and /teaching so the
 * two cannot drift apart.
 */
export default function UniversityList({ delayOffset = 0 }: { delayOffset?: number }) {
  return (
    <div className="mb-16">
      {universities.map((u, i) => (
        <Reveal key={u.name} delay={delayOffset + i * 0.05}>
          <div className="group grid grid-cols-1 gap-4 border-t border-line/10 py-7 transition-colors last:border-b hover:bg-surface/60 sm:grid-cols-[1.2fr_0.8fr_1fr] sm:items-center sm:gap-6 sm:px-4">
            <div>
              <h3 className="font-display text-xl font-bold text-fg transition-colors group-hover:text-accent-text">
                {u.name}
              </h3>
              <div className="mt-0.5 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-muted">
                {u.aff}
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <span className="font-semibold text-fg">{u.role}</span>
              <span className="inline-flex items-center gap-1.5 font-mono text-xs text-muted">
                <IconCalendar size={13} className="text-accent-text" />
                {u.period}
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5 sm:justify-end">
              {u.courses.map((c) => (
                <span
                  key={c}
                  className="rounded-full border border-line/15 px-2.5 py-1 font-mono text-[0.58rem] uppercase tracking-[0.08em] text-muted"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

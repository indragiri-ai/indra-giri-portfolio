import Link from "next/link";
import { IconArrowRight } from "@tabler/icons-react";
import { journey } from "@/lib/data";
import SectionHead from "@/components/ui/SectionHead";
import Reveal from "@/components/ui/Reveal";

/**
 * Three most recent roles, then a link. The full timeline moved to /journey:
 * at 2.3 screens it was the longest thing on the home page, and a career
 * history matters to someone already convinced, not to someone deciding.
 */
export default function JourneyPreview() {
  const recent = journey.filter((j) => j.type !== "edu").slice(0, 3);

  return (
    <section id="journey" className="mx-auto max-w-content px-6 py-20 sm:px-10">
      <SectionHead
        fig="07"
        tag="Journey"
        title={
          <>
            A decade across research, data &amp; <em>borders</em>
          </>
        }
        intro="From Delhi classrooms to Nepali field sites, and from spreadsheets to AI systems."
      />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {recent.map((j, i) => (
          <Reveal key={j.org} delay={i * 0.06}>
            <div className="panel h-full p-6">
              <div className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-accent-text">
                {j.period}
              </div>
              <h3 className="mt-2 font-display text-lg font-bold leading-snug text-fg">
                {j.role}
              </h3>
              <div className="mt-1 text-sm font-semibold text-accent-text">{j.org}</div>
              <div className="mt-1 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-muted">
                {j.loc}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.2}>
        <div className="mt-12 flex flex-wrap items-center gap-6 border-t border-line/10 pt-8">
          <Link href="/journey" className="btn-primary">
            Full timeline &amp; toolkit <IconArrowRight size={15} />
          </Link>
          <p className="max-w-md text-sm leading-relaxed text-muted">
            Every role and degree since 2009, plus the software, methods and
            languages behind the work.
          </p>
        </div>
      </Reveal>
    </section>
  );
}

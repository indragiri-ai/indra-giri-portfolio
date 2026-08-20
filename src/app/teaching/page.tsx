import type { Metadata } from "next";
import { IconCalendar } from "@tabler/icons-react";
import { profile, teachingMetrics, universities } from "@/lib/data";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/ui/PageHeader";
import Reveal from "@/components/ui/Reveal";

const intro =
  "University lecture halls: economics, research methods, data analysis and the tools of modern evidence based work.";

export const metadata: Metadata = {
  title: `Teaching | ${profile.name}`,
  description: intro,
};

export default function TeachingPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-content px-6 pb-28 pt-36 sm:px-10 lg:pt-44">
        <PageHeader
          backHref="/#teaching"
          eyebrow="Teaching"
          title={
            <>
              Educating the <em>next generation</em>
            </>
          }
          intro={intro}
        />

        <Reveal delay={0.06}>
          <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line/10 bg-line/10 md:grid-cols-4">
            {teachingMetrics.map((m) => (
              <div key={m.label} className="bg-surface px-6 py-6 text-center">
                <div className="font-display text-4xl font-bold text-accent-text">{m.num}</div>
                <div className="mt-1.5 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-muted">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-16 fig-label mb-6">University faculty</div>
        </Reveal>
        <div className="mb-16">
          {universities.map((u, i) => (
            <Reveal key={u.name} delay={0.12 + i * 0.05}>
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
      </main>
      <Footer />
    </>
  );
}

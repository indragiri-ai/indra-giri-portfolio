import type { Metadata } from "next";
import { profile, teachingMetrics } from "@/lib/data";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/ui/PageHeader";
import Reveal from "@/components/ui/Reveal";
import UniversityList from "@/components/ui/UniversityList";

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
          backHref="/"
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
                <div className="mt-1.5 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-muted">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-16 fig-label mb-6">University faculty</div>
        </Reveal>
        <UniversityList delayOffset={0.12} />
      </main>
      <Footer />
    </>
  );
}

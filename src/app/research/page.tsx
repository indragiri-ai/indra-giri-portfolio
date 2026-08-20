import type { Metadata } from "next";
import Link from "next/link";
import { IconArrowRight } from "@tabler/icons-react";
import { profile, projects, fieldworkIntro } from "@/lib/data";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/ui/PageHeader";
import Reveal from "@/components/ui/Reveal";
import ProjectsExplorer from "@/components/sections/ProjectsExplorer";
import NepalMap from "@/components/ui/NepalMap";
import FeaturedPaperCard from "@/components/ui/FeaturedPaperCard";

const intro =
  "Impact evaluations, value chain studies, market research and social research for international organisations, governments and universities across Nepal and India. Every study below ran end to end: design, field teams, analysis and the recommendations that followed.";

export const metadata: Metadata = {
  title: `Research | ${profile.name}`,
  description: intro,
};

export default function ResearchPage() {
  const orgs = new Set(projects.map((p) => p.org));

  return (
    <>
      <Navbar />
      <main className="pb-28 pt-36 lg:pt-44">
        <div className="mx-auto max-w-content px-6 sm:px-10">
          <PageHeader
            backHref="/#research"
            eyebrow="Research"
            title={
              <>
                The full <em>catalogue</em>
              </>
            }
            intro={intro}
          />

          <Reveal delay={0.06}>
            <div className="mt-10 flex flex-wrap gap-x-12 gap-y-5 border-y border-line/10 py-6">
              {[
                { value: projects.length, label: "Projects" },
                { value: orgs.size, label: "Commissioning organisations" },
                {
                  value: projects.filter((p) => p.status === "ongoing").length,
                  label: "Ongoing",
                },
              ].map((s) => (
                <div key={s.label}>
                  <div className="font-display text-3xl font-semibold text-accent-text">
                    {s.value}
                  </div>
                  <div className="mt-1 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-muted">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-16">
              <div className="fig-label mb-4">{fieldworkIntro.label}</div>
              <h2 className="max-w-2xl font-display text-3xl font-semibold leading-tight text-fg sm:text-4xl">
                {fieldworkIntro.title}
              </h2>
              <p className="mt-4 max-w-2xl leading-relaxed text-muted">{fieldworkIntro.intro}</p>
            </div>
          </Reveal>
        </div>

        {/* Full bleed: Nepal's bbox is 1.7:1 and needs the full viewport
            width to stay legible. */}
        <Reveal delay={0.14} className="mt-10">
          <NepalMap />
        </Reveal>

        <div className="mx-auto mt-16 max-w-content px-6 sm:px-10">
          <div className="fig-label mb-6">Research catalogue</div>
          <ProjectsExplorer />
        </div>

        {/* Papers and articles: the other place the research ends up. */}
        <div className="mx-auto mt-20 max-w-content border-t border-line/10 px-6 pt-14 sm:px-10">
          <Reveal>
            <div className="fig-label mb-6">Published research</div>
          </Reveal>
          <Reveal delay={0.06}>
            <FeaturedPaperCard />
          </Reveal>
          <Reveal delay={0.14}>
            <div className="mt-8">
              <Link href="/publications" className="btn-primary">
                All publications <IconArrowRight size={15} />
              </Link>
            </div>
          </Reveal>
        </div>
      </main>
      <Footer />
    </>
  );
}

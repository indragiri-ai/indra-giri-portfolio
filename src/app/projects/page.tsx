import type { Metadata } from "next";
import Link from "next/link";
import { IconArrowLeft } from "@tabler/icons-react";
import { profile, projects } from "@/lib/data";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Reveal from "@/components/ui/Reveal";
import ProjectsExplorer from "@/components/sections/ProjectsExplorer";

const intro =
  "Impact evaluations, value chain studies, market research and social research for international organisations, governments and universities across Nepal and India. Every study below ran end to end: design, field teams, analysis and the recommendations that followed.";

export const metadata: Metadata = {
  title: `Research Projects | ${profile.name}`,
  description: intro,
};

export default function ProjectsPage() {
  const orgs = new Set(projects.map((p) => p.org));

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-content px-6 pb-28 pt-36 sm:px-10 lg:pt-44">
        <Reveal>
          <Link
            href="/#research"
            /* flex + w-fit, not inline-flex: .fig-label below is itself
               inline-flex and would sit on the same line. */
            className="mb-10 flex w-fit items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted transition-colors hover:text-accent-text"
          >
            <IconArrowLeft size={14} /> Back to home
          </Link>

          <div className="fig-label mb-5">Research</div>
          <h1 className="section-title max-w-3xl text-5xl sm:text-6xl">
            The full <em>catalogue</em>
          </h1>
          <p className="mt-6 max-w-2xl leading-relaxed text-muted">{intro}</p>

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

        <div className="mt-16">
          <ProjectsExplorer />
        </div>
      </main>
      <Footer />
    </>
  );
}

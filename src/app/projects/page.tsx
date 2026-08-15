import type { Metadata } from "next";
import Link from "next/link";
import { IconArrowLeft, IconExternalLink } from "@tabler/icons-react";
import { profile, projects, builtProjects } from "@/lib/data";
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

        {/* Built and published: products and resources, not studies, so they
            sit above the research catalogue rather than inside its filters. */}
        <Reveal delay={0.06}>
          <div className="mt-16">
            <div className="fig-label mb-6">Built &amp; published</div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {builtProjects.map((b) => (
                <a
                  key={b.title}
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
                  <h2 className="font-display text-2xl font-bold leading-snug text-fg transition-colors group-hover:text-accent-text">
                    {b.title}
                  </h2>
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
              ))}
            </div>
          </div>
        </Reveal>

        <div className="mt-20">
          <div className="fig-label mb-6">Research catalogue</div>
          <ProjectsExplorer />
        </div>
      </main>
      <Footer />
    </>
  );
}

import Link from "next/link";
import { IconArrowRight } from "@tabler/icons-react";
import { projects, builtProjects } from "@/lib/data";
import SectionHead from "@/components/ui/SectionHead";
import Reveal from "@/components/ui/Reveal";
import ProjectCard from "@/components/ui/ProjectCard";
import BuiltCard from "@/components/ui/BuiltCard";

/**
 * Home page shows CURRENT work only. The full catalogue, with filters, lives at
 * /projects. Twelve cards plus a filter bar made the home page a database
 * listing; three live projects and one clear link reads as a practice.
 */
export default function Research() {
  const current = projects.filter((p) => p.status === "ongoing").slice(0, 3);

  return (
    <section id="research" className="mx-auto max-w-content px-6 py-20 sm:px-10">
      <SectionHead
        fig="03"
        tag="Research"
        title={
          <>
            Research that
            <br />
            moves <em>decisions</em>
          </>
        }
        intro="A decade of applied research for international organisations, governments and universities across South Asia. Here is what is on the desk right now."
      />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {current.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.06}>
            <ProjectCard p={p} />
          </Reveal>
        ))}
      </div>

      {/* Built and published: live products and open resources. On the home
          page because these are the only pieces of the work a visitor can go
          and use immediately, which makes them worth more than one click away. */}
      <div className="mt-14">
        <Reveal>
          <div className="fig-label mb-6">Built &amp; published</div>
        </Reveal>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {builtProjects.map((b, i) => (
            <Reveal key={b.title} delay={i * 0.06}>
              <BuiltCard b={b} />
            </Reveal>
          ))}
        </div>
      </div>

      <Reveal delay={0.2}>
        <div className="mt-12 flex flex-wrap items-center gap-6 border-t border-line/10 pt-8">
          <Link href="/projects" className="btn-primary">
            All {projects.length} projects <IconArrowRight size={15} />
          </Link>
          <p className="max-w-md text-sm leading-relaxed text-muted">
            Impact evaluations, value chain studies, market research and social
            research across Nepal and India.
          </p>
        </div>
      </Reveal>
    </section>
  );
}

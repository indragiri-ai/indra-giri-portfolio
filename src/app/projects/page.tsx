import type { Metadata } from "next";
import Link from "next/link";
import { IconArrowRight } from "@tabler/icons-react";
import { profile, builtProjects } from "@/lib/data";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/ui/PageHeader";
import Reveal from "@/components/ui/Reveal";
import BuiltCard from "@/components/ui/BuiltCard";

const intro =
  "Products and resources built and put online, as opposed to studies run for a client. Every link below is live and checked: what you see is what a visitor gets today.";

export const metadata: Metadata = {
  title: `Projects | ${profile.name}`,
  description: intro,
};

export default function ProjectsPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-content px-6 pb-28 pt-36 sm:px-10 lg:pt-44">
        <PageHeader
          backHref="/#projects"
          eyebrow="Projects"
          title={
            <>
              Built &amp; <em>published</em>
            </>
          }
          intro={intro}
        />

        <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-2">
          {builtProjects.map((b, i) => (
            <Reveal key={b.title} delay={0.08 + i * 0.06}>
              <BuiltCard b={b} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-16 rounded-2xl border border-accent/25 bg-accent/[0.06] p-8 sm:p-10">
            <h2 className="font-display text-2xl font-bold text-fg sm:text-3xl">
              Looking for the research studies?
            </h2>
            <p className="mt-3 max-w-2xl leading-relaxed text-muted">
              Impact evaluations, value chain studies and social research done
              for clients live on the Research page, not here.
            </p>
            <Link href="/research" className="btn-primary mt-7">
              View research <IconArrowRight size={15} />
            </Link>
          </div>
        </Reveal>
      </main>
      <Footer />
    </>
  );
}

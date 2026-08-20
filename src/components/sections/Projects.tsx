import Link from "next/link";
import { IconArrowRight } from "@tabler/icons-react";
import { builtProjects } from "@/lib/data";
import SectionHead from "@/components/ui/SectionHead";
import Reveal from "@/components/ui/Reveal";
import BuiltCard from "@/components/ui/BuiltCard";

/**
 * Things built and put online, as opposed to studies run for a client. Kept
 * separate from Research: a product anyone can go and use is a different
 * kind of proof than a study someone else commissioned.
 */
export default function Projects() {
  return (
    <section id="projects" className="border-y border-line/10 bg-surface/40">
      <div className="mx-auto max-w-content px-6 py-20 sm:px-10">
        <SectionHead
          fig="03"
          tag="Projects"
          title={
            <>
              Things I have <em>built</em>
              <br />
              and put online
            </>
          }
          intro="Beyond studies done for clients, these are products and resources anyone can go and use today."
        />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {builtProjects.map((b, i) => (
            <Reveal key={b.title} delay={i * 0.06}>
              <BuiltCard b={b} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <div className="mt-12 border-t border-line/10 pt-8">
            <Link href="/projects" className="btn-primary">
              View all projects <IconArrowRight size={15} />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

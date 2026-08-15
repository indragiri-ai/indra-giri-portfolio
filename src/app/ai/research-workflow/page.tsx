import type { Metadata } from "next";
import Link from "next/link";
import { IconArrowRight, IconCheck, IconX } from "@tabler/icons-react";
import { profile } from "@/lib/data";
import { aiServices, researchWorkflow } from "@/lib/ai";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/ui/PageHeader";
import Reveal from "@/components/ui/Reveal";

const service = aiServices.find((s) => s.slug === "research-workflow")!;

export const metadata: Metadata = {
  title: `AI in the Research Workflow | ${profile.name}`,
  description: service.intro,
};

export default function AIResearchWorkflowPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-content px-6 pb-28 pt-36 sm:px-10 lg:pt-44">
        <PageHeader
          backHref="/ai"
          backLabel="AI practice"
          eyebrow="03 · AI in research"
          title={
            <>
              AI in the <em>research workflow</em>
            </>
          }
          intro={service.intro}
        />

        <Reveal delay={0.06}>
          <p className="mt-10 max-w-3xl border-l-2 border-accent pl-6 text-lg leading-loose text-muted">
            {researchWorkflow.lead}
          </p>
        </Reveal>

        {/* Stage by stage: what AI does, and what it is not allowed to do */}
        <div className="mt-20">
          <Reveal>
            <div className="fig-label mb-8">Stage by stage</div>
          </Reveal>

          {researchWorkflow.stages.map((s, i) => (
            <Reveal key={s.stage} delay={i * 0.04}>
              <article className="grid grid-cols-1 gap-6 border-t border-line/10 py-10 last:border-b lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
                <div>
                  <div className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-accent-text">
                    0{i + 1}
                  </div>
                  <h2 className="mt-2 font-display text-2xl font-bold leading-snug text-fg">
                    {s.stage}
                  </h2>
                </div>

                <div className="space-y-5">
                  <div className="flex gap-4">
                    <IconCheck size={18} className="mt-1 shrink-0 text-accent-text" />
                    <p className="leading-relaxed text-muted">{s.does}</p>
                  </div>
                  <div className="flex gap-4">
                    <IconX size={18} className="mt-1 shrink-0 text-muted/60" />
                    <p className="leading-relaxed text-muted/85">{s.not}</p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Guardrails */}
        <Reveal>
          <div className="mt-20 rounded-2xl border border-line/10 bg-surface p-8 sm:p-10">
            <div className="fig-label mb-6">The rules I work to</div>
            <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {researchWorkflow.guardrails.map((g) => (
                <li key={g} className="flex gap-3 leading-relaxed text-muted">
                  <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                  {g}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* What it produces */}
        <div className="mt-20 grid grid-cols-1 gap-5 md:grid-cols-3">
          {researchWorkflow.outcomes.map((o, i) => (
            <Reveal key={o.title} delay={i * 0.05}>
              <div className="h-full border-t-2 border-accent pt-5">
                <h3 className="font-display text-lg font-bold leading-snug text-fg">{o.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{o.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-20 rounded-2xl border border-accent/25 bg-accent/[0.06] p-8 sm:p-10">
            <h2 className="font-display text-2xl font-bold text-fg sm:text-3xl">
              Put this into your research team
            </h2>
            <p className="mt-3 max-w-2xl leading-relaxed text-muted">
              Whether you are running one study or a research unit, the same
              question applies: which parts of your workflow should AI touch, and
              which parts must stay human. I set that up with the team and leave
              the scripts, prompts and rules behind.
            </p>
            <div className="mt-7 flex flex-wrap gap-4">
              <Link href="/#contact" className="btn-primary">
                Start a conversation <IconArrowRight size={15} />
              </Link>
              <Link href="/ai/training" className="btn-ghost">
                Training programs
              </Link>
            </div>
          </div>
        </Reveal>
      </main>
      <Footer />
    </>
  );
}

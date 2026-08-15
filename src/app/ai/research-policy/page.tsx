import type { Metadata } from "next";
import Link from "next/link";
import { IconArrowRight, IconDownload } from "@tabler/icons-react";
import { profile } from "@/lib/data";
import { aiServices, aiReport } from "@/lib/ai";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/ui/PageHeader";
import Reveal from "@/components/ui/Reveal";
import { asset } from "@/lib/utils";

const service = aiServices.find((s) => s.slug === "research-policy")!;

export const metadata: Metadata = {
  title: `AI Research & Policy | ${profile.name}`,
  description: aiReport.headline,
};

export default function AIResearchPolicyPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-content px-6 pb-28 pt-36 sm:px-10 lg:pt-44">
        <PageHeader
          backHref="/ai"
          backLabel="AI practice"
          eyebrow="02 · AI research & policy"
          title={
            <>
              Evidence on how Nepal <em>adopts AI</em>
            </>
          }
          intro={service.intro}
        />

        {/* The report */}
        <Reveal delay={0.06}>
          <div className="mt-16 overflow-hidden rounded-2xl border border-accent/25 bg-accent/[0.06] p-8 sm:p-10">
            <div className="fig-label mb-5">The report</div>
            <h2 className="max-w-3xl font-display text-3xl font-bold leading-tight text-fg sm:text-4xl">
              {aiReport.title}
            </h2>
            <p className="mt-3 max-w-3xl font-display text-lg italic leading-snug text-accent-text">
              {aiReport.subtitle}
            </p>
            <p className="mt-6 max-w-2xl leading-relaxed text-muted">{aiReport.headline}</p>

            <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {aiReport.stats.map((s) => (
                <div key={s.label}>
                  <div className="font-display text-3xl font-semibold text-accent-text sm:text-4xl">
                    {s.value}
                  </div>
                  <div className="mt-1 font-mono text-[0.58rem] uppercase leading-relaxed tracking-[0.14em] text-muted">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            {aiReport.file && (
              <div className="mt-9 flex flex-wrap items-center gap-5">
                <a href={asset(aiReport.file)} download className="btn-primary">
                  Download the report <IconDownload size={15} />
                </a>
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-muted">
                  {aiReport.fileMeta}
                </span>
              </div>
            )}

            <div className="mt-8 border-t border-accent/20 pt-6 text-sm leading-relaxed text-muted">
              <span className="font-mono text-[0.58rem] uppercase tracking-[0.16em] text-accent-text">
                Authors
              </span>
              <div className="mt-2">{aiReport.authors.join(" · ")}</div>
              <div className="mt-1 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-muted">
                {aiReport.publisher} · {aiReport.edition} · {aiReport.fieldwork}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Summary */}
        <Reveal>
          <div className="mt-20 max-w-3xl">
            <div className="fig-label mb-6">What the study found</div>
            {aiReport.summary.map((p) => (
              <p key={p.slice(0, 30)} className="mb-5 leading-loose text-muted">
                {p}
              </p>
            ))}
          </div>
        </Reveal>

        {/* Seven findings */}
        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2">
          {aiReport.findings.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.04}>
              <div className="panel h-full p-7">
                <div className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-accent-text">
                  Finding 0{i + 1}
                </div>
                <h3 className="mt-3 font-display text-xl font-bold leading-snug text-fg">
                  {f.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{f.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Implications */}
        <Reveal>
          <div className="mt-20">
            <div className="fig-label mb-6">What follows from it</div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              {aiReport.implications.map((im) => (
                <div key={im.audience} className="border-t-2 border-accent pt-5">
                  <div className="font-display text-lg font-bold text-fg">{im.audience}</div>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{im.text}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Method and limits, because a research page without them is marketing */}
        <Reveal>
          <div className="mt-20 grid grid-cols-1 gap-10 md:grid-cols-2">
            <div>
              <div className="fig-label mb-5">Method</div>
              <p className="text-sm leading-loose text-muted">{aiReport.method}</p>
            </div>
            <div>
              <div className="fig-label mb-5">What it cannot say</div>
              <p className="text-sm leading-loose text-muted">{aiReport.limits}</p>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-20 rounded-2xl border border-line/10 bg-surface p-8 sm:p-10">
            <h2 className="font-display text-2xl font-bold text-fg sm:text-3xl">
              Research, briefings and policy notes
            </h2>
            <p className="mt-3 max-w-2xl leading-relaxed text-muted">
              I run original survey research on AI adoption and readiness, and
              write it up for the people who have to act on it. If you need
              evidence for a policy, a strategy or a board paper, tell me the
              decision you are trying to make.
            </p>
            <Link href="/#contact" className="btn-primary mt-7">
              Discuss a study <IconArrowRight size={15} />
            </Link>
          </div>
        </Reveal>
      </main>
      <Footer />
    </>
  );
}

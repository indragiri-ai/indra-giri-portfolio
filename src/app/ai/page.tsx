import type { Metadata } from "next";
import Link from "next/link";
import { IconArrowLeft, IconArrowRight, IconSchool, IconBulb, IconRobot } from "@tabler/icons-react";
import { profile } from "@/lib/data";
import { aiIntro, aiServices, aiReport, trainingDeliveries } from "@/lib/ai";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: `AI Practice | ${profile.name}`,
  description: aiIntro,
};

const ICONS = { school: IconSchool, bulb: IconBulb, robot: IconRobot };

export default function AIPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-content px-6 pb-28 pt-36 sm:px-10 lg:pt-44">
        <Reveal>
          <Link
            href="/"
            className="mb-10 flex w-fit items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted transition-colors hover:text-accent-text"
          >
            <IconArrowLeft size={14} /> Back to home
          </Link>

          <div className="fig-label mb-5">AI practice</div>
          <h1 className="section-title max-w-3xl text-5xl sm:text-6xl">
            Artificial intelligence, applied with <em>rigour</em>
          </h1>
          <p className="mt-6 max-w-2xl leading-relaxed text-muted">{aiIntro}</p>
        </Reveal>

        {/* The three services */}
        <div className="mt-16 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {aiServices.map((s, i) => {
            const Icon = ICONS[s.icon];
            return (
              <Reveal key={s.slug} delay={i * 0.06}>
                <Link
                  href={`/ai/${s.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-line/10 bg-surface p-8 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40"
                >
                  <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-xl border border-accent/25 bg-accent/[0.08] text-accent-text">
                    <Icon size={20} />
                  </div>
                  <div className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-accent-text">
                    0{i + 1}
                  </div>
                  <h2 className="mt-2 font-display text-2xl font-bold leading-snug text-fg">
                    {s.title}
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{s.tagline}</p>
                  <span className="mt-6 inline-flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-accent-text transition-transform group-hover:translate-x-1">
                    Explore <IconArrowRight size={14} />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>

        {/* Report teaser */}
        <Reveal>
          <div className="mt-20 overflow-hidden rounded-2xl border border-accent/25 bg-accent/[0.06] p-8 sm:p-10">
            <div className="fig-label mb-5">Published research</div>
            <h2 className="max-w-3xl font-display text-3xl font-bold leading-snug text-fg sm:text-4xl">
              {aiReport.title}
            </h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-muted">{aiReport.headline}</p>

            <div className="mt-8 flex flex-wrap gap-x-12 gap-y-5">
              {aiReport.stats.map((s) => (
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

            <Link href="/ai/research-policy" className="btn-primary mt-9">
              Read the findings <IconArrowRight size={15} />
            </Link>
          </div>
        </Reveal>

        {/* Where the training has happened */}
        <Reveal>
          <div className="mt-20">
            <div className="fig-label mb-6">Recent training</div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {trainingDeliveries.map((d) => (
                <div key={d.organisation} className="panel p-6">
                  <div className="font-mono text-[0.58rem] uppercase tracking-[0.16em] text-accent-text">
                    {d.audience}
                  </div>
                  <div className="mt-2 font-display text-lg font-bold leading-snug text-fg">
                    {d.organisation}
                  </div>
                </div>
              ))}
            </div>
            <Link
              href="/ai/training"
              className="mt-8 inline-flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-accent-text transition-colors hover:text-fg"
            >
              See the training programs <IconArrowRight size={14} />
            </Link>
          </div>
        </Reveal>
      </main>
      <Footer />
    </>
  );
}

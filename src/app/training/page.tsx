import type { Metadata } from "next";
import Link from "next/link";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { profile, trainings, trainingIntro, teachingMetrics, universities } from "@/lib/data";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: `Training & Workshops | ${profile.name}`,
  description: trainingIntro,
};

export default function TrainingPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-content px-6 pb-28 pt-36 sm:px-10 lg:pt-44">
        <Reveal>
          <Link
            href="/#teaching"
            /* flex + w-fit, not inline-flex: .fig-label below is itself
               inline-flex and would sit on the same line. */
            className="mb-10 flex w-fit items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted transition-colors hover:text-accent-text"
          >
            <IconArrowLeft size={14} /> Back to home
          </Link>

          <div className="fig-label mb-5">Training &amp; workshops</div>
          <h1 className="section-title max-w-3xl text-5xl sm:text-6xl">
            Programs I <em>run</em>
          </h1>
          <p className="mt-6 max-w-2xl leading-relaxed text-muted">{trainingIntro}</p>

          <div className="mt-10 flex flex-wrap gap-x-12 gap-y-5 border-y border-line/10 py-6">
            {teachingMetrics.map((m) => (
              <div key={m.label}>
                <div className="font-display text-3xl font-semibold text-accent-text">{m.num}</div>
                <div className="mt-1 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-muted">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* One program per row: room for the title to breathe and for the
            audience, format and session list once those are filled in. */}
        <div className="mt-16">
          {trainings.map((t, i) => (
            <Reveal key={t.title} delay={i * 0.04}>
              <article className="group grid grid-cols-1 gap-6 border-t border-line/10 py-10 last:border-b sm:grid-cols-[auto_1fr] sm:gap-10">
                <div className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-accent-text sm:pt-2">
                  W·0{i + 1}
                </div>

                <div>
                  <h2 className="font-display text-2xl font-bold leading-snug text-fg transition-colors group-hover:text-accent-text sm:text-3xl">
                    {t.title}
                  </h2>
                  <p className="mt-3 max-w-2xl leading-relaxed text-muted">{t.sub}</p>

                  {(t.audience || t.format) && (
                    <div className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
                      {t.audience && (
                        <div>
                          <div className="font-mono text-[0.58rem] uppercase tracking-[0.18em] text-muted">
                            Who it is for
                          </div>
                          <div className="mt-1 text-sm text-fg">{t.audience}</div>
                        </div>
                      )}
                      {t.format && (
                        <div>
                          <div className="font-mono text-[0.58rem] uppercase tracking-[0.18em] text-muted">
                            Format
                          </div>
                          <div className="mt-1 text-sm text-fg">{t.format}</div>
                        </div>
                      )}
                    </div>
                  )}

                  {t.covers && t.covers.length > 0 && (
                    <ul className="mt-5 grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2">
                      {t.covers.map((c) => (
                        <li key={c} className="flex gap-2.5 text-sm leading-relaxed text-muted">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                          {c}
                        </li>
                      ))}
                    </ul>
                  )}

                  <Link
                    href="/#contact"
                    className="mt-6 inline-flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-accent-text transition-colors hover:text-fg"
                  >
                    Enquire about this program <IconArrowRight size={14} />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Where the teaching happens: proof the programs are not theoretical */}
        <Reveal>
          <div className="mt-20">
            <div className="fig-label mb-6">Also teaching at</div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {universities.map((u) => (
                <div key={u.name} className="panel p-6">
                  <h3 className="font-display text-lg font-bold text-fg">{u.name}</h3>
                  <div className="mt-1 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-muted">
                    {u.aff} · {u.period}
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{u.courses.join(" · ")}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-20 rounded-2xl border border-accent/25 bg-accent/[0.06] p-8 sm:p-10">
            <h2 className="font-display text-2xl font-bold text-fg sm:text-3xl">
              Bring one of these to your team
            </h2>
            <p className="mt-3 max-w-2xl leading-relaxed text-muted">
              Programs are adapted to the group: a university cohort, a research
              team, or professionals who need to work confidently with AI and
              data. Tell me who you are training and what they need to be able to
              do afterwards.
            </p>
            <Link href="/#contact" className="btn-primary mt-7">
              Get in touch <IconArrowRight size={15} />
            </Link>
          </div>
        </Reveal>
      </main>
      <Footer />
    </>
  );
}

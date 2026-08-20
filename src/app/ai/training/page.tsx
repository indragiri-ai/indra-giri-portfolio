import type { Metadata } from "next";
import Link from "next/link";
import { IconArrowRight, IconCamera, IconBook, IconExternalLink } from "@tabler/icons-react";
import { profile, builtProjects, trainings } from "@/lib/data";
import { aiServices, trainingDeliveries } from "@/lib/ai";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/ui/PageHeader";
import Reveal from "@/components/ui/Reveal";
import { asset } from "@/lib/utils";

const service = aiServices.find((s) => s.slug === "training")!;
/* The teachers handbook, surfaced here because it came out of these sessions. */
const handbook = builtProjects.find((b) => b.title.startsWith("AI for Teachers"));

export const metadata: Metadata = {
  title: `AI Training & Capacity Building | ${profile.name}`,
  description: service.intro,
};

export default function AITrainingPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-content px-6 pb-28 pt-36 sm:px-10 lg:pt-44">
        <PageHeader
          backHref="/ai"
          backLabel="AI practice"
          eyebrow="01 · AI training"
          title={
            <>
              AI training and <em>capacity building</em>
            </>
          }
          intro={service.intro}
        />

        <Reveal delay={0.06}>
          <ul className="mt-10 grid grid-cols-1 gap-x-10 gap-y-3 sm:grid-cols-2">
            {service.points.map((p) => (
              <li key={p} className="flex gap-3 text-sm leading-relaxed text-muted">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                {p}
              </li>
            ))}
          </ul>
        </Reveal>

        {/* The handbook that came out of the teacher sessions. Free and public,
            which makes it the strongest single proof on this page. */}
        {handbook && (
          <Reveal delay={0.1}>
            <a
              href={handbook.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-14 flex flex-col gap-6 rounded-2xl border border-accent/25 bg-accent/[0.06] p-8 transition-all duration-300 hover:border-accent/60 sm:flex-row sm:items-center sm:p-10"
            >
              <IconBook size={38} className="shrink-0 text-accent-text" stroke={1.4} />
              <div className="flex-1">
                <div className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-accent-text">
                  Free resource · {handbook.meta}
                </div>
                <h2 className="mt-2 font-display text-2xl font-bold leading-snug text-fg">
                  {handbook.title}
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">{handbook.desc}</p>
              </div>
              <span className="inline-flex shrink-0 items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-accent-text transition-transform group-hover:translate-x-1">
                Open the handbook <IconExternalLink size={14} />
              </span>
            </a>
          </Reveal>
        )}

        {/* Programs offered: what a session actually covers, moved here from
            the old standalone /training page since training belongs with the
            rest of the AI practice, not attached to university teaching. */}
        <div className="mt-20">
          <Reveal>
            <div className="fig-label mb-8">Programs I run</div>
          </Reveal>
          <div>
            {trainings.map((t, i) => (
              <Reveal key={t.title} delay={i * 0.04}>
                <article className="group grid grid-cols-1 gap-6 border-t border-line/10 py-10 last:border-b sm:grid-cols-[auto_1fr] sm:gap-10">
                  <div className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-accent-text sm:pt-2">
                    W·0{i + 1}
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-bold leading-snug text-fg transition-colors group-hover:text-accent-text sm:text-3xl">
                      {t.title}
                    </h3>
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
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Delivered programs, alternating photo and text */}
        <div className="mt-20">
          <Reveal>
            <div className="fig-label mb-8">Where I have delivered</div>
          </Reveal>

          {trainingDeliveries.map((d, i) => (
            <Reveal key={d.organisation} delay={i * 0.04}>
              <article
                className={`grid grid-cols-1 items-center gap-8 border-t border-line/10 py-12 last:border-b lg:grid-cols-2 lg:gap-14 ${
                  i % 2 === 1 ? "lg:[&>figure]:order-2" : ""
                }`}
              >
                <figure className="overflow-hidden rounded-2xl border border-line/10 bg-surface">
                  {d.photo ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={asset(d.photo)}
                      alt={d.photoCaption ?? d.organisation}
                      className="aspect-[4/3] w-full object-cover"
                    />
                  ) : (
                    /* Placeholder until the real photo lands in public/images/ai/ */
                    <div className="flex aspect-[4/3] w-full flex-col items-center justify-center gap-3 bg-accent/[0.05] text-center">
                      <IconCamera size={26} className="text-accent-text/70" />
                      <div className="px-6 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-muted">
                        {d.photoCaption}
                      </div>
                      <div className="font-mono text-[0.55rem] uppercase tracking-[0.14em] text-muted/60">
                        Photo to be added
                      </div>
                    </div>
                  )}
                </figure>

                <div>
                  <div className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-accent-text">
                    {d.audience}
                  </div>
                  <h2 className="mt-2 font-display text-2xl font-bold leading-snug text-fg sm:text-3xl">
                    {d.organisation}
                  </h2>
                  <p className="mt-4 leading-relaxed text-muted">{d.summary}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {d.topics.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-line/15 px-3 py-1 font-mono text-[0.58rem] uppercase tracking-[0.1em] text-muted"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-20 rounded-2xl border border-accent/25 bg-accent/[0.06] p-8 sm:p-10">
            <h2 className="font-display text-2xl font-bold text-fg sm:text-3xl">
              Training for your team or institution
            </h2>
            <p className="mt-3 max-w-2xl leading-relaxed text-muted">
              Sessions are built around what the group actually does, whether
              that is a university cohort, a staff room or a professional team.
              Tell me who is in the room and what they need to be able to do
              afterwards.
            </p>
            <div className="mt-7 flex flex-wrap gap-4">
              <Link href="/#contact" className="btn-primary">
                Get in touch <IconArrowRight size={15} />
              </Link>
            </div>
          </div>
        </Reveal>
      </main>
      <Footer />
    </>
  );
}

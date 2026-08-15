import type { Metadata } from "next";
import Link from "next/link";
import { IconArrowRight, IconCamera } from "@tabler/icons-react";
import { profile } from "@/lib/data";
import { aiServices, trainingDeliveries } from "@/lib/ai";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/ui/PageHeader";
import Reveal from "@/components/ui/Reveal";
import { asset } from "@/lib/utils";

const service = aiServices.find((s) => s.slug === "training")!;

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
              <Link href="/training" className="btn-ghost">
                All training programs
              </Link>
            </div>
          </div>
        </Reveal>
      </main>
      <Footer />
    </>
  );
}

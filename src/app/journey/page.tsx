import type { Metadata } from "next";
import Link from "next/link";
import { IconDownload, IconCertificate, IconExternalLink } from "@tabler/icons-react";
import {
  profile,
  journey,
  tools,
  researchMethods,
  analyticalTechniques,
  languages,
  certifications,
} from "@/lib/data";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/ui/PageHeader";
import Reveal from "@/components/ui/Reveal";
import JourneyTimeline from "@/components/ui/JourneyTimeline";
import { asset } from "@/lib/utils";

const intro =
  "From Delhi classrooms to Nepali field sites, and from spreadsheets to AI systems. The full path, with the toolkit picked up along the way.";

export const metadata: Metadata = {
  title: `Journey & Toolkit | ${profile.name}`,
  description: intro,
};

function ChipCloud({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2.5">
      {items.map((label) => (
        <span
          key={label}
          className="rounded-full border border-line/15 bg-surface px-4 py-2 font-mono text-[0.68rem] uppercase tracking-[0.1em] text-fg transition-colors hover:border-accent hover:text-accent-text"
        >
          {label}
        </span>
      ))}
    </div>
  );
}

export default function JourneyPage() {
  const roles = journey.filter((j) => j.type !== "edu").length;
  const education = journey.length - roles;

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-content px-6 pb-28 pt-36 sm:px-10 lg:pt-44">
        <PageHeader
          eyebrow="Journey &amp; toolkit"
          title={
            <>
              A decade across research, data &amp; <em>borders</em>
            </>
          }
          intro={intro}
        />

        <Reveal delay={0.06}>
          <div className="mt-10 flex flex-wrap items-center gap-x-12 gap-y-5 border-y border-line/10 py-6">
            {[
              { value: `${roles}`, label: "Roles" },
              { value: `${education}`, label: "Degrees" },
              { value: "10+", label: "Years of research" },
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
            <a href={asset(profile.cvPath)} download className="btn-ghost sm:ml-auto">
              Download CV <IconDownload size={15} />
            </a>
          </div>
        </Reveal>

        <div className="mt-16">
          <JourneyTimeline />
        </div>

        {/* The toolkit moved here off the home page: it is reference material
            for someone reading a CV, not a reason to hire anyone. */}
        <div className="mt-24">
          <Reveal>
            <h2 className="section-title mb-4 max-w-3xl text-3xl sm:text-4xl">
              The analytical <em>toolkit</em>
            </h2>
            <p className="mb-12 max-w-2xl leading-relaxed text-muted">
              Statistical software, AI tools, research methods and analytical
              techniques. The instruments behind every evidence based decision.
            </p>
          </Reveal>

          <Reveal>
            <div className="fig-label mb-6">Software &amp; AI proficiency</div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {tools.map((t) => (
                <div
                  key={t.name}
                  className="panel flex h-full flex-col p-5 transition-colors hover:border-accent/40"
                >
                  <div className="font-mono text-[0.58rem] uppercase tracking-[0.18em] text-accent-text">
                    {t.tier}
                  </div>
                  <div className="mt-2 font-display text-lg font-bold leading-snug text-fg">
                    {t.name}
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{t.use}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-12 md:grid-cols-2">
            <Reveal delay={0.05}>
              <div className="fig-label mb-5">Research methods</div>
              <ChipCloud items={researchMethods} />
            </Reveal>
            <Reveal delay={0.1}>
              <div className="fig-label mb-5">Analytical techniques</div>
              <ChipCloud items={analyticalTechniques} />
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <div className="mt-14">
              <div className="fig-label mb-5">Languages</div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {languages.map((l) => (
                  <div key={l.name} className="panel flex items-baseline justify-between px-5 py-4">
                    <span className="font-display text-lg font-bold text-fg">{l.name}</span>
                    <span className="font-mono text-[0.6rem] uppercase tracking-[0.15em] text-accent-text">
                      {l.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-14">
              <div className="fig-label mb-5">Certifications</div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {certifications.map((c) => (
                  <div
                    key={c.title}
                    className="panel flex h-full flex-col gap-3 p-5 transition-colors hover:border-accent/40"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-accent/30 bg-accent/10 text-accent-text">
                        <IconCertificate size={16} stroke={1.7} />
                      </span>
                      <span className="font-mono text-[0.6rem] uppercase tracking-[0.15em] text-muted">
                        {c.year}
                      </span>
                    </div>
                    <div>
                      <div className="font-display text-lg font-bold leading-snug text-fg">
                        {c.title}
                      </div>
                      <div className="mt-1 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-accent-text">
                        {c.issuer}
                      </div>
                    </div>
                    {c.credentialId && (
                      <p className="text-[0.68rem] text-muted">Credential ID: {c.credentialId}</p>
                    )}
                    {c.file && (
                      <a
                        href={asset(c.file)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-auto inline-flex items-center gap-1.5 pt-1 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-accent-text"
                      >
                        View certificate <IconExternalLink size={12} />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <div className="mt-20">
            <Link href="/#about" className="btn-ghost">
              Back to the site
            </Link>
          </div>
        </Reveal>
      </main>
      <Footer />
    </>
  );
}

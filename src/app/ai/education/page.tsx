import type { Metadata } from "next";
import Link from "next/link";
import { IconArrowRight } from "@tabler/icons-react";
import { posts } from "@/lib/blog";
import {
  educationPage,
  evidence,
  evidenceSource,
  gaps,
  whatIDo,
  handbook,
  readMore,
  faq,
  closing,
} from "@/lib/ai-education";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/ui/PageHeader";
import Reveal from "@/components/ui/Reveal";
import JsonLd, { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { absUrl, absAsset } from "@/lib/site";

const url = absUrl("/ai/education");
const ogImage = absAsset("/og/ai-education.png");

export const metadata: Metadata = {
  title: educationPage.title,
  description: educationPage.description,
  alternates: { canonical: url },
  openGraph: {
    type: "website",
    url,
    title: educationPage.title,
    description: educationPage.description,
    locale: "en_US",
    images: [{ url: ogImage, width: 1200, height: 630, alt: educationPage.h1 }],
  },
  twitter: {
    card: "summary_large_image",
    title: educationPage.title,
    description: educationPage.description,
    images: [ogImage],
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.items.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

/** Section heading: same gold rule used above blog article headings. */
function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="mb-5 h-0.5 w-10 bg-accent/60" />
      <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight text-fg sm:text-4xl">
        {children}
      </h2>
    </>
  );
}

const prose = "space-y-5 text-[1.05rem] leading-[1.85] text-muted";

export default function AIEducationPage() {
  const related = readMore.slugs
    .map((slug) => posts.find((p) => p.slug === slug))
    .filter((p): p is (typeof posts)[number] => Boolean(p));

  return (
    <>
      <JsonLd data={faqJsonLd} />
      <BreadcrumbJsonLd
        trail={[
          { name: "AI", path: "/ai" },
          { name: "AI in education", path: "/ai/education" },
        ]}
      />
      <Navbar />
      <main className="mx-auto max-w-content px-6 pb-28 pt-36 sm:px-10 lg:pt-44">
        <PageHeader
          backHref="/ai"
          backLabel="AI practice"
          eyebrow={educationPage.eyebrow}
          title={educationPage.h1}
        />

        {/* Lead */}
        <Reveal delay={0.06}>
          <div className="mt-8 max-w-3xl space-y-5 text-lg leading-relaxed text-fg/90">
            {educationPage.lead.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <p className="mt-8 max-w-3xl border-l-2 border-accent pl-5 leading-relaxed text-muted">
            {educationPage.subLead}
          </p>
        </Reveal>

        {/* 1. Evidence */}
        <section className="mt-20 max-w-3xl">
          <Reveal>
            <SectionHeading>{evidence.heading}</SectionHeading>
            <div className={`mt-6 ${prose}`}>
              {evidence.paragraphs.slice(0, -1).map((p) => (
                <p key={p}>{p}</p>
              ))}
              <p className="text-sm leading-relaxed">
                {evidenceSource.before}
                <a
                  href={evidenceSource.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-text underline underline-offset-4 transition-colors hover:text-fg"
                >
                  {evidenceSource.linkText}
                </a>
                {evidenceSource.after}
              </p>
              <p>{evidence.paragraphs[evidence.paragraphs.length - 1]}</p>
            </div>
            <Link
              href={evidence.link.href}
              className="mt-2 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-accent-text transition-colors hover:text-fg"
            >
              {evidence.link.label} <IconArrowRight size={14} />
            </Link>
          </Reveal>
        </section>

        {/* 2. Three gaps */}
        <section className="mt-20">
          <Reveal>
            <div className="max-w-3xl">
              <SectionHeading>{gaps.heading}</SectionHeading>
              <p className="mt-6 text-[1.05rem] leading-[1.85] text-muted">{gaps.intro}</p>
            </div>
          </Reveal>
          <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-3">
            {gaps.items.map((g, i) => (
              <Reveal key={g.label} delay={i * 0.06}>
                <div className="panel h-full p-7">
                  <div className="font-mono text-[0.72rem] uppercase tracking-[0.16em] text-accent-text">
                    0{i + 1}
                  </div>
                  <h3 className="mt-2 font-display text-xl font-bold leading-snug text-fg">
                    {g.label}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{g.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* 3. What I do */}
        <section className="mt-20 max-w-3xl">
          <Reveal>
            <SectionHeading>{whatIDo.heading}</SectionHeading>
            <div className={`mt-6 ${prose}`}>
              {whatIDo.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <Link href={whatIDo.button.href} className="btn-primary mt-4">
              {whatIDo.button.label} <IconArrowRight size={15} />
            </Link>
          </Reveal>
        </section>

        {/* 4. Handbook */}
        <Reveal>
          <section className="mt-20 overflow-hidden rounded-2xl border border-accent/25 bg-accent/[0.06] p-8 sm:p-10">
            <h2 className="max-w-3xl font-display text-3xl font-bold leading-snug text-fg sm:text-4xl">
              {handbook.heading}
            </h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-muted">{handbook.body}</p>
            <Link href={handbook.button.href} className="btn-primary mt-8">
              {handbook.button.label} <IconArrowRight size={15} />
            </Link>
          </section>
        </Reveal>

        {/* 5. Read more */}
        <section className="mt-20">
          <Reveal>
            <SectionHeading>{readMore.heading}</SectionHeading>
          </Reveal>
          <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {related.map((p, i) => (
              <li key={p.slug} className="list-none">
                <Reveal delay={i * 0.05} className="h-full">
                  <Link
                    href={`/blog/${p.slug}`}
                    className="group flex h-full items-center justify-between gap-4 rounded-2xl border border-line/10 bg-surface p-6 transition-colors hover:border-accent/40"
                  >
                    <span className="font-display text-lg font-semibold leading-snug text-fg transition-colors group-hover:text-accent-text">
                      {p.title}
                    </span>
                    <IconArrowRight
                      size={18}
                      className="shrink-0 text-accent-text transition-transform group-hover:translate-x-1"
                    />
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </section>

        {/* 6. FAQ: shown in full, with the same text in FAQPage JSON-LD above */}
        <section className="mt-20 max-w-3xl">
          <Reveal>
            <SectionHeading>{faq.heading}</SectionHeading>
          </Reveal>
          <div className="mt-8 space-y-4">
            {faq.items.map((f, i) => (
              <Reveal key={f.q} delay={i * 0.04}>
                <div className="panel p-7">
                  <h3 className="font-display text-xl font-bold leading-snug text-fg">{f.q}</h3>
                  <p className="mt-3 leading-relaxed text-muted">{f.a}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Closing */}
        <Reveal>
          <div className="mt-20 rounded-2xl border border-accent/25 bg-accent/[0.06] p-8 sm:p-10">
            <h2 className="font-display text-2xl font-bold text-fg sm:text-3xl">
              {closing.heading}
            </h2>
            <p className="mt-3 max-w-2xl leading-relaxed text-muted">{closing.body}</p>
            <div className="mt-7 flex flex-wrap gap-4">
              <Link href={closing.button.href} className="btn-primary">
                {closing.button.label} <IconArrowRight size={15} />
              </Link>
            </div>
          </div>
        </Reveal>
      </main>
      <Footer />
    </>
  );
}

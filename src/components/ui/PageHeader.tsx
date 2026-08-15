import Link from "next/link";
import { IconArrowLeft } from "@tabler/icons-react";
import Reveal from "./Reveal";

/**
 * Standard header for standalone pages (/ai/*, /projects, /training).
 * The back link is `flex w-fit` rather than inline-flex because .fig-label is
 * itself inline-flex and would otherwise sit on the same line.
 */
export default function PageHeader({
  backHref = "/",
  backLabel = "Back to home",
  eyebrow,
  title,
  intro,
}: {
  backHref?: string;
  backLabel?: string;
  eyebrow: string;
  title: React.ReactNode;
  intro?: string;
}) {
  return (
    <Reveal>
      <Link
        href={backHref}
        className="mb-10 flex w-fit items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted transition-colors hover:text-accent-text"
      >
        <IconArrowLeft size={14} /> {backLabel}
      </Link>

      <div className="fig-label mb-5">{eyebrow}</div>
      <h1 className="section-title max-w-3xl text-5xl sm:text-6xl">{title}</h1>
      {intro && <p className="mt-6 max-w-2xl leading-relaxed text-muted">{intro}</p>}
    </Reveal>
  );
}

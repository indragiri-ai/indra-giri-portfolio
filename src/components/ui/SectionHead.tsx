import Reveal from "./Reveal";

export default function SectionHead({
  fig,
  tag,
  title,
  intro,
}: {
  fig: string;
  tag: string;
  title: React.ReactNode;
  intro?: string;
}) {
  return (
    <Reveal>
      <div className="fig-label mb-5">
        FIG. {fig} — {tag}
      </div>
      <h2 className="section-title mb-4 max-w-3xl">{title}</h2>
      {intro && <p className="mb-12 max-w-xl leading-relaxed text-muted">{intro}</p>}
    </Reveal>
  );
}

import { IconArrowUpRight } from "@tabler/icons-react";
import { builtProjects } from "@/lib/data";
import Reveal from "@/components/ui/Reveal";
import { asset } from "@/lib/utils";

/**
 * The one thing on this site a visitor can go and use immediately. Everything
 * else is work done for a client, which they have to take on trust; this is a
 * product that exists on its own. That is why it sits directly under the hero
 * and not as one card among twelve in the research catalogue.
 *
 * Unnumbered on purpose: it is a feature band, not one of the numbered
 * sections of the one-page narrative.
 */
export default function FeaturedWork() {
  const item = builtProjects.find((b) => b.featured);
  if (!item) return null;

  return (
    <section className="border-y border-line/10 bg-surface/40">
      <div className="mx-auto max-w-content px-6 py-16 sm:px-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-16">
          <Reveal>
            <div className="fig-label mb-5">Featured work</div>
            <h2 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-fg sm:text-5xl">
              {item.title}
            </h2>
            <p className="mt-5 max-w-xl leading-relaxed text-muted">{item.headline ?? item.desc}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              {item.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-line/15 px-3 py-1 font-mono text-[0.58rem] uppercase tracking-[0.12em] text-muted"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-5">
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Visit the portal <IconArrowUpRight size={15} />
              </a>
              <span className="flex items-center gap-2 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-accent-text">
                <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-accent" />
                {item.status}
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block overflow-hidden rounded-2xl border border-line/15 bg-surface shadow-[0_24px_70px_rgb(var(--fg)/0.10)] transition-all duration-300 hover:-translate-y-1 hover:border-accent/40"
            >
              {/* browser chrome, so it reads as a live product rather than a picture */}
              <div className="flex items-center gap-2 border-b border-line/10 px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-muted/30" />
                <span className="h-2.5 w-2.5 rounded-full bg-muted/30" />
                <span className="h-2.5 w-2.5 rounded-full bg-muted/30" />
                <span className="ml-3 truncate font-mono text-[0.58rem] tracking-[0.08em] text-muted">
                  {item.url.replace(/^https?:\/\//, "")}
                </span>
              </div>
              {item.image && (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={asset(item.image)}
                  alt={`${item.title} home page`}
                  className="w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                />
              )}
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

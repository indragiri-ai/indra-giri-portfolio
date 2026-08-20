"use client";

import { motion } from "framer-motion";
import { IconArrowUpRight, IconBolt } from "@tabler/icons-react";
import { builtProjects } from "@/lib/data";
import Reveal from "@/components/ui/Reveal";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { asset } from "@/lib/utils";

const CARD_EASE = [0.16, 1, 0.3, 1] as const;

/**
 * The one thing on this site a visitor can go and use immediately. Everything
 * else is work done for a client, which they have to take on trust; this is a
 * product that exists on its own. That is why it sits directly under the hero
 * and not as one card among twelve in the research catalogue.
 *
 * The mockup rests at a slight isometric tilt in 3D space (a shared
 * perspective root, not a flat card) and straightens toward the visitor on
 * hover, backed by a soft depth glow rather than a flat drop shadow. All of
 * it collapses to a plain static card under prefers-reduced-motion: none of
 * this is a mouse-follow effect, it only ever reacts to scroll position and
 * discrete hover/focus state.
 *
 * Unnumbered on purpose: it is a feature band, not one of the numbered
 * sections of the one-page narrative.
 */
export default function FeaturedWork() {
  const item = builtProjects.find((b) => b.featured);
  const reduced = usePrefersReducedMotion();
  if (!item) return null;

  return (
    <section className="relative overflow-hidden border-y border-line/10 bg-surface/40">
      {/* ambient depth glow behind the mockup column, quiet on its own */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(640px 420px at 82% 30%, rgb(var(--accent)/0.14), transparent 65%), radial-gradient(420px 320px at 60% 90%, rgb(var(--accent)/0.07), transparent 70%)",
        }}
      />

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

          {/* mockup: shared perspective root gives the card and its floating
              badge a single, consistent vanishing point */}
          <div className="relative py-6" style={{ perspective: 1600 }}>
            <motion.a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block overflow-hidden rounded-2xl border border-line/15 bg-surface"
              style={{ transformStyle: "preserve-3d", transformOrigin: "50% 50%" }}
              initial={
                reduced
                  ? { opacity: 0 }
                  : { opacity: 0, rotateY: 16, rotateX: 6, y: 40, scale: 0.94 }
              }
              whileInView={
                reduced
                  ? { opacity: 1 }
                  : { opacity: 1, rotateY: -6, rotateX: 3, y: 0, scale: 1 }
              }
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.85, ease: CARD_EASE }}
              whileHover={
                reduced
                  ? undefined
                  : { rotateY: 0, rotateX: 0, y: -10, scale: 1.015, transition: { duration: 0.45, ease: CARD_EASE } }
              }
            >
              {/* depth pad: a blurred duplicate of the card's silhouette,
                  pushed back in 3D space so the card reads as floating */}
              <span
                aria-hidden
                className="absolute inset-3 -z-10 rounded-2xl bg-[rgb(var(--fg)/0.10)] blur-2xl"
                style={{ transform: "translateZ(-70px) scale(0.92)" }}
              />
              <span
                aria-hidden
                className="absolute inset-0 -z-10 rounded-2xl shadow-[0_40px_90px_-30px_rgb(var(--fg)/0.45)]"
              />

              {/* browser chrome, so it reads as a live product rather than a picture */}
              <div className="flex items-center gap-2 border-b border-line/10 bg-surface px-4 py-3">
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
                  className="w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.015]"
                />
              )}

              {/* border glow ring on hover, in place of a plain border-color swap */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 ring-1 ring-accent/50 transition-opacity duration-300 group-hover:opacity-100"
              />
            </motion.a>

            {/* floating status badge, popped forward out of the card's plane */}
            <motion.div
              aria-hidden
              className="absolute -top-4 right-6 z-10 flex items-center gap-1.5 rounded-full border border-accent/30 bg-bg/90 px-3.5 py-1.5 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-accent-text shadow-[0_10px_30px_-10px_rgb(var(--accent)/0.5)] backdrop-blur"
              style={{ transform: "translateZ(60px)" }}
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: -12, rotate: -4 }}
              whileInView={
                reduced
                  ? { opacity: 1 }
                  : { opacity: 1, y: [0, -6, 0], rotate: -4 }
              }
              viewport={{ once: true, amount: 0.4 }}
              transition={
                reduced
                  ? { duration: 0.5 }
                  : {
                      default: { duration: 0.7, delay: 0.25, ease: CARD_EASE },
                      y: { duration: 3.6, repeat: Infinity, ease: "easeInOut", delay: 1 },
                    }
              }
            >
              <IconBolt size={12} />
              {item.status}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

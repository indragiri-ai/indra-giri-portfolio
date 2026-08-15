"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { IconArrowRight } from "@tabler/icons-react";
import { galleryPhotos, galleryIntro } from "@/lib/gallery";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import SectionHead from "@/components/ui/SectionHead";
import Reveal from "@/components/ui/Reveal";
import { asset } from "@/lib/utils";

const SLOTS = 3;
const ROTATE_MS = 5000;

/**
 * Three photos on the home page that cycle through the collection, with the
 * full set on /gallery. A long grid of every photo made the home page drag,
 * and a photo wall is not what a visitor came to the home page for.
 *
 * Rotation stops entirely under prefers-reduced-motion: an image that changes
 * on its own is exactly what that setting asks us not to do.
 */
export default function Gallery() {
  const photos = galleryPhotos();
  const reduced = usePrefersReducedMotion();
  const [offset, setOffset] = useState(0);

  const canRotate = !reduced && photos.length > SLOTS;

  useEffect(() => {
    if (!canRotate) return;
    const id = setInterval(() => setOffset((o) => (o + 1) % photos.length), ROTATE_MS);
    return () => clearInterval(id);
  }, [canRotate, photos.length]);

  if (photos.length === 0) return null;

  const visible = Array.from({ length: Math.min(SLOTS, photos.length) }, (_, i) => ({
    slot: i,
    item: photos[(offset + i) % photos.length],
  }));

  return (
    <section id="gallery" className="mx-auto max-w-content px-6 py-20 sm:px-10">
      <SectionHead
        fig="06"
        tag="Media"
        title={
          <>
            Media &amp; <em>gallery</em>
          </>
        }
        intro={galleryIntro}
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map(({ slot, item }) => (
          <Reveal key={slot} delay={slot * 0.06}>
            <figure className="group h-full overflow-hidden rounded-2xl border border-line/10 bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-accent/40">
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                {/* keyed on src so React swaps the node and the fade replays */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  key={item.src}
                  src={asset(item.src!)}
                  alt={item.caption}
                  className="h-full w-full animate-fade-in object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>

              <figcaption className="p-5">
                <span className="font-mono text-[0.55rem] uppercase tracking-[0.16em] text-accent-text">
                  {item.kind === "training" ? "Training" : "Field work"}
                </span>
                <p className="mt-2 font-display text-base font-bold leading-snug text-fg">
                  {item.caption}
                </p>
                <p className="mt-1 font-mono text-[0.58rem] uppercase tracking-[0.12em] text-muted">
                  {item.meta}
                </p>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.2}>
        <div className="mt-12 flex flex-wrap items-center gap-6 border-t border-line/10 pt-8">
          <Link href="/gallery" className="btn-primary">
            View full gallery <IconArrowRight size={15} />
          </Link>
          <p className="max-w-md text-sm leading-relaxed text-muted">
            {photos.length} photographs from training rooms, staff rooms and
            fieldwork across Nepal.
          </p>
        </div>
      </Reveal>
    </section>
  );
}

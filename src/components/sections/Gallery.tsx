import Link from "next/link";
import { IconArrowRight } from "@tabler/icons-react";
import { galleryPhotos, galleryIntro } from "@/lib/gallery";
import SectionHead from "@/components/ui/SectionHead";
import Reveal from "@/components/ui/Reveal";
import { asset } from "@/lib/utils";

const SLOTS = 3;

/**
 * The first three photos of the collection, static, with the full set on
 * /gallery. A long grid of every photo made the home page drag. These used to
 * rotate every 5s, but a visitor rarely stayed long enough to see the swap
 * and a picture changing on its own competes with the text around it.
 */
export default function Gallery() {
  const photos = galleryPhotos();
  if (photos.length === 0) return null;

  const visible = photos.slice(0, SLOTS).map((item, slot) => ({ slot, item }));

  return (
    <section id="gallery" className="mx-auto max-w-content px-6 py-20 sm:px-10">
      <SectionHead
        fig="07"
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
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={asset(item.src!)}
                  alt={item.caption}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>

              <figcaption className="p-5">
                <span className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-accent-text">
                  {item.kind === "training" ? "Training" : "Field work"}
                </span>
                <p className="mt-2 font-display text-base font-bold leading-snug text-fg">
                  {item.caption}
                </p>
                <p className="mt-1 font-mono text-[0.72rem] uppercase tracking-[0.12em] text-muted">
                  {item.meta}
                </p>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.2}>
        <div className="mt-12 border-t border-line/10 pt-8">
          <Link href="/gallery" className="btn-primary">
            View full gallery <IconArrowRight size={15} />
          </Link>
        </div>
      </Reveal>
    </section>
  );
}

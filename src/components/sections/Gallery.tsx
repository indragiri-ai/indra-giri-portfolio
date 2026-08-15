import { IconCamera } from "@tabler/icons-react";
import { gallery, galleryIntro } from "@/lib/gallery";
import SectionHead from "@/components/ui/SectionHead";
import Reveal from "@/components/ui/Reveal";
import { asset } from "@/lib/utils";

/**
 * Photo wall from training sessions and field visits. Tiles with no `src` yet
 * render as labelled placeholders so the section reads as intentional rather
 * than broken while the photos are being gathered.
 */
export default function Gallery() {
  return (
    <section id="gallery" className="mx-auto max-w-content px-6 py-20 sm:px-10">
      <SectionHead
        fig="06"
        tag="Media"
        title={
          <>
            From the <em>field</em>
          </>
        }
        intro={galleryIntro}
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {gallery.map((item, i) => (
          <Reveal key={item.caption} delay={(i % 3) * 0.06}>
            <figure className="group h-full overflow-hidden rounded-2xl border border-line/10 bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-accent/40">
              {item.src ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={asset(item.src)}
                  alt={item.caption}
                  className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              ) : (
                <div className="flex aspect-[4/3] w-full flex-col items-center justify-center gap-3 bg-accent/[0.05]">
                  <IconCamera size={24} className="text-accent-text/70" />
                  <span className="font-mono text-[0.55rem] uppercase tracking-[0.16em] text-muted/70">
                    Photo to be added
                  </span>
                </div>
              )}

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
    </section>
  );
}

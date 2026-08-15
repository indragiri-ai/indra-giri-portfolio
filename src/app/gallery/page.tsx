import type { Metadata } from "next";
import { profile } from "@/lib/data";
import { galleryPhotos, galleryIntro } from "@/lib/gallery";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/ui/PageHeader";
import Reveal from "@/components/ui/Reveal";
import { asset } from "@/lib/utils";

export const metadata: Metadata = {
  title: `Media & Gallery | ${profile.name}`,
  description: galleryIntro,
};

export default function GalleryPage() {
  const photos = galleryPhotos();
  const training = photos.filter((p) => p.kind === "training").length;
  const field = photos.length - training;

  return (
    <>
      <Navbar />
      <main className="pb-28 pt-36 lg:pt-44">
        <div className="mx-auto max-w-content px-6 sm:px-10">
          <PageHeader
            eyebrow="Media &amp; gallery"
            title={
              <>
                The work, <em>as it happens</em>
              </>
            }
            intro={galleryIntro}
          />

          <Reveal delay={0.06}>
            <div className="mt-10 flex flex-wrap gap-x-12 gap-y-5 border-y border-line/10 py-6">
              {[
                { value: photos.length, label: "Photographs" },
                { value: training, label: "Training sessions" },
                { value: field, label: "Field work" },
              ]
                .filter((s) => s.value > 0)
                .map((s) => (
                  <div key={s.label}>
                    <div className="font-display text-3xl font-semibold text-accent-text">
                      {s.value}
                    </div>
                    <div className="mt-1 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-muted">
                      {s.label}
                    </div>
                  </div>
                ))}
            </div>
          </Reveal>
        </div>

        {/* Alternating layout: every third photo runs wide, so the page reads
            as a photo essay rather than a uniform grid of thumbnails. */}
        <div className="mt-16 space-y-16">
          {photos.map((item, i) => {
            const wide = i % 3 === 0;

            return (
              <Reveal key={item.caption} delay={0.04}>
                <figure
                  className={
                    wide
                      ? "mx-auto max-w-[1400px] px-4 sm:px-6"
                      : "mx-auto max-w-content px-6 sm:px-10"
                  }
                >
                  <div
                    className={
                      wide
                        ? "overflow-hidden rounded-2xl border border-line/10 bg-surface"
                        : "grid grid-cols-1 items-center gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:gap-14"
                    }
                  >
                    <div
                      className={
                        wide
                          ? ""
                          : "overflow-hidden rounded-2xl border border-line/10 bg-surface"
                      }
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={asset(item.src!)}
                        alt={item.caption}
                        className={
                          wide
                            ? "aspect-[21/9] w-full object-cover"
                            : "aspect-[4/3] w-full object-cover"
                        }
                      />
                    </div>

                    <figcaption className={wide ? "px-6 py-6 sm:px-8" : ""}>
                      <span className="font-mono text-[0.58rem] uppercase tracking-[0.18em] text-accent-text">
                        {item.kind === "training" ? "Training" : "Field work"}
                      </span>
                      <p className="mt-3 max-w-2xl font-display text-2xl font-bold leading-snug text-fg sm:text-3xl">
                        {item.caption}
                      </p>
                      <p className="mt-2 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted">
                        {item.meta}
                      </p>
                    </figcaption>
                  </div>
                </figure>
              </Reveal>
            );
          })}
        </div>

        <div className="mx-auto mt-24 max-w-content px-6 sm:px-10">
          <Reveal>
            <p className="border-l-2 border-accent pl-6 text-sm leading-loose text-muted">
              More photographs are added as the work happens. If you were at one
              of these sessions and would rather a photograph came down, tell me
              and it goes.
            </p>
          </Reveal>
        </div>
      </main>
      <Footer />
    </>
  );
}

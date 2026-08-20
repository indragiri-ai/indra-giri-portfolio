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
        </div>

        {/* Same card design as the home page's Media & Gallery section,
            just showing every photo in one grid instead of a rotating
            three-slot window. */}
        <div className="mx-auto mt-16 max-w-content px-6 sm:px-10">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {photos.map((item, i) => (
              <Reveal key={item.caption} delay={Math.min(i * 0.04, 0.3)}>
                <figure className="group h-full overflow-hidden rounded-2xl border border-line/10 bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-accent/40">
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={asset(item.src!)}
                      alt={item.caption}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
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

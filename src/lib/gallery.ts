/**
 * Media and gallery: photos from training sessions and field visits.
 *
 * TO ADD A PHOTO: drop the file in public/images/gallery/, add an entry at the
 * TOP of `gallery` (newest first) and write a caption. Leave `src` empty and the
 * tile renders as a labelled placeholder, so you can plan the layout before the
 * photos exist. Delete any entry you do not want.
 *
 * Captions do the work here. "AI training, Durbar High School, 2025" is worth
 * more than a photo with no context, so keep `caption` specific and put the
 * place and date in `meta`.
 */

export interface GalleryItem {
  /** Path under /public, e.g. "/images/gallery/kusom-session.jpg". */
  src?: string;
  caption: string;
  /** Place and date, shown small under the caption. */
  meta: string;
  /** "training" | "field" – used for the small tag on the tile. */
  kind: "training" | "field";
}

export const galleryIntro =
  "Sessions, field teams and the places the research happens. Most of this work occurs far from a desk.";

/**
 * Only entries that actually have an image. Everything public renders from
 * this, so a caption waiting for its photo never shows as an empty tile on the
 * live site: the entries below with no `src` are a to-do list, not content.
 */
export const galleryPhotos = () => gallery.filter((g) => Boolean(g.src));

export const gallery: GalleryItem[] = [
  {
    src: "/images/ai/kusom.jpg",
    caption: "Generative AI session with management students",
    meta: "Kathmandu University School of Management",
    kind: "training",
  },
  {
    src: "/images/ai/pashupati-mitra.jpg",
    caption: "Opening an AI session for teaching staff",
    meta: "Pashupati Mitra School, Kathmandu",
    kind: "training",
  },
  {
    src: "/images/ai/durbar-high-school.jpg",
    caption: "Teachers working through the exercises",
    meta: "Durbar High School, Kathmandu",
    kind: "training",
  },
  {
    src: "/images/ai/sewa-sadan.jpg",
    caption: "Teaching staff after the AI training",
    meta: "Sewa Sadan School, Kathmandu",
    kind: "training",
  },
  {
    caption: "Household survey enumeration",
    meta: "Brick Plus endline, Lalitpur",
    kind: "field",
  },
  {
    caption: "Field team briefing before enumeration",
    meta: "Dairy market study",
    kind: "field",
  },
  {
    caption: "Key informant interview",
    meta: "Large cardamom value chain, eastern Nepal",
    kind: "field",
  },
];

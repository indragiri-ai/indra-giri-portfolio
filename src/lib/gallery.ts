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
  /** "training" | "field" - used for the small tag on the tile. */
  kind: "training" | "field";
}

/**
 * Kept honest against what's actually visible: while every fieldwork entry
 * below is still waiting on a photo (no `src`), this only promises training
 * sessions. Widen it back to "field teams and the places the research
 * happens" once a fieldwork entry actually has an image.
 */
export const galleryIntro =
  "Training sessions with teachers and institutions across Nepal, and the field visits where the research happens.";

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
    src: "/images/gallery/kusom-token-of-love.jpg",
    caption: "Receiving a token of appreciation after the AI and Excel training",
    meta: "Kathmandu University School of Management",
    kind: "training",
  },
  {
    src: "/images/gallery/sankhya-ai-team-putalisadak.jpg",
    caption: "With the Sankhya AI team",
    meta: "Putalisadak, Kathmandu",
    kind: "training",
  },
  {
    src: "/images/gallery/cds-workshop-kalanki.jpg",
    caption: "Workshop with the CDS team",
    meta: "Kalanki, Kathmandu",
    kind: "training",
  },
  {
    src: "/images/gallery/fgd-child-marriage-nepalgunj.jpg",
    caption: "After a focus group discussion with parents on child marriage",
    meta: "Nepalgunj",
    kind: "field",
  },
  {
    src: "/images/gallery/parents-municipality-nepalgunj.jpg",
    caption: "Discussion with parents and municipality representatives",
    meta: "Nepalgunj",
    kind: "field",
  },
  {
    src: "/images/gallery/scm-meeting-nepalgunj.jpg",
    caption: "Meeting with the School Management Committee",
    meta: "Nepalgunj",
    kind: "field",
  },
  {
    src: "/images/gallery/children-discussion-jumla.jpg",
    caption: "Discussion with students about the issues children face",
    meta: "Jumla",
    kind: "field",
  },
  {
    src: "/images/gallery/municipality-meeting-jajarkot.jpg",
    caption: "Meeting with a municipality representative",
    meta: "Jajarkot",
    kind: "field",
  },
  {
    src: "/images/gallery/nwash-inception-surkhet.jpg",
    caption: "At the N-WASH inception programme",
    meta: "Chingad Municipality, Surkhet",
    kind: "field",
  },
  {
    src: "/images/gallery/flood-relief-bhotekoshi.jpg",
    caption: "Relief distribution for Bhotekoshi flood victims",
    meta: "Kathmandu",
    kind: "field",
  },
  {
    src: "/images/gallery/cardamom-study-cdc-ilam.jpg",
    caption: "During the value chain analysis of large cardamom",
    meta: "Cardamom Development Centre, Ilam",
    kind: "field",
  },
  {
    src: "/images/gallery/cardamom-collector-fikkal-ilam.jpg",
    caption: "Talking with a large cardamom collector",
    meta: "Fikkal Bazar, Ilam",
    kind: "field",
  },
  {
    src: "/images/gallery/cardamom-farmer-pachthar.jpg",
    caption: "With a large cardamom farmer",
    meta: "Wangwarak Rural Municipality, Pachthar",
    kind: "field",
  },
  {
    src: "/images/gallery/dairy-survey-dumse-tanahun.jpg",
    caption: "With farmers during the dairy market survey",
    meta: "Dumse, Tanahun",
    kind: "field",
  },
  {
    src: "/images/gallery/farmer-tanglafat-kirtipur.jpg",
    caption: "With a farmer in the field",
    meta: "Tanglafat, Kirtipur",
    kind: "field",
  },
  {
    src: "/images/gallery/college-field-trip-hetauda.jpg",
    caption: "During a college field trip",
    meta: "Hetauda",
    kind: "field",
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

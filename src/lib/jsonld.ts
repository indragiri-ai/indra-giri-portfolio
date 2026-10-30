import { profile, journey } from "@/lib/data";
import { absUrl, absAsset } from "@/lib/site";

export const PERSON_ID = `${absUrl()}#person`;

/**
 * Institutions where he studied, taken from the journey data's education entries.
 * The school-leaving (SLC) entry is left out on purpose; the site lists the
 * university degrees and the higher secondary school only.
 */
const alumniOf = journey
  .filter((j) => j.type === "edu" && !j.role.startsWith("SLC"))
  .map((j) => ({
    "@type": "EducationalOrganization",
    name: j.org.replace(/\s*\([^)]*\)/, "").replace(" · ", ", "),
  }));

export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": PERSON_ID,
  name: profile.name,
  url: absUrl(),
  image: absAsset(profile.portrait),
  jobTitle: ["AI Trainer", "AI Generalist", "Senior Researcher", "AI Educator"],
  description: profile.tagline,
  address: { "@type": "PostalAddress", addressLocality: "Kathmandu", addressCountry: "NP" },
  worksFor: [
    { "@type": "Organization", name: "Sankhya Solutions Pvt. Ltd." },
    { "@type": "Organization", name: "National College" },
  ],
  alumniOf,
  knowsAbout: [
    "Artificial Intelligence in Education",
    "AI Training",
    "AI Policy",
    "Generative AI",
    "Impact Evaluation",
    "Data Analysis",
    "AI in education in Nepal",
    "AI training for teachers",
    "AI policy in Nepal",
    "Economics",
  ],
  sameAs: [profile.linkedin, profile.github, profile.facebook].filter(Boolean),
};

export const sankhyaAiJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${absUrl()}#sankhya-ai`,
  name: "Sankhya AI",
  description:
    "The AI unit of Sankhya Solutions Pvt. Ltd., running the AI for Teachers program in Nepal's community schools.",
  parentOrganization: { "@type": "Organization", name: "Sankhya Solutions Pvt. Ltd." },
  founder: { "@id": PERSON_ID },
  areaServed: { "@type": "Country", name: "Nepal" },
  // No url: Sankhya AI has no website. Do not add an empty string.
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${absUrl()}#website`,
  name: profile.name,
  url: absUrl(),
  inLanguage: "en",
  author: { "@id": PERSON_ID },
};

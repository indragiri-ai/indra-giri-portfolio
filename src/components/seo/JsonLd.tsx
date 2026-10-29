import { absUrl } from "@/lib/site";

/** Renders one JSON-LD block. Data is static site content, never user input. */
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** BreadcrumbList for an inner page. `trail` excludes Home, which is added first. */
export function BreadcrumbJsonLd({ trail }: { trail: { name: string; path: string }[] }) {
  const items = [{ name: "Home", path: "" }, ...trail];
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((it, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: it.name,
          item: absUrl(it.path),
        })),
      }}
    />
  );
}

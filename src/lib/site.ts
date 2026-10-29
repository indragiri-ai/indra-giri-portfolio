/**
 * Single source for the public site URL. NEXT_PUBLIC_SITE_URL overrides it;
 * for a GitHub project page the base path is appended, as in layout.tsx before.
 */
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? `https://indragiri.com.np${BASE_PATH}`
).replace(/\/$/, "");

/**
 * Absolute URL for a site path. Always ends with a slash (next.config sets
 * trailingSlash: true and the sitemap uses the same form). "" or "/" is the home page.
 */
export function absUrl(path = ""): string {
  const clean = path.replace(/^\/+|\/+$/g, "");
  return clean ? `${SITE_URL}/${clean}/` : `${SITE_URL}/`;
}

/** Absolute URL for a file in /public (images, PDFs), no trailing slash. */
export function absAsset(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? "" : "/"}${path}`;
}

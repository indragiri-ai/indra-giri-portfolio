export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Prefixes a path in /public with the deployment basePath.
 *
 * REQUIRED for GitHub Pages. next.config sets `basePath`, but Next only
 * rewrites next/link and next/image with it. A plain <img src="/images/x.jpg">
 * or <a href="/cv/x.pdf"> is left untouched and 404s under a project page
 * served from /repo-name/. Wrap EVERY reference to a file in /public with this.
 *
 * NEXT_PUBLIC_ vars are inlined at build time, so it works in server and client
 * components alike, and is a no-op locally where the variable is unset.
 */
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(path: string): string {
  if (!path) return path;
  if (/^(https?:)?\/\//.test(path) || path.startsWith("data:")) return path;
  return `${BASE_PATH}${path.startsWith("/") ? "" : "/"}${path}`;
}

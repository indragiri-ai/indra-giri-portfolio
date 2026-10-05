/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  reactStrictMode: true,
  images: { unoptimized: true },
  // Emit /ai/index.html rather than /ai.html. Without this GitHub Pages serves
  // /ai but 404s on /ai/, so any shared link with a trailing slash breaks.
  trailingSlash: true,
  // Set NEXT_PUBLIC_BASE_PATH=/your-repo-name for GitHub project pages.
  // Leave empty (or unset) for user/org pages (username.github.io).
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? "",
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH ?? "",
  // Same config as `npm run typecheck`: it excludes .next/dev, where a running
  // dev server on Windows can leave a half-written routes.d.ts that would
  // otherwise fail the build's type check.
  typescript: { tsconfigPath: "tsconfig.typecheck.json" },
};
export default nextConfig;

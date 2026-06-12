/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  reactStrictMode: true,
  images: { unoptimized: true },
  // Set NEXT_PUBLIC_BASE_PATH=/your-repo-name for GitHub project pages.
  // Leave empty (or unset) for user/org pages (username.github.io).
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? "",
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH ?? "",
};
export default nextConfig;

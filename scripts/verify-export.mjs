import { existsSync, readFileSync, readdirSync } from "node:fs";
import { extname, join, relative, resolve, sep } from "node:path";

const outputRoot = resolve("out");
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");
const failures = [];
let htmlFilesChecked = 0;
let internalReferencesChecked = 0;

function walk(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });
}

function isInsideOutput(path) {
  const fromRoot = relative(outputRoot, path);
  return fromRoot === "" || (!fromRoot.startsWith(`..${sep}`) && fromRoot !== "..");
}

function outputTargetExists(urlPath) {
  const decodedPath = decodeURIComponent(urlPath.split(/[?#]/, 1)[0]);
  const relativePath = decodedPath.replace(/^\/+/, "");
  const target = resolve(outputRoot, relativePath);
  if (!isInsideOutput(target)) return false;
  if (existsSync(target)) return true;
  if (!extname(target) && existsSync(join(target, "index.html"))) return true;
  return false;
}

if (!existsSync(outputRoot)) {
  console.error("Static export verification failed: out/ does not exist. Run npm run build first.");
  process.exit(1);
}

const htmlFiles = walk(outputRoot).filter((path) => path.endsWith(".html"));

for (const file of htmlFiles) {
  htmlFilesChecked += 1;
  const html = readFileSync(file, "utf8");
  const page = relative(outputRoot, file);

  for (const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    const reference = match[1];
    if (
      !reference ||
      reference.startsWith("#") ||
      reference.startsWith("data:") ||
      reference.startsWith("mailto:") ||
      reference.startsWith("tel:") ||
      /^(https?:)?\/\//.test(reference)
    ) {
      continue;
    }

    if (!reference.startsWith("/")) continue;
    internalReferencesChecked += 1;

    if (basePath && reference !== basePath && !reference.startsWith(`${basePath}/`)) {
      failures.push(`${page}: root-relative reference is missing base path: ${reference}`);
      continue;
    }

    const withoutBase = basePath ? reference.slice(basePath.length) || "/" : reference;
    if (!outputTargetExists(withoutBase)) {
      failures.push(`${page}: target does not exist in out/: ${reference}`);
    }
  }
}

const indexHtml = readFileSync(join(outputRoot, "index.html"), "utf8");
if (!indexHtml.includes('http-equiv="Content-Security-Policy"')) {
  failures.push("index.html: Content Security Policy meta tag is missing");
}
if (!indexHtml.includes('name="referrer" content="strict-origin-when-cross-origin"')) {
  failures.push("index.html: strict referrer policy is missing");
}

for (const requiredFile of ["404.html", "robots.txt", "sitemap.xml"]) {
  if (!existsSync(join(outputRoot, requiredFile))) {
    failures.push(`${requiredFile}: required export file is missing`);
  }
}

if (failures.length > 0) {
  console.error(`Static export verification failed with ${failures.length} problem(s):`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(
  `Static export verified: ${htmlFilesChecked} HTML files and ${internalReferencesChecked} internal references.`
);

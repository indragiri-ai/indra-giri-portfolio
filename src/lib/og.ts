import fs from "node:fs";
import path from "node:path";

/**
 * Build-time helpers for the social share images (app/og/[file]/route.tsx).
 * Colours are read from the dark theme block in globals.css, so the images
 * follow the site's tokens instead of copies of them. Node only: never import
 * this from a client component.
 */
export const OG_SIZE = { width: 1200, height: 630 };

/** The static Fraunces SemiBold instance. Used only here, never shipped to the site. */
export function ogFont(): Buffer {
  return fs.readFileSync(path.join(process.cwd(), "assets/og/Fraunces-SemiBold.ttf"));
}

function token(css: string, name: string): [string, string, string] {
  const m = css.match(new RegExp(String.raw`--${name}:\s*(\d+)\s+(\d+)\s+(\d+)`));
  if (!m) throw new Error(`og: token --${name} not found in globals.css`);
  return [m[1], m[2], m[3]];
}

const rgb = (t: string[]) => `rgb(${t.join(", ")})`;
const rgba = (t: string[], a: number) => `rgba(${t.join(", ")}, ${a})`;

export function ogColors() {
  // First :root block is the dark theme (the site default).
  const css = fs.readFileSync(path.join(process.cwd(), "src/app/globals.css"), "utf8");
  const root = css.slice(css.indexOf(":root"), css.indexOf(".light"));
  const fg = token(root, "fg");
  return {
    bg: rgb(token(root, "bg")),
    fg: rgb(fg),
    fgSoft: rgba(fg, 0.72),
    rule: rgba(fg, 0.25),
    gold: rgb(token(root, "accent-text")),
  };
}

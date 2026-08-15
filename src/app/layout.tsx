import type { Metadata } from "next";
import localFont from "next/font/local";
import { profile } from "@/lib/data";
import "./globals.css";

/**
 * Fonts are SELF HOSTED from ./fonts (latin subset, woff2) rather than fetched
 * from Google at build time. Google rotates its gstatic file URLs, which made
 * `next/font/google` fail the build against a stale cache and would break the
 * GitHub Pages deploy the same way. There is no build time network call now.
 *
 * Fraunces and Inter are variable fonts (weight range 100-900); IBM Plex Mono
 * ships as three static weights. Latin subset only, so Devanagari text such as
 * the Nagarik Dainik headline falls back to a system font, exactly as before.
 */
const display = localFont({
  src: [
    { path: "./fonts/fraunces-latin.woff2", weight: "100 900", style: "normal" },
    { path: "./fonts/fraunces-latin-italic.woff2", weight: "100 900", style: "italic" },
  ],
  variable: "--font-display",
  display: "swap",
  fallback: ["Georgia", "serif"],
});

const sans = localFont({
  src: [{ path: "./fonts/inter-latin.woff2", weight: "100 900", style: "normal" }],
  variable: "--font-sans",
  display: "swap",
  fallback: ["system-ui", "-apple-system", "Segoe UI", "sans-serif"],
});

const mono = localFont({
  src: [
    { path: "./fonts/ibm-plex-mono-latin-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/ibm-plex-mono-latin-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/ibm-plex-mono-latin-600.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-mono",
  display: "swap",
  fallback: ["ui-monospace", "SFMono-Regular", "Consolas", "monospace"],
});

export const metadata: Metadata = {
  title: `${profile.name} | AI Generalist, Researcher & Educator`,
  description: profile.tagline,
  keywords: [
    "Indra Giri",
    "AI Generalist",
    "AI trainer",
    "researcher",
    "data analyst",
    "economist",
    "impact evaluation",
    "Nepal",
    "AI policy",
    "research consultant",
  ],
  authors: [{ name: profile.name }],
  openGraph: {
    title: `${profile.name} | AI Generalist, Researcher & Educator`,
    description: profile.tagline,
    type: "website",
    locale: "en_US",
  },
};

const themeScript = `
try {
  if (localStorage.getItem('theme') === 'light') {
    document.documentElement.classList.add('light');
  }
} catch (e) {}
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}

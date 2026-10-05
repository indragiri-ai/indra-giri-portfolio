import type { Metadata } from "next";
import localFont from "next/font/local";
import { profile } from "@/lib/data";
import MotionProvider from "@/components/layout/MotionProvider";
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

/**
 * NEXT_PUBLIC_SITE_URL is the full canonical site root. For a GitHub project
 * page it includes the repository base path. The fallback matches the current
 * production deployment so local builds still emit absolute social URLs.
 */
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? `https://indragiri-ai.github.io${BASE_PATH}`
).replace(/\/$/, "");
const ogImage = `${SITE_URL}${profile.portrait.startsWith("/") ? "" : "/"}${profile.portrait}`;
const title = `${profile.name} | AI Trainer & AI in Education, Nepal`;

export const metadata: Metadata = {
  metadataBase: new URL(`${SITE_URL}/`),
  title,
  description: profile.tagline,
  referrer: "strict-origin-when-cross-origin",
  keywords: [
    "Indra Giri",
    "AI Generalist",
    "AI trainer",
    "AI trainer in Nepal",
    "AI in Nepal",
    "AI in education",
    "AI in education Nepal",
    "AI training Nepal",
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
    title,
    description: profile.tagline,
    type: "website",
    locale: "en_US",
    images: [{ url: ogImage, width: 1200, height: 1500, alt: profile.name }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: profile.tagline,
    images: [ogImage],
  },
};

const themeScript = `
try {
  if (localStorage.getItem('theme') === 'light') {
    document.documentElement.classList.add('light');
  }
} catch (e) {}
`;

/*
 * GitHub Pages does not support repository-defined response headers. This
 * production-only meta policy still blocks unexpected third-party resources.
 * Next's static App Router output requires inline bootstrap scripts and the
 * UI uses inline style attributes, hence the two narrowly scoped allowances.
 */
const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "connect-src 'self' https://formspree.io",
  "font-src 'self'",
  "form-action 'self' https://formspree.io",
  "frame-src 'none'",
  "img-src 'self' data: https:",
  "object-src 'none'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "worker-src 'self' blob:",
  "upgrade-insecure-requests",
].join("; ");

/**
 * Person schema for entity SEO: helps Google associate Indra with "AI
 * trainer", "AI in education" and Nepal directly, rather than inferring it
 * from page copy alone. All values are static site content, not user input.
 */
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  url: SITE_URL,
  image: ogImage,
  jobTitle: ["AI Trainer", "AI Generalist", "Senior Researcher", "AI Educator"],
  description: profile.tagline,
  address: { "@type": "PostalAddress", addressLocality: "Kathmandu", addressCountry: "NP" },
  knowsAbout: [
    "Artificial Intelligence in Education",
    "AI Training",
    "AI Policy",
    "Generative AI",
    "Impact Evaluation",
    "Data Analysis",
  ],
  sameAs: [profile.linkedin, profile.github, profile.facebook].filter(Boolean),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <head>
        {process.env.NODE_ENV === "production" && (
          <meta httpEquiv="Content-Security-Policy" content={contentSecurityPolicy} />
        )}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {/* Entrance animations ship as inline opacity:0 in the static HTML
            and only fade in once JS runs. Without JS, show everything. */}
        <noscript
          dangerouslySetInnerHTML={{
            __html:
              '<style>[style*="opacity:0"]{opacity:1!important;transform:none!important}</style>',
          }}
        />
      </head>
      {/* Extensions such as Grammarly add attributes to <body> before React
          hydrates; this only silences that one-level attribute mismatch. */}
      <body suppressHydrationWarning>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}

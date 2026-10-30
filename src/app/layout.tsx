import type { Metadata } from "next";
import localFont from "next/font/local";
import { GoogleAnalytics } from "@next/third-parties/google";
import { profile } from "@/lib/data";
import MotionProvider from "@/components/layout/MotionProvider";
import JsonLd from "@/components/seo/JsonLd";
import { personJsonLd } from "@/lib/jsonld";
import { SITE_URL, absAsset } from "@/lib/site";
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

const ogImage = absAsset(profile.portrait);
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
  // Google Search Console ownership tag, rendered site-wide in <head>.
  verification: { google: "wA9BGVVKzrMT86nDwqS4yIPTwFYaQcZc9dwMEvDfw0E" },
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
  // Google Analytics 4: gtag.js loads from googletagmanager.com and reports to the Google domains.
  "connect-src 'self' https://formspree.io https://www.googletagmanager.com https://*.google-analytics.com https://*.analytics.google.com",
  "font-src 'self'",
  "form-action 'self' https://formspree.io",
  "frame-src 'none'",
  "img-src 'self' data: https:",
  "object-src 'none'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com",
  "style-src 'self' 'unsafe-inline'",
  "worker-src 'self' blob:",
  "upgrade-insecure-requests",
].join("; ");

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
        {/* Person schema: ties Indra to "AI trainer", "AI in education" and Nepal
            as an entity. Defined in lib/jsonld.ts. */}
        <JsonLd data={personJsonLd} />
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
      <GoogleAnalytics gaId="G-6LRXL0EZZB" />
    </html>
  );
}

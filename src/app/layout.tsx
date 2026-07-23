import type { Metadata } from "next";
import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";
import { profile } from "@/lib/data";
import "./globals.css";

const display = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
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

import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter, IBM_Plex_Mono } from "next/font/google";
import { profile } from "@/lib/data";
import SmoothScroll from "@/components/effects/SmoothScroll";
import CursorTrail from "@/components/effects/CursorTrail";
import Preloader from "@/components/effects/Preloader";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
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
  title: `${profile.name} — Senior Researcher, Data Analyst & Educator`,
  description: profile.tagline,
  keywords: [
    "Indra Giri",
    "researcher",
    "data analyst",
    "economist",
    "impact evaluation",
    "Nepal",
    "Stata",
    "research consultant",
  ],
  authors: [{ name: profile.name }],
  openGraph: {
    title: `${profile.name} — The Evidence Engine`,
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
      <body className="grain">
        <Preloader />
        <CursorTrail />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}

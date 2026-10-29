import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import { sankhyaAiJsonLd, websiteJsonLd } from "@/lib/jsonld";
import { absUrl } from "@/lib/site";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import FeaturedWork from "@/components/sections/FeaturedWork";
import About from "@/components/sections/About";
import AIPractice from "@/components/sections/AIPractice";
import Research from "@/components/sections/Research";
import Contact from "@/components/sections/Contact";

// Set here, not in the layout, so inner pages cannot inherit the home canonical.
export const metadata: Metadata = { alternates: { canonical: absUrl() } };

/**
 * The home page is a curated overview, not the archive: Hero, the featured
 * portal (the one thing a visitor can go and use), About with the journey
 * strip, AI practice, Research, then Contact. Projects, Teaching, Blog and
 * Gallery each have their own page, reached from the nav, so the home page
 * stays short enough to read in one sitting.
 */
export default function Home() {
  return (
    <>
      <JsonLd data={websiteJsonLd} />
      <JsonLd data={sankhyaAiJsonLd} />
      <Navbar />
      <main>
        <Hero />
        <FeaturedWork />
        <About />
        <AIPractice />
        <Research />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

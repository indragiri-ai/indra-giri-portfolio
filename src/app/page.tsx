import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import FeaturedWork from "@/components/sections/FeaturedWork";
import About from "@/components/sections/About";
import AIPractice from "@/components/sections/AIPractice";
import Research from "@/components/sections/Research";
import Teaching from "@/components/sections/Teaching";
import Gallery from "@/components/sections/Gallery";
import Publications from "@/components/sections/Publications";
import JourneyPreview from "@/components/sections/JourneyPreview";
import Contact from "@/components/sections/Contact";

/**
 * Home page order. Skills moved to /journey, and Publications and Journey were
 * cut down to a summary plus a link, which took the page from about 15 screens
 * to 11. FeaturedWork sits directly under the hero: it is the only thing here a
 * visitor can go and use.
 */
export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <FeaturedWork />
        <About />
        <AIPractice />
        <Research />
        <Teaching />
        <Gallery />
        <Publications />
        <JourneyPreview />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import FeaturedWork from "@/components/sections/FeaturedWork";
import About from "@/components/sections/About";
import AIPractice from "@/components/sections/AIPractice";
import Projects from "@/components/sections/Projects";
import Research from "@/components/sections/Research";
import Teaching from "@/components/sections/Teaching";
import Gallery from "@/components/sections/Gallery";
import BlogPreview from "@/components/sections/BlogPreview";
import Contact from "@/components/sections/Contact";

/**
 * Home page order matches the nav sequence: AI, Projects, Research, Teaching,
 * Blog, Contact, Gallery. About sits first as a compact intro even though it
 * is not in the nav (the whole site is about one person), and carries its own
 * short Journey preview rather than Journey being a separate section.
 * Publications lives inside Research: papers and articles are the other
 * place the research ends up. Gallery/Media runs after Blog, closest to
 * Contact, since it is the least conversion critical section. FeaturedWork
 * sits directly under the hero: it is the only thing here a visitor can go
 * and use.
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
        <Projects />
        <Research />
        <Teaching />
        <BlogPreview />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import AIPractice from "@/components/sections/AIPractice";
import Research from "@/components/sections/Research";
import Skills from "@/components/sections/Skills";
import Teaching from "@/components/sections/Teaching";
import Gallery from "@/components/sections/Gallery";
import Publications from "@/components/sections/Publications";
import Journey from "@/components/sections/Journey";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <AIPractice />
        <Research />
        <Skills />
        <Teaching />
        <Gallery />
        <Publications />
        <Journey />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

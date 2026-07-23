import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import AIPractice from "@/components/sections/AIPractice";
import Research from "@/components/sections/Research";
import Skills from "@/components/sections/Skills";
import Teaching from "@/components/sections/Teaching";
import Publications from "@/components/sections/Publications";
import Journey from "@/components/sections/Journey";
import BlogPreview from "@/components/sections/BlogPreview";
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
        <Publications />
        <Journey />
        <BlogPreview />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

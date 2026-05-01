import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Intel from "@/components/Intel";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative bg-background w-full overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Intel />
      <Projects />
      <Contact />
      <Footer />

    </main>
  );
}

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
    <main className="relative bg-background">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Intel />
      <Projects />
      <Contact />
      <Footer />

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] z-50 glass-panel rounded-2xl border border-primary/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)] flex justify-around items-center px-4 py-3">
        <a href="#home" className="flex flex-col items-center justify-center text-primary active:scale-90 transition-transform">
          <span className="material-symbols-outlined">home</span>
        </a>
        <a href="#about" className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary active:scale-90 transition-transform">
          <span className="material-symbols-outlined">person</span>
        </a>
        <a href="#projects" className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary active:scale-90 transition-transform">
          <span className="material-symbols-outlined">rocket_launch</span>
        </a>
        <a href="#intel" className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary active:scale-90 transition-transform">
          <span className="material-symbols-outlined">school</span>
        </a>
        <a href="#contact" className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary active:scale-90 transition-transform">
          <span className="material-symbols-outlined">mail</span>
        </a>
      </nav>
    </main>
  );
}

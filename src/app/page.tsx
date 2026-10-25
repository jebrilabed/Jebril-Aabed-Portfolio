import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import dynamic from "next/dynamic";

const About = dynamic(() => import("@/components/About"));
const Skills = dynamic(() => import("@/components/Skills"));
const Projects = dynamic(() => import("@/components/Projects"));
const Intel = dynamic(() => import("@/components/Intel"));
const Contact = dynamic(() => import("@/components/Contact"));
const Footer = dynamic(() => import("@/components/Footer"));

export default function Home() {
  return (
    <main className="relative bg-background w-full overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Jebril Aabed",
            url: "https://jebril-aabed-portfolio.vercel.app",
            image: "https://jebril-aabed-portfolio.vercel.app/My-Photo.jpeg",
            sameAs: [
              "https://github.com/jebrilabed",
              "https://www.linkedin.com/in/jebril-aabed",
            ],
            jobTitle: "Software Developer | Next.js, React & AI Integration",
            worksFor: {
              "@type": "Organization",
              name: "Freelance",
            },
          }),
        }}
      />
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

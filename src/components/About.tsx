"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import Image from "next/image";

export default function About() {
  return (
    <section
      id="about"
      className="bg-surface-lowest py-12 md:py-20 relative overflow-hidden scroll-mt-28"
    >
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Profile Image Column (Asymmetric Layout) */}


          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-5 relative group"
          >
            <div className="absolute -inset-4 bg-secondary/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative rounded-2xl overflow-hidden border-2 border-primary/20 aspect-[4/5] shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-surface-low flex items-center justify-center">
              <Image
                src="/My-Photo.jpeg"
                alt="Jebril Aabed"
                fill
                className="object-cover grayscale group-hover:grayscale-0 scale-110 group-hover:scale-100 transition-all duration-1000 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-700"></div>
              <div className="absolute bottom-6 left-6">
                <p className="font-label text-secondary text-[10px] tracking-[0.2em] uppercase">
                  {portfolioData.role}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Bio Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 flex flex-col h-full"
          >
            <h3 className="font-headline text-4xl md:text-6xl font-bold tracking-tighter mb-8 text-foreground">
              The Developer Behind <br />
              The <span className="text-secondary">Code</span>.
            </h3>
            <div className="space-y-6 text-lg text-on-surface-variant leading-relaxed max-w-2xl">
              <p>{portfolioData.bio}</p>
            </div>

            {/* Key Stats Bento Block */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12">
              <div className="bg-surface-low p-6 rounded-xl border border-outline-variant/10 hover:border-primary/40 transition-colors">
                <span className="block font-headline text-3xl font-bold text-primary mb-1">
                  1+
                </span>
                <span className="font-label text-xs tracking-widest uppercase opacity-60">
                  Year of Experience
                </span>
              </div>
              <div className="bg-surface-low p-6 rounded-xl border border-outline-variant/10 hover:border-secondary/40 transition-colors">
                <span className="block font-headline text-3xl font-bold text-secondary mb-1">
                  6+
                </span>
                <span className="font-label text-xs tracking-widest uppercase opacity-60">
                  Projects Completed
                </span>
              </div>
            </div>

            {/* Actions Row */}
            <div className="mt-12 flex flex-wrap items-center gap-8">
              <a
                href="/Jebril-Aabed-CV.pdf"
                download="Jebril-Aabed-CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-8 py-4 bg-surface-high hover:bg-surface-highest text-foreground font-label font-bold tracking-widest uppercase rounded-lg border-t border-primary/10 transition-all duration-300 cursor-pointer"
              >
                <span className="material-symbols-outlined text-secondary">
                  download
                </span>
                Download CV
              </a>
              <div className="flex gap-4">
                <a
                  href={portfolioData.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-surface-container hover:text-primary cursor-pointer transition-all hover:bg-surface-high border border-outline-variant/10"
                  title="GitHub"
                >
                  <span className="material-symbols-outlined text-lg">terminal</span>
                </a>
                <a
                  href="#projects"
                  className="p-3 rounded-full bg-surface-container hover:text-secondary cursor-pointer transition-all hover:bg-surface-high border border-outline-variant/10"
                  title="View Projects"
                >
                  <span className="material-symbols-outlined text-lg">rocket_launch</span>
                </a>
                <a
                  href="#skills"
                  className="p-3 rounded-full bg-surface-container hover:text-primary cursor-pointer transition-all hover:bg-surface-high border border-outline-variant/10"
                  title="Technical Skills"
                >
                  <span className="material-symbols-outlined text-lg">psychology</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Background Decorative Element */}
      <div className="absolute -right-20 top-1/4 text-primary/5 font-headline text-[15rem] font-black select-none pointer-events-none rotate-90 uppercase">
        {portfolioData.name.split(" ")[0]}
      </div>
    </section>
  );
}

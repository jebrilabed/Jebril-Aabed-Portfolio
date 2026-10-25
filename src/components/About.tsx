"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import Image from "next/image";

export default function About() {
  return (
    <section
      id="about"
      className="bg-surface-lowest py-16 md:py-24 relative overflow-hidden scroll-mt-28"
    >
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Profile Image Column (Asymmetric Layout with floating badges) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 relative group"
          >
            {/* Ambient Neon Flare Behind Photo */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 via-secondary/10 to-transparent blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            <div className="relative rounded-3xl overflow-hidden border-2 border-primary/20 aspect-[4/5] shadow-[0_20px_50px_rgba(0,0,0,0.6)] bg-surface-low flex items-center justify-center">
              <Image
                src="/My-Photo.jpeg"
                alt="Jebril Aabed"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover grayscale group-hover:grayscale-0 scale-105 group-hover:scale-100 transition-all duration-1000 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/20 to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-700" />

              {/* Bottom Role Banner inside image */}
              <div className="absolute bottom-6 left-6 right-6">
                <span className="px-3 py-1 rounded-full bg-background/80 backdrop-blur-md border border-white/10 font-label text-secondary text-[10px] tracking-[0.2em] uppercase inline-block">
                  {portfolioData.role}
                </span>
              </div>
            </div>

            {/* Floating Floating Chip 1: Top Right */}
            <motion.div
              animate={{ y: [-6, 6, -6] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 px-4 py-2 rounded-2xl bg-surface-low/90 backdrop-blur-xl border border-primary/30 shadow-2xl flex items-center gap-2 hidden sm:flex"
            >
              <span className="material-symbols-outlined text-primary text-base">
                code
              </span>
              <span className="font-label text-xs font-bold text-foreground">
                Next.js & React
              </span>
            </motion.div>

            {/* Floating Chip 2: Bottom Left */}
            <motion.div
              animate={{ y: [6, -6, 6] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-4 -left-4 px-4 py-2 rounded-2xl bg-surface-low/90 backdrop-blur-xl border border-secondary/30 shadow-2xl flex items-center gap-2 hidden sm:flex"
            >
              <span className="material-symbols-outlined text-secondary text-base">
                auto_awesome
              </span>
              <span className="font-label text-xs font-bold text-foreground">
                AI Integration
              </span>
            </motion.div>
          </motion.div>

          {/* Bio Column */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 flex flex-col h-full"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="w-8 h-px bg-secondary" />
              <p className="font-label text-secondary text-xs tracking-[0.25em] uppercase">
                Biography & Experience
              </p>
            </div>

            <h2 className="font-headline text-4xl md:text-6xl font-bold tracking-tighter mb-8 text-foreground leading-tight">
              The Developer Behind <br />
              The <span className="text-secondary drop-shadow-[0_0_15px_rgba(162,231,255,0.3)]">Code</span>.
            </h2>

            <div className="space-y-6 text-base md:text-lg text-on-surface-variant leading-relaxed max-w-2xl">
              <p>{portfolioData.bio}</p>
            </div>

            {/* Key Stats Bento Block */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10">
              <motion.div
                whileHover={{ y: -4, borderColor: "rgba(196,192,255,0.4)" }}
                className="bg-surface-low p-6 rounded-2xl border border-outline-variant/30 hover:shadow-[0_0_30px_rgba(196,192,255,0.12)] transition-all group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="block font-headline text-4xl font-extrabold text-primary group-hover:scale-105 transition-transform">
                    1+
                  </span>
                  <span className="material-symbols-outlined text-primary/60 text-xl group-hover:rotate-12 transition-transform">
                    schedule
                  </span>
                </div>
                <span className="font-label text-xs tracking-widest uppercase opacity-75 text-on-surface-variant">
                  Year of Professional Experience
                </span>
              </motion.div>

              <motion.div
                whileHover={{ y: -4, borderColor: "rgba(162,231,255,0.4)" }}
                className="bg-surface-low p-6 rounded-2xl border border-outline-variant/30 hover:shadow-[0_0_30px_rgba(162,231,255,0.12)] transition-all group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="block font-headline text-4xl font-extrabold text-secondary group-hover:scale-105 transition-transform">
                    6+
                  </span>
                  <span className="material-symbols-outlined text-secondary/60 text-xl group-hover:rotate-12 transition-transform">
                    rocket
                  </span>
                </div>
                <span className="font-label text-xs tracking-widest uppercase opacity-75 text-on-surface-variant">
                  Shipped Web Projects
                </span>
              </motion.div>
            </div>

            {/* Actions Row */}
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <motion.a
                href={portfolioData.cvFile}
                download="Jebril-Aabed-Software-Engineer-CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04, boxShadow: "0 0 25px rgba(162,231,255,0.3)" }}
                whileTap={{ scale: 0.96 }}
                className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-surface-high to-surface-container hover:from-surface-highest hover:to-surface-high text-foreground font-label font-bold tracking-widest uppercase rounded-xl border border-secondary/30 transition-all duration-300 cursor-pointer group shadow-lg"
                aria-label="Download Jebril Aabed's CV"
              >
                <span
                  className="material-symbols-outlined text-secondary group-hover:translate-y-0.5 transition-transform"
                  aria-hidden="true"
                >
                  download
                </span>
                Download CV
              </motion.a>

              <div className="flex gap-3">
                <motion.a
                  href={portfolioData.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, borderColor: "rgba(196,192,255,0.5)" }}
                  whileTap={{ scale: 0.92 }}
                  className="p-3.5 rounded-full bg-surface-container hover:text-primary cursor-pointer transition-all hover:bg-surface-high border border-outline-variant/30 shadow-md"
                  title="GitHub"
                  aria-label="Visit Jebril Aabed's GitHub profile"
                >
                  <span className="material-symbols-outlined text-lg" aria-hidden="true">
                    terminal
                  </span>
                </motion.a>

                <motion.a
                  href={portfolioData.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, borderColor: "rgba(162,231,255,0.5)" }}
                  whileTap={{ scale: 0.92 }}
                  className="p-3.5 rounded-full bg-surface-container hover:text-secondary cursor-pointer transition-all hover:bg-surface-high border border-outline-variant/30 shadow-md"
                  title="LinkedIn"
                  aria-label="Visit Jebril Aabed's LinkedIn profile"
                >
                  <span className="material-symbols-outlined text-lg" aria-hidden="true">
                    hub
                  </span>
                </motion.a>

                <motion.a
                  href="#projects"
                  whileHover={{ scale: 1.1, borderColor: "rgba(196,192,255,0.5)" }}
                  whileTap={{ scale: 0.92 }}
                  className="p-3.5 rounded-full bg-surface-container hover:text-primary cursor-pointer transition-all hover:bg-surface-high border border-outline-variant/30 shadow-md"
                  title="View Projects"
                  aria-label="Scroll to Projects section"
                >
                  <span className="material-symbols-outlined text-lg" aria-hidden="true">
                    rocket_launch
                  </span>
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Background Decorative Watermark */}
      <div className="absolute -right-20 top-1/4 text-primary/5 font-headline text-[15rem] font-black select-none pointer-events-none rotate-90 uppercase">
        {portfolioData.name.split(" ")[0]}
      </div>
    </section>
  );
}

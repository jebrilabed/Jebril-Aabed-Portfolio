"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";

export default function About() {
  return (
    <section
      id="about"
      className="bg-surface-lowest py-24 md:py-40 relative overflow-hidden"
    >
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Profile Image Column (Asymmetric Layout) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          ></motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-4 relative group"
          >
            <div className="absolute -inset-4 bg-secondary/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative rounded-2xl overflow-hidden border-2 border-primary/20 aspect-square shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-surface-low flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-9xl">
                person
              </span>
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
              <div className="absolute bottom-6 left-6">
                <p className="font-label text-secondary text-sm tracking-widest uppercase">
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
                  2+
                </span>
                <span className="font-label text-xs tracking-widest uppercase opacity-60">
                  Years of Experience
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
              <button className="flex items-center gap-3 px-8 py-4 bg-surface-high hover:bg-surface-highest text-foreground font-label font-bold tracking-widest uppercase rounded-lg border-t border-primary/10 transition-all duration-300">
                <span className="material-symbols-outlined text-secondary">
                  download
                </span>
                Download CV
              </button>
              <div className="flex gap-4">
                <span className="p-2 rounded-full bg-surface-container hover:text-primary cursor-pointer transition-colors">
                  <span className="material-symbols-outlined">code</span>
                </span>
                <span className="p-2 rounded-full bg-surface-container hover:text-secondary cursor-pointer transition-colors">
                  <span className="material-symbols-outlined">terminal</span>
                </span>
                <span className="p-2 rounded-full bg-surface-container hover:text-primary cursor-pointer transition-colors">
                  <span className="material-symbols-outlined">database</span>
                </span>
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

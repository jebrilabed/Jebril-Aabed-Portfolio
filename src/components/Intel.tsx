"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";

export default function Intel() {
  const education = portfolioData.education.filter(item => item.type === "education");
  const certificates = portfolioData.education.filter(item => item.type === "certificate");

  return (
    <section id="intel" className="py-24 md:py-40 px-6 max-w-7xl mx-auto scroll-mt-28">
      <div className="mb-24">
        <h2 className="font-headline text-6xl md:text-8xl font-extrabold tracking-[-0.04em] mb-4 uppercase">
          Intel <span className="text-secondary drop-shadow-[0_0_15px_rgba(162,231,255,0.3)]">Storage</span>
        </h2>
        <p className="font-label text-secondary-fixed-dim tracking-[0.2em] uppercase max-w-md">
          Academic foundations and technical validations of the operative.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Education Section (Timeline) */}
        <div className="lg:col-span-7 space-y-12">
          <div className="flex items-center gap-4 mb-12">
            <div className="h-[1px] w-12 bg-outline-variant/30"></div>
            <h3 className="font-headline text-2xl font-bold uppercase tracking-tight text-primary">Academic Lineage</h3>
          </div>
          
          <div className="relative pl-8 md:pl-12 border-l-2 border-primary/20 space-y-20">
            {education.map((item, index) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* Timeline Pulse Point */}
                <div className="absolute -left-[35px] md:-left-[51px] top-0 w-4 h-4 bg-primary rounded-full shadow-[0_0_15px_rgba(196,192,255,0.8)] border-4 border-background"></div>
                
                <span className="font-label text-xs text-secondary mb-2 block tracking-widest uppercase">
                  {item.period}
                </span>
                <h4 className="font-headline text-2xl md:text-3xl font-bold text-foreground mb-2">
                  {item.institution}
                </h4>
                <p className="font-body text-lg text-on-surface-variant italic mb-4">
                  {item.title}
                </p>
                <div className="p-6 bg-surface-low border-t border-primary/10 rounded-xl max-w-xl">
                  <p className="text-on-surface-variant leading-relaxed text-sm">
                    Focusing on core software engineering principles, algorithmic excellence, and building scalable systems.
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Certificates Section */}
        <div className="lg:col-span-5 space-y-16">
          <section>
            <div className="flex items-center gap-4 mb-12">
              <h3 className="font-headline text-xl font-bold uppercase tracking-tight text-secondary">Validations</h3>
              <div className="flex-grow h-[1px] bg-outline-variant/30"></div>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {certificates.map((cert, index) => (
                <motion.div 
                  key={cert.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group flex items-center gap-6 p-4 bg-surface-low hover:bg-surface-high transition-all duration-500 rounded-xl border border-outline-variant/10"
                >
                  <div className="w-12 h-12 flex items-center justify-center bg-surface-highest rounded-lg text-secondary group-hover:shadow-[0_0_20px_rgba(162,231,255,0.2)] transition-all">
                    <span className="material-symbols-outlined">verified</span>
                  </div>
                  <div>
                    <h4 className="font-headline text-sm font-bold text-foreground uppercase tracking-wide">
                      {cert.title}
                    </h4>
                    <p className="font-label text-[10px] text-on-surface-variant uppercase tracking-wider">
                      ISSUED BY {cert.institution} • {cert.period}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}

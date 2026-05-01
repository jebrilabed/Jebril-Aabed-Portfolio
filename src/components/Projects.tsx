"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { portfolioData } from "@/data/portfolio";

export default function Projects() {
  return (
    <section
      id="projects"
      className="py-12 md:py-20 px-6 md:px-12 max-w-7xl mx-auto scroll-mt-28 overflow-x-hidden"
    >
      <div className="flex items-center justify-between mb-12">
        <h2 className="font-headline text-4xl font-bold uppercase tracking-tight">
          Featured Work
        </h2>
        <div className="h-px flex-1 bg-outline-variant/20 mx-8 hidden md:block"></div>
        <a
          href={`${portfolioData.socials.github}?tab=repositories`}
          target="_blank"
          rel="noopener noreferrer"
          className="font-label text-secondary text-xs tracking-widest hover:translate-x-2 transition-transform premium-ease flex items-center gap-2 uppercase"
        >
          View Archive{" "}
          <span className="material-symbols-outlined text-sm">
            arrow_forward
          </span>
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {portfolioData.projects.map((project, index) => (
          <motion.div
            key={project.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className={`group relative ${index % 2 !== 0 ? "md:mt-12" : ""}`}
          >
            <div className="relative overflow-hidden rounded-2xl aspect-[16/10] bg-surface-container mb-6 shadow-2xl">
              <Image
                src={project.image}
                alt={project.name}
                fill
                className="object-cover transition-transform duration-700 premium-ease group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60"></div>
              <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 glass-panel text-[10px] font-label text-primary rounded-full border border-primary/20 uppercase"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-start gap-4">
              <div>
                <h3 className="font-headline text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {project.name}
                </h3>
                <p className="text-on-surface-variant text-sm max-w-sm leading-relaxed">
                  {project.desc}
                </p>
              </div>
              <div className="flex gap-2">
                {project.githubLink && (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center hover:bg-primary hover:text-on-primary-container transition-all active:scale-90"
                  >
                    <span className="material-symbols-outlined text-lg">
                      code
                    </span>
                  </a>
                )}
                {project.liveDemo && (
                  <a
                    href={project.liveDemo}
                    target="_blank"
                    className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center hover:bg-secondary hover:text-background transition-all active:scale-90"
                  >
                    <span className="material-symbols-outlined text-lg">
                      open_in_new
                    </span>
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

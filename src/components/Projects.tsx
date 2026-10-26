"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { portfolioData } from "@/data/portfolio";

type Category = "all" | "ecommerce" | "web" | "portfolio";

interface TabItem {
  key: Category;
  label: string;
  icon: string;
}

const TABS: TabItem[] = [
  { key: "all", label: "All Projects", icon: "grid_view" },
  { key: "ecommerce", label: "E-Commerce", icon: "shopping_bag" },
  { key: "web", label: "Web Apps", icon: "devices" },
  { key: "portfolio", label: "Portfolio", icon: "person" },
];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");

  const filteredProjects = portfolioData.projects.filter((project) => {
    if (activeCategory === "all") return true;
    return project.category === activeCategory;
  });

  const getCount = (cat: Category) => {
    if (cat === "all") return portfolioData.projects.length;
    return portfolioData.projects.filter((p) => p.category === cat).length;
  };

  return (
    <section
      id="projects"
      className="py-14 md:py-24 px-5 sm:px-6 md:px-12 max-w-7xl mx-auto scroll-mt-28 overflow-x-hidden relative"
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-primary/5 rounded-full blur-[140px] pointer-events-none" />

      {/* ─── Header ─── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6 mb-8 md:mb-12">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-8 h-px bg-primary" />
            <p className="font-label text-secondary text-xs tracking-[0.25em] uppercase">
              Production Applications
            </p>
          </div>
          <h2 className="font-headline text-4xl sm:text-5xl md:text-7xl font-extrabold uppercase tracking-tight">
            Featured <span className="text-secondary drop-shadow-[0_0_15px_rgba(162,231,255,0.3)]">Work</span>
          </h2>
        </div>

        <a
          href={`${portfolioData.socials.github}?tab=repositories`}
          target="_blank"
          rel="noopener noreferrer"
          className="font-label text-secondary text-xs tracking-widest hover:translate-x-2 transition-transform premium-ease flex items-center gap-2 uppercase shrink-0 py-2 group"
        >
          <span>View GitHub Archive</span>
          <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
            arrow_forward
          </span>
        </a>
      </div>

      {/* ─── Filter Tabs ─── */}
      <div className="flex items-center gap-1.5 sm:gap-2 p-1 sm:p-1.5 bg-surface-low/80 backdrop-blur-md rounded-2xl border border-outline-variant/30 mb-8 md:mb-12 overflow-x-auto max-w-full">
        {TABS.map((tab) => {
          const isActive = activeCategory === tab.key;
          const count = getCount(tab.key);

          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveCategory(tab.key)}
              className={`relative px-4 py-2.5 rounded-xl font-label text-xs tracking-wider uppercase transition-all duration-300 flex items-center gap-2 shrink-0 cursor-pointer ${
                isActive ? "text-primary font-bold" : "text-on-surface-variant hover:text-foreground"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="projectTabIndicator"
                  className="absolute inset-0 bg-primary/15 border border-primary/30 rounded-xl shadow-[0_0_15px_rgba(196,192,255,0.2)]"
                  transition={{ type: "spring", stiffness: 450, damping: 32 }}
                />
              )}
              <span className="material-symbols-outlined text-sm relative z-10" aria-hidden="true">
                {tab.icon}
              </span>
              <span className="relative z-10">{tab.label}</span>
              <span
                className={`relative z-10 text-[10px] px-1.5 py-0.2 rounded-full ${
                  isActive ? "bg-primary text-background font-black" : "bg-surface-high text-on-surface-variant"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* ─── Projects Grid with Seamless Mode-Wait Animation ─── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className={`grid gap-8 md:gap-10 ${
            filteredProjects.length === 1
              ? "grid-cols-1 max-w-2xl mx-auto"
              : "grid-cols-1 md:grid-cols-2"
          }`}
        >
          {filteredProjects.map((project, index) => (
            <div
              key={project.name}
              className="group relative flex flex-col justify-between p-6 rounded-3xl bg-surface-low/80 backdrop-blur-xl border border-outline-variant/30 hover:border-primary/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
            >
              <div>
                {/* Project Header: Number and Category */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-label text-xs tracking-widest text-secondary font-bold uppercase">
                    // 0{index + 1}
                  </span>
                  <div className="flex items-center gap-2">
                    {project.liveDemo && (
                      <span className="flex items-center gap-1 text-[10px] font-label text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20 uppercase tracking-wider">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Live Demo
                      </span>
                    )}
                  </div>
                </div>

                {/* Project Image Frame */}
                {/* On mobile: tapping the image opens the demo; on desktop: hover overlay handles it */}
                <div
                  className={`relative overflow-hidden rounded-2xl aspect-[16/10] bg-surface-container mb-6 shadow-xl border border-outline-variant/20 ${
                    project.liveDemo ? "md:cursor-default cursor-pointer" : ""
                  }`}
                  onClick={() => {
                    if (window.innerWidth < 768 && project.liveDemo) {
                      window.open(project.liveDemo, "_blank", "noopener,noreferrer");
                    }
                  }}
                >
                  <Image
                    src={project.image}
                    alt={`${project.name} - Project Screenshot`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={index < 2}
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-500" />

                  {/* Mobile-only tap hint – hidden on md+ */}
                  {project.liveDemo && (
                    <div className="md:hidden absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 pointer-events-none">
                      <span className="material-symbols-outlined text-xs text-secondary">open_in_new</span>
                      <span className="font-label text-[10px] text-secondary uppercase tracking-wider">اضغط للمشاهدة</span>
                    </div>
                  )}

                  {/* Overlay Quick Actions on Hover (desktop) */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 backdrop-blur-xs">
                    {project.liveDemo && (
                      <a
                        href={project.liveDemo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-xl bg-secondary text-background font-label text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-lg hover:scale-105 transition-transform"
                        aria-label={`Open live demo of ${project.name}`}
                      >
                        <span className="material-symbols-outlined text-sm">open_in_new</span>
                        Visit Live
                      </a>
                    )}
                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-xl bg-surface-high/90 text-foreground border border-white/10 font-label text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-lg hover:scale-105 transition-transform"
                        aria-label={`View GitHub repo of ${project.name}`}
                      >
                        <span className="material-symbols-outlined text-sm">terminal</span>
                        Code
                      </a>
                    )}
                  </div>

                  {/* Tags badge container on bottom left */}
                  <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1.5 pointer-events-none">
                    {project.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 bg-background/80 backdrop-blur-md text-[10px] font-label text-primary rounded-md border border-primary/20 uppercase"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 4 && (
                      <span className="px-2 py-0.5 bg-background/80 backdrop-blur-md text-[10px] font-label text-on-surface-variant/80 rounded-md border border-white/10">
                        +{project.tags.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* Project Info */}
                <h3 className="font-headline text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {project.name}
                </h3>
                <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
                  {project.desc}
                </p>
              </div>

              {/* Bottom Card Actions */}
              <div className="pt-4 border-t border-outline-variant/20 flex items-center justify-between">
                <span className="font-label text-xs text-on-surface-variant/60 uppercase tracking-widest">
                  Ready to inspect
                </span>
                <div className="flex gap-2">
                  {project.githubLink && (
                    <motion.a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.92 }}
                      className="w-9 h-9 rounded-xl border border-outline-variant/30 bg-surface-container flex items-center justify-center hover:bg-primary hover:text-on-primary-container transition-all"
                      aria-label={`View ${project.name} code`}
                      title="GitHub Repository"
                    >
                      <span className="material-symbols-outlined text-base">code</span>
                    </motion.a>
                  )}
                  {project.liveDemo && (
                    <motion.a
                      href={project.liveDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.92 }}
                      className="w-9 h-9 rounded-xl border border-outline-variant/30 bg-surface-container flex items-center justify-center hover:bg-secondary hover:text-background transition-all"
                      aria-label={`Open ${project.name} live demo`}
                      title="Live Demo"
                    >
                      <span className="material-symbols-outlined text-base">open_in_new</span>
                    </motion.a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

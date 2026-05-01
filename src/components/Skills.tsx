"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";

const skillIcons: Record<string, string> = {
  "HTML5/CSS3 Mastery": "code",
  "Responsive Design": "devices",
  "Collaborative Team Player": "groups",
  "JavaScript": "javascript",
  "Typescript": "data_object",
  "Attention to Detail": "visibility",
  "Problem Solving": "psychology",
  "React": "hub",
  "Next.js": "rocket_launch",
};

// duplicate list for seamless loop
const skills = portfolioData.skills;
const doubledSkills = [...skills, ...skills, ...skills];

const toolsList = [
  { name: "Vercel", icon: "cloud_upload" },
  { name: "Firebase", icon: "local_fire_department" },
  { name: "Git", icon: "merge" },
  { name: "Postman", icon: "api" },
  { name: "Responsive Design", icon: "devices" },
  { name: "UI/UX", icon: "palette" },
];

// duplicate for second row
const doubledTools = [...toolsList, ...toolsList, ...toolsList];

export default function Skills() {
  return (
    <section id="skills" className="py-24 md:py-40 overflow-hidden scroll-mt-28">
      {/* ── Header ── */}
      <div className="px-6 md:px-12 max-w-7xl mx-auto mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-label text-secondary-fixed-dim text-xs tracking-[0.2em] uppercase mb-4"
          >
            Core Competencies
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-headline text-5xl md:text-7xl font-extrabold tracking-tight text-foreground leading-none uppercase"
          >
            Engineering <br />
            <span className="text-primary drop-shadow-[0_0_15px_rgba(196,192,255,0.3)]">
              The Future
            </span>
          </motion.h2>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-right hidden md:block"
        >
          <p className="font-label text-on-surface-variant text-[10px] tracking-widest uppercase">
            System Status
          </p>
          <p className="text-secondary font-label text-sm tracking-widest">
            99.9% OPERATIONAL
          </p>
        </motion.div>
      </div>

      {/* ── Row 1: Skills → left (slow) ── */}
      <div className="relative mb-5">
        {/* fade edges */}
        <div className="absolute left-0 top-0 h-full w-32 z-10 bg-gradient-to-r from-background to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 h-full w-32 z-10 bg-gradient-to-l from-background to-transparent pointer-events-none" />

        <div className="flex overflow-hidden">
          <motion.div
            className="flex gap-4 min-w-max"
            animate={{ x: ["0%", "-33.33%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 28 }}
          >
            {doubledSkills.map((skill, i) => (
              <div
                key={i}
                className="flex items-center gap-3 px-6 py-4 bg-surface-low border border-outline-variant/40 rounded-full whitespace-nowrap group hover:border-primary/40 hover:bg-surface-high transition-all duration-300"
              >
                <span className="material-symbols-outlined text-primary text-lg group-hover:scale-110 transition-transform duration-200">
                  {skillIcons[skill] ?? "star"}
                </span>
                <span className="font-headline text-base font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
                  {skill}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── Row 2: Skills → right (medium) ── */}
      <div className="relative mb-5">
        <div className="absolute left-0 top-0 h-full w-32 z-10 bg-gradient-to-r from-background to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 h-full w-32 z-10 bg-gradient-to-l from-background to-transparent pointer-events-none" />

        <div className="flex overflow-hidden">
          <motion.div
            className="flex gap-4 min-w-max"
            animate={{ x: ["-33.33%", "0%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 22 }}
          >
            {doubledSkills.map((skill, i) => (
              <div
                key={i}
                className="flex items-center gap-3 px-6 py-4 bg-surface-container border border-outline-variant/30 rounded-full whitespace-nowrap group hover:border-secondary/40 hover:bg-surface-high transition-all duration-300"
              >
                <span className="material-symbols-outlined text-secondary text-lg group-hover:scale-110 transition-transform duration-200">
                  {skillIcons[skill] ?? "bolt"}
                </span>
                <span className="font-label text-base text-on-surface-variant group-hover:text-secondary transition-colors duration-200">
                  {skill}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── Row 3: Tools → left (fast) ── */}
      <div className="relative">
        <div className="absolute left-0 top-0 h-full w-32 z-10 bg-gradient-to-r from-background to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 h-full w-32 z-10 bg-gradient-to-l from-background to-transparent pointer-events-none" />

        <div className="flex overflow-hidden">
          <motion.div
            className="flex gap-4 min-w-max"
            animate={{ x: ["0%", "-33.33%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 18 }}
          >
            {doubledTools.map((tool, i) => (
              <div
                key={i}
                className="flex items-center gap-3 px-6 py-4 bg-surface-lowest border border-outline-variant/20 rounded-full whitespace-nowrap group hover:border-primary/30 hover:bg-surface-low transition-all duration-300"
              >
                <span className="material-symbols-outlined text-primary/60 text-lg group-hover:text-primary transition-colors duration-200">
                  {tool.icon}
                </span>
                <span className="font-label text-sm text-on-surface-variant/70 group-hover:text-foreground transition-colors duration-200">
                  {tool.name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── Bottom label ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="px-6 md:px-12 max-w-7xl mx-auto mt-16 flex items-center gap-4"
      >
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-outline-variant to-transparent" />
        <span className="font-label text-[10px] tracking-widest uppercase text-on-surface-variant">
          Architecture & Cloud Ecosystem
        </span>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-outline-variant to-transparent" />
      </motion.div>
    </section>
  );
}

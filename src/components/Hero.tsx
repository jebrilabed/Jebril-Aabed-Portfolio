"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioData } from "@/data/portfolio";

const ROLES = [
  "Software Developer",
  "Next.js & React Specialist",
  "AI & RAG Integrator",
  "Frontend Engineer",
];

const FLOATING_BADGES = [
  { text: "<Next.js 15 />", x: "8%", y: "22%", delay: 0 },
  { text: "TypeScript", x: "85%", y: "25%", delay: 1 },
  { text: "{ AI: 'Gemini' }", x: "12%", y: "75%", delay: 1.5 },
  { text: "FastAPI • REST", x: "82%", y: "70%", delay: 0.5 },
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden neon-grid pt-20 pb-24 md:pb-20 select-none"
    >
      {/* Background Radial Glow Backlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Ambient Floating Tech Badges (Desktop) */}
      <div className="hidden lg:block absolute inset-0 pointer-events-none overflow-hidden">
        {FLOATING_BADGES.map((badge, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: [0.35, 0.7, 0.35],
              y: [-12, 12, -12],
              scale: 1,
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: badge.delay,
            }}
            style={{ left: badge.x, top: badge.y }}
            className="absolute px-3.5 py-1.5 rounded-full bg-surface-low/80 backdrop-blur-md border border-outline-variant/30 text-xs font-label text-secondary tracking-widest uppercase shadow-lg shadow-black/20"
          >
            {badge.text}
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-5 sm:px-6 relative z-10 text-left md:text-center">
        {/* Terminal Status Tag */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 mb-5 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-surface-low/90 border border-outline-variant/30 shadow-inner"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
          </span>
          <span className="font-label text-secondary tracking-[0.15em] sm:tracking-[0.2em] uppercase text-[10px] sm:text-xs">
            System Online • Available for Opportunities
          </span>
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-headline text-4xl xs:text-5xl md:text-8xl font-extrabold tracking-[-0.04em] mb-4 text-foreground max-w-5xl mx-auto leading-[1.1]"
        >
          Hello, I am{" "}
          <span className="text-primary glow-text inline-block">
            {portfolioData.name}
          </span>
        </motion.h1>

        {/* Animated Role Cycler */}
        <div className="h-9 md:h-12 flex items-center justify-start md:justify-center mb-5 md:mb-6 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={roleIndex}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="font-label text-base md:text-2xl text-secondary font-bold tracking-wider uppercase flex items-center gap-2"
            >
              <span className="text-primary/60 font-mono">//</span>
              {ROLES[roleIndex]}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Hero Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-body text-base md:text-2xl text-on-surface-variant mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          Building{" "}
          <span className="text-secondary italic font-medium">
            fast, scalable, and AI-integrated
          </span>{" "}
          web applications using Next.js, React, and modern technologies.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-6"
        >
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.05, boxShadow: "0 0 35px rgba(196,192,255,0.4)" }}
            whileTap={{ scale: 0.96 }}
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-br from-primary to-primary-container text-on-primary-container font-label font-bold tracking-widest uppercase rounded-xl transition-all duration-300 text-center flex items-center justify-center gap-2 cursor-pointer shadow-lg"
          >
            <span>View My Work</span>
            <span className="material-symbols-outlined text-sm">rocket_launch</span>
          </motion.a>

          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05, borderColor: "rgba(162,231,255,0.6)" }}
            whileTap={{ scale: 0.96 }}
            className="w-full sm:w-auto px-8 py-4 bg-surface-low/80 backdrop-blur-md border border-outline-variant text-foreground font-label font-bold tracking-widest uppercase rounded-xl hover:bg-surface-high transition-all duration-300 text-center flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Contact Me</span>
            <span className="material-symbols-outlined text-sm text-secondary">chat</span>
          </motion.a>
        </motion.div>
      </div>

      {/* Scroll Indicator with smooth bounce */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce-y pointer-events-none"
      >
        <span className="font-label text-[10px] tracking-widest uppercase text-on-surface-variant">
          Scroll to explore
        </span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-primary via-secondary to-transparent" />
      </motion.div>
    </section>
  );
}

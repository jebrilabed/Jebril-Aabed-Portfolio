"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { portfolioData } from "@/data/portfolio";

function TypewriterText({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState("");
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (displayed.length < text.length) {
      const timeout = setTimeout(() => {
        setDisplayed(text.slice(0, displayed.length + 1));
      }, 100);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => setIsDone(true), 1500);
      return () => clearTimeout(timeout);
    }
  }, [displayed, text]);

  return (
    <span className="relative inline-block align-baseline">
      {/* Invisible placeholder: reserves the EXACT space for the full name */}
      <span className="invisible pointer-events-none select-none" aria-hidden="true">
        {text}
      </span>

      {/* Visible typing text */}
      <span className="absolute left-0 top-0 text-primary glow-text whitespace-nowrap">
        {displayed}
        <span 
          className={`inline-block w-[3px] h-[0.8em] ml-1 align-middle rounded-sm bg-primary ${
            isDone ? "opacity-0 transition-opacity duration-500" : "animate-blink"
          }`} 
        />
      </span>
    </span>
  );
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden neon-grid pt-20 pb-32 md:pb-20"
    >
      {/* Radial Glow Backlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 text-left md:text-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="inline-block mb-6 border-l-2 border-secondary pl-4 py-1"
        >
          <span className="font-label text-secondary tracking-[0.2em] uppercase text-sm">
            Transmitting Data...
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-headline text-5xl md:text-8xl font-extrabold tracking-[-0.04em] mb-4 text-foreground max-w-5xl mx-auto leading-tight"
        >
          Hello, I am{" "}
          <TypewriterText text={portfolioData.name} />
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="font-body text-xl md:text-2xl text-on-surface-variant mb-12 max-w-2xl mx-auto opacity-80 leading-relaxed"
        >
          Building <span className="text-secondary italic">fast, scalable, and visually engaging</span> web applications using modern frontend technologies.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col md:flex-row items-center justify-center gap-6"
        >
          <a
            href="#projects"
            className="w-full md:w-auto px-10 py-5 bg-gradient-to-br from-primary to-primary-container text-on-primary-container font-label font-bold tracking-widest uppercase rounded-lg hover:shadow-[0_0_30px_rgba(196,192,255,0.4)] transition-all duration-300 active:scale-95 text-center"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="w-full md:w-auto px-10 py-5 bg-transparent border border-outline-variant text-foreground font-label font-bold tracking-widest uppercase rounded-lg hover:bg-surface-high hover:border-secondary transition-all duration-300 active:scale-95 text-center"
          >
            Contact Me
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50"
      >
        <span className="font-label text-[10px] tracking-widest uppercase text-on-surface-variant">
          Scroll to explore
        </span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent" />
      </motion.div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { portfolioData } from "@/data/portfolio";

export default function DevelopmentNotice() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-6 bg-background overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full neon-grid opacity-20" />
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[100px] animate-pulse delay-700" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-2xl w-full glass-panel border border-primary/20 rounded-[2.5rem] p-8 md:p-16 text-center relative z-10 shadow-2xl"
      >
        <div className="mb-10 relative inline-block">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mx-auto border border-primary/30 shadow-[0_0_30px_rgba(196,192,255,0.2)]">
            <span className="material-symbols-outlined text-5xl text-primary animate-spin-slow">
              settings
            </span>
          </div>
          <motion.div 
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute -top-1 -right-1 w-4 h-4 bg-secondary rounded-full shadow-[0_0_15px_#a2e7ff]" 
          />
        </div>

        <h1 className="font-headline text-4xl md:text-6xl font-black mb-6 tracking-tighter bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
          COMING SOON
        </h1>
        
        <div className="space-y-4 mb-12">
          <p className="font-body text-xl md:text-2xl text-foreground font-medium opacity-90">
            Portfolio is under heavy development.
          </p>
          <p className="font-body text-on-surface-variant leading-relaxed max-w-md mx-auto opacity-70 text-sm">
            We are crafting a premium digital experience. Something amazing is being built right now.
          </p>
        </div>

        {/* Social Links to stay connected */}
        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <a
            href={portfolioData.socials.github}
            target="_blank"
            className="px-6 py-3 rounded-xl border border-outline-variant hover:border-primary hover:bg-primary/5 transition-all duration-300 font-label text-[10px] tracking-widest uppercase flex items-center gap-2"
          >
            Github
          </a>
          <a
            href={portfolioData.socials.linkedin}
            target="_blank"
            className="px-6 py-3 rounded-xl border border-outline-variant hover:border-secondary hover:bg-secondary/5 transition-all duration-300 font-label text-[10px] tracking-widest uppercase flex items-center gap-2"
          >
            LinkedIn
          </a>
        </div>

        <div className="mt-16 flex items-center justify-center gap-4 opacity-30">
          <div className="h-px w-8 bg-current" />
          <p className="font-label text-[10px] uppercase tracking-[0.4em]">
            Stay Tuned • 2026
          </p>
          <div className="h-px w-8 bg-current" />
        </div>
      </motion.div>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full py-12 px-8 bg-surface-lowest border-t border-outline-variant/30 mt-auto relative overflow-hidden">
      {/* Background flare */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-20 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col md:flex-row justify-between items-center gap-8 max-w-7xl mx-auto text-center md:text-left relative z-10">
        <div className="flex flex-col items-center md:items-start">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-primary font-bold font-headline uppercase tracking-tighter text-xl drop-shadow-[0_0_8px_rgba(196,192,255,0.4)]">
              {portfolioData.name.toUpperCase()}
            </span>
          </div>
          <p className="text-on-surface-variant font-label text-[10px] tracking-widest mt-2 uppercase opacity-60">
            © 2026 Jebril Aabed • Built with Next.js 15, React 19 & Tailwind CSS
          </p>
        </div>

        <div className="flex gap-8 font-label text-xs tracking-widest uppercase items-center">
          <motion.a
            href={portfolioData.socials.github}
            target="_blank"
            whileHover={{ y: -2 }}
            className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1.5"
            aria-label="Visit Jebril Aabed's GitHub profile"
          >
            <span className="material-symbols-outlined text-sm">terminal</span>
            GitHub
          </motion.a>
          <motion.a
            href={portfolioData.socials.linkedin}
            target="_blank"
            whileHover={{ y: -2 }}
            className="text-on-surface-variant hover:text-secondary transition-colors flex items-center gap-1.5"
            aria-label="Visit Jebril Aabed's LinkedIn profile"
          >
            <span className="material-symbols-outlined text-sm">hub</span>
            LinkedIn
          </motion.a>
          <motion.a
            href={portfolioData.socials.whatsapp}
            target="_blank"
            whileHover={{ y: -2 }}
            className="text-on-surface-variant hover:text-emerald-400 transition-colors flex items-center gap-1.5"
            aria-label="Message Jebril Aabed on WhatsApp"
          >
            <span className="material-symbols-outlined text-sm">chat</span>
            WhatsApp
          </motion.a>
        </div>

        <div className="flex flex-col items-center md:items-end">
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="group flex flex-col items-center gap-1 p-2 rounded-xl bg-surface-low border border-outline-variant/30 hover:border-primary/40 transition-colors cursor-pointer"
            aria-label="Scroll back to top"
          >
            <span className="material-symbols-outlined text-primary group-hover:-translate-y-1 transition-transform" aria-hidden="true">
              expand_less
            </span>
            <span className="font-label text-[8px] tracking-[0.3em] uppercase opacity-60 group-hover:opacity-100 group-hover:text-primary transition-opacity">
              Back to Top
            </span>
          </motion.button>
        </div>
      </div>
    </footer>
  );
}

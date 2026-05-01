"use client";

import { portfolioData } from "@/data/portfolio";

export default function Footer() {
  return (
    <footer className="w-full py-12 px-8 bg-surface-lowest border-t border-outline-variant mt-auto">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 max-w-7xl mx-auto text-center md:text-left">
        <div className="flex flex-col items-center md:items-start">
          <span className="text-primary font-bold font-headline uppercase tracking-tighter text-xl drop-shadow-[0_0_8px_rgba(196,192,255,0.4)]">
            {portfolioData.name.toUpperCase()}
          </span>
          <p className="text-on-surface-variant font-label text-[10px] tracking-widest mt-2 uppercase opacity-50">
            © 2026 Jebril Aabed. Built with Next.js & Tailwind CSS
          </p>
        </div>

        <div className="flex gap-8 font-label text-xs tracking-widest uppercase items-center">
          <a
            href={portfolioData.socials.github}
            target="_blank"
            className="text-on-surface-variant hover:text-primary transition-colors"
          >
            Github
          </a>
          <a
            href={portfolioData.socials.linkedin}
            target="_blank"
            className="text-on-surface-variant hover:text-secondary transition-colors"
          >
            LinkedIn
          </a>
          <a
            href={portfolioData.socials.whatsapp}
            target="_blank"
            className="text-on-surface-variant hover:text-primary transition-colors"
          >
            WhatsApp
          </a>
        </div>

        <div className="flex flex-col items-center md:items-end">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group flex flex-col items-center gap-1"
          >
            <span className="material-symbols-outlined text-primary group-hover:-translate-y-1 transition-transform">
              expand_less
            </span>
            <span className="font-label text-[8px] tracking-[0.3em] uppercase opacity-30">
              Back to Top
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}

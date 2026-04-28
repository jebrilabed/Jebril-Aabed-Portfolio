"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { useState, useEffect } from "react";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Intel", href: "#intel" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-outline-variant shadow-[0_0_40px_rgba(196,192,255,0.06)] py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="flex justify-between items-center px-6 md:px-12 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-4"
        >
          <h1 className="text-xl font-bold tracking-tighter text-primary drop-shadow-[0_0_8px_rgba(196,192,255,0.4)] font-headline uppercase whitespace-nowrap">
            {portfolioData.name}
          </h1>
        </motion.div>

        <div className="hidden md:flex gap-8 items-center font-label text-xs tracking-widest uppercase">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              className="text-on-surface-variant hover:text-secondary transition-all duration-300"
            >
              {link.name}
            </motion.a>
          ))}
        </div>

        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="material-symbols-outlined text-primary cursor-pointer active:scale-95 transition-all"
        >
          account_circle
        </motion.span>
      </div>
    </nav>
  );
}

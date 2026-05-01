"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { useState, useEffect } from "react";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Intel", href: "#intel" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    const observerOptions = {
      root: null,
      rootMargin: "-30% 0px -60% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const sections = ["home", "about", "intel", "projects", "contact"];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled
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
          {navLinks.map((link, i) => {
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <motion.a
                key={link.name}
                href={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
                className={`relative transition-all duration-300 ${isActive
                  ? "text-primary font-bold"
                  : "text-on-surface-variant hover:text-secondary"
                  }`}
              >
                {link.name}
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full shadow-[0_0_10px_rgba(196,192,255,0.6)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </motion.a>
            );
          })}
        </div>

        <motion.a
          href="#contact"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="hidden md:flex items-center gap-2 px-6 py-2.5 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 rounded-full font-label text-[10px] tracking-[0.2em] uppercase transition-all duration-300 hover:shadow-[0_0_20px_rgba(196,192,255,0.2)]"
        >
          Hire Me
        </motion.a>
      </div>
    </nav>
  );
}

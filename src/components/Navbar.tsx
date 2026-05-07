"use client";

import { motion, AnimatePresence } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { useState, useEffect, useRef } from "react";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Intel", href: "#intel" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Scrolled state for background blur
      setScrolled(currentScrollY > 20);

      // Visibility state (hide on scroll down, show on scroll up)
      if (currentScrollY > lastScrollY.current && currentScrollY > 100 && !isOpen) {
        setVisible(false);
      } else {
        setVisible(true);
      }

      lastScrollY.current = currentScrollY;
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

    const sections = ["home", "about", "skills", "intel", "projects", "contact"];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, [isOpen]);

  // Close menu when clicking a link
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${!visible && !isOpen ? "-translate-y-full" : "translate-y-0"
        } ${scrolled || isOpen
          ? "bg-background/90 backdrop-blur-xl border-b border-outline-variant shadow-[0_0_40px_rgba(0,0,0,0.1)] py-4"
          : "bg-transparent py-6"
        }`}
    >
      <div className="flex justify-between items-center px-6 md:px-12 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-4 z-50"
        >
          <a href="#home" className="group flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-tighter text-primary drop-shadow-[0_0_8px_rgba(196,192,255,0.4)] font-headline uppercase whitespace-nowrap hidden sm:block">
              {portfolioData.name}
            </h1>
          </a>
        </motion.div>

        {/* Desktop Links */}
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

        {/* Hire Me Button (Desktop) */}
        <motion.a
          href="#contact"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="hidden md:flex items-center gap-2 px-6 py-2.5 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 rounded-full font-label text-[10px] tracking-[0.2em] uppercase transition-all duration-300 hover:shadow-[0_0_20px_rgba(196,192,255,0.2)]"
        >
          Hire Me
        </motion.a>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden z-50 w-10 h-10 flex flex-col items-center justify-center gap-1.5 focus:outline-none bg-surface-low/50 backdrop-blur-md rounded-full border border-outline-variant/20"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          <motion.span
            animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 6.5 : 0 }}
            className="w-5 h-0.5 bg-primary rounded-full"
          />
          <motion.span
            animate={{ opacity: isOpen ? 0 : 1 }}
            className="w-5 h-0.5 bg-primary rounded-full"
          />
          <motion.span
            animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -6.5 : 0 }}
            className="w-5 h-0.5 bg-primary rounded-full"
          />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden fixed top-0 left-0 w-full h-screen bg-background/98 backdrop-blur-3xl z-40 flex flex-col"
          >
            <div className="flex-grow flex flex-col justify-center px-8 pt-24 pb-12 gap-8 overflow-y-auto">
              {/* Navigation Links */}
              <div className="flex flex-col gap-4">
                <p className="font-label text-[10px] tracking-[0.3em] uppercase text-on-surface-variant opacity-50 mb-2">
                  Navigation
                </p>
                {navLinks.map((link, i) => {
                  const isActive = activeSection === link.href.replace("#", "");
                  return (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.05 }}
                      onClick={handleLinkClick}
                      className={`text-4xl font-headline font-extrabold uppercase tracking-tighter flex items-center gap-4 ${isActive ? "text-primary" : "text-foreground"
                        }`}
                    >
                      <span className="text-sm font-label opacity-30">0{i + 1}</span>
                      {link.name}
                      {isActive && (
                        <motion.div
                          layoutId="activeDot"
                          className="w-3 h-3 bg-primary rounded-full shadow-[0_0_15px_rgba(196,192,255,1)]"
                        />
                      )}
                    </motion.a>
                  );
                })}
              </div>

              {/* Status & Contact Button */}
              <div className="mt-8 space-y-6">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-center gap-3"
                >
                  <span className="w-2 h-2 bg-secondary rounded-full animate-pulse shadow-[0_0_10px_rgba(162,231,255,0.8)]" />
                  <p className="font-label text-[10px] tracking-widest uppercase text-secondary">
                    Available for new projects
                  </p>
                </motion.div>

                <motion.a
                  href="#contact"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  onClick={handleLinkClick}
                  className="block w-full py-5 bg-gradient-to-r from-primary to-primary-container text-on-primary-container font-headline font-bold uppercase tracking-[0.2em] text-center rounded-2xl shadow-[0_15px_40px_rgba(196,192,255,0.2)]"
                >
                  Let's Talk
                </motion.a>
              </div>

              {/* Social Links & Footer info */}
              <div className="mt-auto pt-12 border-t border-outline-variant/30 grid grid-cols-2 gap-8">
                <div>
                  <p className="font-label text-[10px] tracking-widest uppercase text-on-surface-variant opacity-50 mb-4">
                    Connect
                  </p>
                  <div className="flex flex-col gap-3">
                    <a
                      href={portfolioData.socials.github}
                      target="_blank"
                      className="text-foreground hover:text-primary transition-colors font-label text-xs uppercase tracking-widest"
                    >
                      GitHub
                    </a>
                    <a
                      href={portfolioData.socials.linkedin}
                      target="_blank"
                      className="text-foreground hover:text-secondary transition-colors font-label text-xs uppercase tracking-widest"
                    >
                      LinkedIn
                    </a>
                    <a
                      href={portfolioData.socials.whatsapp}
                      target="_blank"
                      className="text-foreground hover:text-secondary transition-colors font-label text-xs uppercase tracking-widest"
                    >
                      WhatsApp
                    </a>
                  </div>
                </div>
                <div>
                  <p className="font-label text-[10px] tracking-widest uppercase text-on-surface-variant opacity-50 mb-4">
                    Email
                  </p>
                  <a
                    href={`https://mail.google.com/mail/?view=cm&to=${portfolioData.email}`}
                    className="text-foreground hover:text-primary transition-colors font-label text-xs break-all"
                    target="_blank"
                  >
                    {portfolioData.email}
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

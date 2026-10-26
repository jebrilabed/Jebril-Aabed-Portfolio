"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioData } from "@/data/portfolio";

interface InstitutionMeta {
  initials: string;
  icon: string;
  borderHover: string;
  glowHover: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
}

const INSTITUTION_CONFIG: Record<string, InstitutionMeta> = {
  Anthropic: {
    initials: "AN",
    icon: "psychology",
    borderHover: "hover:border-amber-400/40",
    glowHover: "group-hover:shadow-[0_0_30px_rgba(251,191,36,0.12)]",
    badgeBg: "bg-amber-500/10",
    badgeText: "text-amber-300",
    badgeBorder: "border-amber-500/20",
  },
  LangChain: {
    initials: "LC",
    icon: "link",
    borderHover: "hover:border-emerald-400/40",
    glowHover: "group-hover:shadow-[0_0_30px_rgba(52,211,153,0.12)]",
    badgeBg: "bg-emerald-500/10",
    badgeText: "text-emerald-300",
    badgeBorder: "border-emerald-500/20",
  },
  Meta: {
    initials: "M",
    icon: "hub",
    borderHover: "hover:border-blue-400/40",
    glowHover: "group-hover:shadow-[0_0_30px_rgba(96,165,250,0.12)]",
    badgeBg: "bg-blue-500/10",
    badgeText: "text-blue-300",
    badgeBorder: "border-blue-500/20",
  },
  IEEE: {
    initials: "IE",
    icon: "code",
    borderHover: "hover:border-sky-400/40",
    glowHover: "group-hover:shadow-[0_0_30px_rgba(56,189,248,0.12)]",
    badgeBg: "bg-sky-500/10",
    badgeText: "text-sky-300",
    badgeBorder: "border-sky-500/20",
  },
  Scrimba: {
    initials: "SC",
    icon: "rocket_launch",
    borderHover: "hover:border-secondary/40",
    glowHover: "group-hover:shadow-[0_0_30px_rgba(162,231,255,0.12)]",
    badgeBg: "bg-secondary/10",
    badgeText: "text-secondary",
    badgeBorder: "border-secondary/20",
  },
  Udemy: {
    initials: "U",
    icon: "school",
    borderHover: "hover:border-primary/40",
    glowHover: "group-hover:shadow-[0_0_30px_rgba(196,192,255,0.12)]",
    badgeBg: "bg-primary/10",
    badgeText: "text-primary",
    badgeBorder: "border-primary/20",
  },
};

const DEFAULT_META: InstitutionMeta = {
  initials: "CR",
  icon: "workspace_premium",
  borderHover: "hover:border-primary/40",
  glowHover: "group-hover:shadow-[0_0_30px_rgba(196,192,255,0.12)]",
  badgeBg: "bg-primary/10",
  badgeText: "text-primary",
  badgeBorder: "border-primary/20",
};

function getInstitutionMeta(institution: string): InstitutionMeta {
  return INSTITUTION_CONFIG[institution] ?? DEFAULT_META;
}

function getCertificateCategory(title: string, institution: string): "ai" | "web" | "cs" {
  const t = title.toLowerCase();
  const inst = institution.toLowerCase();
  if (
    inst.includes("anthropic") ||
    inst.includes("langchain") ||
    t.includes("claude") ||
    t.includes("ai") ||
    t.includes("python")
  ) {
    return "ai";
  }
  if (t.includes("problem solving") || t.includes("competitive") || inst.includes("ieee")) {
    return "cs";
  }
  return "web";
}

function getCertificateTags(title: string, institution: string): string[] {
  const t = title.toLowerCase();
  if (t.includes("claude code")) return ["Claude Code", "AI Agent", "Anthropic"];
  if (t.includes("claude 101")) return ["Claude AI", "Prompt Engineering", "LLMs"];
  if (t.includes("ai fluency")) return ["AI Frameworks", "Foundations", "Generative AI"];
  if (t.includes("langchain")) return ["LangChain", "RAG Workflows", "Python"];
  if (t.includes("python")) return ["Python", "Backend", "Scripting"];
  if (t.includes("next.js")) return ["Next.js", "SSR / SSG", "Fullstack"];
  if (t.includes("react")) return ["React", "UI State", "Component Architecture"];
  if (t.includes("11 javascript")) return ["JavaScript", "DOM Mastery", "Web Apps"];
  if (t.includes("javascript")) return ["JavaScript", "ES6+", "Async Programming"];
  if (t.includes("problem solving")) return ["Data Structures", "Algorithms", "Optimization"];
  return [institution, "Software"];
}

interface CertItem {
  id: number;
  institution: string;
  title: string;
  period: string;
  type: string;
  link?: string;
}

function SpotlightCard({ cert, index }: { cert: CertItem; index: number }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const meta = getInstitutionMeta(cert.institution);
  const tags = getCertificateTags(cert.title, cert.institution);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }

  const cardContent = (
    <div
      onMouseMove={handleMouseMove}
      className={`group relative flex flex-col justify-between h-full p-6 rounded-2xl bg-surface-low/90 backdrop-blur-xl border border-outline-variant/30 ${meta.borderHover} ${meta.glowHover} transition-all duration-300 hover:-translate-y-1 overflow-hidden select-none`}
    >
      {/* Interactive Cursor Spotlight Glow */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, rgba(196, 192, 255, 0.08), transparent 60%)`,
        }}
      />

      {/* Cyber watermark index */}
      <div className="absolute right-4 bottom-2 text-6xl font-black font-headline text-foreground/[0.03] group-hover:text-foreground/[0.06] transition-colors pointer-events-none select-none">
        {String(index + 1).padStart(2, "0")}
      </div>

      {/* Card Header */}
      <div>
        <div className="flex items-center justify-between gap-3 mb-4">
          {/* Institution Badge */}
          <div className="flex items-center gap-2.5">
            <div
              className={`w-9 h-9 rounded-xl ${meta.badgeBg} ${meta.badgeText} border ${meta.badgeBorder} flex items-center justify-center font-headline font-bold text-xs tracking-wider shadow-inner`}
            >
              <span className="material-symbols-outlined text-base" aria-hidden="true">
                {meta.icon}
              </span>
            </div>
            <div>
              <p className="font-label text-xs font-bold text-foreground tracking-wide">
                {cert.institution}
              </p>
              <p className="font-label text-[10px] text-on-surface-variant/70 uppercase tracking-widest">
                {cert.period}
              </p>
            </div>
          </div>

          {/* Verified Pulse Pill */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container border border-outline-variant/30 text-[10px] font-label text-secondary tracking-widest uppercase shrink-0">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-secondary"></span>
            </span>
            Verified
          </div>
        </div>

        {/* Certificate Title */}
        <h4 className="font-headline text-base font-bold text-foreground leading-snug mb-3 group-hover:text-primary transition-colors">
          {cert.title}
        </h4>

        {/* Dynamic Skill Tags */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {tags.map((tag, tIdx) => (
            <span
              key={tIdx}
              className="text-[10px] font-label px-2.5 py-0.5 rounded-md bg-surface-container/60 text-on-surface-variant/80 border border-outline-variant/20"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Card Footer / Action */}
      <div className="pt-4 border-t border-outline-variant/20 flex items-center justify-between text-xs font-label">
        {cert.link ? (
          <span className="inline-flex items-center gap-1.5 text-primary group-hover:text-secondary font-bold tracking-wider uppercase transition-colors">
            View Certificate
            <span className="material-symbols-outlined text-sm group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform">
              open_in_new
            </span>
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 text-on-surface-variant/60 tracking-wider uppercase text-[11px]">
            <span className="material-symbols-outlined text-sm text-secondary/70">
              verified_user
            </span>
            Official Credential
          </span>
        )}

        <span className="font-label text-[10px] text-on-surface-variant/40 tracking-widest uppercase">
          ID-{String(cert.id).padStart(3, "0")}
        </span>
      </div>
    </div>
  );

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      className="h-full"
    >
      {cert.link ? (
        <a
          href={cert.link}
          target="_blank"
          rel="noopener noreferrer"
          className="block h-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/40 rounded-2xl"
          aria-label={`Open certificate for ${cert.title}`}
        >
          {cardContent}
        </a>
      ) : (
        <div className="h-full">{cardContent}</div>
      )}
    </motion.div>
  );
}

export default function Intel() {
  const [activeTab, setActiveTab] = useState<"all" | "ai" | "web" | "cs">("all");

  const education = portfolioData.education.filter((item) => item.type === "education");
  const certificates = portfolioData.education.filter((item) => item.type === "certificate");

  const filteredCertificates = certificates.filter((cert) => {
    if (activeTab === "all") return true;
    return getCertificateCategory(cert.title, cert.institution) === activeTab;
  });

  const counts = {
    all: certificates.length,
    ai: certificates.filter((c) => getCertificateCategory(c.title, c.institution) === "ai").length,
    web: certificates.filter((c) => getCertificateCategory(c.title, c.institution) === "web").length,
    cs: certificates.filter((c) => getCertificateCategory(c.title, c.institution) === "cs").length,
  };

  const tabs: { key: "all" | "ai" | "web" | "cs"; label: string; icon: string; count: number }[] = [
    { key: "all", label: "All Credentials", icon: "all_inclusive", count: counts.all },
    { key: "ai", label: "AI & LLMs", icon: "psychology", count: counts.ai },
    { key: "web", label: "Frontend & Web", icon: "code", count: counts.web },
    { key: "cs", label: "Algorithms & CS", icon: "terminal", count: counts.cs },
  ];

  return (
    <section id="intel" className="py-14 md:py-24 px-5 sm:px-6 max-w-7xl mx-auto scroll-mt-28 relative">
      {/* Background Subtle Neon Ambient Flares */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-primary/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-[140px] pointer-events-none" />

      {/* ─── Header ─── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6 mb-10 md:mb-14">
        <div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-3"
          >
            <span className="material-symbols-outlined text-secondary text-sm">
              verified
            </span>
            <p className="font-label text-secondary-fixed-dim text-xs tracking-[0.25em] uppercase">
              Academic & Professional Credentials
            </p>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-headline text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight uppercase"
          >
            Intel <span className="text-primary glow-text">Storage</span>
          </motion.h2>
        </div>

        {/* Total Verification Stats Pill */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 bg-surface-low/80 backdrop-blur-md px-5 py-3 rounded-2xl border border-outline-variant/30"
        >
          <div className="flex -space-x-2">
            <span className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-[10px] font-bold text-blue-300">
              M
            </span>
            <span className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-[10px] font-bold text-amber-300">
              AN
            </span>
            <span className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-[10px] font-bold text-emerald-300">
              LC
            </span>
            <span className="w-8 h-8 rounded-full bg-sky-500/20 border border-sky-500/40 flex items-center justify-center text-[10px] font-bold text-sky-300">
              IE
            </span>
          </div>
          <div className="text-left">
            <p className="font-headline text-sm font-bold text-foreground">
              {certificates.length}+ Certifications
            </p>
            <p className="font-label text-[10px] text-secondary tracking-wider uppercase">
              100% Verified Track
            </p>
          </div>
        </motion.div>
      </div>

      {/* ─── Academic Degree Feature Card ─── */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-10 md:mb-14 relative group rounded-3xl bg-gradient-to-br from-surface-low via-surface-low/95 to-surface-container/60 border border-outline-variant/30 p-5 sm:p-8 md:p-10 shadow-2xl backdrop-blur-xl overflow-hidden hover:border-primary/40 transition-colors"
      >
        {/* Ambient Corner Flare */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-primary/10 via-transparent to-transparent pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary font-label text-xs tracking-widest uppercase font-bold flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm">school</span>
                Academic Milestone
              </span>
              <span className="flex items-center gap-1.5 text-xs font-label text-secondary tracking-widest uppercase">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
                </span>
                2023 — 2028 • Active Degree
              </span>
            </div>

            <h3 className="font-headline text-2xl md:text-4xl font-extrabold text-foreground tracking-tight">
              Bachelor’s Degree in Software Engineering
            </h3>
            <p className="font-label text-sm md:text-base text-secondary font-medium tracking-wide">
              {education[0]?.institution || "Al-Azhar University of Gaza"} • Gaza, Palestine
            </p>
            <p className="text-on-surface-variant text-sm md:text-base leading-relaxed max-w-3xl">
              Rigorous curriculum emphasizing software design patterns, SOLID principles, agile software engineering, and web development. Deep academic focus on data structures, algorithmic efficiency, and relational database systems.
            </p>

            {/* Coursework Pills */}
            <div className="flex flex-wrap gap-2 pt-2">
              {[
                "Software Design Patterns",
                "SOLID Principles",
                "Agile Methodologies",
                "Algorithms & Data Structures",
                "Database Systems",
                "Web Architecture",
              ].map((course, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg bg-surface-container/70 border border-outline-variant/30 text-xs font-label text-on-surface-variant/90"
                >
                  {course}
                </span>
              ))}
            </div>
          </div>

          {/* Academic Badge Box */}
          <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-center">
            <div className="p-6 rounded-2xl bg-surface-lowest/80 border border-outline-variant/30 text-left w-full max-w-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-label text-[10px] text-on-surface-variant/70 uppercase tracking-widest">
                  Faculty
                </span>
                <span className="material-symbols-outlined text-primary text-base">
                  account_balance
                </span>
              </div>
              <p className="font-headline text-lg font-bold text-foreground leading-tight">
                Engineering & Information Technology
              </p>
              <div className="h-px bg-outline-variant/20" />
              <div className="flex items-center justify-between text-xs font-label">
                <span className="text-on-surface-variant">Status</span>
                <span className="text-secondary font-bold">In Good Standing</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ─── Interactive Filter Tabs ─── */}
      <div className="flex items-center justify-between flex-wrap gap-3 mb-6 md:mb-8">
        <div className="flex items-center gap-1.5 sm:gap-2 p-1 sm:p-1.5 bg-surface-low/80 backdrop-blur-md rounded-2xl border border-outline-variant/30 overflow-x-auto max-w-full">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`relative px-4 py-2.5 rounded-xl font-label text-xs tracking-wider uppercase transition-all duration-300 flex items-center gap-2 shrink-0 cursor-pointer ${
                  isActive ? "text-primary-container font-bold" : "text-on-surface-variant hover:text-foreground"
                }`}
                aria-label={`Filter by ${tab.label}`}
              >
                {isActive && (
                  <motion.div
                    layoutId="intelTabIndicator"
                    className="absolute inset-0 bg-primary/15 border border-primary/30 rounded-xl shadow-[0_0_15px_rgba(196,192,255,0.2)]"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
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
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        <p className="text-xs font-label text-on-surface-variant/70 tracking-widest uppercase hidden sm:block">
          Showing {filteredCertificates.length} of {certificates.length} credentials
        </p>
      </div>

      {/* ─── Certificate Cards Grid ─── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {filteredCertificates.map((cert, index) => (
            <SpotlightCard key={cert.id} cert={cert} index={index} />
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

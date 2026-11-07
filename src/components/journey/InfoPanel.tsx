"use client";

import React from "react";
import Image from "next/image";
import { portfolioData } from "@/data/portfolio";
import { motion, AnimatePresence } from "framer-motion";

export type PanelType = "about" | "skills" | "projects" | "experience" | "contact" | "workstation" | null;

interface InfoPanelProps {
  panel: PanelType;
  onClose: () => void;
}

const PANEL_TITLES: Record<NonNullable<PanelType>, string> = {
  about: "About Me",
  skills: "Technical Skills",
  projects: "Featured Projects",
  experience: "Education & Certificates",
  contact: "Get in Touch",
  workstation: "Developer Workstation",
};

function AboutContent() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 p-3 rounded-xl bg-surface-container/60 border border-outline-variant/30">
        <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-primary/30">
          <Image
            src="/My-Photo.jpeg"
            alt="Jebril Aabed"
            fill
            className="object-cover"
            sizes="56px"
          />
        </div>
        <div>
          <h3 className="font-headline font-bold text-base text-foreground">Jebril Aabed</h3>
          <p className="font-label text-xs text-secondary tracking-wider uppercase">
            Frontend Developer
          </p>
          <p className="font-label text-[10px] text-on-surface-variant flex items-center gap-1 mt-0.5">
            <span className="material-symbols-outlined text-xs text-primary">location_on</span>
            Gaza, Palestine
          </p>
        </div>
      </div>

      <p className="text-xs sm:text-sm leading-relaxed text-on-surface-variant">
        Frontend Developer specializing in{" "}
        <span className="text-secondary font-medium">React.js, Next.js, and TypeScript</span>.
        I focus on building responsive web applications, modern e-commerce platforms, and
        user-focused interfaces with clean code and high performance.
      </p>

      <p className="text-xs sm:text-sm leading-relaxed text-on-surface-variant">
        Experienced in integrating RESTful APIs, authentication, and database-backed services using{" "}
        <span className="text-primary font-medium">FastAPI, PostgreSQL, Prisma, and Supabase</span>.
        Familiar with AI workflows and RAG integration using Gemini, LangChain, and ChromaDB.
      </p>

      <div>
        <p className="font-label text-[10px] text-secondary uppercase tracking-widest font-bold mb-2">
          Core Focus
        </p>
        <div className="flex flex-wrap gap-1.5">
          {["Next.js", "React.js", "TypeScript", "Tailwind CSS", "Material UI", "AI Integration"].map(
            (tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 text-[10px] font-label uppercase tracking-wider rounded-lg bg-primary/10 text-primary border border-primary/20"
              >
                {tag}
              </span>
            )
          )}
        </div>
      </div>

      <div className="pt-2 flex items-center justify-between border-t border-outline-variant/30">
        <a
          href={portfolioData.cvFile}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-background transition-all font-label text-xs uppercase tracking-wider font-semibold"
        >
          <span className="material-symbols-outlined text-sm">download</span>
          Download CV
        </a>
        <a
          href={portfolioData.socials.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-label text-secondary hover:text-primary transition-colors uppercase tracking-widest"
        >
          GitHub Profile →
        </a>
      </div>
    </div>
  );
}

function SkillsContent() {
  const skillCategories = [
    {
      label: "Frontend",
      icon: "devices",
      color: "text-primary",
      bg: "bg-primary/10",
      border: "border-primary/20",
      skills: ["React.js", "Next.js", "TypeScript", "JavaScript (ES6+)", "Responsive Design", "Redux"],
    },
    {
      label: "UI and Styling",
      icon: "palette",
      color: "text-secondary",
      bg: "bg-secondary/10",
      border: "border-secondary/20",
      skills: ["Tailwind CSS", "Material UI", "HTML5 / CSS3", "Figma", "CSS Modules"],
    },
    {
      label: "Backend and Databases",
      icon: "database",
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
      skills: ["FastAPI", "PostgreSQL", "Supabase", "Prisma", "REST APIs", "Python", "Docker"],
    },
    {
      label: "AI and Additional Interests",
      icon: "neurology",
      color: "text-purple-400",
      bg: "bg-purple-500/10",
      border: "border-purple-500/20",
      skills: ["Google Gemini", "LangChain", "RAG Workflows", "ChromaDB", "AI Integration"],
    },
  ];

  return (
    <div className="space-y-4">
      <p className="text-xs text-on-surface-variant leading-relaxed">
        My technical toolkit with a strong emphasis on frontend engineering and seamless API integration.
      </p>

      {skillCategories.map((cat) => (
        <div key={cat.label} className="p-3 rounded-xl bg-surface-container/50 border border-outline-variant/30">
          <div className={`flex items-center gap-2 mb-2 ${cat.color}`}>
            <span className="material-symbols-outlined text-sm">{cat.icon}</span>
            <span className="font-label text-xs uppercase tracking-widest font-bold">
              {cat.label}
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {cat.skills.map((skill) => (
              <span
                key={skill}
                className={`px-2.5 py-1 text-[10px] font-label uppercase tracking-wide rounded-md ${cat.bg} ${cat.color} border ${cat.border}`}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ProjectsContent() {
  return (
    <div className="space-y-4">
      <p className="text-xs text-on-surface-variant leading-relaxed">
        Real production applications and systems built with modern web technologies.
      </p>

      {portfolioData.projects.map((project, idx) => (
        <div
          key={project.name}
          className="group rounded-2xl bg-surface-container/60 border border-outline-variant/30 p-3.5 hover:border-primary/40 transition-all overflow-hidden"
        >
          <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden mb-3 bg-surface-high border border-outline-variant/20">
            <Image
              src={project.image}
              alt={project.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 600px) 100vw, 360px"
            />
            {project.liveDemo && (
              <div className="absolute top-2 right-2 flex items-center gap-1 text-[9px] font-label text-emerald-400 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded-full border border-emerald-500/30 uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live Demo
              </div>
            )}
          </div>

          <div className="flex items-start justify-between gap-2 mb-1.5">
            <div>
              <span className="font-label text-[10px] text-secondary tracking-widest uppercase">
                {"//"} 0{idx + 1}
              </span>
              <h4 className="font-headline text-sm font-bold text-foreground leading-tight">
                {project.name}
              </h4>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              {project.liveDemo && (
                <a
                  href={project.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 flex items-center justify-center rounded-lg bg-secondary/15 text-secondary hover:bg-secondary hover:text-background transition-all"
                  aria-label={`Open ${project.name} demo`}
                  title="Live Demo"
                >
                  <span className="material-symbols-outlined text-sm">open_in_new</span>
                </a>
              )}
              {project.githubLink && (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 flex items-center justify-center rounded-lg bg-primary/15 text-primary hover:bg-primary hover:text-background transition-all"
                  aria-label={`View ${project.name} source code`}
                  title="Source Code"
                >
                  <span className="material-symbols-outlined text-sm">code</span>
                </a>
              )}
            </div>
          </div>

          <p className="text-xs text-on-surface-variant leading-relaxed mb-3">
            {project.desc}
          </p>

          <div className="flex flex-wrap gap-1">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-[9px] font-label uppercase tracking-wide rounded bg-surface-high text-on-surface-variant border border-outline-variant/30"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      ))}

      <a
        href={`${portfolioData.socials.github}?tab=repositories`}
        target="_blank"
        rel="noopener noreferrer"
        className="block text-center text-xs font-label text-secondary uppercase tracking-widest hover:text-primary transition-colors py-2"
      >
        View GitHub Archive →
      </a>
    </div>
  );
}

function ExperienceContent() {
  const degrees = portfolioData.education.filter((e) => e.type === "education");
  const certs = portfolioData.education.filter((e) => e.type === "certificate");

  return (
    <div className="space-y-5">
      <div>
        <div className="flex items-center gap-2 text-secondary mb-3">
          <span className="material-symbols-outlined text-sm">school</span>
          <span className="font-label text-xs uppercase tracking-widest font-bold">
            University Education
          </span>
        </div>
        {degrees.map((item) => (
          <div
            key={item.id}
            className="p-3.5 rounded-xl bg-surface-container/60 border-l-4 border-l-secondary border border-outline-variant/30"
          >
            <p className="text-sm font-headline font-bold text-foreground">{item.title}</p>
            <p className="text-xs text-secondary mt-0.5">{item.institution}</p>
            <p className="text-[11px] text-on-surface-variant mt-1 font-label">{item.period}</p>
          </div>
        ))}
      </div>

      <div>
        <div className="flex items-center gap-2 text-primary mb-3">
          <span className="material-symbols-outlined text-sm">verified</span>
          <span className="font-label text-xs uppercase tracking-widest font-bold">
            Certificates & Specializations
          </span>
        </div>
        <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
          {certs.map((item) => (
            <div
              key={item.id}
              className="flex items-start gap-2.5 p-2.5 rounded-lg bg-surface-container/40 border border-outline-variant/20 hover:border-primary/30 transition-colors"
            >
              <span className="material-symbols-outlined text-sm text-primary mt-0.5 shrink-0">
                workspace_premium
              </span>
              <div>
                <p className="text-xs font-semibold text-foreground leading-snug">{item.title}</p>
                <p className="text-[10px] text-on-surface-variant mt-0.5 font-label">
                  {item.institution} • {item.period}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ContactContent() {
  const { email, phone, socials } = portfolioData;
  const links = [
    {
      label: "GitHub",
      desc: "Explore repositories & open source",
      icon: "terminal",
      href: socials.github,
      color: "text-primary",
      btnClass: "hover:border-primary/50 hover:bg-primary/10",
    },
    {
      label: "LinkedIn",
      desc: "Connect professionally",
      icon: "work",
      href: socials.linkedin,
      color: "text-secondary",
      btnClass: "hover:border-secondary/50 hover:bg-secondary/10",
    },
    {
      label: "WhatsApp",
      desc: "Direct message & chat",
      icon: "chat",
      href: socials.whatsapp,
      color: "text-emerald-400",
      btnClass: "hover:border-emerald-500/50 hover:bg-emerald-500/10",
    },
    {
      label: "Email",
      desc: email,
      icon: "mail",
      href: `https://mail.google.com/mail/?view=cm&to=${email}`,
      color: "text-amber-400",
      btnClass: "hover:border-amber-500/50 hover:bg-amber-500/10",
    },
  ];

  return (
    <div className="space-y-4">
      <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
        Have an exciting project, full-time role, or freelance opportunity? Let&apos;s connect and build
        something great together.
      </p>

      <div className="space-y-2">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-between p-3 rounded-xl border border-outline-variant/30 bg-surface-container/50 transition-all duration-200 ${link.btnClass}`}
          >
            <div className="flex items-center gap-3">
              <span className={`material-symbols-outlined text-lg ${link.color}`}>
                {link.icon}
              </span>
              <div>
                <p className="font-label text-xs font-bold uppercase tracking-wider text-foreground">
                  {link.label}
                </p>
                <p className="text-[10px] text-on-surface-variant">{link.desc}</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-xs text-on-surface-variant">
              open_in_new
            </span>
          </a>
        ))}
      </div>

      <div className="p-3 rounded-xl bg-surface-lowest/70 border border-outline-variant/20 space-y-1.5 text-xs text-on-surface-variant font-label">
        <p className="flex items-center gap-2">
          <span className="material-symbols-outlined text-sm text-primary">location_on</span>
          Gaza, Palestine
        </p>
        <p className="flex items-center gap-2">
          <span className="material-symbols-outlined text-sm text-secondary">phone</span>
          {phone}
        </p>
      </div>
    </div>
  );
}

function WorkstationContent({ onClose }: { onClose: () => void }) {
  return (
    <div className="space-y-4">
      <div className="p-3.5 rounded-xl bg-surface-lowest/90 border border-primary/30 font-mono text-xs">
        <div className="flex items-center gap-2 text-primary pb-2 border-b border-primary/20 mb-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="font-label text-[10px] uppercase tracking-widest text-secondary">
            Dev Terminal — Active Session
          </span>
        </div>
        <p className="text-secondary">$ neofetch --dev &quot;Jebril Aabed&quot;</p>
        <div className="text-[11px] text-on-surface-variant space-y-1 mt-2">
          <p>
            <span className="text-primary font-bold">Role:</span> Frontend Developer
          </p>
          <p>
            <span className="text-secondary font-bold">Stack:</span> Next.js 15, React 19, TypeScript
          </p>
          <p>
            <span className="text-emerald-400 font-bold">Styling:</span> Tailwind CSS, Material UI
          </p>
          <p>
            <span className="text-purple-400 font-bold">AI Focus:</span> Gemini API, LangChain, RAG
          </p>
          <p>
            <span className="text-amber-400 font-bold">Status:</span> Coding high-performance applications
          </p>
        </div>
      </div>

      <p className="text-xs text-on-surface-variant leading-relaxed">
        The workstation is where concepts turn into responsive, scalable reality. Currently
        exploring AI-driven web architectures and advanced frontend patterns.
      </p>

      <div className="flex items-center gap-2 pt-2">
        <button
          onClick={onClose}
          className="flex-1 py-2 rounded-xl bg-primary text-background font-label text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-opacity"
        >
          Resume Exploring
        </button>
      </div>
    </div>
  );
}

export default function InfoPanel({ panel, onClose }: InfoPanelProps) {
  return (
    <AnimatePresence>
      {panel && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal Panel */}
          <motion.div
            key="panel"
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ type: "spring", stiffness: 450, damping: 32 }}
            className="fixed inset-x-4 bottom-4 md:inset-auto md:right-8 md:bottom-8 md:w-[460px] z-50 max-h-[82vh] flex flex-col rounded-3xl bg-surface-low/95 backdrop-blur-2xl border border-outline-variant/40 shadow-[0_30px_90px_rgba(0,0,0,0.7)] overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-label={panel ? PANEL_TITLES[panel] : ""}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-outline-variant/30 bg-surface-container/60 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
                <h2 className="font-headline font-bold text-base sm:text-lg text-foreground">
                  {panel && PANEL_TITLES[panel]}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-xl bg-surface-high/60 hover:bg-surface-high transition-colors text-on-surface-variant hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                aria-label="Close panel"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="overflow-y-auto flex-1 p-6">
              {panel === "about" && <AboutContent />}
              {panel === "skills" && <SkillsContent />}
              {panel === "projects" && <ProjectsContent />}
              {panel === "experience" && <ExperienceContent />}
              {panel === "contact" && <ContactContent />}
              {panel === "workstation" && <WorkstationContent onClose={onClose} />}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

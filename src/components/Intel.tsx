"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";

const INSTITUTION_COLORS: Record<string, string> = {
  "Al-Azhar University": "from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-400",
  "Al-Azhar University of Gaza": "from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-400",
  Meta:    "from-blue-500/20 to-indigo-500/10 border-blue-500/30 text-blue-400",
  Udemy:   "from-violet-500/20 to-purple-500/10 border-violet-500/30 text-violet-400",
  Scrimba: "from-orange-500/20 to-amber-500/10 border-orange-500/30 text-orange-400",
  IEEE:    "from-sky-500/20 to-cyan-500/10 border-sky-500/30 text-sky-400",
  Anthropic: "from-rose-500/20 to-pink-500/10 border-rose-500/30 text-rose-400",
  LangChain: "from-lime-500/20 to-green-500/10 border-lime-500/30 text-lime-400",
};

function getInstitutionStyle(institution: string) {
  return INSTITUTION_COLORS[institution] ?? "from-primary/20 to-secondary/10 border-primary/30 text-primary";
}

const INSTITUTION_INITIALS: Record<string, string> = {
  "Al-Azhar University": "AZ",
  "Al-Azhar University of Gaza": "AZ",
  Meta: "M",
  Udemy: "U",
  Scrimba: "SC",
  IEEE: "IE",
  Anthropic: "AN",
  LangChain: "LC",
};

function getInitials(institution: string) {
  return INSTITUTION_INITIALS[institution] ?? institution.slice(0, 2).toUpperCase();
}

export default function Intel() {
  const education   = portfolioData.education.filter(item => item.type === "education");
  const certificates = portfolioData.education.filter(item => item.type === "certificate");

  return (
    <section id="intel" className="py-12 md:py-20 px-6 max-w-7xl mx-auto scroll-mt-28 overflow-x-hidden">
      {/* Header */}
      <div className="mb-16">
        <h2 className="font-headline text-6xl md:text-8xl font-extrabold tracking-[-0.04em] mb-4 uppercase">
          Intel <span className="text-secondary drop-shadow-[0_0_15px_rgba(162,231,255,0.3)]">Storage</span>
        </h2>
        <p className="font-label text-secondary-fixed-dim tracking-[0.2em] uppercase max-w-lg">
          Academic background and professional certifications in software engineering.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

        {/* ─── Education Timeline ─── */}
        <div className="lg:col-span-4 space-y-12">
          <div className="flex items-center gap-4 mb-10">
            <div className="h-[1px] w-12 bg-outline-variant/30" />
            <h3 className="font-headline text-2xl font-bold uppercase tracking-tight text-primary">Education</h3>
          </div>

          <div className="relative pl-8 md:pl-12 border-l-2 border-primary/20 space-y-20">
            {education.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* Timeline pulse dot */}
                <div className="absolute -left-[35px] md:-left-[51px] top-0 w-4 h-4 bg-primary rounded-full shadow-[0_0_15px_rgba(196,192,255,0.8)] border-4 border-background" />

                <span className="font-label text-xs text-secondary mb-2 block tracking-widest uppercase">
                  {item.period}
                </span>
                <h4 className="font-headline text-2xl md:text-3xl font-bold text-foreground mb-1">
                  {item.institution}
                </h4>
                <p className="font-body text-lg text-on-surface-variant italic mb-4">
                  {item.title}
                </p>
                <div className="p-5 bg-surface-low border-t border-primary/10 rounded-xl">
                  <p className="text-on-surface-variant leading-relaxed text-sm">
                    Focusing on core software engineering principles, algorithmic excellence, and building scalable systems.
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ─── Certificates Grid ─── */}
        <div className="lg:col-span-8">
          <div className="flex items-center gap-4 mb-10">
            <h3 className="font-headline text-xl font-bold uppercase tracking-tight text-secondary">
              Certifications
            </h3>
            <div className="flex-grow h-[1px] bg-outline-variant/30" />
            <span className="font-label text-xs text-on-surface-variant bg-surface-low px-3 py-1 rounded-full border border-outline-variant/20 tracking-widest uppercase">
              {certificates.length} Certificates
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {certificates.map((cert, index) => {
              const style    = getInstitutionStyle(cert.institution);
              const initials = getInitials(cert.institution);
              const Tag = cert.link ? "a" : "div";
              const linkProps = cert.link
                ? { href: cert.link, target: "_blank", rel: "noopener noreferrer" }
                : {};

              return (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06 }}
                >
                  <Tag
                    {...linkProps}
                    className={`group flex items-start gap-4 p-4 rounded-xl border bg-gradient-to-br ${style} transition-all duration-300 hover:scale-[1.02] hover:shadow-lg ${cert.link ? "cursor-pointer" : ""}`}
                  >
                    {/* Institution Avatar */}
                    <div className="w-11 h-11 shrink-0 rounded-lg bg-background/50 flex items-center justify-center border border-white/10 text-xs font-bold font-headline tracking-wider">
                      {initials}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-headline text-sm font-bold text-foreground leading-snug line-clamp-2 group-hover:text-white transition-colors">
                        {cert.title}
                      </h4>
                      <p className="font-label text-[10px] text-on-surface-variant mt-1 uppercase tracking-wider">
                        {cert.institution} · {cert.period}
                      </p>
                    </div>

                    {/* Arrow icon if link exists */}
                    {cert.link && (
                      <span className="material-symbols-outlined text-base shrink-0 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
                        open_in_new
                      </span>
                    )}
                  </Tag>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}

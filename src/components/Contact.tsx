"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { useState } from "react";

// ── Form field state shape ────────────────────────────────────────────────────
type FormState = { name: string; email: string; message: string };
type Status = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState("");

  // ── Client-side validation ─────────────────────────────────────────────────
  function validate(): boolean {
    const newErrors: Partial<FormState> = {};
    if (!form.name.trim()) newErrors.name = "Name is required.";
    if (!form.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!form.message.trim()) {
      newErrors.message = "Message is required.";
    } else if (form.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  // ── Form submission — POSTs to /api/contact ────────────────────────────────
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError("");
    if (!validate()) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        setServerError(data.error || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      setStatus("success");
      setForm({ name: "", email: "", message: "" }); // reset the form
    } catch {
      setServerError("Could not reach the server. Please check your connection.");
      setStatus("error");
    }
  }

  // ── Update a single field and clear its error on change ───────────────────
  function handleChange(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  const isLoading = status === "loading";

  const contactChannels = [
    {
      title: "Email",
      val: portfolioData.email,
      href: `https://mail.google.com/mail/?view=cm&to=${portfolioData.email}`,
      icon: "mail",
      color: "text-rose-400 group-hover:bg-rose-500/20",
      accent: "hover:border-rose-400/40",
    },
    {
      title: "LinkedIn",
      val: "Jebril Aabed",
      href: portfolioData.socials.linkedin,
      icon: "hub",
      color: "text-secondary group-hover:bg-secondary/20",
      accent: "hover:border-secondary/40",
    },
    {
      title: "WhatsApp",
      val: portfolioData.phone || "+972 593-478-714",
      href: portfolioData.socials.whatsapp,
      icon: "chat",
      color: "text-emerald-400 group-hover:bg-emerald-500/20",
      accent: "hover:border-emerald-400/40",
    },
    {
      title: "Location",
      val: portfolioData.location || "Gaza, Palestine",
      href: "https://maps.google.com/?q=Gaza",
      icon: "pin_drop",
      color: "text-amber-400 group-hover:bg-amber-500/20",
      accent: "hover:border-amber-400/40",
    },
  ];

  return (
    <section id="contact" className="py-14 md:py-24 px-5 sm:px-6 max-w-7xl mx-auto scroll-mt-28 overflow-x-hidden relative">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-10 w-80 h-80 bg-primary/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        {/* Left Column: Contact Channels */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5"
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="w-8 h-px bg-primary" />
            <p className="font-label text-secondary text-xs tracking-[0.25em] uppercase">
              Get In Touch
            </p>
          </div>

          <h2 className="font-headline text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight mb-4 md:mb-6 uppercase">
            Start a<br /> <span className="text-primary glow-text">Conversation</span>.
          </h2>

          <p className="text-on-surface-variant text-sm md:text-lg leading-relaxed mb-8 md:mb-10">
            Have a project in mind, an opportunity to discuss, or just want to connect?
            I’m always open to discussing new ideas, software architectures, and AI integration.
          </p>

          <div className="space-y-4">
            {contactChannels.map((item, idx) => (
              <motion.a
                key={idx}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 6 }}
                className={`flex items-center gap-4 p-4 rounded-2xl bg-surface-low/80 backdrop-blur-md border border-outline-variant/30 ${item.accent} transition-all duration-300 group cursor-pointer shadow-sm`}
                aria-label={`Open ${item.title}`}
              >
                <div className={`p-3 bg-surface-container rounded-xl transition-colors ${item.color}`}>
                  <span className="material-symbols-outlined text-xl">{item.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-label text-[10px] uppercase opacity-60 tracking-widest">{item.title}</p>
                  <p className="text-foreground font-headline font-bold text-sm truncate group-hover:text-primary transition-colors">
                    {item.val}
                  </p>
                </div>
                <span className="material-symbols-outlined text-sm opacity-30 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                  open_in_new
                </span>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Right Column: Transmission Form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7 bg-surface-lowest p-5 sm:p-8 md:p-10 rounded-3xl border border-outline-variant/40 shadow-2xl relative overflow-hidden backdrop-blur-xl"
        >
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-center justify-between mb-8 pb-4 border-b border-outline-variant/20">
            <div>
              <h3 className="font-headline text-2xl font-bold uppercase tracking-tight text-foreground">
                Transmission Portal
              </h3>
              <p className="font-label text-xs text-on-surface-variant/70 uppercase tracking-widest mt-1">
                Direct encrypted message
              </p>
            </div>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-low border border-outline-variant/30 text-[10px] font-label text-secondary tracking-widest uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-secondary animate-pulse" />
              Live Gateway
            </span>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            <div className="grid grid-cols-1 gap-5">
              <div className="space-y-2">
                <label className="font-label text-[10px] uppercase tracking-widest opacity-60 ml-1">
                  Your Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. John Doe"
                  className={`w-full bg-surface-low border ${
                    errors.name ? "border-red-500/50" : "border-outline-variant/40"
                  } focus:border-primary focus:ring-1 focus:ring-primary/30 rounded-xl px-4 py-3.5 transition-all duration-300 outline-none font-body text-foreground placeholder:text-on-surface-variant/40`}
                  disabled={isLoading}
                  onChange={(e) => handleChange("name", e.target.value)}
                  value={form.name}
                />
                {errors.name && <p className="text-red-400 text-xs mt-1 ml-1 font-label">{errors.name}</p>}
              </div>

              <div className="space-y-2">
                <label className="font-label text-[10px] uppercase tracking-widest opacity-60 ml-1">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="name@domain.com"
                  className={`w-full bg-surface-low border ${
                    errors.email ? "border-red-500/50" : "border-outline-variant/40"
                  } focus:border-primary focus:ring-1 focus:ring-primary/30 rounded-xl px-4 py-3.5 transition-all duration-300 outline-none font-body text-foreground placeholder:text-on-surface-variant/40`}
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  disabled={isLoading}
                />
                {errors.email && <p className="text-red-400 text-xs mt-1 ml-1 font-label">{errors.email}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <label className="font-label text-[10px] uppercase tracking-widest opacity-60 ml-1">
                Your Message
              </label>
              <textarea
                rows={4}
                placeholder="Tell me about your project, idea, or inquiry..."
                className={`w-full bg-surface-low border ${
                  errors.message ? "border-red-500/50" : "border-outline-variant/40"
                } focus:border-primary focus:ring-1 focus:ring-primary/30 rounded-xl px-4 py-3.5 transition-all duration-300 outline-none resize-none font-body text-foreground placeholder:text-on-surface-variant/40`}
                value={form.message}
                onChange={(e) => handleChange("message", e.target.value)}
                disabled={isLoading}
              />
              {errors.message && <p className="text-red-400 text-xs mt-1 ml-1 font-label">{errors.message}</p>}
            </div>

            {serverError && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
                <p className="text-red-400 text-sm font-label text-center">{serverError}</p>
              </div>
            )}

            <motion.button
              type="submit"
              disabled={isLoading || status === "success"}
              whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(196,192,255,0.3)" }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4.5 bg-gradient-to-r from-primary to-primary-container text-on-primary-container font-headline font-bold uppercase tracking-widest rounded-xl transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer shadow-lg"
            >
              {status === "loading" ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-lg">sync</span> Transmitting...
                </>
              ) : status === "success" ? (
                <>
                  <span className="material-symbols-outlined text-lg">check_circle</span> Transmission Received!
                </>
              ) : (
                <>
                  <span>Send Transmission</span>
                  <span className="material-symbols-outlined text-base">send</span>
                </>
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

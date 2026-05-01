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

  return (
    <section id="contact" className="py-12 md:py-20 px-6 max-w-7xl mx-auto scroll-mt-28">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-headline text-5xl md:text-7xl font-extrabold tracking-tight mb-8 uppercase">
            Start a<br /> <span className="text-primary italic">Conversation</span>.
          </h2>
          <p className="text-on-surface-variant text-xl leading-relaxed mb-12 max-w-md">
            Have a project in mind or just want to connect?
            I’m open to new opportunities, collaborations, and creative ideas.
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-4 group cursor-pointer">
              <div className="p-3 bg-surface-low rounded-lg group-hover:bg-primary/20 transition-colors">
                <span className="material-symbols-outlined text-primary">mail</span>
              </div>
              <div>
                <p className="font-label text-[10px] uppercase opacity-50 tracking-widest">Email</p>
                <p className="text-foreground font-medium group-hover:text-primary transition-colors">
                  {portfolioData.email}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 group cursor-pointer">
              <div className="p-3 bg-surface-low rounded-lg group-hover:bg-secondary/20 transition-colors">
                <span className="material-symbols-outlined text-secondary">hub</span>
              </div>
              <div>
                <p className="font-label text-[10px] uppercase opacity-50 tracking-widest">LinkedIn</p>
                <p className="text-foreground font-medium group-hover:text-secondary transition-colors">
                  Jebril Aabed
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-surface-lowest p-8 rounded-2xl border border-outline-variant shadow-2xl relative"
        >
          <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary/10 rounded-full blur-2xl"></div>

          <h3 className="font-headline text-2xl font-bold mb-8 uppercase">Transmission Form</h3>
          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="font-label text-[10px] uppercase tracking-widest opacity-50 ml-1">Full Name</label>
                <input
                  type="text"
                  placeholder="Your Name"
                  className={`w-full bg-surface-low border ${errors.name ? "border-red-500/50" : "border-outline-variant"
                    } focus:border-primary focus:ring-0 rounded-xl px-4 py-3 transition-all duration-300 outline-none`}
                  disabled={isLoading}
                  onChange={(e) => handleChange("name", e.target.value)}
                  value={form.name}
                />
                {errors.name && <p className="text-red-400 text-xs mt-1 ml-1 font-label">{errors.name}</p>}
              </div>
              <div className="space-y-2">
                <label className="font-label text-[10px] uppercase tracking-widest opacity-50 ml-1">Email Address</label>
                <input
                  type="email"
                  placeholder="Email Address"
                  className={`w-full bg-surface-low border ${errors.email ? "border-red-500/50" : "border-outline-variant"
                    } focus:border-primary focus:ring-0 rounded-xl px-4 py-3 transition-all duration-300 outline-none`}
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  disabled={isLoading}
                />
                {errors.email && <p className="text-red-400 text-xs mt-1 ml-1 font-label">{errors.email}</p>}
              </div>
            </div>
            <div className="space-y-2">
              <label className="font-label text-[10px] uppercase tracking-widest opacity-50 ml-1">Message</label>
              <textarea
                rows={4}
                placeholder="Message..."
                className={`w-full bg-surface-low border ${errors.message ? "border-red-500/50" : "border-outline-variant"
                  } focus:border-primary focus:ring-0 rounded-xl px-4 py-3 transition-all duration-300 outline-none resize-none`}
                value={form.message}
                onChange={(e) => handleChange("message", e.target.value)}
                disabled={isLoading}
              ></textarea>
              {errors.message && <p className="text-red-400 text-xs mt-1 ml-1 font-label">{errors.message}</p>}
            </div>

            {serverError && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
                <p className="text-red-400 text-sm font-label text-center">{serverError}</p>
              </div>
            )}

            <button
              disabled={isLoading || status === "success"}
              className="w-full py-4 bg-gradient-to-r from-primary to-primary-container text-on-primary-container font-headline font-bold uppercase tracking-widest rounded-xl hover:shadow-[0_0_25px_rgba(196,192,255,0.4)] transition-all duration-500 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {status === "loading" ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-lg">sync</span> Transmitting...
                </>
              ) : status === "success" ? (
                <>
                  <span className="material-symbols-outlined text-lg">check_circle</span> Signal Sent!
                </>
              ) : (
                <>Send Message</>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

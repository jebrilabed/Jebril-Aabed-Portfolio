"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useTheme } from "./ThemeProvider";

interface ThemeToggleProps {
  variant?: "icon" | "labeled";
}

export default function ThemeToggle({ variant = "icon" }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const reduceMotion = useReducedMotion();
  const targetTheme = theme === "dark" ? "Light" : "Dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${targetTheme} Mode`}
      title={`Switch to ${targetTheme} Mode`}
      className={`theme-toggle inline-flex min-h-10 items-center justify-center gap-2 rounded-full border border-outline-variant/40 bg-surface-low/80 text-foreground transition-colors hover:bg-surface-high focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
        variant === "icon" ? "w-10" : "px-4 py-2 font-label text-xs uppercase tracking-widest"
      }`}
    >
      <span className="relative flex h-5 w-5 items-center justify-center" aria-hidden="true">
        <AnimatePresence mode="wait" initial={false}>
          <motion.svg
            key={theme}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="theme-toggle-icon absolute h-5 w-5 text-primary"
            initial={reduceMotion ? false : { opacity: 0, rotate: -45, scale: 0.7 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0, rotate: 45, scale: 0.7 }}
            transition={{ duration: reduceMotion ? 0 : 0.18 }}
          >
            {theme === "dark" ? (
              <>
                <circle cx="12" cy="12" r="3.5" />
                <path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
              </>
            ) : (
              <path d="M20.2 15.1A8.5 8.5 0 0 1 8.9 3.8 8.5 8.5 0 1 0 20.2 15.1Z" />
            )}
          </motion.svg>
        </AnimatePresence>
      </span>
      {variant === "labeled" && <span>{targetTheme} mode</span>}
    </button>
  );
}

"use client";

import {
  createContext,
  useContext,
  useCallback,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";

export type Theme = "light" | "dark";

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function subscribeToTheme(onChange: () => void) {
  document.addEventListener("portfolio-theme-change", onChange);
  return () => document.removeEventListener("portfolio-theme-change", onChange);
}

function getThemeSnapshot(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

function getServerThemeSnapshot(): Theme {
  return "dark";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore(
    subscribeToTheme,
    getThemeSnapshot,
    getServerThemeSnapshot
  );

  const toggleTheme = useCallback(() => {
    const nextTheme = getThemeSnapshot() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;

    try {
      window.localStorage.setItem("portfolio-theme", nextTheme);
    } catch {
      // The selected theme remains active for this page if storage is unavailable.
    }
    document.dispatchEvent(new Event("portfolio-theme-change"));
  }, []);

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

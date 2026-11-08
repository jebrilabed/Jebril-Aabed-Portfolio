"use client";

import React, { useState } from "react";

interface FloatingButtonProps {
  onClick: () => void;
  isOpen: boolean;
}

export default function FloatingButton({ onClick, isOpen }: FloatingButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="fixed bottom-6 end-6 z-50 flex items-center gap-3">
      {/* Tooltip Pill */}
      {!isOpen && (
        <div
          className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-low/95 border border-outline-variant/40 backdrop-blur-md shadow-xl text-xs font-label text-foreground tracking-wide transition-all duration-300 pointer-events-none ${
            isHovered
              ? "opacity-100 translate-x-0"
              : "opacity-0 translate-x-2"
          }`}
          role="tooltip"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Ask my AI Assistant</span>
          <span className="text-[10px] text-primary font-bold">✨</span>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        type="button"
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative w-14 h-14 rounded-2xl bg-gradient-to-tr from-surface-low via-surface-container to-surface-high border border-primary/40 hover:border-primary text-foreground shadow-[0_8px_30px_rgba(0,0,0,0.5),0_0_20px_rgba(196,192,255,0.2)] hover:shadow-[0_8px_35px_rgba(196,192,255,0.35)] transition-all duration-300 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary/60 cursor-pointer overflow-hidden"
        aria-label={isOpen ? "Close AI Assistant" : "Open AI Assistant"}
        aria-expanded={isOpen}
      >
        {/* Subtle background animated gradient */}
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/15 via-transparent to-secondary/15 opacity-0 group-hover:opacity-100 transition-opacity" />

        {/* Ambient Ring */}
        <div className="absolute -inset-0.5 rounded-2xl bg-primary/20 blur-sm opacity-50 group-hover:opacity-100 transition-opacity" />

        {/* Icon */}
        <div className="relative flex items-center justify-center">
          {isOpen ? (
            <span className="material-symbols-outlined text-[24px] text-primary group-hover:rotate-90 transition-transform duration-300">
              close
            </span>
          ) : (
            <span className="material-symbols-outlined text-[26px] text-primary group-hover:scale-110 transition-transform duration-300">
              smart_toy
            </span>
          )}
        </div>

        {/* Online Indicator Badge */}
        {!isOpen && (
          <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-surface-lowest shadow-[0_0_8px_#34d399]" />
        )}
      </button>
    </div>
  );
}


"use client";

import React from "react";

export default function TypingIndicator() {
  return (
    <div className="flex items-center gap-2 p-3 rounded-2xl rounded-tl-sm bg-surface-container border border-outline-variant/30 text-xs text-on-surface-variant w-fit shadow-md">
      <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
        <span className="material-symbols-outlined text-[13px] text-primary animate-spin-slow">
          smart_toy
        </span>
      </div>
      <span className="text-[11px] font-label text-on-surface-variant/80">
        Thinking
      </span>
      <div className="flex items-center gap-1 px-1">
        <span
          className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce"
          style={{ animationDelay: "0ms", animationDuration: "1s" }}
        />
        <span
          className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce"
          style={{ animationDelay: "200ms", animationDuration: "1s" }}
        />
        <span
          className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce"
          style={{ animationDelay: "400ms", animationDuration: "1s" }}
        />
      </div>
    </div>
  );
}


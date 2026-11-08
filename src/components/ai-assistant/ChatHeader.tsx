"use client";

import React from "react";

interface ChatHeaderProps {
  onClose: () => void;
  onMinimize: () => void;
  onClear: () => void;
  isMinimized: boolean;
}

export default function ChatHeader({
  onClose,
  onMinimize,
  onClear,
  isMinimized,
}: ChatHeaderProps) {
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-surface-low border-b border-outline-variant/30 select-none">
      {/* Assistant Identity */}
      <div className="flex items-center gap-2.5">
        <div className="relative w-8 h-8 rounded-xl bg-gradient-to-tr from-primary/30 to-secondary/20 border border-primary/40 flex items-center justify-center shadow-inner">
          <span className="material-symbols-outlined text-[18px] text-primary">
            smart_toy
          </span>
          <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-surface-low animate-pulse" />
        </div>
        <div className="flex flex-col">
          <h3 className="font-headline font-bold text-xs text-foreground flex items-center gap-1.5">
            <span>Jebril&apos;s AI Assistant</span>
            <span className="text-[9px] font-label font-bold tracking-wider px-1.5 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
              RAG
            </span>
          </h3>
          <p className="text-[10px] text-on-surface-variant flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>Online • Verified Knowledge</span>
          </p>
        </div>
      </div>

      {/* Control Actions */}
      <div className="flex items-center gap-1 text-on-surface-variant">
        {/* Clear Conversation */}
        <button
          type="button"
          onClick={onClear}
          className="p-1.5 rounded-lg hover:bg-surface-high hover:text-foreground transition-colors cursor-pointer"
          title="Clear conversation"
          aria-label="Clear conversation"
        >
          <span className="material-symbols-outlined text-[16px]">delete_sweep</span>
        </button>

        {/* Minimize / Expand */}
        <button
          type="button"
          onClick={onMinimize}
          className="p-1.5 rounded-lg hover:bg-surface-high hover:text-foreground transition-colors cursor-pointer"
          title={isMinimized ? "Expand" : "Minimize"}
          aria-label={isMinimized ? "Expand" : "Minimize"}
        >
          <span className="material-symbols-outlined text-[16px]">
            {isMinimized ? "expand_less" : "expand_more"}
          </span>
        </button>

        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          className="p-1.5 rounded-lg hover:bg-surface-high hover:text-foreground transition-colors cursor-pointer"
          title="Close assistant"
          aria-label="Close assistant"
        >
          <span className="material-symbols-outlined text-[16px]">close</span>
        </button>
      </div>
    </div>
  );
}


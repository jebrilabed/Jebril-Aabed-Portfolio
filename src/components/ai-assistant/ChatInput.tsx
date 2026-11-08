"use client";

import React, { useRef, useEffect } from "react";

interface ChatInputProps {
  input: string;
  onChange: (val: string) => void;
  onSend: () => void;
  isLoading: boolean;
  disabled?: boolean;
}

export default function ChatInput({
  input,
  onChange,
  onSend,
  isLoading,
  disabled = false,
}: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea height
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        120
      )}px`;
    }
  }, [input]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!isLoading && input.trim()) {
        onSend();
      }
    }
  };

  const isOverLimit = input.length > 500;
  const canSend = input.trim().length > 0 && !isLoading && !isOverLimit && !disabled;

  return (
    <div className="p-3 bg-surface-low border-t border-outline-variant/30">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (canSend) onSend();
        }}
        className="relative flex flex-col gap-1.5"
      >
        <div className="relative flex items-end gap-2 bg-surface-container rounded-xl p-1.5 border border-outline-variant/40 focus-within:border-primary/60 focus-within:ring-1 focus-within:ring-primary/40 transition-all shadow-inner">
          <textarea
            ref={textareaRef}
            rows={1}
            value={input}
            disabled={disabled || isLoading}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about Jebril's skills, projects, or background..."
            className="flex-1 bg-transparent border-none resize-none text-xs text-foreground placeholder:text-on-surface-variant/60 focus:outline-none px-2 py-1 max-h-[120px] leading-relaxed disabled:opacity-50"
            aria-label="Ask Jebril's AI Assistant"
          />

          <button
            type="submit"
            disabled={!canSend}
            className={`p-2 rounded-lg flex items-center justify-center transition-all ${
              canSend
                ? "bg-primary text-primary-foreground shadow-[0_0_12px_rgba(196,192,255,0.4)] hover:bg-primary/90 cursor-pointer"
                : "bg-surface-high text-on-surface-variant/40 cursor-not-allowed"
            }`}
            title="Send message (Enter)"
            aria-label="Send message"
          >
            {isLoading ? (
              <span className="material-symbols-outlined text-[16px] animate-spin">
                progress_activity
              </span>
            ) : (
              <span className="material-symbols-outlined text-[16px]">
                send
              </span>
            )}
          </button>
        </div>

        {/* Footer info: counter + hint */}
        <div className="flex items-center justify-between px-1 text-[10px] text-on-surface-variant/60 font-label">
          <span>Press Enter to send • Shift+Enter for new line</span>
          <span className={isOverLimit ? "text-red-400 font-bold" : ""}>
            {input.length}/500
          </span>
        </div>
      </form>
    </div>
  );
}

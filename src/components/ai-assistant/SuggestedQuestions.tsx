"use client";

import React from "react";

interface SuggestedQuestionsProps {
  onSelect: (question: string) => void;
  disabled?: boolean;
}

export const SUGGESTIONS = [
  {
    en: "Tell me about Jebril.",
    ar: "أخبرني عن جبريل وعن مسيرته.",
    icon: "person",
  },
  {
    en: "What are his strongest technical skills?",
    ar: "ما هي أقوى مهاراته البرمجية؟",
    icon: "code",
  },
  {
    en: "Show me his best projects.",
    ar: "أبرز المشاريع التي أنجزها جبريل.",
    icon: "rocket_launch",
  },
  {
    en: "Tell me about his experience with AI and RAG.",
    ar: "ما هي خبرته في الذكاء الاصطناعي و RAG؟",
    icon: "psychology",
  },
  {
    en: "Is he available for opportunities?",
    ar: "هل هو متاح لفرص العمل أو المشاريع؟",
    icon: "work",
  },
  {
    en: "How can I contact him?",
    ar: "كيف يمكنني التواصل مع جبريل؟",
    icon: "mail",
  },
];

export default function SuggestedQuestions({
  onSelect,
  disabled = false,
}: SuggestedQuestionsProps) {
  return (
    <div className="p-3 bg-surface-lowest/60 border-t border-outline-variant/20">
      <p className="text-[11px] font-label uppercase tracking-widest text-on-surface-variant/80 mb-2 px-1 flex items-center gap-1.5">
        <span className="material-symbols-outlined text-[13px] text-primary">tips_and_updates</span>
        <span>Suggested Questions / أسئلة مقترحة</span>
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
        {SUGGESTIONS.map((s, idx) => (
          <button
            key={idx}
            type="button"
            disabled={disabled}
            onClick={() => onSelect(s.en)}
            className="group flex items-start gap-2 p-2 rounded-lg bg-surface-low/80 hover:bg-surface-high border border-outline-variant/30 hover:border-primary/50 text-left transition-all duration-200 text-xs text-foreground/90 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary/50"
          >
            <span className="material-symbols-outlined text-[15px] text-secondary group-hover:text-primary transition-colors shrink-0 mt-0.5">
              {s.icon}
            </span>
            <div className="flex flex-col min-w-0">
              <span className="font-medium truncate text-foreground group-hover:text-primary transition-colors">
                {s.en}
              </span>
              <span className="text-[10px] text-on-surface-variant/70 truncate" dir="rtl">
                {s.ar}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}


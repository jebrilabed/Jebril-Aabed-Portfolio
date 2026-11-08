"use client";

import React, { useState } from "react";
import { detectLanguage } from "@/lib/ai/retriever";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

interface ChatMessageItemProps {
  message: Message;
}

/**
 * Parses markdown inline formatting (bold, code, links) and returns React elements
 */
function renderMarkdownContent(text: string) {
  // Split into lines
  const lines = text.split("\n");

  return lines.map((line, lineIdx) => {
    const trimmed = line.trim();

    // Empty line
    if (!trimmed) {
      return <div key={lineIdx} className="h-2" />;
    }

    // Bullet point
    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      const content = trimmed.slice(2);
      return (
        <div key={lineIdx} className="flex items-start gap-2 my-0.5 ps-1">
          <span className="text-primary mt-1 text-[8px] select-none">•</span>
          <span className="flex-1">{parseInline(content)}</span>
        </div>
      );
    }

    // Header 3 or 4
    if (trimmed.startsWith("### ") || trimmed.startsWith("## ")) {
      const title = trimmed.replace(/^#+\s*/, "");
      return (
        <h4
          key={lineIdx}
          className="font-headline font-bold text-primary text-xs mt-2.5 mb-1 tracking-wide"
        >
          {parseInline(title)}
        </h4>
      );
    }

    // Regular line
    return (
      <p key={lineIdx} className="my-0.5 leading-relaxed">
        {parseInline(line)}
      </p>
    );
  });
}

/**
 * Parses inline elements: [link](url), **bold**, `code`
 */
function parseInline(text: string): React.ReactNode[] {
  // Regex matches: [link](url), **bold**, `code`
  const regex = /(\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|`([^`]+)`)/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    // Plain text before match
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    if (match[2] && match[3]) {
      // Markdown link [text](url)
      const linkText = match[2];
      const linkUrl = match[3];
      parts.push(
        <a
          key={match.index}
          href={linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-0.5 text-secondary hover:text-primary font-semibold underline decoration-secondary/40 hover:decoration-primary transition-colors mx-0.5"
        >
          <span>{linkText}</span>
          <span className="material-symbols-outlined text-[11px]">open_in_new</span>
        </a>
      );
    } else if (match[4]) {
      // Bold **text**
      parts.push(
        <strong key={match.index} className="font-semibold text-foreground">
          {match[4]}
        </strong>
      );
    } else if (match[5]) {
      // Inline `code`
      parts.push(
        <code
          key={match.index}
          className="px-1.5 py-0.5 rounded bg-surface-lowest/80 text-primary font-mono text-[11px] border border-outline-variant/30"
        >
          {match[5]}
        </code>
      );
    }

    lastIndex = regex.lastIndex;
  }

  // Trailing text
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
}

export default function ChatMessageItem({ message }: ChatMessageItemProps) {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === "user";
  const lang = detectLanguage(message.content);
  const isRTL = lang === "ar";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div
      className={`group flex flex-col ${isUser ? "items-end" : "items-start"} my-2 text-xs transition-all`}
    >
      {/* Sender Header */}
      <div className="flex items-center gap-1.5 mb-1 px-1 text-[10px] font-label text-on-surface-variant/70">
        {!isUser ? (
          <>
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span className="font-semibold text-primary">Jebril&apos;s Assistant</span>
          </>
        ) : (
          <span className="font-medium">You</span>
        )}
        <span>•</span>
        <span>{message.timestamp}</span>
      </div>

      {/* Bubble Container */}
      <div className="relative max-w-[88%] sm:max-w-[82%]">
        <div
          dir={isRTL ? "rtl" : "ltr"}
          className={`p-3.5 rounded-2xl ${
            isUser
              ? "bg-primary-container/20 text-foreground border border-primary/30 rounded-tr-sm shadow-[0_2px_12px_rgba(196,192,255,0.08)]"
              : "bg-surface-container text-foreground/90 border border-outline-variant/30 rounded-tl-sm shadow-md"
          } text-[12.5px] leading-relaxed break-words`}
        >
          {renderMarkdownContent(message.content)}
        </div>

        {/* Copy Button for Assistant responses */}
        {!isUser && (
          <button
            type="button"
            onClick={handleCopy}
            className="absolute -bottom-2 end-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-md bg-surface-high border border-outline-variant/40 hover:bg-surface-highest text-on-surface-variant hover:text-foreground text-[10px] flex items-center gap-1 shadow-sm focus:opacity-100 cursor-pointer"
            title="Copy message"
            aria-label="Copy message"
          >
            <span className="material-symbols-outlined text-[12px]">
              {copied ? "check" : "content_copy"}
            </span>
            <span className="text-[10px] font-label">{copied ? "Copied" : "Copy"}</span>
          </button>
        )}
      </div>
    </div>
  );
}


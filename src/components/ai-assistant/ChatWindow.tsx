"use client";

import React, { useRef, useEffect } from "react";
import ChatHeader from "./ChatHeader";
import ChatMessageItem, { type Message } from "./ChatMessageItem";
import SuggestedQuestions from "./SuggestedQuestions";
import ChatInput from "./ChatInput";
import TypingIndicator from "./TypingIndicator";

interface ChatWindowProps {
  isOpen: boolean;
  isMinimized: boolean;
  messages: Message[];
  input: string;
  isLoading: boolean;
  errorMessage: string | null;
  onClose: () => void;
  onMinimize: () => void;
  onClear: () => void;
  onInputChange: (val: string) => void;
  onSendMessage: (text?: string) => void;
}

export default function ChatWindow({
  isOpen,
  isMinimized,
  messages,
  input,
  isLoading,
  errorMessage,
  onClose,
  onMinimize,
  onClear,
  onInputChange,
  onSendMessage,
}: ChatWindowProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new messages or typing
  useEffect(() => {
    if (isOpen && !isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading, isOpen, isMinimized]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-label="Jebril's AI Assistant Chat Window"
      className={`fixed z-50 transition-all duration-300 ease-out flex flex-col overflow-hidden bg-surface-low/95 border border-outline-variant/40 backdrop-blur-2xl shadow-[var(--chat-shadow)] rounded-2xl ${
        isMinimized
          ? "bottom-24 end-6 w-[340px] h-[58px]"
          : "bottom-4 end-4 sm:bottom-24 sm:end-6 w-[calc(100vw-2rem)] sm:w-[410px] h-[calc(100dvh-5rem)] sm:h-[600px] max-h-[640px]"
      }`}
    >
      {/* Header */}
      <ChatHeader
        onClose={onClose}
        onMinimize={onMinimize}
        onClear={onClear}
        isMinimized={isMinimized}
      />

      {/* Main Chat Body (Hidden when minimized) */}
      {!isMinimized && (
        <div className="flex-1 flex flex-col min-h-0 bg-surface-lowest/40">
          {/* Scrollable Messages Area */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2 select-text scroll-smooth">
            {/* Welcoming Card */}
            <div className="p-3.5 rounded-2xl bg-gradient-to-br from-surface-container/90 to-surface-low border border-primary/20 shadow-sm text-xs text-foreground/90 my-1">
              <div className="flex items-center gap-2 mb-1.5 text-primary font-headline font-semibold text-xs">
                <span className="material-symbols-outlined text-[16px]">waving_hand</span>
                <span>Welcome to Jebril&apos;s Portfolio!</span>
              </div>
              <p className="text-[12px] text-on-surface-variant leading-relaxed">
                Hi! I&apos;m Jebril&apos;s verified AI assistant. Ask me anything about his technical stack, web projects, background, or availability.
              </p>
              <p className="text-[11px] text-on-surface-variant/70 leading-relaxed mt-1" dir="rtl">
                أهلاً بك! يمكنك سؤالي عن مهارات جبريل، مشاريعه البرمجية، أو طلب بيانات التواصل المباشرة.
              </p>
            </div>

            {/* Render conversation messages */}
            {messages.map((msg) => (
              <ChatMessageItem key={msg.id} message={msg} />
            ))}

            {/* Typing status indicator */}
            {isLoading && <TypingIndicator />}

            {/* Error banner if network fails */}
            {errorMessage && (
              <div className="p-2.5 rounded-xl bg-red-950/40 border border-red-500/40 text-red-200 text-xs flex items-center gap-2 my-2">
                <span className="material-symbols-outlined text-[16px] text-red-400 shrink-0">
                  error
                </span>
                <span className="leading-snug">{errorMessage}</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Prompts (Shown if conversation has <= 1 user message) */}
          {messages.length <= 1 && (
            <SuggestedQuestions
              onSelect={(q) => onSendMessage(q)}
              disabled={isLoading}
            />
          )}

          {/* Bottom Chat Input */}
          <ChatInput
            input={input}
            onChange={onInputChange}
            onSend={() => onSendMessage()}
            isLoading={isLoading}
          />
        </div>
      )}
    </div>
  );
}

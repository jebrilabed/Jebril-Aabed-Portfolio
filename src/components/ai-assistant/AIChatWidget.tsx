"use client";

import React, { useState, useEffect, useCallback } from "react";
import FloatingButton from "./FloatingButton";
import ChatWindow from "./ChatWindow";
import type { Message } from "./ChatMessageItem";

function formatTimestamp(): string {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

const INITIAL_WELCOME: Message = {
  id: "initial-welcome",
  role: "assistant",
  content:
    "Hi! I'm Jebril's AI assistant. Ask me anything about his skills, projects, and experience.\n\nأهلاً بك! أنا مساعد جبريل الذكي. يمكنك سؤالي عن مهاراته، مشاريعه، أو خلفيته البرمجية.",
  timestamp: "Just now",
};

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [messages, setMessages] = useState<Message[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = sessionStorage.getItem("jebril_ai_chat");
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            return parsed;
          }
        }
      } catch {
        // Ignore
      }
    }
    return [INITIAL_WELCOME];
  });

  // Save conversation to sessionStorage
  useEffect(() => {
    try {
      if (messages.length > 1) {
        sessionStorage.setItem("jebril_ai_chat", JSON.stringify(messages));
      }
    } catch {
      // Ignore
    }
  }, [messages]);

  const handleToggleOpen = () => {
    if (isOpen && isMinimized) {
      setIsMinimized(false);
    } else {
      setIsOpen((prev) => !prev);
      setIsMinimized(false);
    }
    setErrorMessage(null);
  };

  const handleMinimize = () => {
    setIsMinimized((prev) => !prev);
  };

  const handleClearConversation = useCallback(() => {
    const welcomeMsg: Message = {
      id: `welcome-${Date.now()}`,
      role: "assistant",
      content:
        "Conversation cleared! How can I assist you with Jebril's portfolio?\n\nتم مسح المحادثة! كيف يمكنني مساعدتك اليوم بخصوص أعمال جبريل؟",
      timestamp: formatTimestamp(),
    };
    setMessages([welcomeMsg]);
    setInput("");
    setErrorMessage(null);
    try {
      sessionStorage.removeItem("jebril_ai_chat");
    } catch {
      // Ignore
    }
  }, []);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isLoading) return;

    setErrorMessage(null);
    setInput("");

    // Create and append user message
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: query,
      timestamp: formatTimestamp(),
    };

    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setIsLoading(true);

    // Prepare assistant placeholder message for streaming
    const assistantMsgId = `assistant-${Date.now()}`;
    const assistantPlaceholder: Message = {
      id: assistantMsgId,
      role: "assistant",
      content: "",
      timestamp: formatTimestamp(),
    };

    setMessages([...nextMessages, assistantPlaceholder]);

    try {
      // Prepare payload for backend (send existing prior messages)
      const historyPayload = messages.slice(-6).map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: query,
          history: historyPayload,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        if (res.status === 429) {
          throw new Error(
            errorData?.error || "Rate limit reached. Please wait a few moments."
          );
        }
        throw new Error(errorData?.error || `Server responded with ${res.status}`);
      }

      if (!res.body) {
        throw new Error("No response stream available.");
      }

      // Read SSE stream
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";
      let buffer = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) {
          // Flush any remaining buffer text
          if (buffer.trim()) {
            const remainingLines = buffer.split("\n");
            for (const line of remainingLines) {
              const trimmed = line.trim();
              if (trimmed && trimmed.startsWith("data:")) {
                const dataStr = trimmed.replace(/^data:\s*/, "");
                if (dataStr !== "[DONE]") {
                  try {
                    const parsed = JSON.parse(dataStr);
                    if (parsed.text) accumulated += parsed.text;
                  } catch {
                    // Ignore
                  }
                }
              }
            }
            setMessages((prev) =>
              prev.map((msg) =>
                msg.id === assistantMsgId ? { ...msg, content: accumulated } : msg
              )
            );
          }
          break;
        }

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed || !trimmed.startsWith("data:")) continue;

          const dataStr = trimmed.replace(/^data:\s*/, "");
          if (dataStr === "[DONE]") {
            break;
          }

          try {
            const parsed = JSON.parse(dataStr);
            if (parsed.text) {
              accumulated += parsed.text;
              setMessages((prev) =>
                prev.map((msg) =>
                  msg.id === assistantMsgId
                    ? { ...msg, content: accumulated }
                    : msg
                )
              );
            } else if (parsed.error) {
              accumulated += parsed.error;
              setMessages((prev) =>
                prev.map((msg) =>
                  msg.id === assistantMsgId
                    ? { ...msg, content: accumulated }
                    : msg
                )
              );
            }
          } catch {
            // Ignore malformed chunk
          }
        }
      }

      if (!accumulated.trim()) {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantMsgId
              ? {
                  ...msg,
                  content:
                    "I am here to help answer questions about Jebril's portfolio, skills, and projects. Please feel free to ask!",
                }
              : msg
          )
        );
      }
    } catch (err: unknown) {
      console.error("[Chat Stream Error]:", err);
      const errStr =
        err instanceof Error
          ? err.message
          : "Unable to connect to the assistant. Please check your connection.";
      setErrorMessage(errStr);

      // If assistant placeholder was empty, display error inside it
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantMsgId && !msg.content
            ? {
                ...msg,
                content:
                  "⚠️ Sorry, I could not complete your request at this moment. You can contact Jebril directly at [jebrilaabed@gmail.com](mailto:jebrilaabed@gmail.com).",
              }
            : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <FloatingButton onClick={handleToggleOpen} isOpen={isOpen} />
      <ChatWindow
        isOpen={isOpen}
        isMinimized={isMinimized}
        messages={messages}
        input={input}
        isLoading={isLoading}
        errorMessage={errorMessage}
        onClose={() => setIsOpen(false)}
        onMinimize={handleMinimize}
        onClear={handleClearConversation}
        onInputChange={setInput}
        onSendMessage={handleSendMessage}
      />
    </>
  );
}


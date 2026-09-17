"use client";

import React, { useState, useRef, useEffect } from "react";
import { 
  Sparkles, 
  X, 
  Bot, 
  User, 
  CornerDownLeft, 
  Loader2, 
  Maximize2, 
  Minimize2,
  RotateCcw
} from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function SeoBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "FastSEOKit AI ready. Ask for meta audits, structured schema, canonical fixes, or indexing directives.",
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || loading) return;

    const userMessage: Message = { role: "user", content: query.trim() };
    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/seo-bot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.reply },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: `Error: ${data.error || "Failed to reach AI service."}` },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Network error. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-950 font-bold text-xs shadow-xl hover:scale-105 active:scale-95 transition-all border border-white/20 dark:border-neutral-800 cursor-pointer"
        >
          <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center text-white">
            <Sparkles size={12} />
          </div>
          <span>Ask SEO AI</span>
        </button>
      )}

      {/* Resizable Chat Drawer */}
      {isOpen && (
        <div
          style={{
            resize: "both",
            overflow: "hidden",
            minWidth: "320px",
            minHeight: "420px",
            maxWidth: "calc(100vw - 32px)",
            maxHeight: "calc(100vh - 40px)",
          }}
          className={`${
            isExpanded
              ? "w-[min(680px,94vw)] h-[680px]"
              : "w-[min(400px,92vw)] h-[520px]"
          } rounded-2xl bg-white dark:bg-[#0d111a] border border-neutral-200 dark:border-neutral-800 shadow-2xl flex flex-col transition-[width,height] duration-200`}
        >
          {/* Header */}
          <div className="px-4 py-3 bg-neutral-50/80 dark:bg-neutral-900/80 border-b border-neutral-200/80 dark:border-neutral-800 flex items-center justify-between select-none">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <Bot size={15} />
              </div>
              <div>
                <h3 className="text-xs font-bold text-neutral-900 dark:text-white flex items-center gap-1.5">
                  FastSEO Copilot
                  <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300">
                    Claude Style
                  </span>
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {/* Reset History */}
              <button
                onClick={() => setMessages([{ role: "assistant", content: "FastSEOKit AI ready." }])}
                title="Reset conversation"
                className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              >
                <RotateCcw size={13} />
              </button>

              {/* Expand / Shrink Toggle */}
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                title={isExpanded ? "Collapse to standard size" : "Expand size"}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              >
                {isExpanded ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
              </button>

              {/* Close Drawer */}
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              >
                <X size={15} />
              </button>
            </div>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs leading-relaxed">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex gap-2.5 ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {m.role === "assistant" && (
                  <div className="w-6 h-6 rounded-md bg-blue-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Bot size={13} />
                  </div>
                )}
                <div
                  className={`p-3 rounded-2xl max-w-[88%] whitespace-pre-wrap font-sans text-xs sm:text-[13px] leading-relaxed ${
                    m.role === "user"
                      ? "bg-blue-600 text-white rounded-br-sm font-medium"
                      : "bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 rounded-bl-sm border border-neutral-200/70 dark:border-neutral-800 shadow-xs"
                  }`}
                >
                  {m.content}
                </div>
                {m.role === "user" && (
                  <div className="w-6 h-6 rounded-md bg-neutral-900 dark:bg-neutral-700 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <User size={13} />
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div className="flex items-center gap-2 text-neutral-400 text-xs py-1">
                <Loader2 size={14} className="animate-spin text-blue-600" />
                <span>Formulating response...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          <div className="px-3 py-1.5 border-t border-neutral-100 dark:border-neutral-800/80 flex gap-1.5 overflow-x-auto text-[10px] select-none">
            <button
              onClick={() => handleSend("Draft an optimized title & meta description for a SaaS landing page")}
              className="px-2.5 py-1 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-blue-50 dark:hover:bg-blue-950 hover:text-blue-600 transition-colors shrink-0"
            >
              Draft SaaS Meta Tags
            </button>
            <button
              onClick={() => handleSend("Explain when to use 301 vs canonical tags")}
              className="px-2.5 py-1 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-blue-50 dark:hover:bg-blue-950 hover:text-blue-600 transition-colors shrink-0"
            >
              301 vs Canonical
            </button>
          </div>

          {/* Input Area */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/90 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask an SEO question..."
              disabled={loading}
              className="flex-1 px-3 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="w-8 h-8 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white flex items-center justify-center transition-all cursor-pointer"
            >
              <CornerDownLeft size={14} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

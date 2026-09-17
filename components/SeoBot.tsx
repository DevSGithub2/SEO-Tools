"use client";

import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { 
  Sparkles, 
  X, 
  Bot, 
  User, 
  CornerDownLeft, 
  Loader2, 
  Maximize2, 
  Minimize2,
  RotateCcw,
  Copy,
  Check
} from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

// Sub-component for individual Code Block with Copy action
function CodeBlock({ children, className }: { children: React.ReactNode; className?: string }) {
  const [copied, setCopied] = useState(false);
  const codeString = String(children).replace(/\n$/, "");

  const handleCopy = async () => {
    await navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative my-2 rounded-xl overflow-hidden border border-neutral-800 bg-neutral-950 font-mono text-[11px] text-emerald-400">
      <div className="flex items-center justify-between px-3 py-1.5 bg-neutral-900 border-b border-neutral-800 text-[10px] text-neutral-400">
        <span className="uppercase font-semibold tracking-wider">
          {className?.replace("language-", "") || "Code"}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 hover:text-white transition-colors"
        >
          {copied ? <Check size={11} className="text-emerald-400" /> : <Copy size={11} />}
          <span>{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>
      <div className="p-3 overflow-x-auto whitespace-pre">
        {children}
      </div>
    </div>
  );
}

// Sub-component for Assistant Messages with 1-Click Copy
function AssistantBubble({ content }: { content: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopyFull = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative bg-white dark:bg-neutral-900/90 text-neutral-800 dark:text-neutral-100 rounded-2xl rounded-tl-sm p-4 border border-neutral-200/80 dark:border-neutral-800 shadow-xs max-w-[90%] text-xs leading-relaxed">
      {/* 1-Click Full Message Copy Button */}
      <button
        onClick={handleCopyFull}
        title="Copy full response"
        className="absolute top-2.5 right-2.5 p-1 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-500 hover:text-neutral-900 dark:hover:text-white opacity-0 group-hover:opacity-100 transition-all cursor-pointer flex items-center gap-1 text-[10px] font-medium"
      >
        {copied ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
        <span>{copied ? "Copied" : "Copy"}</span>
      </button>

      {/* Rendered Markdown */}
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => <h3 className="font-bold text-neutral-950 dark:text-white text-sm mt-3 mb-1.5 first:mt-0">{children}</h3>,
          h2: ({ children }) => <h4 className="font-bold text-neutral-900 dark:text-white text-xs mt-3 mb-1.5 first:mt-0">{children}</h4>,
          h3: ({ children }) => <h5 className="font-bold text-neutral-900 dark:text-neutral-200 text-xs mt-2.5 mb-1">{children}</h5>,
          p: ({ children }) => <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>,
          ul: ({ children }) => <ul className="list-disc pl-4 space-y-1 mb-2.5 text-neutral-700 dark:text-neutral-300">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal pl-4 space-y-1 mb-2.5 text-neutral-700 dark:text-neutral-300">{children}</ol>,
          li: ({ children }) => <li className="leading-snug">{children}</li>,
          strong: ({ children }) => <strong className="font-bold text-neutral-950 dark:text-white">{children}</strong>,
          // Claude-style formatted tables
          table: ({ children }) => (
            <div className="overflow-x-auto my-3 rounded-lg border border-neutral-200 dark:border-neutral-800">
              <table className="w-full text-left border-collapse text-[11px]">{children}</table>
            </div>
          ),
          thead: ({ children }) => <thead className="bg-neutral-100 dark:bg-neutral-800/60 font-semibold border-b border-neutral-200 dark:border-neutral-700">{children}</thead>,
          tbody: ({ children }) => <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">{children}</tbody>,
          tr: ({ children }) => <tr className="hover:bg-neutral-50 dark:hover:bg-neutral-800/30 transition-colors">{children}</tr>,
          th: ({ children }) => <th className="p-2 text-neutral-900 dark:text-neutral-200 font-bold">{children}</th>,
          td: ({ children }) => <td className="p-2 text-neutral-600 dark:text-neutral-300 align-top">{children}</td>,
          code: ({ node, className, children, ...props }) => {
            const isInline = !className && typeof children === "string";
            if (isInline) {
              return (
                <code className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-blue-600 dark:text-blue-400 font-mono text-[11px]">
                  {children}
                </code>
              );
            }
            return <CodeBlock className={className}>{children}</CodeBlock>;
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
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

      {/* Resizable Chat Window */}
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
              ? "w-[min(700px,94vw)] h-[680px]"
              : "w-[min(420px,92vw)] h-[540px]"
          } rounded-2xl bg-neutral-50/95 dark:bg-[#090d14]/95 backdrop-blur-md border border-neutral-200 dark:border-neutral-800 shadow-2xl flex flex-col transition-[width,height] duration-200`}
        >
          {/* Header */}
          <div className="px-4 py-3 bg-white/80 dark:bg-neutral-900/80 border-b border-neutral-200/80 dark:border-neutral-800 flex items-center justify-between select-none">
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
              <button
                onClick={() => setMessages([{ role: "assistant", content: "FastSEOKit AI ready." }])}
                title="Reset chat"
                className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              >
                <RotateCcw size={13} />
              </button>

              <button
                onClick={() => setIsExpanded(!isExpanded)}
                title={isExpanded ? "Standard Size" : "Expand Size"}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              >
                {isExpanded ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
              </button>

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

                {m.role === "assistant" ? (
                  <AssistantBubble content={m.content} />
                ) : (
                  <div className="bg-blue-600 text-white rounded-2xl rounded-tr-sm p-3.5 max-w-[85%] font-medium">
                    {m.content}
                  </div>
                )}

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

          {/* Quick Starter Prompts */}
          <div className="px-3 py-1.5 border-t border-neutral-200/60 dark:border-neutral-800/80 flex gap-1.5 overflow-x-auto text-[10px] select-none bg-white/50 dark:bg-neutral-900/50">
            <button
              onClick={() => handleSend("Explain when to use 301 redirect vs canonical tag")}
              className="px-2.5 py-1 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-blue-50 dark:hover:bg-blue-950 hover:text-blue-600 transition-colors shrink-0"
            >
              301 vs Canonical
            </button>
            <button
              onClick={() => handleSend("Draft an optimized title & meta description for an AI SaaS")}
              className="px-2.5 py-1 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-blue-50 dark:hover:bg-blue-950 hover:text-blue-600 transition-colors shrink-0"
            >
              Draft SaaS Meta Tags
            </button>
          </div>

          {/* Input Bar */}
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
              className="flex-1 px-3.5 py-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="w-9 h-9 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white flex items-center justify-center transition-all cursor-pointer shrink-0"
            >
              <CornerDownLeft size={14} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

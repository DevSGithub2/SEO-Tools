"use client";

import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Sparkles, Loader2, Copy, Check, CornerDownLeft } from "lucide-react";

interface ToolAiAssistantProps {
  toolName: string;
  contextData?: string;
  placeholder?: string;
  suggestedPrompts?: string[];
}

export default function ToolAiAssistant({
  toolName,
  contextData = "",
  placeholder = "Ask AI to review, generate, or optimize...",
  suggestedPrompts = [],
}: ToolAiAssistantProps) {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const runAiAction = async (customPrompt?: string) => {
    const text = customPrompt || prompt;
    if (!text.trim() || loading) return;

    setLoading(true);
    setResponse("");

    const fullPrompt = contextData
      ? `[Tool: ${toolName}]\nCurrent Tool State/Data:\n"""\n${contextData}\n"""\n\nTask: ${text}`
      : `[Tool: ${toolName}]\nTask: ${text}`;

    try {
      const res = await fetch("/api/seo-bot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "user", content: fullPrompt }],
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setResponse(data.reply);
      } else {
        setResponse(`Error: ${data.error || "Failed to analyze."}`);
      }
    } catch {
      setResponse("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    if (!response) return;
    await navigator.clipboard.writeText(response);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-8 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/60 backdrop-blur-md p-4 sm:p-5">
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-xs">
            <Sparkles size={14} />
          </div>
          <div>
            <h4 className="text-xs font-bold text-neutral-900 dark:text-neutral-100">
              {toolName} AI Copilot
            </h4>
            <p className="text-[10px] text-neutral-500">
              Powered by Groq High-Speed LPU
            </p>
          </div>
        </div>

        {response && (
          <button
            onClick={copyToClipboard}
            className="flex items-center gap-1 text-[11px] font-medium px-2 py-1 rounded-md bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 transition-colors"
          >
            {copied ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
            <span>{copied ? "Copied" : "Copy Output"}</span>
          </button>
        )}
      </div>

      {suggestedPrompts.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {suggestedPrompts.map((sp, idx) => (
            <button
              key={idx}
              onClick={() => runAiAction(sp)}
              disabled={loading}
              className="text-[10px] px-2.5 py-1 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950 transition-colors"
            >
              {sp}
            </button>
          ))}
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          runAiAction();
        }}
        className="flex gap-2"
      >
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder={placeholder}
          disabled={loading}
          className="flex-1 px-3.5 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={loading || !prompt.trim()}
          className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shrink-0"
        >
          {loading ? <Loader2 size={13} className="animate-spin" /> : <CornerDownLeft size={13} />}
          <span>Run</span>
        </button>
      </form>

      {response && (
        <div className="mt-3.5 p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200/60 dark:border-neutral-800 text-xs leading-relaxed text-neutral-800 dark:text-neutral-200">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{response}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}

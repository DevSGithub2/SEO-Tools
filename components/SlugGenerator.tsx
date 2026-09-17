"use client";

import React, { useState } from "react";
import { Copy, Check, Sparkles, Hash } from "lucide-react";

export default function SlugGenerator() {
  const [input, setInput] = useState("Best Gaming Mouse Under ₹2000 in 2026!");
  const [separator, setSeparator] = useState<"-" | "_">("-");
  const [copied, setCopied] = useState(false);

  const generateSlug = (text: string, sep: string) => {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, sep)
      .replace(new RegExp(`\\${sep}+`, "g"), sep);
  };

  const slug = generateSlug(input, separator);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(slug);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-7 sm:p-9 rounded-2xl border border-neutral-200 shadow-sm space-y-6">
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-2">
          Source Headline or Article Title
        </label>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="e.g. 10 Proven SEO Strategies for Rapid Growth"
          className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-neutral-900 text-sm font-medium transition-all"
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 p-3.5 bg-neutral-50 rounded-xl border border-neutral-200/60">
        <span className="text-xs font-bold uppercase tracking-wider text-neutral-600">Delimiter Format:</span>
        <div className="flex gap-3 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setSeparator("-")}
            className={`px-3 py-1.5 rounded-lg border transition-all ${
              separator === "-"
                ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                : "bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-100"
            }`}
          >
            Hyphen ( - ) Recommended
          </button>
          <button
            type="button"
            onClick={() => setSeparator("_")}
            className={`px-3 py-1.5 rounded-lg border transition-all ${
              separator === "_"
                ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                : "bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-100"
            }`}
          >
            Underscore ( _ )
          </button>
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-2">
          SEO-Friendly URL Slug
        </label>
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-neutral-900 px-4 py-3.5 rounded-xl font-mono text-sm text-emerald-400 break-all select-all shadow-inner border border-neutral-800">
            {slug || "slug-output-preview"}
          </div>
          <button
            onClick={handleCopy}
            className="px-5 py-3.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-md shadow-blue-600/20 shrink-0"
          >
            {copied ? <Check size={16} className="text-white" /> : <Copy size={16} />}
            {copied ? "Copied!" : "Copy Slug"}
          </button>
        </div>
      </div>
    </div>
  );
}

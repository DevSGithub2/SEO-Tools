"use client";

import React, { useState } from "react";
import { Copy, Check, Link2, Sparkles } from "lucide-react";

export default function SlugGenerator() {
  const [input, setInput] = useState("Best Gaming Mouse Under ₹2000 in 2026!");
  const [separator, setSeparator] = useState<"-" | "_">("-");
  const [lowercase, setLowercase] = useState(true);
  const [stripNumbers, setStripNumbers] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateSlug = () => {
    let text = input.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    if (lowercase) text = text.toLowerCase();
    if (stripNumbers) text = text.replace(/[0-9]/g, "");
    text = text.replace(/[^a-zA-Z0-9\s-]/g, "").trim();
    text = text.replace(/\s+/g, separator);
    return text.replace(new RegExp(`\\${separator}+`, "g"), separator);
  };

  const slug = generateSlug();

  const handleCopy = async () => {
    await navigator.clipboard.writeText(slug);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full max-w-5xl mx-auto items-stretch">
      {/* Input Side */}
      <div className="bg-white p-6 sm:p-7 rounded-2xl border border-neutral-200/90 shadow-xs flex flex-col justify-between space-y-4">
        <div className="border-b border-neutral-100 pb-3 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-neutral-900">Headline Input</h2>
            <p className="text-xs text-neutral-500">Source title to convert into a URL</p>
          </div>
          <span className="p-2 bg-blue-50 text-blue-600 rounded-lg">
            <Link2 size={18} />
          </span>
        </div>

        <div className="space-y-4 flex-1">
          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1.5 uppercase tracking-wider">
              Article or Page Title
            </label>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full h-11 px-3.5 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-neutral-900 text-sm font-medium"
              placeholder="e.g. 10 Best SEO Practices"
            />
          </div>

          <div className="space-y-2.5 bg-neutral-50 p-4 rounded-xl border border-neutral-200/60">
            <p className="text-xs font-bold uppercase tracking-wider text-neutral-600">Delimiter</p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setSeparator("-")}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold border transition-all ${
                  separator === "-"
                    ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                    : "bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-100"
                }`}
              >
                Hyphen (-)
              </button>
              <button
                type="button"
                onClick={() => setSeparator("_")}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold border transition-all ${
                  separator === "_"
                    ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                    : "bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-100"
                }`}
              >
                Underscore (_)
              </button>
            </div>

            <div className="pt-2 border-t border-neutral-200/60 flex items-center justify-between text-xs font-semibold text-neutral-700">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={lowercase}
                  onChange={(e) => setLowercase(e.target.checked)}
                  className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
                />
                Force Lowercase
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={stripNumbers}
                  onChange={(e) => setStripNumbers(e.target.checked)}
                  className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
                />
                Strip Numbers
              </label>
            </div>
          </div>
        </div>

        <p className="text-[11px] text-neutral-400 pt-2 border-t border-neutral-100">
          Clean slugs ensure higher click-through rates on search results.
        </p>
      </div>

      {/* Output Side */}
      <div className="bg-white p-6 sm:p-7 rounded-2xl border border-neutral-200/90 shadow-xs flex flex-col justify-between space-y-4">
        <div className="border-b border-neutral-100 pb-3 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-neutral-900">Permalink Preview</h2>
            <p className="text-xs text-neutral-500">Google-safe slug output</p>
          </div>
          <span className="p-2 bg-neutral-100 text-neutral-700 rounded-lg">
            <Sparkles size={18} />
          </span>
        </div>

        <div className="flex-1 flex flex-col justify-center space-y-4">
          <div className="bg-neutral-950 p-5 rounded-xl border border-neutral-800 shadow-inner">
            <p className="text-xs text-neutral-400 font-mono mb-2 uppercase tracking-wider">Formatted URL Slug:</p>
            <div className="font-mono text-sm sm:text-base text-emerald-400 break-all select-all font-semibold">
              {slug || "slug-output"}
            </div>
          </div>

          <div className="text-xs text-neutral-500 bg-neutral-50 p-3 rounded-xl border border-neutral-100 font-mono">
            https://yourdomain.com/blog/<span className="text-blue-600 font-bold">{slug || "slug-output"}</span>
          </div>
        </div>

        <button
          onClick={handleCopy}
          className="h-11 px-5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md shadow-blue-600/20"
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
          {copied ? "Copied!" : "Copy Clean Slug"}
        </button>
      </div>
    </div>
  );
}

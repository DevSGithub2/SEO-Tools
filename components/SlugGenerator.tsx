"use client";

import React, { useState } from "react";
import { Copy, Check, Hash } from "lucide-react";

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
    <div className="max-w-3xl mx-auto bg-white p-6 sm:p-8 rounded-xl border border-gray-200 shadow-sm space-y-6">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Article / Page Title</label>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="e.g. 10 Tips for Better SEO Ranking"
          className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 text-sm"
        />
      </div>

      <div className="flex items-center gap-4 text-sm font-medium text-gray-700">
        <span>Separator:</span>
        <label className="flex items-center gap-1.5 cursor-pointer">
          <input
            type="radio"
            name="sep"
            checked={separator === "-"}
            onChange={() => setSeparator("-")}
            className="text-blue-600 focus:ring-blue-500"
          />
          Dash (-)
        </label>
        <label className="flex items-center gap-1.5 cursor-pointer">
          <input
            type="radio"
            name="sep"
            checked={separator === "_"}
            onChange={() => setSeparator("_")}
            className="text-blue-600 focus:ring-blue-500"
          />
          Underscore (_)
        </label>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Generated URL Slug</label>
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-gray-50 px-4 py-2.5 border rounded-lg font-mono text-sm text-blue-700 break-all select-all">
            {slug || "slug-output-here"}
          </div>
          <button
            onClick={handleCopy}
            className="px-4 py-2.5 bg-gray-900 hover:bg-gray-800 text-white rounded-lg text-sm font-medium flex items-center gap-1.5 transition-colors"
          >
            {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      </div>
    </div>
  );
}

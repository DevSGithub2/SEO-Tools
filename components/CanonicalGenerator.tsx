"use client";

import React, { useState } from "react";
import { Copy, Check } from "lucide-react";

export default function CanonicalGenerator() {
  const [rawUrl, setRawUrl] = useState("https://example.com/store/item?sessionid=312&utm_source=email");
  const [stripQueries, setStripQueries] = useState(true);
  const [forceHttps, setForceHttps] = useState(true);
  const [removeTrailingSlash, setRemoveTrailingSlash] = useState(true);
  const [copied, setCopied] = useState(false);

  const cleanUrl = () => {
    try {
      let formatted = rawUrl.trim();
      if (!formatted) return "";
      if (!formatted.startsWith("http://") && !formatted.startsWith("https://")) {
        formatted = "https://" + formatted;
      }
      const urlObj = new URL(formatted);
      if (forceHttps) urlObj.protocol = "https:";
      if (stripQueries) urlObj.search = "";
      let output = urlObj.toString();
      if (removeTrailingSlash && output.endsWith("/") && output !== "https://") {
        output = output.slice(0, -1);
      }
      return output;
    } catch {
      return "";
    }
  };

  const canonicalUrl = cleanUrl();
  const canonicalTag = `<link rel="canonical" href="${canonicalUrl}" />`;

  const handleCopy = async () => {
    if (canonicalTag) {
      await navigator.clipboard.writeText(canonicalTag);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-5">
      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1">Target Page URL</label>
        <input
          type="text"
          value={rawUrl}
          onChange={(e) => setRawUrl(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg text-sm text-gray-900"
          placeholder="https://example.com/page?ref=abc"
        />
      </div>

      <div className="flex flex-wrap gap-4 text-xs font-medium text-gray-700">
        <label className="flex items-center gap-1.5 cursor-pointer">
          <input
            type="checkbox"
            checked={stripQueries}
            onChange={(e) => setStripQueries(e.target.checked)}
            className="rounded text-blue-600 focus:ring-blue-500"
          />
          Strip Query Strings (UTM, session IDs)
        </label>
        <label className="flex items-center gap-1.5 cursor-pointer">
          <input
            type="checkbox"
            checked={forceHttps}
            onChange={(e) => setForceHttps(e.target.checked)}
            className="rounded text-blue-600 focus:ring-blue-500"
          />
          Force HTTPS
        </label>
        <label className="flex items-center gap-1.5 cursor-pointer">
          <input
            type="checkbox"
            checked={removeTrailingSlash}
            onChange={(e) => setRemoveTrailingSlash(e.target.checked)}
            className="rounded text-blue-600 focus:ring-blue-500"
          />
          Remove Trailing Slash
        </label>
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-2">Canonical HTML Tag</label>
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-gray-50 px-4 py-2.5 border rounded-lg font-mono text-xs text-blue-700 break-all select-all">
            {canonicalTag}
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

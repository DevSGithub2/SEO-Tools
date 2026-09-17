"use client";

import React, { useState } from "react";
import { Copy, Check, CheckCheck, Code } from "lucide-react";

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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full max-w-5xl mx-auto items-stretch">
      {/* Settings Column */}
      <div className="bg-white p-6 sm:p-7 rounded-2xl border border-neutral-200/90 shadow-xs flex flex-col justify-between space-y-4">
        <div className="border-b border-neutral-100 pb-3 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-neutral-900">Canonical Rules</h2>
            <p className="text-xs text-neutral-500">Sanitize links to prevent duplicate penalties</p>
          </div>
          <span className="p-2 bg-blue-50 text-blue-600 rounded-lg">
            <CheckCheck size={18} />
          </span>
        </div>

        <div className="space-y-4 flex-1">
          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1.5 uppercase tracking-wider">
              Source Page URL
            </label>
            <input
              type="text"
              value={rawUrl}
              onChange={(e) => setRawUrl(e.target.value)}
              className="w-full h-11 px-3.5 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-neutral-900 text-sm font-medium"
              placeholder="https://example.com/page?ref=123"
            />
          </div>

          <div className="space-y-2.5 bg-neutral-50 p-4 rounded-xl border border-neutral-200/60">
            <p className="text-xs font-bold uppercase tracking-wider text-neutral-600">URL Normalization</p>
            <label className="flex items-center gap-2.5 cursor-pointer text-xs font-semibold text-neutral-700">
              <input
                type="checkbox"
                checked={stripQueries}
                onChange={(e) => setStripQueries(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
              />
              Strip parameters (?utm, session IDs)
            </label>
            <label className="flex items-center gap-2.5 cursor-pointer text-xs font-semibold text-neutral-700">
              <input
                type="checkbox"
                checked={forceHttps}
                onChange={(e) => setForceHttps(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
              />
              Enforce secure HTTPS protocol
            </label>
            <label className="flex items-center gap-2.5 cursor-pointer text-xs font-semibold text-neutral-700">
              <input
                type="checkbox"
                checked={removeTrailingSlash}
                onChange={(e) => setRemoveTrailingSlash(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
              />
              Strip unnecessary trailing slash
            </label>
          </div>
        </div>

        <p className="text-[11px] text-neutral-400 pt-2 border-t border-neutral-100">
          Place the canonical tag inside the &lt;head&gt; element of your HTML.
        </p>
      </div>

      {/* Output Column */}
      <div className="bg-white p-6 sm:p-7 rounded-2xl border border-neutral-200/90 shadow-xs flex flex-col justify-between space-y-4">
        <div className="border-b border-neutral-100 pb-3 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-neutral-900">HTML Output</h2>
            <p className="text-xs text-neutral-500">Ready to paste into your website head</p>
          </div>
          <span className="p-2 bg-neutral-100 text-neutral-700 rounded-lg">
            <Code size={18} />
          </span>
        </div>

        <div className="flex-1 flex flex-col justify-center space-y-4">
          <div className="bg-neutral-950 p-5 rounded-xl border border-neutral-800 shadow-inner">
            <p className="text-xs text-neutral-400 font-mono mb-2 uppercase tracking-wider">Normalized Target:</p>
            <p className="text-xs text-neutral-300 font-mono mb-3 truncate">{canonicalUrl || "—"}</p>
            <p className="text-xs text-neutral-400 font-mono mb-1 uppercase tracking-wider">Canonical Meta Tag:</p>
            <div className="font-mono text-xs sm:text-sm text-emerald-400 break-all leading-relaxed select-all">
              {canonicalTag}
            </div>
          </div>
        </div>

        <button
          onClick={handleCopy}
          className="h-11 px-5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md shadow-blue-600/20"
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
          {copied ? "Copied Tag!" : "Copy Canonical Tag"}
        </button>
      </div>
    </div>
  );
}

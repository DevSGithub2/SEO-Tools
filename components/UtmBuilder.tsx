"use client";

import React, { useState } from "react";
import { Copy, Check } from "lucide-react";

export default function UtmBuilder() {
  const [url, setUrl] = useState("https://example.com/pricing");
  const [source, setSource] = useState("newsletter");
  const [medium, setMedium] = useState("email");
  const [campaign, setCampaign] = useState("summer_sale");
  const [term, setTerm] = useState("");
  const [content, setContent] = useState("hero_cta");
  const [copied, setCopied] = useState(false);

  const buildUrl = () => {
    try {
      if (!url) return "";
      const base = new URL(url.startsWith("http") ? url : `https://${url}`);
      if (source) base.searchParams.set("utm_source", source);
      if (medium) base.searchParams.set("utm_medium", medium);
      if (campaign) base.searchParams.set("utm_campaign", campaign);
      if (term) base.searchParams.set("utm_term", term);
      if (content) base.searchParams.set("utm_content", content);
      return base.toString();
    } catch {
      return "Invalid Base URL";
    }
  };

  const finalUrl = buildUrl();

  const handleCopy = async () => {
    if (finalUrl && finalUrl !== "Invalid Base URL") {
      await navigator.clipboard.writeText(finalUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className="block text-xs font-semibold text-gray-700 mb-1">Target Website URL *</label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg text-sm text-gray-900"
            placeholder="https://example.com"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">Campaign Source (utm_source) *</label>
          <input
            type="text"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg text-sm text-gray-900"
            placeholder="google, newsletter, twitter"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">Campaign Medium (utm_medium) *</label>
          <input
            type="text"
            value={medium}
            onChange={(e) => setMedium(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg text-sm text-gray-900"
            placeholder="cpc, banner, email"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">Campaign Name (utm_campaign)</label>
          <input
            type="text"
            value={campaign}
            onChange={(e) => setCampaign(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg text-sm text-gray-900"
            placeholder="spring_sale"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">Campaign Content (utm_content)</label>
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg text-sm text-gray-900"
            placeholder="logolink, textlink"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-2">Generated Tracking URL</label>
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-gray-50 px-4 py-2.5 border rounded-lg font-mono text-xs text-blue-700 break-all select-all">
            {finalUrl}
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

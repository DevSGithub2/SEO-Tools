"use client";

import React, { useState } from "react";
import { Copy, Check, Target, Link2 } from "lucide-react";

export default function UtmBuilder() {
  const [url, setUrl] = useState("https://example.com/pricing");
  const [source, setSource] = useState("google");
  const [medium, setMedium] = useState("cpc");
  const [campaign, setCampaign] = useState("summer_launch");
  const [term, setTerm] = useState("best-seo-tools");
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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full max-w-5xl mx-auto items-stretch">
      {/* Parameter Inputs */}
      <div className="bg-white p-6 sm:p-7 rounded-2xl border border-neutral-200/90 shadow-xs flex flex-col justify-between space-y-4">
        <div className="border-b border-neutral-100 pb-3 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-neutral-900">Campaign Parameters</h2>
            <p className="text-xs text-neutral-500">Configure UTM tracking values</p>
          </div>
          <span className="p-2 bg-blue-50 text-blue-600 rounded-lg">
            <Target size={18} />
          </span>
        </div>

        <div className="space-y-3 flex-1">
          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1 uppercase tracking-wider">Website URL *</label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full h-10 px-3 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-neutral-900 text-sm font-medium"
              placeholder="https://example.com"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1 uppercase tracking-wider">Source (utm_source) *</label>
              <input
                type="text"
                value={source}
                onChange={(e) => setSource(e.target.value)}
                className="w-full h-10 px-3 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-neutral-900 text-sm font-medium"
                placeholder="google, twitter"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1 uppercase tracking-wider">Medium (utm_medium) *</label>
              <input
                type="text"
                value={medium}
                onChange={(e) => setMedium(e.target.value)}
                className="w-full h-10 px-3 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-neutral-900 text-sm font-medium"
                placeholder="cpc, banner, email"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1 uppercase tracking-wider">Campaign (utm_campaign)</label>
            <input
              type="text"
              value={campaign}
              onChange={(e) => setCampaign(e.target.value)}
              className="w-full h-10 px-3 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-neutral-900 text-sm font-medium"
              placeholder="launch_promo"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1 uppercase tracking-wider">Term (utm_term)</label>
              <input
                type="text"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                className="w-full h-10 px-3 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-neutral-900 text-sm font-medium"
                placeholder="keyword"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1 uppercase tracking-wider">Content (utm_content)</label>
              <input
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full h-10 px-3 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-neutral-900 text-sm font-medium"
                placeholder="cta_button"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Generated Result Card */}
      <div className="bg-white p-6 sm:p-7 rounded-2xl border border-neutral-200/90 shadow-xs flex flex-col justify-between space-y-4">
        <div className="border-b border-neutral-100 pb-3 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-neutral-900">Generated URL</h2>
            <p className="text-xs text-neutral-500">Ready for Google Analytics tracking</p>
          </div>
          <span className="p-2 bg-neutral-100 text-neutral-700 rounded-lg">
            <Link2 size={18} />
          </span>
        </div>

        <div className="flex-1 flex flex-col justify-center space-y-4">
          <div className="bg-neutral-950 p-5 rounded-xl border border-neutral-800 shadow-inner">
            <p className="text-xs text-neutral-400 font-mono mb-2 uppercase tracking-wider">Full Tracking Link:</p>
            <div className="font-mono text-xs sm:text-sm text-emerald-400 break-all leading-relaxed select-all">
              {finalUrl}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs text-neutral-500 bg-neutral-50 p-3 rounded-xl border border-neutral-100">
            <div><strong>Source:</strong> {source || "—"}</div>
            <div><strong>Medium:</strong> {medium || "—"}</div>
            <div><strong>Campaign:</strong> {campaign || "—"}</div>
            <div><strong>Content:</strong> {content || "—"}</div>
          </div>
        </div>

        <button
          onClick={handleCopy}
          className="h-11 px-5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md shadow-blue-600/20"
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
          {copied ? "Copied to Clipboard!" : "Copy Tracking URL"}
        </button>
      </div>
    </div>
  );
}

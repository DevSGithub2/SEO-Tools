"use client";

import React, { useState } from "react";
import { Copy, Check, Download, FileCode } from "lucide-react";

export default function SitemapGenerator() {
  const [urls, setUrls] = useState(
    "https://example.com/\nhttps://example.com/about\nhttps://example.com/pricing\nhttps://example.com/blog\nhttps://example.com/contact"
  );
  const [frequency, setFrequency] = useState("weekly");
  const [priority, setPriority] = useState("0.8");
  const [copied, setCopied] = useState(false);

  const generateSitemap = () => {
    const lines = urls.split("\n").map((u) => u.trim()).filter((u) => u.length > 0);
    const date = new Date().toISOString().split("T")[0];
    
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
    lines.forEach((url) => {
      xml += `  <url>\n    <loc>${url}</loc>\n    <lastmod>${date}</lastmod>\n    <changefreq>${frequency}</changefreq>\n    <priority>${priority}</priority>\n  </url>\n`;
    });
    xml += `</urlset>`;
    return xml;
  };

  const xmlOutput = generateSitemap();

  const handleCopy = async () => {
    await navigator.clipboard.writeText(xmlOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([xmlOutput], { type: "application/xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sitemap.xml";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full max-w-5xl mx-auto items-stretch">
      {/* Input Side */}
      <div className="bg-white p-6 sm:p-7 rounded-2xl border border-neutral-200/90 shadow-xs flex flex-col justify-between space-y-4">
        <div className="border-b border-neutral-100 pb-3 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-neutral-900">URL List Setup</h2>
            <p className="text-xs text-neutral-500">Enter links to include in search index</p>
          </div>
          <span className="p-2 bg-blue-50 text-blue-600 rounded-lg">
            <FileCode size={18} />
          </span>
        </div>

        <div className="space-y-3.5 flex-1">
          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1.5 uppercase tracking-wider">
              Website URLs (1 URL per line)
            </label>
            <textarea
              rows={6}
              value={urls}
              onChange={(e) => setUrls(e.target.value)}
              className="w-full p-3 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-neutral-900 text-xs sm:text-sm font-mono leading-relaxed"
              placeholder="https://example.com/page-1"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1.5 uppercase tracking-wider">Change Frequency</label>
              <select
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                className="w-full h-11 px-3 border border-neutral-300 rounded-xl text-xs sm:text-sm font-semibold text-neutral-900 bg-white"
              >
                <option value="always">Always</option>
                <option value="hourly">Hourly</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1.5 uppercase tracking-wider">Priority Level</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full h-11 px-3 border border-neutral-300 rounded-xl text-xs sm:text-sm font-semibold text-neutral-900 bg-white"
              >
                <option value="1.0">1.0 (Homepage)</option>
                <option value="0.8">0.8 (Important)</option>
                <option value="0.5">0.5 (Standard)</option>
                <option value="0.3">0.3 (Archive)</option>
              </select>
            </div>
          </div>
        </div>

        <p className="text-[11px] text-neutral-400 pt-2 border-t border-neutral-100">
          Upload sitemap.xml to your domain root and submit in Google Search Console.
        </p>
      </div>

      {/* XML Code Side */}
      <div className="bg-white p-6 sm:p-7 rounded-2xl border border-neutral-200/90 shadow-xs flex flex-col justify-between space-y-4">
        <div className="border-b border-neutral-100 pb-3 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-neutral-900">Generated XML</h2>
            <p className="text-xs text-neutral-500">Compliant sitemap schema format</p>
          </div>
          <span className="p-2 bg-neutral-100 text-neutral-700 rounded-lg font-mono text-xs font-bold">
            sitemap.xml
          </span>
        </div>

        <div className="flex-1 flex flex-col">
          <div className="flex-1 bg-neutral-950 p-4 rounded-xl border border-neutral-800 flex flex-col overflow-hidden shadow-inner min-h-[220px]">
            <div className="flex items-center gap-2 pb-2 mb-2 border-b border-neutral-800 text-[11px] text-neutral-400 font-mono">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
              <span className="ml-2">application/xml</span>
            </div>
            <pre className="font-mono text-xs text-emerald-400 leading-relaxed overflow-x-auto whitespace-pre flex-1 max-h-[260px]">
              {xmlOutput}
            </pre>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={handleCopy}
            className="h-11 px-4 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md shadow-blue-600/20"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? "Copied!" : "Copy XML"}
          </button>
          <button
            onClick={handleDownload}
            className="h-11 px-4 bg-neutral-900 hover:bg-neutral-800 active:scale-95 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all"
          >
            <Download size={16} /> Download .xml
          </button>
        </div>
      </div>
    </div>
  );
}

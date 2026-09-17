"use client";

import React, { useState } from "react";
import { Copy, Check, Download } from "lucide-react";

export default function SitemapGenerator() {
  const [urls, setUrls] = useState("https://example.com/\nhttps://example.com/about\nhttps://example.com/pricing\nhttps://example.com/blog");
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
    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-gray-900">Sitemap URLs</h2>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">URLs (one per line)</label>
          <textarea
            rows={7}
            value={urls}
            onChange={(e) => setUrls(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg text-sm text-gray-900 font-mono"
            placeholder="https://example.com/page-1"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Change Frequency</label>
            <select
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-sm text-gray-900"
            >
              <option value="always">always</option>
              <option value="hourly">hourly</option>
              <option value="daily">daily</option>
              <option value="weekly">weekly</option>
              <option value="monthly">monthly</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-sm text-gray-900"
            >
              <option value="1.0">1.0 (Highest)</option>
              <option value="0.8">0.8</option>
              <option value="0.5">0.5 (Default)</option>
              <option value="0.3">0.3</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-3">Generated sitemap.xml</h2>
          <pre className="p-4 bg-gray-900 text-emerald-400 font-mono text-xs rounded-lg overflow-x-auto max-h-64 whitespace-pre">
            {xmlOutput}
          </pre>
        </div>
        <div className="flex gap-3 mt-4">
          <button
            onClick={handleCopy}
            className="flex-1 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium flex items-center justify-center gap-2"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? "Copied" : "Copy XML"}
          </button>
          <button
            onClick={handleDownload}
            className="flex-1 py-2 px-4 bg-gray-900 hover:bg-gray-800 text-white rounded-lg text-sm font-medium flex items-center justify-center gap-2"
          >
            <Download size={16} /> Download
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import ToolAiAssistant from "@/components/ToolAiAssistant";
import { Bot, Copy, Check } from "lucide-react";

export default function RobotsTxtPage() {
  const [sitemap, setSitemap] = useState("https://fastseokit.vercel.app/sitemap.xml");
  const [disallowedPaths, setDisallowedPaths] = useState("/api/\n/admin/\n/dashboard/");
  const [copied, setCopied] = useState(false);

  const generatedRobots = `User-agent: *\n${disallowedPaths
    .split("\n")
    .filter((p) => p.trim())
    .map((p) => `Disallow: ${p.trim()}`)
    .join("\n")}\n\nSitemap: ${sitemap}`;

  const copyRobots = async () => {
    await navigator.clipboard.writeText(generatedRobots);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      <div>
        <div className="flex items-center gap-2 mb-1 text-teal-600 dark:text-teal-400 text-xs font-bold uppercase tracking-wider">
          <Bot size={14} />
          <span>Crawl Directives</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white">
          Robots.txt Builder
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500">
          Generate compliant crawler directives for Googlebot, Bingbot, and search engine spiders.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white dark:bg-neutral-900/90 p-5 sm:p-6 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 shadow-xs">
        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 block mb-1.5">
              Sitemap URL
            </label>
            <input
              type="text"
              value={sitemap}
              onChange={(e) => setSitemap(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 block mb-1.5">
              Disallowed Paths (one per line)
            </label>
            <textarea
              rows={4}
              value={disallowedPaths}
              onChange={(e) => setDisallowedPaths(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm font-mono rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 resize-none"
            />
          </div>
        </div>

        {/* Output code block */}
        <div className="flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Output File</span>
            <button
              onClick={copyRobots}
              className="flex items-center gap-1 text-[11px] font-medium px-2 py-1 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 transition-colors"
            >
              {copied ? <Check size={11} className="text-teal-500" /> : <Copy size={11} />}
              <span>{copied ? "Copied" : "Copy"}</span>
            </button>
          </div>
          <pre className="flex-1 p-3.5 rounded-xl bg-neutral-950 text-teal-400 font-mono text-xs border border-neutral-800 overflow-x-auto whitespace-pre">
            {generatedRobots}
          </pre>
        </div>
      </div>

      {/* Embedded In-Tool AI Copilot */}
      <ToolAiAssistant
        toolName="Robots.txt"
        contextData={generatedRobots}
        placeholder="Ask AI to audit directives, block AI scrapers, or fix crawl traps..."
        suggestedPrompts={[
          "Add rules to block GPTBot, CCBot, and common AI scrapers",
          "Audit these directives for accidental indexing blocks",
          "Explain how Googlebot handles trailing wildcards here",
        ]}
      />
    </div>
  );
}

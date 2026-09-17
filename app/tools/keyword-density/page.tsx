"use client";

import React, { useState, useMemo } from "react";
import ToolAiAssistant from "@/components/ToolAiAssistant";
import { BarChart2 } from "lucide-react";

export default function KeywordDensityPage() {
  const [text, setText] = useState(
    "FastSEOKit provides high speed browser tools for search engine optimization. Search optimization requires clean metadata, fast loading times, and high quality content."
  );

  const stats = useMemo(() => {
    const cleanText = text.toLowerCase().replace(/[^a-zA-Z0-9\s]/g, "");
    const words = cleanText.split(/\s+/).filter((w) => w.length > 2);
    const totalWords = words.length;

    const freq: Record<string, number> = {};
    words.forEach((w) => {
      freq[w] = (freq[w] || 0) + 1;
    });

    const sorted = Object.entries(freq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([word, count]) => ({
        word,
        count,
        density: totalWords > 0 ? ((count / totalWords) * 100).toFixed(1) : "0",
      }));

    return { totalWords, chars: text.length, topKeywords: sorted };
  }, [text]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      <div>
        <div className="flex items-center gap-2 mb-1 text-rose-600 dark:text-rose-400 text-xs font-bold uppercase tracking-wider">
          <BarChart2 size={14} />
          <span>Content Frequency</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white">
          Keyword Density Analyzer
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500">
          Inspect word ratios and prevent keyword stuffing penalties in landing copy.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 bg-white dark:bg-neutral-900/90 p-5 sm:p-6 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 shadow-xs">
        <div>
          <div className="flex justify-between text-xs font-semibold mb-1.5 text-neutral-700 dark:text-neutral-300">
            <label>Input Content</label>
            <span className="text-neutral-400">{stats.totalWords} words | {stats.chars} characters</span>
          </div>
          <textarea
            rows={5}
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500/20 resize-none"
          />
        </div>

        <div>
          <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider block mb-2">Top Keywords</span>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {stats.topKeywords.map((k) => (
              <div key={k.word} className="p-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/60 dark:border-neutral-700/60 text-xs flex justify-between items-center">
                <span className="font-semibold text-neutral-800 dark:text-neutral-200 truncate">{k.word}</span>
                <span className="text-neutral-400 font-mono text-[11px]">{k.density}% ({k.count})</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Embedded In-Tool AI Copilot */}
      <ToolAiAssistant
        toolName="Keyword Density"
        contextData={`Total words: ${stats.totalWords}\nTop keywords: ${JSON.stringify(stats.topKeywords)}\nRaw text:\n${text}`}
        placeholder="Ask AI to rewrite for natural density or recommend semantic LSI terms..."
        suggestedPrompts={[
          "Identify potential keyword stuffing issues in this copy",
          "Suggest 5 high-relevance semantic LSI keywords to weave in",
          "Rewrite this paragraph to improve readability while maintaining keyword density",
        ]}
      />
    </div>
  );
}

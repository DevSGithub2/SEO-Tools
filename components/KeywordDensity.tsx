"use client";

import React, { useState } from "react";
import { BarChart3, Clock, Type, FileText } from "lucide-react";

export default function KeywordDensity() {
  const [text, setText] = useState(
    "Search engine optimization is critical for discovering organic audiences online. Good search rankings require clear meta data, well-structured content, and relevant keywords. SEO strategies ensure your website is indexed properly and visible to users searching for relevant solutions."
  );

  const words = text
    .toLowerCase()
    .match(/\b[a-z0-9]+(?:'[a-z0-9]+)?\b/g) || [];
  
  const wordCount = words.length;
  const charCount = text.length;
  const charCountNoSpaces = text.replace(/\s+/g, "").length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  const freqMap: { [key: string]: number } = {};
  words.forEach((w) => {
    if (w.length > 2) {
      freqMap[w] = (freqMap[w] || 0) + 1;
    }
  });

  const sortedKeywords = Object.entries(freqMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* 4 Balanced Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-neutral-200/90 shadow-xs flex items-center gap-3.5">
          <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
            <FileText size={20} />
          </div>
          <div>
            <p className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">Words</p>
            <p className="text-xl sm:text-2xl font-black text-neutral-900">{wordCount}</p>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-neutral-200/90 shadow-xs flex items-center gap-3.5">
          <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
            <Type size={20} />
          </div>
          <div>
            <p className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">Characters</p>
            <p className="text-xl sm:text-2xl font-black text-neutral-900">{charCount}</p>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-neutral-200/90 shadow-xs flex items-center gap-3.5">
          <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
            <BarChart3 size={20} />
          </div>
          <div>
            <p className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">No Spaces</p>
            <p className="text-xl sm:text-2xl font-black text-neutral-900">{charCountNoSpaces}</p>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-neutral-200/90 shadow-xs flex items-center gap-3.5">
          <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl">
            <Clock size={20} />
          </div>
          <div>
            <p className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">Read Time</p>
            <p className="text-xl sm:text-2xl font-black text-neutral-900">~{readingTime} min</p>
          </div>
        </div>
      </div>

      {/* Editor & Keywords Side-by-Side with Equal Heights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        <div className="lg:col-span-2 bg-white p-6 sm:p-7 rounded-2xl border border-neutral-200/90 shadow-xs flex flex-col justify-between space-y-4">
          <div className="border-b border-neutral-100 pb-3">
            <h2 className="text-base font-bold text-neutral-900">Content Editor</h2>
            <p className="text-xs text-neutral-500">Paste your draft or blog text below</p>
          </div>

          <textarea
            rows={10}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type or paste your text here..."
            className="w-full flex-1 min-h-[220px] p-4 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-neutral-900 text-sm leading-relaxed"
          />

          <div className="flex justify-between items-center text-xs text-neutral-400 pt-2 border-t border-neutral-100">
            <span>Ideal keyword density is between 1% to 2.5%</span>
            <button
              onClick={() => setText("")}
              className="text-neutral-500 hover:text-rose-600 font-semibold"
            >
              Clear Text
            </button>
          </div>
        </div>

        {/* Top Keywords Card */}
        <div className="bg-white p-6 sm:p-7 rounded-2xl border border-neutral-200/90 shadow-xs flex flex-col justify-between space-y-4">
          <div className="border-b border-neutral-100 pb-3">
            <h3 className="text-base font-bold text-neutral-900">Keyword Density</h3>
            <p className="text-xs text-neutral-500">Top repeated words</p>
          </div>

          <div className="space-y-3 flex-1 flex flex-col justify-center">
            {sortedKeywords.length === 0 ? (
              <p className="text-xs text-neutral-400 text-center py-8">Start typing to calculate density.</p>
            ) : (
              sortedKeywords.map(([word, count]) => {
                const density = wordCount > 0 ? ((count / wordCount) * 100).toFixed(1) : "0";
                return (
                  <div key={word} className="space-y-1 bg-neutral-50 p-2.5 rounded-xl border border-neutral-100">
                    <div className="flex justify-between items-center text-xs font-semibold text-neutral-800">
                      <span className="font-mono">{word}</span>
                      <span className="text-neutral-500">{count}x ({density}%)</span>
                    </div>
                    <div className="w-full h-1.5 bg-neutral-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-600 rounded-full transition-all"
                        style={{ width: `${Math.min(100, Number(density) * 10)}%` }}
                      />
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <p className="text-[11px] text-neutral-400 pt-2 border-t border-neutral-100 text-center">
            Filtering common stop words (length &gt; 2).
          </p>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";

export default function KeywordDensity() {
  const [text, setText] = useState("");

  const words = text
    .toLowerCase()
    .match(/\b[a-z0-9]+(?:'[a-z0-9]+)?\b/g) || [];
  
  const wordCount = words.length;
  const charCount = text.length;
  const charCountNoSpaces = text.replace(/\s+/g, "").length;
  const readingTime = Math.ceil(wordCount / 200);

  const freqMap: { [key: string]: number } = {};
  words.forEach((w) => {
    if (w.length > 2) {
      freqMap[w] = (freqMap[w] || 0) + 1;
    }
  });

  const sortedKeywords = Object.entries(freqMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Metric Counters */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-200 text-center shadow-sm">
          <p className="text-xs text-gray-500 font-semibold uppercase">Words</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{wordCount}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 text-center shadow-sm">
          <p className="text-xs text-gray-500 font-semibold uppercase">Characters</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{charCount}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 text-center shadow-sm">
          <p className="text-xs text-gray-500 font-semibold uppercase">No Spaces</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{charCountNoSpaces}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 text-center shadow-sm">
          <p className="text-xs text-gray-500 font-semibold uppercase">Read Time</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">~{readingTime} min</p>
        </div>
      </div>

      {/* Editor & Keywords */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Paste or Type Your Content</label>
          <textarea
            rows={10}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type or paste your text here to analyze keyword density, character limits, and reading length..."
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 text-sm"
          />
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Top Keyword Density</h3>
          {sortedKeywords.length === 0 ? (
            <p className="text-xs text-gray-400 mt-4">Start typing text to see frequent keywords and percentages.</p>
          ) : (
            <div className="space-y-3">
              {sortedKeywords.map(([word, count]) => {
                const density = ((count / wordCount) * 100).toFixed(1);
                return (
                  <div key={word} className="flex justify-between items-center text-sm">
                    <span className="font-mono text-gray-800 font-medium">{word}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500 text-xs">{count}x</span>
                      <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-xs font-semibold">
                        {density}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

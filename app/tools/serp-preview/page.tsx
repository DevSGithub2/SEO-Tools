"use client";

import React, { useState } from "react";
import ToolAiAssistant from "@/components/ToolAiAssistant";
import { Eye, Globe, Smartphone, Monitor } from "lucide-react";

export default function SerpPreviewPage() {
  const [title, setTitle] = useState("FastSEOKit - High-Speed SEO Utility Suite");
  const [description, setDescription] = useState(
    "Free, client-side browser utilities for creators and developers to validate metadata, OpenGraph tags, and crawl directives instantly."
  );
  const [url, setUrl] = useState("https://fastseokit.vercel.app");
  const [mode, setMode] = useState<"desktop" | "mobile">("desktop");

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      <div>
        <div className="flex items-center gap-2 mb-1 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
          <Eye size={14} />
          <span>Search Preview</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white">
          Google SERP Simulator
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500">
          Preview how your organic snippet renders across Google desktop and mobile feeds.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 bg-white dark:bg-neutral-900/90 p-5 sm:p-6 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 shadow-xs">
        {/* Form Inputs */}
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-xs font-semibold mb-1.5 text-neutral-700 dark:text-neutral-300">
              <label>Page Title</label>
              <span className={title.length > 60 ? "text-amber-500 font-bold" : "text-neutral-400"}>
                {title.length}/60 chars
              </span>
            </div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold mb-1.5 text-neutral-700 dark:text-neutral-300">
              <label>Target URL</label>
            </div>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold mb-1.5 text-neutral-700 dark:text-neutral-300">
              <label>Meta Description</label>
              <span className={description.length > 160 ? "text-amber-500 font-bold" : "text-neutral-400"}>
                {description.length}/160 chars
              </span>
            </div>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 resize-none"
            />
          </div>
        </div>

        {/* Live Simulator Card */}
        <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Live Preview</span>
            <div className="flex gap-1 bg-neutral-100 dark:bg-neutral-800 p-1 rounded-lg text-xs">
              <button
                onClick={() => setMode("desktop")}
                className={`p-1.5 rounded-md flex items-center gap-1 font-medium transition-all ${
                  mode === "desktop" ? "bg-white dark:bg-neutral-700 shadow-xs text-neutral-900 dark:text-white" : "text-neutral-500"
                }`}
              >
                <Monitor size={13} />
                <span>Desktop</span>
              </button>
              <button
                onClick={() => setMode("mobile")}
                className={`p-1.5 rounded-md flex items-center gap-1 font-medium transition-all ${
                  mode === "mobile" ? "bg-white dark:bg-neutral-700 shadow-xs text-neutral-900 dark:text-white" : "text-neutral-500"
                }`}
              >
                <Smartphone size={13} />
                <span>Mobile</span>
              </button>
            </div>
          </div>

          <div className={`p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#1a1f2c] ${mode === "mobile" ? "max-w-sm" : "w-full"}`}>
            <div className="flex items-center gap-2 mb-1 text-[11px] text-neutral-500 dark:text-neutral-400">
              <Globe size={12} />
              <span className="truncate">{url}</span>
            </div>
            <h2 className="text-[#1a0dab] dark:text-[#8ab4f8] text-base hover:underline cursor-pointer font-medium leading-snug break-words">
              {title || "Untitle Page"}
            </h2>
            <p className="text-xs text-[#4d5156] dark:text-[#bdc1c6] mt-1 leading-normal break-words">
              {description || "Provide a meta description to simulate the search snippet..."}
            </p>
          </div>
        </div>
      </div>

      {/* Embedded In-Tool AI Copilot */}
      <ToolAiAssistant
        toolName="SERP Preview"
        contextData={`Title (${title.length}/60): ${title}\nDescription (${description.length}/160): ${description}\nTarget URL: ${url}`}
        placeholder="Ask AI to optimize CTR, rewrite description, or score this snippet..."
        suggestedPrompts={[
          "Rewrite title to maximize organic CTR within 60 characters",
          "Draft 3 punchy meta descriptions with strong call-to-actions",
          "Audit this snippet for truncation risk on mobile devices",
        ]}
      />
    </div>
  );
}

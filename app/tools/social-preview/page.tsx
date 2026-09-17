"use client";

import React, { useState } from "react";
import ToolAiAssistant from "@/components/ToolAiAssistant";
import { Share2, Image as ImageIcon } from "lucide-react";

export default function SocialPreviewPage() {
  const [title, setTitle] = useState("FastSEOKit - High-Speed SEO Utility Suite");
  const [description, setDescription] = useState("Free, client-side browser utilities for creators and developers.");
  const [imageUrl, setImageUrl] = useState("https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&h=630&fit=crop");
  const [domain, setDomain] = useState("fastseokit.vercel.app");

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      <div>
        <div className="flex items-center gap-2 mb-1 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider">
          <Share2 size={14} />
          <span>Social Media Meta</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white">
          Social Graph & X Card Preview
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500">
          Preview how your OpenGraph and Twitter/X summary large image tags render when shared.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 bg-white dark:bg-neutral-900/90 p-5 sm:p-6 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 shadow-xs">
        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 block mb-1.5">OG Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 block mb-1.5">OG Image URL</label>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 block mb-1.5">OG Description</label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 resize-none"
            />
          </div>
        </div>

        {/* Card Mockup */}
        <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800">
          <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider block mb-3">Twitter / X Card Preview</span>
          <div className="max-w-md rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-black text-white">
            <div className="aspect-[1.91/1] w-full bg-neutral-900 relative flex items-center justify-center overflow-hidden">
              {imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={imageUrl} alt="Card preview" className="w-full h-full object-cover" />
              ) : (
                <ImageIcon className="text-neutral-600" size={32} />
              )}
            </div>
            <div className="p-3 bg-neutral-950">
              <span className="text-[11px] text-neutral-400 block">{domain}</span>
              <h3 className="text-xs font-bold text-neutral-100 truncate mt-0.5">{title}</h3>
              <p className="text-[11px] text-neutral-400 line-clamp-2 mt-0.5 leading-snug">{description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Embedded In-Tool AI Copilot */}
      <ToolAiAssistant
        toolName="Social Graph"
        contextData={`OG Title: ${title}\nOG Description: ${description}\nDomain: ${domain}\nImage URL: ${imageUrl}`}
        placeholder="Ask AI to craft click-worthy headlines or Twitter hooks..."
        suggestedPrompts={[
          "Generate 3 viral Twitter/X hook variations for this card",
          "Write clean HTML OpenGraph tags to paste in <head>",
          "Review this copy for viral social CTR performance",
        ]}
      />
    </div>
  );
}

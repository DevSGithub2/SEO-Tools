"use client";

import React, { useState } from "react";
import { Globe, Smartphone, Monitor } from "lucide-react";

export default function SerpPreview() {
  const [title, setTitle] = useState("Best Gaming Mouse Under ₹2000");
  const [url, setUrl] = useState("https://example.com/best-gaming-mouse");
  const [description, setDescription] = useState(
    "Looking for the best gaming mouse on a budget? Check out our top-rated picks featuring high DPI sensors, RGB lighting, and durable switches."
  );
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");

  const titleLimit = 60;
  const descLimit = 160;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full max-w-5xl mx-auto">
      {/* Input Side */}
      <div className="bg-white p-6 sm:p-7 rounded-2xl border border-neutral-200 shadow-xs space-y-5">
        <div className="border-b border-neutral-100 pb-3">
          <h2 className="text-base font-bold text-neutral-900">SERP Configuration</h2>
          <p className="text-xs text-neutral-500">Live preview update as you edit</p>
        </div>

        <div>
          <div className="flex justify-between text-xs font-semibold text-neutral-700 mb-1.5">
            <label>SEO Title</label>
            <span className={title.length > titleLimit ? "text-rose-500 font-bold" : "text-neutral-400 font-mono"}>
              {title.length} / {titleLimit}
            </span>
          </div>
          <input
            type="text"
            className="w-full h-11 px-3.5 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-neutral-900 text-sm transition-all"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter SEO title..."
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-neutral-700 mb-1.5">Target Destination URL</label>
          <input
            type="text"
            className="w-full h-11 px-3.5 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-neutral-900 text-sm transition-all"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com/page"
          />
        </div>

        <div>
          <div className="flex justify-between text-xs font-semibold text-neutral-700 mb-1.5">
            <label>Meta Description</label>
            <span className={description.length > descLimit ? "text-rose-500 font-bold" : "text-neutral-400 font-mono"}>
              {description.length} / {descLimit}
            </span>
          </div>
          <textarea
            rows={4}
            className="w-full p-3.5 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-neutral-900 text-sm transition-all"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter meta description..."
          />
        </div>
      </div>

      {/* Preview Side */}
      <div className="bg-white p-6 sm:p-7 rounded-2xl border border-neutral-200 shadow-xs flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-neutral-100 mb-5">
            <div>
              <h2 className="text-base font-bold text-neutral-900">Google Result View</h2>
              <p className="text-xs text-neutral-500">Accurate search snippet rendering</p>
            </div>
            <div className="flex gap-1.5 bg-neutral-100 p-1 rounded-xl">
              <button
                onClick={() => setDevice("desktop")}
                className={`px-3 py-1.5 rounded-lg text-xs flex items-center gap-1.5 font-semibold transition-all ${
                  device === "desktop" ? "bg-white text-neutral-900 shadow-xs" : "text-neutral-500 hover:text-neutral-800"
                }`}
              >
                <Monitor size={13} /> Desktop
              </button>
              <button
                onClick={() => setDevice("mobile")}
                className={`px-3 py-1.5 rounded-lg text-xs flex items-center gap-1.5 font-semibold transition-all ${
                  device === "mobile" ? "bg-white text-neutral-900 shadow-xs" : "text-neutral-500 hover:text-neutral-800"
                }`}
              >
                <Smartphone size={13} /> Mobile
              </button>
            </div>
          </div>

          <div className="p-5 bg-neutral-50 rounded-xl border border-neutral-100 flex items-center justify-center min-h-[220px]">
            <div className={device === "mobile" ? "w-full max-w-sm bg-white p-4 rounded-xl shadow-xs border border-neutral-200/60" : "w-full"}>
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-5 h-5 rounded-full bg-neutral-200 flex items-center justify-center">
                  <Globe size={11} className="text-neutral-600" />
                </div>
                <div className="text-xs text-neutral-600 truncate font-mono">
                  {url || "https://example.com"}
                </div>
              </div>

              <h3 className="text-[#1a0dab] hover:underline cursor-pointer text-lg font-medium leading-snug line-clamp-1 mb-1">
                {title || "Default Title"}
              </h3>

              <p className="text-xs sm:text-sm text-[#4d5156] leading-relaxed line-clamp-2">
                {description || "Meta description will preview here..."}
              </p>
            </div>
          </div>
        </div>

        <div className="text-[11px] text-neutral-400 text-center">
          Google automatically truncates titles wider than 600px (~60 chars).
        </div>
      </div>
    </div>
  );
}

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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-6xl mx-auto p-4">
      {/* Input Controls */}
      <div className="space-y-5 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900">SERP Data Input</h2>

        <div>
          <div className="flex justify-between text-sm mb-1 font-medium text-gray-700">
            <label>SEO Title</label>
            <span className={title.length > titleLimit ? "text-red-500 font-semibold" : "text-gray-500"}>
              {title.length} / {titleLimit} chars
            </span>
          </div>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 text-sm"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter meta title..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Target URL</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 text-sm"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com/page"
          />
        </div>

        <div>
          <div className="flex justify-between text-sm mb-1 font-medium text-gray-700">
            <label>Meta Description</label>
            <span className={description.length > descLimit ? "text-red-500 font-semibold" : "text-gray-500"}>
              {description.length} / {descLimit} chars
            </span>
          </div>
          <textarea
            rows={4}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 text-sm"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter meta description..."
          />
        </div>
      </div>

      {/* Google Preview Display */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
          <h2 className="text-xl font-bold text-gray-900">Google Result Preview</h2>
          <div className="flex gap-2">
            <button
              onClick={() => setDevice("desktop")}
              className={`p-1.5 rounded-md text-xs flex items-center gap-1 font-medium ${
                device === "desktop" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <Monitor size={14} /> Desktop
            </button>
            <button
              onClick={() => setDevice("mobile")}
              className={`p-1.5 rounded-md text-xs flex items-center gap-1 font-medium ${
                device === "mobile" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <Smartphone size={14} /> Mobile
            </button>
          </div>
        </div>

        {/* Live Search Card */}
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-100 flex-1">
          <div className={device === "mobile" ? "max-w-sm mx-auto bg-white p-4 rounded-xl shadow-sm" : "max-w-xl"}>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center">
                <Globe size={12} className="text-gray-600" />
              </div>
              <div className="text-xs text-gray-600 leading-none overflow-hidden truncate">
                {url || "https://example.com"}
              </div>
            </div>

            <h3 className="text-[#1a0dab] hover:underline cursor-pointer text-lg font-normal leading-snug line-clamp-1 mb-1">
              {title || "Default Search Result Title"}
            </h3>

            <p className="text-sm text-[#4d5156] leading-relaxed line-clamp-2">
              {description || "Add a meta description to see how it looks directly in Google search snippets."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

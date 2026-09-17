"use client";

import React, { useState } from "react";
import { Image as ImageIcon } from "lucide-react";

export default function SocialPreview() {
  const [title, setTitle] = useState("FastSEOKit - Free High-Speed SEO Utilities");
  const [description, setDescription] = useState("Optimize your titles, meta tags, and slugs with free browser-based SEO tools built for creators and developers.");
  const [imageUrl, setImageUrl] = useState("https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=630&fit=crop");
  const [domain, setDomain] = useState("fastseokit.com");
  const [platform, setPlatform] = useState<"twitter" | "facebook">("twitter");

  return (
    <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 px-4">
      {/* Input Side */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-gray-900">Social Meta Input</h2>

        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Site Domain</label>
          <input
            type="text"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg text-sm text-gray-900"
            placeholder="example.com"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">OG / Twitter Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg text-sm text-gray-900"
            placeholder="Card headline"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Description</label>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg text-sm text-gray-900"
            placeholder="Snippet summary"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Image URL (1200x630)</label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg text-sm text-gray-900"
            placeholder="https://..."
          />
        </div>
      </div>

      {/* Preview Side */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
          <h2 className="text-lg font-bold text-gray-900">Feed Simulation</h2>
          <div className="flex gap-2">
            <button
              onClick={() => setPlatform("twitter")}
              className={`px-3 py-1.5 rounded-md text-xs flex items-center gap-1.5 font-medium transition-colors ${
                platform === "twitter" ? "bg-black text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              X / Twitter
            </button>
            <button
              onClick={() => setPlatform("facebook")}
              className={`px-3 py-1.5 rounded-md text-xs flex items-center gap-1.5 font-medium transition-colors ${
                platform === "facebook" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Facebook / OG
            </button>
          </div>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg flex-1 flex items-center justify-center">
          {platform === "twitter" ? (
            /* Twitter / X Large Card */
            <div className="w-full max-w-md bg-black rounded-2xl overflow-hidden border border-neutral-800 text-white shadow-md">
              <div className="h-44 bg-neutral-900 relative overflow-hidden flex items-center justify-center">
                {imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={imageUrl} alt="preview" className="w-full h-full object-cover" />
                ) : (
                  <ImageIcon className="text-neutral-600" size={32} />
                )}
              </div>
              <div className="p-3 bg-neutral-900/90">
                <p className="text-xs text-neutral-400 truncate">{domain || "domain.com"}</p>
                <p className="text-sm font-semibold text-neutral-100 line-clamp-1 mt-0.5">{title}</p>
                <p className="text-xs text-neutral-400 line-clamp-2 mt-1">{description}</p>
              </div>
            </div>
          ) : (
            /* Open Graph Facebook Card */
            <div className="w-full max-w-md bg-white rounded-lg overflow-hidden border border-gray-300 shadow-sm text-gray-900">
              <div className="h-44 bg-gray-100 relative overflow-hidden flex items-center justify-center">
                {imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={imageUrl} alt="preview" className="w-full h-full object-cover" />
                ) : (
                  <ImageIcon className="text-gray-400" size={32} />
                )}
              </div>
              <div className="p-3 bg-gray-50 border-t border-gray-200">
                <p className="text-[11px] uppercase tracking-wider text-gray-500 truncate">{domain || "domain.com"}</p>
                <p className="text-sm font-bold text-gray-900 line-clamp-1 mt-0.5">{title}</p>
                <p className="text-xs text-gray-600 line-clamp-1 mt-0.5">{description}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import AffiliateBanner from "@/components/AffiliateBanner";
import { 
  Eye, 
  Share2, 
  Target, 
  Link2, 
  FileCode, 
  CheckCheck, 
  BarChart2, 
  Bot, 
  Search,
  ArrowUpRight 
} from "lucide-react";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Metadata", "Social", "Technical", "Content", "Analytics"];

  const tools = [
    {
      title: "SERP Preview",
      desc: "Simulate live Google desktop and mobile search engine listings.",
      href: "/tools/serp-preview",
      icon: Eye,
      category: "Metadata",
      badge: "SERP",
    },
    {
      title: "Social Card",
      desc: "Live feed preview for OpenGraph tags and X/Twitter cards.",
      href: "/tools/social-preview",
      icon: Share2,
      category: "Social",
      badge: "OG",
    },
    {
      title: "UTM Builder",
      desc: "Generate tracking links for Google Analytics campaigns.",
      href: "/tools/utm-builder",
      icon: Target,
      category: "Analytics",
      badge: "UTM",
    },
    {
      title: "Slug Generator",
      desc: "Convert headlines into clean, search-engine-safe URL paths.",
      href: "/tools/slug-generator",
      icon: Link2,
      category: "Metadata",
      badge: "SLUG",
    },
    {
      title: "Sitemap Generator",
      desc: "Generate Google-compliant XML sitemaps ready to export.",
      href: "/tools/sitemap-generator",
      icon: FileCode,
      category: "Technical",
      badge: "XML",
    },
    {
      title: "Canonical Tag",
      desc: "Prevent duplicate content penalties with rel=canonical tags.",
      href: "/tools/canonical-generator",
      icon: CheckCheck,
      category: "Technical",
      badge: "HTML",
    },
    {
      title: "Keyword Density",
      desc: "Real-time word counts, character limits, and keyword frequencies.",
      href: "/tools/keyword-density",
      icon: BarChart2,
      category: "Content",
      badge: "FREQ",
    },
    {
      title: "Robots.txt Builder",
      desc: "Generate crawler allow/disallow directives for search bots.",
      href: "/tools/robots-txt",
      icon: Bot,
      category: "Technical",
      badge: "TXT",
    },
  ];

  const filteredTools = tools.filter((tool) => {
    const matchesSearch = tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tool.desc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10">
      {/* Hero Section */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-neutral-900 dark:text-white">
          Developer & Creator{" "}
          <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 bg-clip-text text-transparent">
            SEO Tools.
          </span>
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
          Fast, browser-based utilities to optimize search engine ranking and social cards.
        </p>

        {/* Search Bar */}
        <div className="max-w-md mx-auto pt-3">
          <div className="relative flex items-center">
            <Search size={15} className="absolute left-3.5 text-neutral-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tools (e.g. sitemap, robots, serp)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs sm:text-sm text-neutral-900 dark:text-white placeholder-neutral-400 shadow-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
            />
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? "bg-blue-600 text-white shadow-xs"
                  : "bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 4-Column Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredTools.map((tool) => {
          const Icon = tool.icon;
          return (
            <Link
              key={tool.href}
              href={tool.href}
              className="group bg-white dark:bg-neutral-900/90 rounded-xl p-4 border border-neutral-200/80 dark:border-neutral-800/80 hover:border-blue-500/50 dark:hover:border-blue-500/50 hover:shadow-md transition-all duration-150 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                    <Icon size={16} />
                  </div>
                  <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-500">
                    {tool.badge}
                  </span>
                </div>

                <h2 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {tool.title}
                </h2>
                <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400 leading-normal line-clamp-2">
                  {tool.desc}
                </p>
              </div>

              <div className="mt-4 pt-2.5 border-t border-neutral-100 dark:border-neutral-800/60 flex items-center justify-between text-[11px] font-semibold text-neutral-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                <span>Launch</span>
                <ArrowUpRight size={13} />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Monetization Banner */}
      <div className="pt-2">
        <AffiliateBanner />
      </div>
    </div>
  );
}

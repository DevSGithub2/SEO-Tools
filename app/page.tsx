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
  Sparkles, 
  ArrowUpRight 
} from "lucide-react";

export default function Home() {
  const tools = [
    {
      title: "SERP Snippet Previewer",
      desc: "Simulate live Google search snippets on desktop and mobile with accurate character limit gauges.",
      href: "/tools/serp-preview",
      icon: Eye,
      tag: "Popular",
    },
    {
      title: "Social Graph & Twitter Card",
      desc: "Live feed preview for OpenGraph tags, X/Twitter summary cards, and thumbnail validations.",
      href: "/tools/social-preview",
      icon: Share2,
      tag: "Social",
    },
    {
      title: "Campaign UTM URL Builder",
      desc: "Create tracking URLs with custom medium, source, and campaign parameters for Google Analytics.",
      href: "/tools/utm-builder",
      icon: Target,
      tag: "Analytics",
    },
    {
      title: "Clean URL Slug Generator",
      desc: "Strip accents, special symbols, and spaces to form search-engine-safe URL permalinks.",
      href: "/tools/slug-generator",
      icon: Link2,
      tag: "Utility",
    },
    {
      title: "XML Sitemap Generator",
      desc: "Convert page URL lists into Google-compliant XML sitemaps with frequency and priority tags.",
      href: "/tools/sitemap-generator",
      icon: FileCode,
      tag: "Technical",
    },
    {
      title: "Canonical Tag Formatter",
      desc: "Remove tracking noise and session strings to generate standardized rel=canonical tags.",
      href: "/tools/canonical-generator",
      icon: CheckCheck,
      tag: "Technical",
    },
    {
      title: "Keyword Density Counter",
      desc: "Analyze word frequency distributions, character limits, and total estimated reading duration.",
      href: "/tools/keyword-density",
      icon: BarChart2,
      tag: "Content",
    },
    {
      title: "Robots.txt Builder",
      desc: "Generate clean crawler allow/disallow directives and sitemap definitions for search bots.",
      href: "/tools/robots-txt",
      icon: Bot,
      tag: "Technical",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto mb-8 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/70 text-blue-700 text-xs font-semibold shadow-xs">
          <Sparkles size={13} className="text-blue-600" />
          <span>100% Free Browser-Based SEO Toolkit</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-neutral-900 tracking-tight leading-tight">
          Supercharge Your Search Rankings Without the Bloat
        </h1>
        <p className="text-xs sm:text-sm text-neutral-600 max-w-xl mx-auto leading-relaxed">
          Zero signups, client-side execution, and instant outputs. Built for creators, indie hackers, and technical marketers.
        </p>
      </div>

      {/* Primary Above-the-Fold Ad / Sponsorship Banner */}
      <div className="mb-12">
        <AffiliateBanner />
      </div>

      {/* Tools Section Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold text-neutral-900">Available SEO Tools</h2>
          <p className="text-xs text-neutral-500">Select a micro-tool to launch in browser</p>
        </div>
        <span className="text-xs font-semibold bg-neutral-100 text-neutral-600 px-2.5 py-1 rounded-lg">
          8 Utilities
        </span>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <Link
              key={tool.href}
              href={tool.href}
              className="group relative bg-white rounded-2xl p-5 border border-neutral-200/90 shadow-xs hover:shadow-lg hover:border-blue-500/40 hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200 shadow-xs">
                    <Icon size={18} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 bg-neutral-100 px-2 py-0.5 rounded-md">
                    {tool.tag}
                  </span>
                </div>
                <h3 className="text-base font-bold text-neutral-900 group-hover:text-blue-600 transition-colors flex items-center gap-1">
                  {tool.title}
                </h3>
                <p className="mt-1.5 text-xs text-neutral-500 leading-relaxed">
                  {tool.desc}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs font-bold text-blue-600 group-hover:translate-x-0.5 transition-transform">
                <span>Launch Tool</span>
                <ArrowUpRight size={14} />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

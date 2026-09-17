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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200/70 text-blue-700 text-xs font-semibold shadow-xs">
          <Sparkles size={13} className="text-blue-600" />
          <span>100% Free Browser-Based SEO Toolkit</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-neutral-900 tracking-tight leading-tight">
          Supercharge Your Search Rankings Without the Bloat
        </h1>
        <p className="text-base text-neutral-600 max-w-2xl mx-auto leading-relaxed">
          Zero signups, client-side execution, and instant outputs. Built for creators, indie hackers, and technical marketers.
        </p>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <Link
              key={tool.href}
              href={tool.href}
              className="group relative bg-white rounded-2xl p-6 border border-neutral-200/90 shadow-xs hover:shadow-xl hover:border-blue-500/40 hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200 shadow-xs">
                    <Icon size={22} />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 bg-neutral-100 px-2 py-0.5 rounded-md">
                    {tool.tag}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-neutral-900 group-hover:text-blue-600 transition-colors flex items-center gap-1">
                  {tool.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-neutral-500 leading-relaxed">
                  {tool.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between text-xs font-bold text-blue-600 group-hover:translate-x-0.5 transition-transform">
                <span>Launch Tool</span>
                <ArrowUpRight size={15} />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Homepage Ad / Monetization Banner */}
      <div className="mt-16">
        <AffiliateBanner />
      </div>
    </div>
  );
}

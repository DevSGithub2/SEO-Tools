import Link from "next/link";
import { Eye, Link2, BarChart2, Bot, Share2, Target, FileCode, CheckCheck } from "lucide-react";

export default function Home() {
  const tools = [
    {
      title: "SERP Snippet Previewer",
      desc: "Simulate desktop and mobile Google search result cards with live character counters.",
      href: "/tools/serp-preview",
      icon: Eye,
    },
    {
      title: "Open Graph & Twitter Preview",
      desc: "Check how links, headlines, and thumbnails render across social feeds.",
      href: "/tools/social-preview",
      icon: Share2,
    },
    {
      title: "Campaign UTM Builder",
      desc: "Generate custom campaign tracking links with UTM parameters for Google Analytics.",
      href: "/tools/utm-builder",
      icon: Target,
    },
    {
      title: "URL Slug Generator",
      desc: "Convert text and titles into clean, hyphenated SEO-safe web permalinks.",
      href: "/tools/slug-generator",
      icon: Link2,
    },
    {
      title: "XML Sitemap Generator",
      desc: "Create and export compliant sitemap.xml files for Google Search Console.",
      href: "/tools/sitemap-generator",
      icon: FileCode,
    },
    {
      title: "Canonical URL Generator",
      desc: "Generate canonical link tags to eliminate duplicate content issues.",
      href: "/tools/canonical-generator",
      icon: CheckCheck,
    },
    {
      title: "Word & Keyword Density Counter",
      desc: "Instant word counts, character limits, reading time, and keyword frequency tracking.",
      href: "/tools/keyword-density",
      icon: BarChart2,
    },
    {
      title: "Robots.txt Generator",
      desc: "Create customized crawl directives and sitemap tags to instruct Googlebot.",
      href: "/tools/robots-txt",
      icon: Bot,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
          Micro SEO Utilities for High Rankings
        </h1>
        <p className="mt-3 text-base text-gray-600">
          Fast, client-side tools designed for webmasters, creators, and developers. No login required.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <Link
              key={tool.href}
              href={tool.href}
              className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-blue-500 transition-all group"
            >
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Icon size={20} />
              </div>
              <h2 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                {tool.title}
              </h2>
              <p className="mt-1 text-sm text-gray-600">{tool.desc}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

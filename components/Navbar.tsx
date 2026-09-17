import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function Navbar() {
  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg text-gray-900">
          <div className="p-2 bg-blue-600 rounded-lg text-white">
            <Sparkles size={18} />
          </div>
          <span>FastSEO<span className="text-blue-600">Kit</span></span>
        </Link>
        <nav className="flex items-center gap-5 text-sm font-medium text-gray-600">
          <Link href="/tools/serp-preview" className="hover:text-blue-600 transition-colors">SERP</Link>
          <Link href="/tools/social-preview" className="hover:text-blue-600 transition-colors">Social Card</Link>
          <Link href="/tools/slug-generator" className="hover:text-blue-600 transition-colors">Slug</Link>
          <Link href="/tools/keyword-density" className="hover:text-blue-600 transition-colors">Density</Link>
          <Link href="/tools/robots-txt" className="hover:text-blue-600 transition-colors">Robots.txt</Link>
        </nav>
      </div>
    </header>
  );
}

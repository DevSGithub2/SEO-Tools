import { ExternalLink, Zap } from "lucide-react";

export default function AffiliateBanner() {
  return (
    <div className="max-w-4xl mx-auto mt-12 p-5 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="p-2.5 bg-blue-600 text-white rounded-lg">
          <Zap size={20} />
        </div>
        <div>
          <h4 className="text-sm font-bold text-gray-900">Launch Your Website Faster with Managed Hosting</h4>
          <p className="text-xs text-gray-600">Get high-speed cloud hosting with free SSL, CDN, and automatic backups starting at $1.99/mo.</p>
        </div>
      </div>
      <a
        href="https://www.hostinger.com"
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="shrink-0 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
      >
        Claim Deal <ExternalLink size={13} />
      </a>
    </div>
  );
}

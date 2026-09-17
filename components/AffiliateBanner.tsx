import { Sparkles, ArrowRight, ShieldCheck, Zap } from "lucide-react";

export default function AffiliateBanner() {
  return (
    <div className="max-w-4xl mx-auto mt-12 bg-gradient-to-br from-slate-900 via-neutral-900 to-blue-950 text-white rounded-2xl p-6 sm:p-8 border border-neutral-800 shadow-xl relative overflow-hidden">
      {/* Decorative gradient blob */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-400 text-[11px] font-semibold tracking-wide uppercase">
            <Sparkles size={12} /> Recommended Web Infrastructure
          </div>
          <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white">
            Supercharge Your SEO Rankings With Faster Hosting
          </h3>
          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
            Google penalizes slow sites. Deploy on high-speed NVMe servers with automated Cloudflare CDN and zero setup headaches starting at $1.99/mo.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-[11px] text-neutral-400 pt-1">
            <span className="flex items-center gap-1"><ShieldCheck size={14} className="text-emerald-400" /> Free SSL & Backups</span>
            <span className="flex items-center gap-1"><Zap size={14} className="text-amber-400" /> 99.9% Uptime Guarantee</span>
          </div>
        </div>

        <a
          href="https://www.hostinger.com"
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="shrink-0 w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-500 active:scale-95 text-white rounded-xl text-xs font-bold tracking-wide flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-600/25"
        >
          <span>Claim 75% Discount</span>
          <ArrowRight size={14} />
        </a>
      </div>
    </div>
  );
}

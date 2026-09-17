import React from "react";

export default function Logo() {
  return (
    <div className="flex items-center gap-2.5 select-none group cursor-pointer">
      {/* Precision Geometric Mark */}
      <div className="relative flex items-center justify-center">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-b from-neutral-900 to-neutral-950 dark:from-neutral-800 dark:to-neutral-900 border border-neutral-800 dark:border-neutral-700 shadow-sm flex items-center justify-center group-hover:border-blue-500/50 transition-colors">
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Ambient SEO Beam */}
            <path
              d="M4 19L11 12L15 16L20 7"
              stroke="url(#fast-gradient)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* North-East Rank Indicator Arrow */}
            <path
              d="M15 7H20V12"
              stroke="#38bdf8"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Precision Search Lens Focal */}
            <circle cx="11" cy="12" r="1.5" fill="#3b82f6" />
            
            <defs>
              <linearGradient id="fast-gradient" x1="4" y1="19" x2="20" y2="7" gradientUnits="userSpaceOnUse">
                <stop stopColor="#2563eb" />
                <stop offset="0.5" stopColor="#3b82f6" />
                <stop offset="1" stopColor="#38bdf8" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Modern Wordmark */}
      <div className="flex items-baseline font-semibold tracking-[-0.03em] text-[15px]">
        <span className="font-extrabold text-neutral-900 dark:text-white">FastSEO</span>
        <span className="text-blue-600 dark:text-blue-400 font-medium ml-0.5">kit</span>
      </div>
    </div>
  );
}

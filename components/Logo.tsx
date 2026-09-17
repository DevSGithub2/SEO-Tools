import React from "react";

export default function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 shadow-md shadow-blue-500/20 flex items-center justify-center">
        <svg
          className="w-5 h-5 text-white"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 14l6-6 4 4 6-6" />
          <path d="M14 6h6v6" />
        </svg>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="font-extrabold text-xl tracking-tight text-neutral-900">
          FastSEO<span className="text-blue-600">Kit</span>
        </span>
        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 border border-blue-200/60 px-1.5 py-0.5 rounded-full">
          PRO
        </span>
      </div>
    </div>
  );
}

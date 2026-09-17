import CanonicalGenerator from "@/components/CanonicalGenerator";
import AffiliateBanner from "@/components/AffiliateBanner";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Canonical URL & Tag Generator | FastSEOKit",
  description: "Generate canonical link tags to avoid duplicate content penalties in Google search.",
};

export default function CanonicalPage() {
  return (
    <div className="max-w-5xl mx-auto py-10 px-4 sm:px-6 space-y-8">
      <div className="text-center max-w-xl mx-auto space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">Canonical Tag Generator</h1>
        <p className="text-xs sm:text-sm text-neutral-500">Prevent duplicate content penalties with standardized rel=canonical tags.</p>
      </div>
      <CanonicalGenerator />
      <AffiliateBanner />
    </div>
  );
}

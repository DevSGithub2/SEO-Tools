import KeywordDensity from "@/components/KeywordDensity";
import AffiliateBanner from "@/components/AffiliateBanner";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Word Counter & Keyword Density Checker | FastSEOKit",
  description: "Check word count, character count, and keyword density percentages instantly.",
};

export default function KeywordPage() {
  return (
    <div className="py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-black text-neutral-900 tracking-tight">Word & Keyword Density Checker</h1>
        <p className="mt-2 text-sm text-neutral-600">Analyze text lengths and prevent keyword stuffing.</p>
      </div>
      <KeywordDensity />
      <AffiliateBanner />
    </div>
  );
}

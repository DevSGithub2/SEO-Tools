import KeywordDensity from "@/components/KeywordDensity";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Word Counter & Keyword Density Checker | FastSEOKit",
  description: "Check word count, character count, and keyword density percentages instantly.",
};

export default function KeywordPage() {
  return (
    <div className="py-10 px-4">
      <div className="max-w-4xl mx-auto text-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">Word & Keyword Density Checker</h1>
        <p className="mt-2 text-sm text-gray-600">Analyze text lengths and prevent keyword stuffing.</p>
      </div>
      <KeywordDensity />
    </div>
  );
}

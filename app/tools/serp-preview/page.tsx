import SerpPreview from "@/components/SerpPreview";
import AffiliateBanner from "@/components/AffiliateBanner";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Google SERP Snippet Preview Tool | FastSEOKit",
  description: "Check how your title and meta description appear in Google search results on desktop and mobile.",
};

export default function SerpPage() {
  return (
    <div className="py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-black text-neutral-900 tracking-tight">SERP Snippet Preview Tool</h1>
        <p className="mt-2 text-sm text-neutral-600">Test how your search listings look in Google before indexing.</p>
      </div>
      <SerpPreview />
      <AffiliateBanner />
    </div>
  );
}

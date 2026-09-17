import SlugGenerator from "@/components/SlugGenerator";
import AffiliateBanner from "@/components/AffiliateBanner";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Clean URL Slug Generator | FastSEOKit",
  description: "Transform titles and text into clean, SEO-friendly URL slugs instantly.",
};

export default function SlugPage() {
  return (
    <div className="max-w-5xl mx-auto py-10 px-4 sm:px-6 space-y-8">
      <div className="text-center max-w-xl mx-auto space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">URL Slug Generator</h1>
        <p className="text-xs sm:text-sm text-neutral-500">Convert headlines and text into clean, Google-friendly URL paths.</p>
      </div>
      <SlugGenerator />
      <AffiliateBanner />
    </div>
  );
}

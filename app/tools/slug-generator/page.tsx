import SlugGenerator from "@/components/SlugGenerator";
import AffiliateBanner from "@/components/AffiliateBanner";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Clean URL Slug Generator | FastSEOKit",
  description: "Transform titles and text into clean, SEO-friendly URL slugs instantly.",
};

export default function SlugPage() {
  return (
    <div className="py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-black text-neutral-900 tracking-tight">URL Slug Generator</h1>
        <p className="mt-2 text-sm text-neutral-600">Convert headlines and text into clean, Google-friendly URL paths.</p>
      </div>
      <SlugGenerator />
      <AffiliateBanner />
    </div>
  );
}

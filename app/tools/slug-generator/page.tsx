import SlugGenerator from "@/components/SlugGenerator";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Clean URL Slug Generator | FastSEOKit",
  description: "Transform titles and text into clean, SEO-friendly URL slugs instantly.",
};

export default function SlugPage() {
  return (
    <div className="py-10">
      <div className="max-w-4xl mx-auto text-center mb-8 px-4">
        <h1 className="text-3xl font-extrabold text-gray-900">URL Slug Generator</h1>
        <p className="mt-2 text-sm text-gray-600">Convert headlines and text into clean, SEO-friendly URL paths.</p>
      </div>
      <SlugGenerator />
    </div>
  );
}

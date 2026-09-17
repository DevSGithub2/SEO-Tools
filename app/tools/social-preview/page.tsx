import SocialPreview from "@/components/SocialPreview";
import AffiliateBanner from "@/components/AffiliateBanner";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Open Graph & Twitter Card Previewer | FastSEOKit",
  description: "Preview how your site snippets and thumbnails will appear when shared on Twitter/X and Facebook.",
};

export default function SocialPage() {
  return (
    <div className="py-10 px-4">
      <div className="max-w-4xl mx-auto text-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">Open Graph & Twitter Card Previewer</h1>
        <p className="mt-2 text-sm text-gray-600">Check your social media thumbnails and card previews before publishing.</p>
      </div>
      <SocialPreview />
      <AffiliateBanner />
    </div>
  );
}

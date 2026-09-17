import CanonicalGenerator from "@/components/CanonicalGenerator";
import AffiliateBanner from "@/components/AffiliateBanner";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Canonical URL & Tag Generator | FastSEOKit",
  description: "Generate canonical link tags to avoid duplicate content penalties in Google search.",
};

export default function CanonicalPage() {
  return (
    <div className="py-10 px-4">
      <div className="max-w-4xl mx-auto text-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">Canonical Tag Generator</h1>
        <p className="mt-2 text-sm text-gray-600">Prevent duplicate content penalties with standardized rel=canonical tags.</p>
      </div>
      <CanonicalGenerator />
      <AffiliateBanner />
    </div>
  );
}

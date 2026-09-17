import UtmBuilder from "@/components/UtmBuilder";
import AffiliateBanner from "@/components/AffiliateBanner";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Google Analytics UTM Campaign URL Builder | FastSEOKit",
  description: "Generate campaign tracking links with utm_source, utm_medium, and utm_campaign parameters.",
};

export default function UtmPage() {
  return (
    <div className="py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-black text-neutral-900 tracking-tight">Campaign UTM URL Builder</h1>
        <p className="mt-2 text-sm text-neutral-600">Track incoming marketing campaigns and traffic sources cleanly.</p>
      </div>
      <UtmBuilder />
      <AffiliateBanner />
    </div>
  );
}

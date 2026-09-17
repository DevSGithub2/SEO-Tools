import RobotsGenerator from "@/components/RobotsGenerator";
import AffiliateBanner from "@/components/AffiliateBanner";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Robots.txt Generator | FastSEOKit",
  description: "Generate compliant robots.txt directives to guide search engine crawlers.",
};

export default function RobotsPage() {
  return (
    <div className="py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-black text-neutral-900 tracking-tight">Robots.txt Generator</h1>
        <p className="mt-2 text-sm text-neutral-600">Quickly create standard crawl instructions for search engine bots.</p>
      </div>
      <RobotsGenerator />
      <AffiliateBanner />
    </div>
  );
}

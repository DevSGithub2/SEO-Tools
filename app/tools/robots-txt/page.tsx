import RobotsGenerator from "@/components/RobotsGenerator";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Robots.txt Generator | FastSEOKit",
  description: "Generate compliant robots.txt directives to guide search engine crawlers.",
};

export default function RobotsPage() {
  return (
    <div className="py-10 px-4">
      <div className="max-w-4xl mx-auto text-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">Robots.txt Generator</h1>
        <p className="mt-2 text-sm text-gray-600">Quickly create standard crawl instructions for search engine bots.</p>
      </div>
      <RobotsGenerator />
    </div>
  );
}

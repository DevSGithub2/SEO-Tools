import SitemapGenerator from "@/components/SitemapGenerator";
import AffiliateBanner from "@/components/AffiliateBanner";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free XML Sitemap Generator | FastSEOKit",
  description: "Create standard XML sitemaps for Google Search Console and Bing Webmaster Tools.",
};

export default function SitemapPage() {
  return (
    <div className="py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-black text-neutral-900 tracking-tight">XML Sitemap Generator</h1>
        <p className="mt-2 text-sm text-neutral-600">Quickly create and download a sitemap.xml for your website index.</p>
      </div>
      <SitemapGenerator />
      <AffiliateBanner />
    </div>
  );
}

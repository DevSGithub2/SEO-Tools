import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import SeoBot from "@/components/SeoBot";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export const metadata: Metadata = {
  title: "FastSEOKit - High-Speed SEO Utilities",
  description: "Free browser-based SEO utility suite built for creators and developers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning className={geist.className}>
        <body className="min-h-screen bg-neutral-50/50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 flex flex-col antialiased selection:bg-blue-100 selection:text-blue-900">
          <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem>
            <Navbar />
            <main className="flex-1">{children}</main>
            <SeoBot />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}

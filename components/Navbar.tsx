import Link from "next/link";
import Logo from "@/components/Logo";

export default function Navbar() {
  const links = [
    { href: "/tools/serp-preview", label: "SERP" },
    { href: "/tools/social-preview", label: "Social Card" },
    { href: "/tools/utm-builder", label: "UTM" },
    { href: "/tools/slug-generator", label: "Slug" },
    { href: "/tools/keyword-density", label: "Density" },
    { href: "/tools/sitemap-generator", label: "Sitemap" },
    { href: "/tools/canonical-generator", label: "Canonical" },
    { href: "/tools/robots-txt", label: "Robots" },
  ];

  return (
    <header className="border-b border-neutral-200/70 bg-white/90 backdrop-blur-md sticky top-0 z-50 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="hover:opacity-90 transition-opacity">
          <Logo />
        </Link>
        <nav className="hidden md:flex items-center gap-1 text-xs font-semibold text-neutral-600">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-1.5 rounded-lg hover:text-blue-600 hover:bg-neutral-100 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

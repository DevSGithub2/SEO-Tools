import Link from "next/link";
import Logo from "@/components/Logo";
import ThemeToggle from "@/components/theme/ThemeToggle";
import {
  SignInButton,
  SignUpButton,
  Show,
  UserButton,
} from "@clerk/nextjs";

export default function Navbar() {
  const links = [
    { href: "/tools/serp-preview", label: "SERP" },
    { href: "/tools/social-preview", label: "Social Card" },
    { href: "/tools/utm-builder", label: "UTM" },
    { href: "/tools/slug-generator", label: "Slug" },
    { href: "/tools/sitemap-generator", label: "Sitemap" },
    { href: "/tools/canonical-generator", label: "Canonical" },
    { href: "/tools/keyword-density", label: "Density" },
    { href: "/tools/robots-txt", label: "Robots" },
  ];

  return (
    <header className="border-b border-neutral-200/70 dark:border-neutral-800 bg-white/90 dark:bg-neutral-950/90 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-4">
        {/* Brand */}
        <Link href="/" className="hover:opacity-90 transition-opacity shrink-0">
          <Logo />
        </Link>

        {/* Center Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 text-xs font-semibold text-neutral-600 dark:text-neutral-300">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-2.5 py-1.5 rounded-lg hover:text-blue-600 dark:hover:text-blue-400 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Authentication & Settings */}
        <div className="flex items-center gap-2.5 shrink-0">
          <ThemeToggle />

          <Show when="signed-out">
            <SignInButton mode="modal">
              <button className="px-3 py-1.5 rounded-lg text-xs font-semibold text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer">
                Sign In
              </button>
            </SignInButton>

            <SignUpButton mode="modal">
              <button className="px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white transition-all active:scale-95 shadow-xs cursor-pointer">
                Sign Up
              </button>
            </SignUpButton>
          </Show>

          <Show when="signed-in">
            <UserButton />
          </Show>
        </div>
      </div>
    </header>
  );
}

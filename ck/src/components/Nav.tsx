"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { WhatsAppButton } from "./WhatsAppButton";
import { useSettings } from "./SettingsProvider";

const links = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/products" },
  { label: "Categories", href: "/categories" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Nav() {
  const settings = useSettings();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "py-2" : "py-4"}`}>
      <div className="mx-auto max-w-7xl px-4">
        <div className={`flex items-center justify-between gap-4 rounded-full px-4 py-2 transition-all duration-300 ${scrolled ? "glass shadow-soft" : "bg-transparent"}`}>
          <Link href="/" className="flex items-center gap-2 shrink-0">
            {settings.logoUrl ? (
              <span className="relative h-10 w-10 overflow-hidden rounded-2xl shadow-soft">
                <Image src={settings.logoUrl} alt={settings.companyName} fill sizes="40px" className="object-cover" />
              </span>
            ) : (
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-brand-gradient text-white shadow-soft text-lg">🎨</span>
            )}
            <span className="text-lg font-extrabold tracking-tight">{settings.companyName}</span>
          </Link>
          <nav className="hidden lg:flex items-center gap-1">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="rounded-full px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-foreground">
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <WhatsAppButton message={`Hi ${settings.companyName}! I'd like to know more about your DIY kits.`} size="sm" className="hidden sm:inline-flex" />
            <button aria-label="Menu" onClick={() => setOpen((v) => !v)} className="grid lg:hidden h-10 w-10 place-items-center rounded-full border border-border bg-card">
              <span className="text-lg">{open ? "✕" : "☰"}</span>
            </button>
          </div>
        </div>
        {open && (
          <div className="lg:hidden mt-2 rounded-3xl glass p-4 shadow-soft animate-fade-up">
            <div className="grid grid-cols-2 gap-1">
              {links.map((l) => (
                <Link key={l.href} onClick={() => setOpen(false)} href={l.href} className="rounded-2xl px-3 py-2 text-sm font-medium hover:bg-muted">
                  {l.label}
                </Link>
              ))}
            </div>
            <div className="mt-3">
              <WhatsAppButton message={`Hi ${settings.companyName}!`} size="sm" className="w-full justify-center" />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

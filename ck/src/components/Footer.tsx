"use client";
import Link from "next/link";
import Image from "next/image";
import { WhatsAppIcon } from "./WhatsAppButton";
import { useSettings, useWhatsApp } from "./SettingsProvider";
import type { Category } from "@/lib/data";

export default function Footer({ categories = [] }: { categories?: Category[] }) {
  const settings = useSettings();
  const wa = useWhatsApp();

  const socials = [
    { label: "IG", href: settings.instagram },
    { label: "FB", href: settings.facebook },
    { label: "YT", href: settings.youtube },
    { label: "in", href: settings.linkedin },
  ].filter((s) => Boolean(s.href));

  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid gap-10 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              {settings.logoUrl ? (
                <span className="relative h-10 w-10 overflow-hidden rounded-2xl">
                  <Image src={settings.logoUrl} alt={settings.companyName} fill sizes="40px" className="object-cover" />
                </span>
              ) : (
                <span className="grid h-10 w-10 place-items-center rounded-2xl bg-brand-gradient text-white">🎨</span>
              )}
              <span className="text-lg font-extrabold">{settings.companyName}</span>
            </div>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">{settings.footerText}</p>
            <div className="mt-4 flex gap-2">
              {socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="grid h-9 w-9 place-items-center rounded-full bg-muted text-xs font-bold text-foreground/80 hover:bg-brand hover:text-white">
                  {s.label}
                </a>
              ))}
              <a href={wa(`Hi ${settings.companyName}!`)} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="grid h-9 w-9 place-items-center rounded-full bg-whatsapp text-white hover:bg-whatsapp-dark">
                <WhatsAppIcon className="h-4 w-4" />
              </a>
            </div>
            <ul className="mt-5 space-y-1 text-sm text-muted-foreground">
              <li>📞 <a className="hover:text-brand" href={`tel:${settings.phone.replace(/\s/g, "")}`}>{settings.phone}</a></li>
              <li>✉️ <a className="hover:text-brand" href={`mailto:${settings.email}`}>{settings.email}</a></li>
              {settings.address && <li>📍 {settings.address}</li>}
            </ul>
          </div>
          <div>
            <h4 className="font-bold">Quick Links</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {[["Home", "/"], ["Shop", "/products"], ["Blog", "/blog"], ["About", "/about"], ["Contact", "/contact"]].map(([label, href]) => (
                <li key={label}><Link href={href} className="hover:text-brand">{label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold">Categories</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {(categories.length ? categories.slice(0, 5) : []).map((c) => (
                <li key={c.slug}><Link href={`/categories#${c.slug}`} className="hover:text-brand">{c.name}</Link></li>
              ))}
              <li><Link href="/categories" className="hover:text-brand">View all →</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold">Help</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {[["FAQ", "/#faq"], ["Contact", "/contact"], ["Shop", "/products"], ["Blog", "/blog"]].map(([label, href]) => (
                <li key={label}><Link href={href} className="hover:text-brand">{label}</Link></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
          <span>© {new Date().getFullYear()} {settings.companyName}. All rights reserved.</span>
          <span>Crafted with 🎨 in India</span>
        </div>
      </div>
    </footer>
  );
}

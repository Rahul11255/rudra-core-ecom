"use client";
import Image from "next/image";
import { useWhatsApp } from "./SettingsProvider";
import type { Category } from "@/lib/data";

export default function CategoryGrid({ categories }: { categories: Category[] }) {
  const wa = useWhatsApp();
  return (
    <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {categories.map((c) => (
        <a
          key={c.slug}
          id={c.slug}
          href={wa(`Hi! Share your ${c.name} collection.`)}
          target="_blank"
          rel="noopener noreferrer"
          className={`group rounded-3xl bg-gradient-to-br ${c.tint} p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-card`}
        >
          {c.image ? (
            <span className="relative block h-16 w-16 overflow-hidden rounded-2xl">
              <Image src={c.image} alt={c.name} fill sizes="64px" className="object-cover transition-transform group-hover:scale-110" />
            </span>
          ) : (
            <div className="text-5xl transition-transform group-hover:scale-110 group-hover:rotate-6">{c.emoji}</div>
          )}
          <div className="mt-6 font-bold">{c.name}</div>
          {c.description && <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{c.description}</p>}
          <div className="mt-1 text-xs text-muted-foreground">Shop on WhatsApp →</div>
        </a>
      ))}
    </div>
  );
}

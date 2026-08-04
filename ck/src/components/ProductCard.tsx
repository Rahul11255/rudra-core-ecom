"use client";
import Image from "next/image";
import Link from "next/link";
import { WhatsAppButton } from "./WhatsAppButton";
import type { Product } from "@/lib/data";

function Stars({ n }: { n: number }) {
  return (
    <div className="flex items-center gap-0.5 text-yellow">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i}>{i < Math.round(n) ? "★" : "☆"}</span>
      ))}
      <span className="ml-1 text-xs text-muted-foreground">{n.toFixed(1)}</span>
    </div>
  );
}

export function productMessage(p: Product) {
  return p.whatsappMessage?.trim() || `Hi! I'd like to order: ${p.name} (${p.price}).`;
}

export default function ProductCard({ p }: { p: Product }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card">
      <Link href={`/products/${p.slug}`} className="relative aspect-square overflow-hidden bg-muted">
        <Image src={p.img} alt={p.imgAlt || p.name} fill sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
        <span className="absolute left-3 top-3 rounded-full bg-card/90 px-3 py-1 text-xs font-bold text-brand shadow-soft">Handmade</span>
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-bold leading-tight"><Link href={`/products/${p.slug}`}>{p.name}</Link></h3>
          <span className="shrink-0 text-lg font-extrabold text-brand">{p.price}</span>
        </div>
        {p.desc && <p className="text-sm text-muted-foreground">{p.desc}</p>}
        <Stars n={p.rating} />
        {p.sizes.length > 0 && (
          <div className="flex items-center gap-2 text-xs">
            <span className="text-muted-foreground">Sizes</span>
            <div className="flex gap-1.5">
              {p.sizes.map((s) => (<span key={s} className="rounded-full border border-border px-2 py-0.5 font-semibold">{s}</span>))}
            </div>
          </div>
        )}
        <div className="mt-2">
          <WhatsAppButton size="sm" className="w-full justify-center" message={productMessage(p)} />
        </div>
      </div>
    </article>
  );
}

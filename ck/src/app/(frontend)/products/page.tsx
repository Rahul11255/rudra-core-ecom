
import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import ProductCard from "@/components/ProductCard";
import { getProducts, getSiteSettings } from "@/lib/cms";

export const revalidate = 60; // revalidate this page every 60 seconds

export async function generateMetadata(): Promise<Metadata> {
  const s = await getSiteSettings();
  return {
    title: "Shop DIY POP Toys & Painting Kits",
    description: "Browse handcrafted DIY POP toys, fridge magnets, idols, keychains and creative painting kits. Ships pan-India — order on WhatsApp.",
    alternates: { canonical: "/products" },
    openGraph: { title: `Shop — ${s.companyName}`, description: "Handcrafted DIY POP toys & paint kits.", url: `${s.url}/products`, images: [s.ogImage] },
  };
}

export default async function ProductsPage() {
  const products = await getProducts();
  return (
    <>
      <Breadcrumbs items={[{ label: "Shop", href: "/products" }]} />
      <section className="mx-auto max-w-7xl px-4 pb-20">
        <h1 className="text-4xl font-black sm:text-5xl">All Products</h1>
        <p className="mt-3 text-muted-foreground max-w-2xl">Pick your favourite DIY POP toy and order on WhatsApp. We&apos;ll confirm size, colours and address, then ship lovingly across India.</p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (<ProductCard key={p.slug} p={p} />))}
        </div>
      </section>
    </>
  );
}

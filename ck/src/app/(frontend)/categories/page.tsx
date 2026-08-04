export const revalidate = 60; // revalidate this page every 60 seconds

import type { Metadata } from "next";
import Image from "next/image";
import Breadcrumbs from "@/components/Breadcrumbs";
import CategoryGrid from "@/components/CategoryGrid";
import { getCategories, getSiteSettings } from "@/lib/cms";

export async function generateMetadata(): Promise<Metadata> {
  const s = await getSiteSettings();
  return {
    title: "Browse Categories",
    description: "Explore all DIY POP toy categories — animals, idols, cartoon figures, magnets, keychains, décor and more.",
    alternates: { canonical: "/categories" },
    openGraph: { title: `Categories — ${s.companyName}`, description: "Explore all DIY POP toy categories.", url: `${s.url}/categories`, images: [s.ogImage] },
  };
}

export default async function CategoriesPage() {
  const categories = await getCategories();
  return (
    <>
      <Breadcrumbs items={[{ label: "Categories", href: "/categories" }]} />
      <section className="mx-auto max-w-7xl px-4 pb-20">
        <h1 className="text-4xl font-black sm:text-5xl">All Categories</h1>
        <p className="mt-3 text-muted-foreground max-w-2xl">Pick a collection that sparks joy — every category ships pan-India, beautifully boxed.</p>
        <CategoryGrid categories={categories} />
      </section>
    </>
  );
}

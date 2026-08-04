import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import RichText from "@/components/RichText";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { productMessage } from "@/components/ProductCard";
import { getProductBySlug, getProducts, getSiteSettings } from "@/lib/cms";

type Params = { slug: string };

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const [p, s] = await Promise.all([getProductBySlug(slug), getSiteSettings()]);
  if (!p) return {};
  const title = p.seo?.title || `${p.name} — DIY POP Toy`;
  const description = p.seo?.description || p.desc || `${p.name} — handcrafted DIY POP toy. Order on WhatsApp.`;
  return {
    title,
    description,
    alternates: { canonical: `/products/${p.slug}` },
    openGraph: { title, description, url: `${s.url}/products/${p.slug}`, images: [p.img] },
    twitter: { card: "summary_large_image", title, description, images: [p.img] },
  };
}

export default async function ProductPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const [p, s] = await Promise.all([getProductBySlug(slug), getSiteSettings()]);
  if (!p) notFound();

  const ld = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    description: p.desc || p.seo?.description || p.name,
    image: `${s.url}${p.img}`,
    brand: { "@type": "Brand", name: s.companyName },
    aggregateRating: { "@type": "AggregateRating", ratingValue: p.rating, reviewCount: 120 },
    offers: { "@type": "Offer", priceCurrency: "INR", price: p.price.replace(/[^\d.]/g, ""), availability: "https://schema.org/InStock", url: `${s.url}/products/${p.slug}` },
  };

  return (
    <>
      <Breadcrumbs items={[{ label: "Shop", href: "/products" }, { label: p.name, href: `/products/${p.slug}` }]} />
      <section className="mx-auto max-w-6xl px-4 pb-20">
        <div className="grid gap-10 lg:grid-cols-2 items-start">
          <div>
            <div className="relative overflow-hidden rounded-[2rem] bg-card shadow-card aspect-square">
              <Image src={p.img} alt={p.imgAlt || p.name} fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" priority />
            </div>
            {p.gallery && p.gallery.length > 0 && (
              <div className="mt-4 grid grid-cols-4 gap-3">
                {p.gallery.map((g) => (
                  <div key={g} className="relative aspect-square overflow-hidden rounded-2xl bg-card shadow-soft">
                    <Image src={g} alt={p.name} fill sizes="120px" className="object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>
          <div>
            {p.category?.name && (
              <span className="inline-block rounded-full bg-muted px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand">{p.category.name}</span>
            )}
            <h1 className="mt-3 text-4xl font-black sm:text-5xl">{p.name}</h1>
            <div className="mt-3 text-2xl font-extrabold text-brand">{p.price}</div>
            {p.desc && <p className="mt-4 text-muted-foreground">{p.desc}</p>}
            <RichText data={p.description} className="mt-4 space-y-3 text-muted-foreground" />
            {p.colors.length > 0 && (
              <div className="mt-5 flex items-center gap-3 text-sm">
                <span className="text-muted-foreground">Colours</span>
                <div className="flex gap-1.5">
                  {p.colors.map((c) => (<span key={c} className="h-6 w-6 rounded-full border-2 border-white shadow-soft" style={{ background: c }} />))}
                </div>
              </div>
            )}
            {p.sizes.length > 0 && (
              <div className="mt-3 flex items-center gap-3 text-sm">
                <span className="text-muted-foreground">Sizes</span>
                <div className="flex gap-1.5">{p.sizes.map((z) => (<span key={z} className="rounded-full border border-border px-3 py-1 font-semibold">{z}</span>))}</div>
              </div>
            )}
            <div className="mt-8 flex flex-wrap gap-3">
              <WhatsAppButton size="lg" message={productMessage(p)} />
              <a href="/products" className="inline-flex items-center gap-2 rounded-full bg-muted px-7 py-4 text-base font-semibold hover:bg-muted/70">← Back to shop</a>
            </div>
            <ul className="mt-8 grid grid-cols-2 gap-3 text-sm">
              <li className="rounded-2xl bg-card p-4 shadow-soft">🛡️ Non-toxic, kid-safe</li>
              <li className="rounded-2xl bg-card p-4 shadow-soft">🎁 Beautifully boxed</li>
              <li className="rounded-2xl bg-card p-4 shadow-soft">🚚 Ships pan-India</li>
              <li className="rounded-2xl bg-card p-4 shadow-soft">💬 WhatsApp support</li>
            </ul>
          </div>
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      </section>
    </>
  );
}

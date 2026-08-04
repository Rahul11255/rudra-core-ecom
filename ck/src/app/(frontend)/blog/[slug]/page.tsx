export const revalidate = 60; // revalidate this page every 60 seconds

import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import RichText from "@/components/RichText";
import { getPostBySlug, getPosts, getSiteSettings } from "@/lib/cms";

type Params = { slug: string };

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const [p, site] = await Promise.all([getPostBySlug(slug), getSiteSettings()]);
  if (!p) return {};
  return {
    title: p.title,
    description: p.excerpt,
    alternates: { canonical: `/blog/${p.slug}` },
    openGraph: { type: "article", title: p.title, description: p.excerpt, url: `${site.url}/blog/${p.slug}`, images: [p.cover], publishedTime: p.date, authors: [p.author], tags: p.tags },
    twitter: { card: "summary_large_image", title: p.title, description: p.excerpt, images: [p.cover] },
  };
}

export default async function BlogPost({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const [p, site] = await Promise.all([getPostBySlug(slug), getSiteSettings()]);
  if (!p) notFound();
  const ld = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: p.title,
    description: p.excerpt,
    image: `${site.url}${p.cover}`,
    datePublished: p.date,
    author: { "@type": "Organization", name: p.author },
    publisher: { "@type": "Organization", name: site.companyName, logo: { "@type": "ImageObject", url: `${site.url}${site.ogImage}` } },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${site.url}/blog/${p.slug}` },
  };
  return (
    <>
      <Breadcrumbs items={[{ label: "Blog", href: "/blog" }, { label: p.title, href: `/blog/${p.slug}` }]} />
      <article className="mx-auto max-w-3xl px-4 pb-20">
        <header>
          <div className="flex flex-wrap gap-2">{p.tags.map((t) => (<span key={t} className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-brand">{t}</span>))}</div>
          <h1 className="mt-4 text-4xl font-black sm:text-5xl">{p.title}</h1>
          <div className="mt-3 text-sm text-muted-foreground">{new Date(p.date).toLocaleDateString("en-IN", { dateStyle: "long" })} · {p.author}</div>
        </header>
        <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-3xl shadow-card">
          <Image src={p.cover} alt={p.title} fill className="object-cover" priority />
        </div>
        <RichText data={p.richBody} fallback={p.body} className="prose-content mt-8 space-y-5 text-lg leading-relaxed text-foreground/90" />
        <div className="mt-10 rounded-3xl bg-muted p-6 flex flex-wrap items-center justify-between gap-4">
          <div><div className="font-bold">Loved this read?</div><div className="text-sm text-muted-foreground">Order your first DIY kit on WhatsApp.</div></div>
          <WhatsAppButton message={`Hi! I read your post: ${p.title}. I'd like to order a kit.`} />
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      </article>
    </>
  );
}

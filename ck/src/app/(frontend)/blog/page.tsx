import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getPosts, getSiteSettings } from "@/lib/cms";

export async function generateMetadata(): Promise<Metadata> {
  const s = await getSiteSettings();
  return {
    title: "Blog — DIY Tips, Gifting Ideas & Family Fun",
    description: "Ideas, tips and stories about DIY POP painting, family activities, gifting and stress-relief crafts.",
    alternates: { canonical: "/blog" },
    openGraph: { title: `${s.companyName} Blog`, description: "DIY craft, parenting & gifting ideas.", url: `${s.url}/blog`, images: [s.ogImage] },
  };
}

export default async function BlogPage() {
  const posts = await getPosts();
  return (
    <>
      <Breadcrumbs items={[{ label: "Blog", href: "/blog" }]} />
      <section className="mx-auto max-w-6xl px-4 pb-20">
        <h1 className="text-4xl font-black sm:text-5xl">From the Studio</h1>
        <p className="mt-3 text-muted-foreground max-w-2xl">DIY tips, gifting inspiration, parenting stories and behind-the-scenes from the Chitrakala workshop.</p>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="group flex flex-col overflow-hidden rounded-3xl bg-card shadow-soft transition-all hover:-translate-y-1 hover:shadow-card">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image src={p.cover} alt={p.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="flex flex-1 flex-col gap-2 p-5">
                <div className="flex flex-wrap gap-2">{p.tags.map((t) => (<span key={t} className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-brand">{t}</span>))}</div>
                <h2 className="text-lg font-bold leading-tight">{p.title}</h2>
                <p className="text-sm text-muted-foreground line-clamp-3">{p.excerpt}</p>
                <div className="mt-auto pt-2 text-xs text-muted-foreground">{new Date(p.date).toLocaleDateString("en-IN", { dateStyle: "medium" })} · {p.author}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

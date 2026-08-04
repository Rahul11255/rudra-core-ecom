import type { Metadata } from "next";
import Image from "next/image";
import Breadcrumbs from "@/components/Breadcrumbs";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { getAboutPage, getSiteSettings } from "@/lib/cms";

export async function generateMetadata(): Promise<Metadata> {
  const [about, s] = await Promise.all([getAboutPage(), getSiteSettings()]);
  const title = about.metaTitle || `About ${s.companyName}`;
  const description = about.metaDescription || about.description.slice(0, 155);
  return { title, description, alternates: { canonical: "/about" }, openGraph: { title, description, url: `${s.url}/about`, images: [about.bannerImage] } };
}

export default async function AboutPage() {
  const about = await getAboutPage();
  return (
    <>
      <Breadcrumbs items={[{ label: "About", href: "/about" }]} />
      <section className="mx-auto max-w-6xl px-4 pb-20 grid gap-10 lg:grid-cols-2 items-center">
        <div>
          <h1 className="text-4xl font-black sm:text-5xl">{about.heading}</h1>
          <p className="mt-4 text-muted-foreground">{about.description}</p>
          {about.stats.length > 0 && (
            <div className="mt-6 grid grid-cols-3 gap-4 max-w-md">
              {about.stats.map((s:any) => (
                <div key={s.label} className="rounded-3xl bg-card p-4 text-center shadow-soft">
                  <div className="text-2xl font-black text-brand">{s.value}</div>
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
          )}
          <div className="mt-8"><WhatsAppButton size="lg" message="Hi! Tell me more about your DIY kits.">{about.buttonText}</WhatsAppButton></div>
        </div>
        <div className="relative">
          <div className="absolute -inset-4 rounded-[3rem] bg-yellow/40 blur-3xl opacity-50" />
          <div className="relative overflow-hidden rounded-[2.5rem] shadow-glow">
            <Image src={about.bannerImage} alt={about.bannerAlt} width={1024} height={1024} className="h-full w-full object-cover" />
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 pb-24 grid gap-6 md:grid-cols-2">
        <div className="rounded-[2rem] bg-card p-8 shadow-soft">
          <h2 className="text-2xl font-black text-brand">{about.missionHeading}</h2>
          <p className="mt-3 text-muted-foreground">{about.mission}</p>
        </div>
        <div className="rounded-[2rem] bg-card p-8 shadow-soft">
          <h2 className="text-2xl font-black text-pink">{about.visionHeading}</h2>
          <p className="mt-3 text-muted-foreground">{about.vision}</p>
        </div>
        {about.extraSections.map((s:any) => (
          <div key={s.title} className="rounded-[2rem] bg-card p-8 shadow-soft md:col-span-2">
            <h2 className="text-2xl font-black">{s.title}</h2>
            <p className="mt-3 text-muted-foreground">{s.body}</p>
          </div>
        ))}
      </section>
    </>
  );
}

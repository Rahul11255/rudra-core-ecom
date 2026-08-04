"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { WhatsAppButton } from "./WhatsAppButton";
import { useSettings, useWhatsApp } from "./SettingsProvider";
import FloatingShapes from "./FloatingShapes";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import ProductCard from "./ProductCard";
import type { Category, Product } from "@/lib/data";
import type { HomeContent } from "@/lib/cms";

type Heading = { eyebrow?: string; heading?: string; highlight?: string; description?: string };

const Title = ({ h }: { h: Heading }) => (
  <>
    {h.heading} {h.highlight ? <span className="text-brand">{h.highlight}</span> : null}
  </>
);

export function Hero({ home }: { home: HomeContent }) {
  const heroImages = home.heroImages;
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    if (heroImages.length < 2) return;
    const interval = setInterval(() => setCurrentImage((prev) => (prev + 1) % heroImages.length), 3000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <section id="home" className="relative overflow-hidden bg-hero pt-32 pb-20 sm:pt-40 sm:pb-28">
      <FloatingShapes />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 lg:grid-cols-2">
        <div className="animate-fade-up">
          {home.heroBadge && (
            <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-semibold text-brand shadow-soft">
              <span className="h-2 w-2 rounded-full bg-green animate-pulse" />
              {home.heroBadge}
            </span>
          )}
          <h1 className="mt-5 text-5xl font-black tracking-tight sm:text-6xl lg:text-7xl">
            {home.heroTitle.split(/\s*[·•]\s*/).map((word, i, arr) => (
              <span key={`${word}-${i}`}>
                {word}
                {i < arr.length - 1 && (
                  <span className={["text-brand", "text-pink", "text-yellow", "text-green"][i % 4]}> · </span>
                )}
              </span>
            ))}
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">{home.heroSubtitle}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <WhatsAppButton size="lg" href={home.heroButtonLink || undefined} message={`Hi! I'd like to order a DIY kit.`}>
              {home.heroButtonText}
            </WhatsAppButton>
            {home.heroSecondaryButtonText && (
              <Link href={home.heroSecondaryButtonLink || "/products"} className="inline-flex items-center gap-2 rounded-full bg-card px-7 py-4 text-base font-semibold text-foreground shadow-soft transition hover:-translate-y-0.5 hover:bg-muted">
                {home.heroSecondaryButtonText}
              </Link>
            )}
          </div>
          <div className="mt-8 flex items-center gap-6 text-sm text-muted-foreground">
            <div className="flex -space-x-2">
              {["#FF8FB8", "#FFD166", "#7C5CFC", "#7ED957"].map((c) => (
                <span key={c} className="h-8 w-8 rounded-full border-2 border-white" style={{ background: c }} />
              ))}
            </div>
            <span>{home.heroStatsText}</span>
          </div>
        </div>
        <div className="relative animate-fade-up">
          <div className="absolute -inset-6 rounded-[3rem] bg-brand-gradient opacity-20 blur-3xl" />
          <div className="relative h-[420px] overflow-hidden rounded-[2.5rem] bg-card shadow-glow sm:h-[520px]">
            {heroImages.map((image, index) => (
              <Image
                key={image}
                src={image}
                alt={`${home.heroTitle} — ${index + 1}`}
                fill
                priority={index === 0}
                sizes="(min-width:1024px) 50vw, 100vw"
                className={`absolute inset-0 object-cover transition-all duration-1000 ease-in-out ${currentImage === index ? "opacity-100 scale-105" : "opacity-0 scale-100"}`}
              />
            ))}
          </div>
          <div className="absolute -left-4 top-6 hidden sm:flex items-center gap-2 rounded-2xl glass px-3 py-2 shadow-soft animate-float-slow">
            <span className="text-xl">🎨</span>
            <div className="text-xs"><div className="font-bold">Non-toxic paints</div><div className="text-muted-foreground">Kid safe</div></div>
          </div>
          <div className="absolute -right-4 bottom-10 hidden sm:flex items-center gap-2 rounded-2xl glass px-3 py-2 shadow-soft animate-float-med">
            <span className="text-xl">⭐</span>
            <div className="text-xs"><div className="font-bold">4.9 / 5</div><div className="text-muted-foreground">2,300+ reviews</div></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Categories({ categories, heading }: { categories: Category[]; heading: Heading }) {
  const wa = useWhatsApp();
  return (
    <section id="categories" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4">
        <Reveal>
          <SectionHeading eyebrow={heading.eyebrow || "Categories"} title={<Title h={heading} />} sub={heading.description} />
        </Reveal>
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {categories.map((c, i) => (
            <Reveal key={c.slug} delay={i * 0.04}>
              <a href={wa(`Hi! I'd like to see your ${c.name} collection.`)} target="_blank" rel="noopener noreferrer"
                 className={`group relative block overflow-hidden rounded-3xl bg-gradient-to-br ${c.tint} p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card`}>
                {c.image ? (
                  <span className="relative block h-14 w-14 overflow-hidden rounded-2xl">
                    <Image src={c.image} alt={c.name} fill sizes="56px" className="object-cover transition-transform duration-300 group-hover:scale-110" />
                  </span>
                ) : (
                  <div className="text-4xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">{c.emoji}</div>
                )}
                <div className="mt-6 font-bold leading-tight">{c.name}</div>
                <div className="mt-1 text-xs text-muted-foreground">Shop on WhatsApp →</div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Products({ products, heading }: { products: Product[]; heading: Heading }) {
  return (
    <section id="shop" className="py-20 sm:py-28 bg-muted/40">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <span className="inline-block rounded-full bg-card px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand">{heading.eyebrow || "Featured"}</span>
            <h2 className="mt-3 text-3xl font-black sm:text-4xl lg:text-5xl"><Title h={heading} /></h2>
            {heading.description && <p className="mt-3 max-w-xl text-muted-foreground">{heading.description}</p>}
          </div>
          <WhatsAppButton message="Hi! Please share your full catalogue." size="sm">View full catalogue</WhatsAppButton>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.05}><ProductCard p={p} /></Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function DIYKit({ home }: { home: HomeContent }) {
  return (
    <section id="diy-kits" className="relative overflow-hidden py-20 sm:py-28">
      <div className="absolute inset-0 bg-hero opacity-60" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 lg:grid-cols-2">
        <div className="relative order-2 lg:order-1">
          <div className="absolute -inset-6 rounded-[3rem] bg-pink/40 blur-3xl opacity-50" />
          <div className="relative overflow-hidden rounded-[2.5rem] bg-card shadow-glow">
            <Image src={home.kitImage} alt={home.kitHeading} width={1024} height={1024} className="h-full w-full object-cover" />
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <span className="inline-block rounded-full bg-card px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand">{home.kitEyebrow}</span>
          <h2 className="mt-4 text-3xl font-black sm:text-4xl lg:text-5xl">{home.kitHeading}</h2>
          <p className="mt-4 text-muted-foreground">{home.kitDescription}</p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {home.kitItems.map((it) => (
              <li key={it.t} className="flex items-center gap-3 rounded-2xl bg-card px-4 py-3 shadow-soft">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-muted text-lg">{it.i}</span>
                <span className="font-semibold">{it.t}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8"><WhatsAppButton size="lg" message="Hi! I'd like to order the DIY Paint Kit.">{home.kitButtonText}</WhatsAppButton></div>
        </div>
      </div>
    </section>
  );
}

export function WhyChoose({ home }: { home: HomeContent }) {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4">
        <Reveal>
          <SectionHeading eyebrow={home.whyChooseSection.eyebrow || "Why us"} title={<Title h={home.whyChooseSection} />} sub={home.whyChooseSection.description} />
        </Reveal>
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {home.whyChoose.map((w, i) => (
            <Reveal key={w.title} delay={i * 0.04}>
              <div className="group rounded-3xl bg-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-muted text-2xl transition-transform duration-300 group-hover:scale-110">{w.icon}</div>
                <h3 className="mt-4 font-bold">{w.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{w.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HowItWorks({ home }: { home: HomeContent }) {
  const steps = home.steps;
  return (
    <section className="relative overflow-hidden bg-brand-gradient py-20 text-white sm:py-28">
      <FloatingShapes />
      <div className="relative mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-bold uppercase tracking-wider">{home.howItWorksSection.eyebrow || "How it works"}</span>
          <h2 className="mt-4 text-3xl font-black sm:text-4xl lg:text-5xl">{home.howItWorksSection.heading}{home.howItWorksSection.highlight ? ` ${home.howItWorksSection.highlight}` : ""}</h2>
          {home.howItWorksSection.description && <p className="mt-3 text-white/85">{home.howItWorksSection.description}</p>}
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.05}>
              <div className="relative rounded-3xl bg-white/10 p-6 backdrop-blur-md ring-1 ring-white/20">
                <span className="text-4xl font-black text-white/30">{s.n}</span>
                <h3 className="mt-2 text-lg font-bold">{s.title}</h3>
                <p className="mt-1 text-sm text-white/80">{s.desc}</p>
                {i < steps.length - 1 && <span className="absolute -right-3 top-1/2 hidden -translate-y-1/2 text-2xl lg:block">→</span>}
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <WhatsAppButton size="lg" message="Hi! I'd like to place an order." className="!bg-white !text-whatsapp-dark hover:!bg-white" />
        </div>
      </div>
    </section>
  );
}

export function Gallery({ home }: { home: HomeContent }) {
  return (
    <section id="gallery" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4">
        <Reveal>
          <SectionHeading eyebrow={home.gallerySection.eyebrow || "Gallery"} title={<Title h={home.gallerySection} />} sub={home.gallerySection.description} />
        </Reveal>
        <div className="mt-12 columns-2 gap-4 sm:columns-3 lg:columns-4 [&>*]:mb-4">
          {home.galleryImages.map((src, i) => (
            <div key={`${src}-${i}`} className="break-inside-avoid overflow-hidden rounded-3xl bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card">
              <Image src={src} alt="Customer painted DIY POP toy" width={1024} height={1024} className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Testimonials({ testimonials, heading }: { testimonials: { name: string; role: string; text: string; avatar?: string }[]; heading: Heading }) {
  return (
    <section className="py-20 sm:py-28 bg-muted/40">
      <div className="mx-auto max-w-7xl px-4">
        <Reveal>
          <SectionHeading eyebrow={heading.eyebrow || "Reviews"} title={<Title h={heading} />} sub={heading.description} />
        </Reveal>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.05}>
              <figure className="flex flex-col gap-4 rounded-3xl bg-card p-7 shadow-soft">
                <div className="text-yellow text-lg">★★★★★</div>
                <blockquote className="text-lg leading-relaxed">&ldquo;{t.text}&rdquo;</blockquote>
                <figcaption className="mt-auto flex items-center gap-3">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand-gradient text-sm font-bold text-white">{t.avatar}</span>
                  <div><div className="font-bold">{t.name}</div><div className="text-xs text-muted-foreground">{t.role}</div></div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FAQ({ faqs, heading }: { faqs: { q: string; a: string }[]; heading: Heading }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4">
        <Reveal>
          <SectionHeading eyebrow={heading.eyebrow || "FAQ"} title={<Title h={heading} />} sub={heading.description} />
        </Reveal>
        <div className="mt-10 space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className="overflow-hidden rounded-3xl bg-card shadow-soft transition-all">
                <button onClick={() => setOpen(isOpen ? null : i)} className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left" aria-expanded={isOpen}>
                  <span className="font-semibold">{f.q}</span>
                  <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full bg-muted text-brand transition-transform ${isOpen ? "rotate-45" : ""}`}>+</span>
                </button>
                <div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                  <div className="overflow-hidden"><p className="px-6 pb-6 text-sm leading-relaxed text-muted-foreground">{f.a}</p></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function ContactCTA({ heading, description, buttonText }: { heading?: string; description?: string; buttonText?: string }) {
  const s = useSettings();
  return (
    <section id="contact" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-brand-gradient p-10 text-white shadow-glow sm:p-16">
          <FloatingShapes />
          <div className="relative grid items-center gap-10 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <h2 className="text-3xl font-black sm:text-4xl lg:text-5xl">{heading || "Need help choosing?"}</h2>
              <p className="mt-3 max-w-xl text-white/85">{description}</p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <WhatsAppButton size="lg" className="!bg-white !text-whatsapp-dark hover:!bg-white" message="Hi! I need help choosing a kit.">{buttonText || "Chat on WhatsApp"}</WhatsAppButton>
                <a href={`mailto:${s.email}`} className="inline-flex items-center gap-2 rounded-full bg-white/15 px-5 py-3 text-sm font-semibold backdrop-blur hover:bg-white/25">✉️ {s.email}</a>
              </div>
            </div>
            <div className="grid gap-3">
              {[
                { i: "📞", t: s.phone, sub: s.workingHours },
                { i: "📍", t: s.address, sub: "Ships pan-India" },
                { i: "💬", t: "WhatsApp us anytime", sub: `+${s.whatsapp}` },
              ].filter((c) => Boolean(c.t)).map((c) => (
                <div key={c.t} className="flex items-center gap-3 rounded-2xl bg-white/15 px-4 py-3 backdrop-blur">
                  <span className="text-xl">{c.i}</span>
                  <div><div className="font-bold">{c.t}</div><div className="text-xs text-white/80">{c.sub}</div></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

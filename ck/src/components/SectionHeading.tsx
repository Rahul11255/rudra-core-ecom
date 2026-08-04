import type { ReactNode } from "react";
export default function SectionHeading({ eyebrow, title, sub }: { eyebrow: string; title: ReactNode; sub?: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <span className="inline-block rounded-full bg-muted px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand">{eyebrow}</span>
      <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">{title}</h2>
      {sub && <p className="mt-3 text-base text-muted-foreground">{sub}</p>}
    </div>
  );
}

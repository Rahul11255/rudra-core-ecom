import Link from "next/link";
import { site } from "@/lib/site";

export type Crumb = { label: string; href: string };

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const trail = [{ label: "Home", href: "/" }, ...items];
  const ld = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      item: `${site.url}${c.href}`,
    })),
  };
  return (
    <nav aria-label="Breadcrumb" className="mx-auto max-w-7xl px-4 pt-28 pb-2 text-sm text-muted-foreground">
      <ol className="flex flex-wrap items-center gap-1">
        {trail.map((c, i) => (
          <li key={c.href} className="flex items-center gap-1">
            {i > 0 && <span className="opacity-50">/</span>}
            {i === trail.length - 1 ? (
              <span className="font-semibold text-foreground" aria-current="page">{c.label}</span>
            ) : (
              <Link href={c.href} className="hover:text-brand">{c.label}</Link>
            )}
          </li>
        ))}
      </ol>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </nav>
  );
}

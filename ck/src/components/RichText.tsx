import type { ReactNode } from "react";

type Node = {
  type?: string;
  tag?: string | number;
  text?: string;
  format?: number | string;
  listType?: string;
  url?: string;
  fields?: { url?: string };
  children?: Node[];
};

const FORMAT = { bold: 1, italic: 2, strikethrough: 4, underline: 8, code: 16 };

function renderChildren(children: Node[] | undefined, keyPrefix: string): ReactNode[] {
  return (children || []).map((child, i) => renderNode(child, `${keyPrefix}-${i}`));
}

function renderNode(node: Node, key: string): ReactNode {
  if (!node) return null;

  if (node.type === "text" || typeof node.text === "string") {
    let el: ReactNode = node.text ?? "";
    const format = typeof node.format === "number" ? node.format : 0;
    if (format & FORMAT.code) el = <code key={key}>{el}</code>;
    if (format & FORMAT.bold) el = <strong key={key}>{el}</strong>;
    if (format & FORMAT.italic) el = <em key={key}>{el}</em>;
    if (format & FORMAT.underline) el = <u key={key}>{el}</u>;
    if (format & FORMAT.strikethrough) el = <s key={key}>{el}</s>;
    return <span key={key}>{el}</span>;
  }

  switch (node.type) {
    case "linebreak":
      return <br key={key} />;
    case "paragraph":
      return <p key={key}>{renderChildren(node.children, key)}</p>;
    case "heading": {
      const tag = (node.tag as string) || "h2";
      const Tag = (["h1", "h2", "h3", "h4", "h5", "h6"].includes(tag) ? tag : "h2") as "h2";
      return (
        <Tag key={key} className="mt-8 text-2xl font-black">
          {renderChildren(node.children, key)}
        </Tag>
      );
    }
    case "quote":
      return (
        <blockquote key={key} className="border-l-4 border-brand pl-4 italic">
          {renderChildren(node.children, key)}
        </blockquote>
      );
    case "list": {
      const Tag = node.listType === "number" ? "ol" : "ul";
      return (
        <Tag key={key} className={`ml-5 space-y-1 ${Tag === "ol" ? "list-decimal" : "list-disc"}`}>
          {renderChildren(node.children, key)}
        </Tag>
      );
    }
    case "listitem":
      return <li key={key}>{renderChildren(node.children, key)}</li>;
    case "link":
    case "autolink": {
      const href = node.fields?.url || node.url || "#";
      return (
        <a key={key} href={href} className="text-brand underline">
          {renderChildren(node.children, key)}
        </a>
      );
    }
    default:
      return <span key={key}>{renderChildren(node.children, key)}</span>;
  }
}

/**
 * Minimal Lexical (Payload rich text) renderer.
 * Falls back to plain-text paragraphs when given a string.
 */
export default function RichText({
  data,
  fallback = "",
  className = "",
}: {
  data?: unknown;
  fallback?: string;
  className?: string;
}) {
  const root = (data as { root?: Node })?.root;

  if (!root?.children?.length) {
    if (!fallback) return null;
    return (
      <div className={className}>
        {fallback.split("\n\n").map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>
    );
  }

  return <div className={className}>{renderChildren(root.children, "rt")}</div>;
}

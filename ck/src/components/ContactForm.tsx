"use client";
import { useState } from "react";

type State = { ok: boolean; error?: string } | null;

export default function ContactForm() {
  const [pending, setPending] = useState(false);
  const [state, setState] = useState<State>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    setPending(true);
    setState(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(fd.get("name") || ""),
          email: String(fd.get("email") || ""),
          phone: String(fd.get("phone") || ""),
          message: String(fd.get("message") || ""),
        }),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) throw new Error(json.error || "Something went wrong.");
      setState({ ok: true });
      form.reset();
    } catch (err) {
      setState({ ok: false, error: (err as Error).message });
    } finally {
      setPending(false);
    }
  }

  const field = "w-full rounded-2xl border border-border bg-card px-4 py-3 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20";

  return (
    <form onSubmit={onSubmit} className="rounded-[2rem] bg-card p-6 shadow-card sm:p-8">
      <h2 className="text-2xl font-black">Send us a message</h2>
      <p className="mt-1 text-sm text-muted-foreground">Prefer typing? Fill this in and we&apos;ll reply on WhatsApp or email.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-1">
          <label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Name*</label>
          <input id="name" name="name" required maxLength={100} className={`mt-1.5 ${field}`} placeholder="Your name" />
        </div>
        <div className="sm:col-span-1">
          <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Email*</label>
          <input id="email" name="email" type="email" required maxLength={255} className={`mt-1.5 ${field}`} placeholder="you@email.com" />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="phone" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Phone</label>
          <input id="phone" name="phone" maxLength={20} className={`mt-1.5 ${field}`} placeholder="+91 …" />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Message*</label>
          <textarea id="message" name="message" required maxLength={1000} rows={5} className={`mt-1.5 ${field}`} placeholder="Tell us what you'd like to order…" />
        </div>
      </div>
      <button
        type="submit"
        disabled={pending}
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-gradient px-7 py-4 text-base font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:shadow-card disabled:opacity-60"
      >
        {pending ? "Sending…" : "Send message"}
      </button>
      {state?.ok && <p className="mt-4 rounded-2xl bg-green/20 px-4 py-3 text-sm font-semibold text-foreground">🎉 Thank you! We&apos;ve received your message and will get back to you soon.</p>}
      {state && !state.ok && <p className="mt-4 rounded-2xl bg-pink/20 px-4 py-3 text-sm font-semibold text-foreground">{state.error}</p>}
    </form>
  );
}

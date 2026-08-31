"use client";

import { useState } from "react";
import Link from "next/link";
import { useQuote, formatQuote } from "./QuoteProvider";
import { SITE, waLink } from "@/data/company";
import { industries } from "@/data/industries";

type Kind = "quote" | "sample" | "contact";

const COPY: Record<Kind, { submit: string; done: string; doneBody: string; messageLabel: string; messageHint: string }> = {
  quote: {
    submit: "Send this enquiry",
    done: "Enquiry received",
    doneBody: "A partner will come back to you with rates and lead time. To reach us faster, send the same details on WhatsApp — that is where we answer quickest.",
    messageLabel: "Anything else we should know?",
    messageHint: "Printing, colour, delivery date, or the bag you buy today.",
  },
  sample: {
    submit: "Request free samples",
    done: "Sample request received",
    doneBody: "We will put a pack together and get it to you. If you are inside the BBN belt it usually arrives within the week.",
    messageLabel: "What do you pack?",
    messageHint: "Tell us what goes in the bag and we will send the sizes and thicknesses that suit it.",
  },
  contact: {
    submit: "Send message",
    done: "Message received",
    doneBody: "We answer within four working hours, Monday to Saturday. For anything urgent, WhatsApp is faster than email.",
    messageLabel: "Your message",
    messageHint: "",
  },
};

export default function EnquiryForm({ kind = "quote" }: { kind?: Kind }) {
  const { lines, clear } = useQuote();
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "", company: "", phone: "", email: "", city: "", industry: "", message: "",
  });

  const copy = COPY[kind];

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const waText = [
    `Hello MGM Packaging — ${kind === "sample" ? "I'd like free samples." : kind === "quote" ? "I'd like a quote." : "I have an enquiry."}`,
    "",
    `Name: ${form.name || "—"}`,
    form.company ? `Company: ${form.company}` : "",
    form.city ? `Location: ${form.city}` : "",
    form.industry ? `Industry: ${form.industry}` : "",
    form.message ? `\n${form.message}` : "",
    lines.length ? `\nSpecifications:\n${formatQuote(lines)}` : "",
  ].filter(Boolean).join("\n");

  async function submit(e: React.FormEvent) {
    e.preventDefault();

    // Same rule the API enforces, checked here first so a mistyped number is
    // caught instantly instead of after a round trip.
    if (form.name.trim().length < 2) {
      setError("Please tell us your name.");
      return;
    }
    const localTen = form.phone.replace(/\D/g, "").slice(-10);
    if (!/^[6-9]\d{9}$/.test(localTen)) {
      setError("Please enter a valid 10-digit mobile number so we can call you back.");
      return;
    }
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) {
      setError("That email address doesn't look right.");
      return;
    }

    setState("sending");
    setError(null);
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind, ...form, lines: kind === "quote" ? lines : undefined }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.error ?? "Something went wrong. Please call or WhatsApp us instead.");
        setState("idle");
        return;
      }
      setState("done");
    } catch {
      setError("We couldn't send that. Please WhatsApp or call — the numbers are below.");
      setState("idle");
    }
  }

  if (state === "done") {
    return (
      <div className="card p-7 sm:p-9">
        <span className="tag tag--ok">{copy.done}</span>
        <h2 className="display-md mt-4 text-[1.6rem]">Thank you, {form.name.split(" ")[0]}.</h2>
        <p className="measure mt-3 text-[1rem] leading-relaxed text-ink-2">{copy.doneBody}</p>

        <div className="mt-6 flex flex-wrap gap-2.5">
          <a
            href={waLink(SITE.partners[0].whatsapp, waText)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--lime"
          >
            Also send on WhatsApp
          </a>
          <a href={`tel:${SITE.partners[0].phoneIntl}`} className="btn">
            Call {SITE.partners[0].name.split(" ")[0]} — {SITE.partners[0].phone}
          </a>
        </div>

        {kind === "quote" && lines.length > 0 && (
          <button
            onClick={() => { clear(); setState("idle"); setForm({ name: "", company: "", phone: "", email: "", city: "", industry: "", message: "" }); }}
            className="spec mt-6 hover:text-[var(--navy)]"
          >
            Start a new enquiry
          </button>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="card grid gap-5 p-6 sm:p-8">
      {kind === "quote" && (
        <div className="rounded-[var(--r-sm)] border border-hairline p-4" style={{ background: "var(--surface-2)" }}>
          <div className="flex items-center justify-between gap-3">
            <p className="spec spec--lime">Your specifications</p>
            <span className="tnum spec">{lines.length} {lines.length === 1 ? "line" : "lines"}</span>
          </div>
          {lines.length === 0 ? (
            <p className="mt-2 text-[.9rem] leading-relaxed text-ink-2">
              Nothing added yet — that is fine, just describe what you need below. Or{" "}
              <Link href="/products" className="link-underline" style={{ color: "var(--navy)" }}>
                add specifications
              </Link>{" "}
              from any product page or calculator.
            </p>
          ) : (
            <ul className="mt-3 grid gap-2">
              {lines.map((l) => (
                <li key={l.id} className="tnum text-[.87rem] leading-relaxed text-ink-2">
                  <strong className="text-ink">{l.product}</strong> · {l.size} · {l.micron} micron · {l.quantity}
                  {l.note ? ` · ${l.note}` : ""}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="field">
          <label className="label" htmlFor="f-name">Your name *</label>
          <input id="f-name" required className="input" value={form.name} onChange={set("name")} autoComplete="name" />
        </div>
        <div className="field">
          <label className="label" htmlFor="f-company">Company</label>
          <input id="f-company" className="input" value={form.company} onChange={set("company")} autoComplete="organization" />
        </div>
        <div className="field">
          <label className="label" htmlFor="f-phone">Mobile number *</label>
          <input id="f-phone" required type="tel" inputMode="tel" maxLength={16} className="input tnum"
                 value={form.phone} onChange={set("phone")} placeholder="10-digit mobile" autoComplete="tel"
                 aria-invalid={error?.includes("mobile") || undefined} />
        </div>
        <div className="field">
          <label className="label" htmlFor="f-email">Email</label>
          <input id="f-email" type="email" className="input" value={form.email} onChange={set("email")} autoComplete="email" />
        </div>
        <div className="field">
          <label className="label" htmlFor="f-city">Where are you? </label>
          <input id="f-city" className="input" value={form.city} onChange={set("city")}
                 placeholder="Baddi, Nalagarh, Chandigarh…" />
        </div>
        <div className="field">
          <label className="label" htmlFor="f-industry">Industry</label>
          <select id="f-industry" className="select" value={form.industry} onChange={set("industry")}>
            <option value="">Select…</option>
            {industries.map((i) => <option key={i.slug} value={i.name}>{i.short}</option>)}
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <div className="field">
        <label className="label" htmlFor="f-message">{copy.messageLabel}</label>
        <textarea id="f-message" className="textarea" value={form.message} onChange={set("message")}
                  placeholder={copy.messageHint} />
      </div>

      {error && (
        <p className="rounded-[var(--r-sm)] border p-3.5 text-[.9rem] leading-relaxed"
           style={{ background: "var(--warn-wash)", borderColor: "color-mix(in srgb, var(--warn) 30%, transparent)", color: "var(--ink-2)" }}>
          {error}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-2.5">
        <button type="submit" className="btn btn--primary" disabled={state === "sending"}>
          {state === "sending" ? "Sending…" : copy.submit}
        </button>
        <a
          href={waLink(SITE.partners[0].whatsapp, waText)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn--lime"
        >
          Send on WhatsApp instead
        </a>
      </div>

      <p className="spec" style={{ textTransform: "none", letterSpacing: ".02em", fontSize: ".78rem" }}>
        We reply {SITE.responseTime}. Your details go to the two partners and nobody else.
      </p>
    </form>
  );
}

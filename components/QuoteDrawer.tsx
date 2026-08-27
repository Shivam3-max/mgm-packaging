"use client";

import Link from "next/link";
import { useQuote, formatQuote } from "./QuoteProvider";
import { SITE, waLink } from "@/data/company";

export default function QuoteDrawer() {
  const { lines, remove, clear, open, setOpen } = useQuote();

  const waText =
    `Hello MGM Packaging — I'd like a quote for:\n\n${formatQuote(lines)}\n\nPlease send rates and lead time. Thank you.`;

  return (
    <>
      {/* scrim */}
      <div
        onClick={() => setOpen(false)}
        aria-hidden="true"
        className="fixed inset-0 z-[70] bg-[rgba(4,14,32,.5)] transition-opacity duration-300"
        style={{
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          backdropFilter: "blur(2px)",
        }}
      />

      <aside
        aria-label="Quote list"
        aria-hidden={!open}
        className="fixed right-0 top-0 z-[71] flex h-[100dvh] w-full max-w-[420px] flex-col bg-surface shadow-2xl transition-transform duration-[420ms]"
        style={{
          transform: open ? "translateX(0)" : "translateX(102%)",
          transitionTimingFunction: "cubic-bezier(.16,1,.3,1)",
          borderLeft: "1px solid var(--hairline)",
        }}
      >
        <header className="flex items-center justify-between border-b border-hairline px-5 py-4">
          <div>
            <p className="spec spec--lime">Your quote list</p>
            <p className="display-sm text-base mt-0.5">
              {lines.length} {lines.length === 1 ? "line" : "lines"}
            </p>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="btn"
            style={{ padding: ".55rem .8rem" }}
            aria-label="Close quote list"
          >
            Close
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {lines.length === 0 ? (
            <div className="grid gap-3 pt-8 text-center">
              <p className="text-sm text-ink-2 leading-relaxed">
                Nothing here yet. Add specifications from any product page, or from the
                calculators, and they collect here as one enquiry.
              </p>
              <Link href="/products" className="btn mx-auto mt-1" onClick={() => setOpen(false)}>
                Browse the range
              </Link>
            </div>
          ) : (
            <ul className="grid gap-2.5">
              {lines.map((l) => (
                <li key={l.id} className="card p-3.5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="display-sm text-[.95rem]">{l.product}</p>
                      <dl className="mt-1.5 grid gap-0.5 text-[.8rem] text-ink-2">
                        <div className="flex gap-1.5">
                          <dt className="text-ink-3">Size</dt>
                          <dd className="tnum">{l.size}</dd>
                        </div>
                        <div className="flex gap-1.5">
                          <dt className="text-ink-3">Thickness</dt>
                          <dd className="tnum">{l.micron} micron</dd>
                        </div>
                        <div className="flex gap-1.5">
                          <dt className="text-ink-3">Quantity</dt>
                          <dd className="tnum">{l.quantity}</dd>
                        </div>
                        {l.note && (
                          <div className="flex gap-1.5">
                            <dt className="text-ink-3">Note</dt>
                            <dd>{l.note}</dd>
                          </div>
                        )}
                      </dl>
                    </div>
                    <button
                      onClick={() => remove(l.id)}
                      className="spec shrink-0 hover:text-[var(--navy)]"
                      style={{ fontSize: ".6rem" }}
                      aria-label={`Remove ${l.product}`}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {lines.length > 0 && (
          <footer className="grid gap-2.5 border-t border-hairline px-5 py-4">
            <Link href="/rfq" className="btn btn--primary w-full" onClick={() => setOpen(false)}>
              Send this enquiry
            </Link>
            <a
              href={waLink(SITE.partners[0].whatsapp, waText)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--lime w-full"
            >
              Send on WhatsApp
            </a>
            <button onClick={clear} className="spec justify-self-center pt-1 hover:text-[var(--navy)]">
              Clear list
            </button>
          </footer>
        )}
      </aside>
    </>
  );
}

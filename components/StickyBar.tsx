"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { SITE, waLink } from "@/data/company";
import { useQuote } from "./QuoteProvider";

/** Mobile action bar. In Indian B2B, WhatsApp closes more than forms do. */
export default function StickyBar() {
  const [show, setShow] = useState(false);
  const { setOpen, lines } = useQuote();

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 420);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[58] border-t border-hairline bg-surface/95 backdrop-blur sm:hidden"
      style={{
        transform: show ? "translateY(0)" : "translateY(105%)",
        transition: "transform .35s var(--ease-out)",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      <div className="grid grid-cols-3">
        <a
          href={`tel:${SITE.partners[0].phoneIntl}`}
          className="spec flex items-center justify-center gap-1.5 py-3.5 border-r border-hairline"
        >
          Call
        </a>
        <a
          href={waLink(SITE.partners[0].whatsapp, "Hello MGM Packaging — I'd like to enquire about polybags.")}
          target="_blank"
          rel="noopener noreferrer"
          className="spec spec--lime flex items-center justify-center gap-1.5 py-3.5 border-r border-hairline"
        >
          WhatsApp
        </a>
        {lines.length > 0 ? (
          <button onClick={() => setOpen(true)} className="spec spec--navy flex items-center justify-center gap-1.5 py-3.5">
            Quote ({lines.length})
          </button>
        ) : (
          <Link href="/rfq" className="spec spec--navy flex items-center justify-center gap-1.5 py-3.5">
            Get quote
          </Link>
        )}
      </div>
    </div>
  );
}

"use client";

import {
  createContext, useContext, useEffect, useMemo, useState, type ReactNode,
} from "react";

export interface QuoteLine {
  id: string;
  product: string;      // "Zip lock bags"
  slug: string;
  size: string;         // '10" × 12"' or "Custom"
  micron: string;       // "50" or "50 – 75"
  quantity: string;     // free text: "500 kg" / "10,000 pcs"
  note?: string;
}

interface QuoteCtx {
  lines: QuoteLine[];
  add: (line: Omit<QuoteLine, "id">) => void;
  remove: (id: string) => void;
  clear: () => void;
  open: boolean;
  setOpen: (v: boolean) => void;
  justAdded: boolean;
  ready: boolean;
}

const Ctx = createContext<QuoteCtx | null>(null);
const KEY = "mgm.quote.v1";

export function QuoteProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<QuoteLine[]>([]);
  const [open, setOpen] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const [ready, setReady] = useState(false);

  // hydrate
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setLines(JSON.parse(raw));
    } catch {
      /* storage unavailable — the drawer still works for this session */
    }
    setReady(true);
  }, []);

  // persist
  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(lines));
    } catch {
      /* ignore */
    }
  }, [lines, ready]);

  // lock body scroll while the drawer is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", esc);
    };
  }, [open]);

  const value = useMemo<QuoteCtx>(
    () => ({
      lines,
      open,
      setOpen,
      justAdded,
      ready,
      add: (line) => {
        setLines((prev) => [
          ...prev,
          { ...line, id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}` },
        ]);
        setJustAdded(true);
        window.setTimeout(() => setJustAdded(false), 1900);
      },
      remove: (id) => setLines((prev) => prev.filter((l) => l.id !== id)),
      clear: () => setLines([]),
    }),
    [lines, open, justAdded, ready]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useQuote() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useQuote must be used inside QuoteProvider");
  return c;
}

/** Render the quote list as the message body of a WhatsApp / email enquiry. */
export function formatQuote(lines: QuoteLine[]) {
  if (!lines.length) return "";
  return lines
    .map(
      (l, i) =>
        `${i + 1}. ${l.product}\n   Size: ${l.size}\n   Thickness: ${l.micron} micron\n   Quantity: ${l.quantity}${l.note ? `\n   Note: ${l.note}` : ""}`
    )
    .join("\n\n");
}

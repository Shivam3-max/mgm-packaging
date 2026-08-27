"use client";

import { useState } from "react";

export default function Accordion({
  items,
  openFirst = false,
}: { items: { q: string; a: string }[]; openFirst?: boolean }) {
  const [open, setOpen] = useState<number | null>(openFirst ? 0 : null);

  return (
    <div className="grid gap-px overflow-hidden rounded-[var(--r)] border border-hairline"
         style={{ background: "var(--hairline)" }}>
      {items.map((it, i) => {
        const on = open === i;
        return (
          <div key={it.q} className="bg-surface">
            <h3>
              <button
                onClick={() => setOpen(on ? null : i)}
                aria-expanded={on}
                className="flex w-full items-start justify-between gap-4 p-5 text-left transition-colors hover:bg-[var(--surface-2)]"
              >
                <span className="display-sm text-[1rem]" style={{ color: on ? "var(--navy)" : "var(--ink)" }}>
                  {it.q}
                </span>
                <span
                  className="mt-0.5 shrink-0 text-[1.15rem] leading-none transition-transform duration-300"
                  style={{
                    color: on ? "var(--lime-ink)" : "var(--ink-3)",
                    transform: on ? "rotate(45deg)" : "none",
                  }}
                  aria-hidden="true"
                >
                  +
                </span>
              </button>
            </h3>
            <div
              className="grid transition-all duration-300"
              style={{
                gridTemplateRows: on ? "1fr" : "0fr",
                opacity: on ? 1 : 0,
              }}
            >
              <div className="overflow-hidden">
                <p className="measure px-5 pb-5 text-[.94rem] leading-relaxed text-ink-2">{it.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

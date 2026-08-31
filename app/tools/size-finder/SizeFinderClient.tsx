"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useQuote } from "@/components/QuoteProvider";
import { calcBag, num, num0 } from "@/lib/calc";
import { SITE } from "@/data/company";

const STOCK = [
  { w: 8, l: 10 }, { w: 10, l: 12 }, { w: 12, l: 16 }, { w: 14, l: 20 },
];

/** Round up to the next half inch — bags are cut in half-inch steps. */
const up = (n: number) => Math.ceil(n * 2) / 2;

export default function SizeFinderClient() {
  const [pw, setPw] = useState(8);      // product width
  const [pd, setPd] = useState(3);      // product depth
  const [ph, setPh] = useState(10);     // product height
  const [style, setStyle] = useState<"flat" | "gusset">("flat");
  const [closure, setClosure] = useState<"fold" | "seal" | "zip">("fold");

  const { add, setOpen } = useQuote();

  const result = useMemo(() => {
    // Flat bag: the film has to wrap the depth, so half the depth is added
    // to each side of the width. Plus ease so it is not a struggle to fill.
    const ease = 0.5;
    const flatWidth = up(pw + pd + ease);

    // Headspace above the product: enough to close it.
    const closeAllow = closure === "zip" ? 1.5 : closure === "seal" ? 1.0 : 2.0;
    const sealAllow = 0.5;                       // consumed by the bottom seal
    const length = up(ph + closeAllow + sealAllow);

    // Gusset: the sides fold in, so flat width drops and depth is explicit.
    const gussetDepth = style === "gusset" ? up(pd) : 0;
    const gussetWidth = style === "gusset" ? up(pw + ease) : flatWidth;

    const w = style === "gusset" ? gussetWidth : flatWidth;

    const bag = calcBag({ widthIn: w, lengthIn: length, micron: 50, gussetIn: gussetDepth });

    // nearest stock size that fits
    const fits = STOCK.filter((s) => s.w >= w && s.l >= length)
      .sort((a, b) => a.w * a.l - b.w * b.l)[0];

    return { w, length, gussetDepth, bag, fits };
  }, [pw, pd, ph, style, closure]);

  const sizeLabel = `${result.w}" × ${result.length}"${
    result.gussetDepth ? ` × ${result.gussetDepth}" gusset` : ""
  }`;

  return (
    <div className="grid gap-4">
      <div className="card p-6 sm:p-7">
        <p className="spec spec--lime">Your product</p>
        <h2 className="display-sm mt-1.5 text-[1.2rem]">Measure what goes inside</h2>
        <p className="mt-2 max-w-[52ch] text-[.93rem] leading-relaxed text-ink-2">
          Measure the product itself, not the bag you use now — that is how people end up
          buying the same wrong size for years.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            { id: "pw", label: "Width (inches)", v: pw, set: setPw },
            { id: "pd", label: "Depth / thickness", v: pd, set: setPd },
            { id: "ph", label: "Height", v: ph, set: setPh },
          ].map((f) => (
            <div key={f.id} className="field">
              <label className="label" htmlFor={f.id}>{f.label}</label>
              <input
                id={f.id}
                type="number"
                min={0}
                step={0.25}
                className="input tnum"
                value={f.v}
                onChange={(e) => f.set(+e.target.value)}
              />
            </div>
          ))}
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <div>
            <p className="label mb-2.5">Bag style</p>
            <div className="grid gap-2">
              {[
                { v: "flat" as const, t: "Flat bag", d: "Simplest and cheapest. Best for thin products." },
                { v: "gusset" as const, t: "Gusseted bag", d: "Opens to real depth. Best for boxy contents." },
              ].map((o) => (
                <button
                  key={o.v}
                  onClick={() => setStyle(o.v)}
                  aria-pressed={style === o.v}
                  className="grid gap-0.5 rounded-[var(--r-sm)] border p-3.5 text-left transition-colors"
                  style={{
                    borderColor: style === o.v ? "var(--navy)" : "var(--hairline-2)",
                    background: style === o.v ? "var(--navy-wash)" : "var(--surface)",
                  }}
                >
                  <span className="display-sm text-[.94rem]">{o.t}</span>
                  <span className="text-[.83rem] leading-relaxed text-ink-2">{o.d}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="label mb-2.5">How will it close?</p>
            <div className="grid gap-2">
              {[
                { v: "fold" as const, t: "Fold over or tape", d: "Needs the most headspace." },
                { v: "seal" as const, t: "Heat sealed", d: "Needs least — the machine takes the top." },
                { v: "zip" as const, t: "Zip lock", d: "Needs room for the track and lip." },
              ].map((o) => (
                <button
                  key={o.v}
                  onClick={() => setClosure(o.v)}
                  aria-pressed={closure === o.v}
                  className="grid gap-0.5 rounded-[var(--r-sm)] border p-3.5 text-left transition-colors"
                  style={{
                    borderColor: closure === o.v ? "var(--navy)" : "var(--hairline-2)",
                    background: closure === o.v ? "var(--navy-wash)" : "var(--surface)",
                  }}
                >
                  <span className="display-sm text-[.94rem]">{o.t}</span>
                  <span className="text-[.83rem] leading-relaxed text-ink-2">{o.d}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* result */}
      <div className="card overflow-hidden">
        <div className="p-6 sm:p-8" style={{ background: "var(--navy)" }}>
          <p className="spec" style={{ color: "var(--lime)" }}>Your bag size</p>
          <p className="display mt-2 text-[clamp(1.9rem,5vw,2.9rem)] text-white tnum">{sizeLabel}</p>
          <p className="mt-3 text-[.95rem]" style={{ color: "var(--on-dark-2)" }}>
            At 50 micron that is {num(result.bag.gramsPerBag, 2)} g a bag —
            about {num0(result.bag.bagsPerKg)} bags to the kilogram.
          </p>
        </div>

        <div className="grid gap-5 p-6 sm:p-8">
          <div>
            <p className="spec spec--lime">How we got there</p>
            <ul className="mt-3 grid gap-2 text-[.92rem] leading-relaxed text-ink-2">
              <li className="flex gap-2.5">
                <span style={{ color: "var(--lime-ink)" }}>→</span>
                {style === "flat"
                  ? `Flat width = product width (${pw}") + depth (${pd}") + 0.5" ease, rounded up to the half inch.`
                  : `Gusset depth = product depth (${pd}"), so the bag opens to fit it. Flat width = product width + 0.5" ease.`}
              </li>
              <li className="flex gap-2.5">
                <span style={{ color: "var(--lime-ink)" }}>→</span>
                Length = product height ({ph}&quot;) + closing allowance for a{" "}
                {closure === "zip" ? "zip lock" : closure === "seal" ? "heat seal" : "fold-over"} + 0.5&quot; for the bottom seal.
              </li>
              <li className="flex gap-2.5">
                <span style={{ color: "var(--lime-ink)" }}>→</span>
                Rounded up to the half inch, because that is how bags are cut.
              </li>
            </ul>
          </div>

          <div className="rounded-[var(--r)] border border-hairline p-4" style={{ background: "var(--surface-2)" }}>
            <p className="spec">Nearest stock size</p>
            {result.fits ? (
              <p className="mt-1.5 text-[.93rem] leading-relaxed text-ink-2">
                <strong className="tnum text-ink">{result.fits.w}&quot; × {result.fits.l}&quot;</strong> would
                fit and ships immediately. Going custom saves the difference on every
                piece, from our {SITE.moqKg} kg {SITE.moqBasis} minimum.
              </p>
            ) : (
              <p className="mt-1.5 text-[.93rem] leading-relaxed text-ink-2">
                Nothing in stock is large enough — this one needs a custom run,
                from {SITE.moqKg} kg {SITE.moqBasis}.
              </p>
            )}
          </div>

          {(result.w < SITE.minBagWidthInch || result.w > SITE.maxBagWidthInch) && (
            <div
              className="rounded-[var(--r)] border p-4"
              style={{ background: "var(--warn-wash)", borderColor: "color-mix(in srgb, var(--warn) 30%, transparent)" }}
            >
              <p className="spec" style={{ color: "var(--warn)" }}>Outside our width range</p>
              <p className="mt-1.5 text-[.93rem] leading-relaxed text-ink-2">
                We run flat widths from {SITE.minBagWidthInch}&quot; to {SITE.maxBagWidthInch}&quot;.
                At {result.w}&quot; this one falls outside that — talk to us before you
                specify it, because we would rather say so now than at quoting stage.
              </p>
            </div>
          )}

          <div className="flex flex-wrap gap-2.5">
            <button
              className="btn btn--primary"
              onClick={() => {
                add({
                  product: style === "gusset" ? "Gusset bags" : "Polybags",
                  slug: style === "gusset" ? "gusset" : "custom-sizes",
                  size: sizeLabel,
                  micron: "50",
                  quantity: "To be advised",
                  note: `Sized for a ${pw}" × ${pd}" × ${ph}" product, ${closure} close`,
                });
                setOpen(true);
              }}
            >
              Add this size to my quote
            </button>
            <Link href="/tools/thickness" className="btn">Now pick the thickness</Link>
            <Link href="/tools/calculator" className="btn">Cost it out</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

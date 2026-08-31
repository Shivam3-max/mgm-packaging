"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useQuote } from "@/components/QuoteProvider";
import { calcBag, num, num0 } from "@/lib/calc";
import { SITE } from "@/data/company";

const CHECKLIST = [
  { t: "Vector artwork", d: "AI, EPS, PDF or SVG. A high-resolution PNG usually works; a logo pulled off a website usually does not." },
  { t: "Outlined text", d: "Convert fonts to outlines so your typeface travels with the file." },
  { t: "Spot colours named", d: "Tell us the Pantone or a printed reference. “Our blue” is not a colour we can match." },
  { t: "Print position marked", d: "Where on the bag, and which face. One side or both." },
  { t: "Clear of the seal", d: "We hold a margin at the seal so heat never runs through ink — allow half an inch." },
];

export default function PrintClient() {
  const [w, setW] = useState(10);
  const [l, setL] = useState(12);
  const [um, setUm] = useState(50);
  const [colours, setColours] = useState(1);
  const [faces, setFaces] = useState<1 | 2>(1);
  const [coverage, setCoverage] = useState(25);
  const [qty, setQty] = useState(20000);

  const { add, setOpen } = useQuote();

  const calc = useMemo(() => {
    const bag = calcBag({ widthIn: w, lengthIn: l, micron: um });
    const totalKg = (bag.gramsPerBag * qty) / 1000;

    // usable print area: the seal margin takes half an inch top and bottom,
    // and we hold a quarter inch at each side.
    const printW = Math.max(0, w - 0.5);
    const printL = Math.max(0, l - 1.0);
    const areaIn2 = printW * printL * faces;
    const inkedIn2 = areaIn2 * (coverage / 100);

    const cylinders = colours * faces;
    const overCapacity = colours > SITE.printColours;
    const belowSetup = totalKg < SITE.moqKg;

    return { bag, totalKg, printW, printL, areaIn2, inkedIn2, cylinders, overCapacity, belowSetup };
  }, [w, l, um, colours, faces, coverage, qty]);

  return (
    <div className="grid gap-4">
      <div className="card p-6 sm:p-7">
        <p className="spec spec--lime">The job</p>
        <h2 className="display-sm mt-1.5 text-[1.2rem]">Describe what you want printed</h2>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="field">
            <label className="label" htmlFor="pw">Bag width (in)</label>
            <input id="pw" type="number" min={1} step={0.5} className="input tnum" value={w} onChange={(e) => setW(+e.target.value)} />
          </div>
          <div className="field">
            <label className="label" htmlFor="pl">Bag length (in)</label>
            <input id="pl" type="number" min={1} step={0.5} className="input tnum" value={l} onChange={(e) => setL(+e.target.value)} />
          </div>
          <div className="field">
            <label className="label" htmlFor="pu">Thickness (micron)</label>
            <input id="pu" type="number" min={SITE.micronMin} max={SITE.micronMax} step={5} className="input tnum" value={um} onChange={(e) => setUm(+e.target.value)} />
          </div>
        </div>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <div>
            <p className="label mb-2.5">Colours</p>
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4].map((c) => (
                <button
                  key={c}
                  onClick={() => setColours(c)}
                  aria-pressed={colours === c}
                  className="tag transition-colors"
                  style={colours === c ? { background: "var(--navy)", color: "#fff" } : undefined}
                >
                  {c} colour{c > 1 ? "s" : ""}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="label mb-2.5">Faces printed</p>
            <div className="flex flex-wrap gap-2">
              {([1, 2] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFaces(f)}
                  aria-pressed={faces === f}
                  className="tag transition-colors"
                  style={faces === f ? { background: "var(--navy)", color: "#fff" } : undefined}
                >
                  {f === 1 ? "One side" : "Both sides"}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <div className="field">
            <label className="label" htmlFor="cov">Ink coverage — {coverage}% of the print area</label>
            <input id="cov" type="range" min={5} max={90} step={5} value={coverage}
                   onChange={(e) => setCoverage(+e.target.value)} className="w-full" style={{ accentColor: "var(--navy)" }} />
            <div className="flex justify-between">
              <span className="spec">A small logo</span>
              <span className="spec">Nearly solid</span>
            </div>
          </div>
          <div className="field">
            <label className="label" htmlFor="pq">Quantity (pieces)</label>
            <input id="pq" type="number" min={1} step={1000} className="input tnum" value={qty} onChange={(e) => setQty(+e.target.value)} />
          </div>
        </div>
      </div>

      {/* result */}
      <div className="card overflow-hidden">
        <div className="grid gap-px sm:grid-cols-3" style={{ background: "var(--hairline)" }}>
          {[
            { k: "Usable print area", v: `${num(calc.printW, 1)}" × ${num(calc.printL, 1)}"`, s: faces === 2 ? "per face, both printed" : "one face" },
            { k: "Printing cylinders", v: `${calc.cylinders}`, s: "one-time, kept for repeats" },
            { k: "Film for this run", v: `${num(calc.totalKg, 0)} kg`, s: `${num0(calc.bag.bagsPerKg)} bags per kg` },
          ].map((r) => (
            <div key={r.k} className="bg-surface p-5">
              <p className="spec">{r.k}</p>
              <p className="display-md tnum mt-1.5 text-[1.5rem]" style={{ color: "var(--navy)" }}>{r.v}</p>
              <p className="mt-1 text-[.83rem] text-ink-3">{r.s}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-4 p-6 sm:p-7">
          {calc.overCapacity && (
            <div className="rounded-[var(--r-sm)] border p-4"
                 style={{ background: "var(--warn-wash)", borderColor: "color-mix(in srgb, var(--warn) 30%, transparent)" }}>
              <p className="spec" style={{ color: "var(--warn)" }}>Beyond what we run</p>
              <p className="mt-1.5 text-[.92rem] leading-relaxed text-ink-2">
                We print up to {SITE.printColours} colours in-house. At {colours} we would be
                taking work we cannot do well, so we would rather tell you now — either
                simplify the artwork, or we can point you to someone who runs more stations.
              </p>
            </div>
          )}

          {calc.belowSetup && (
            <div className="rounded-[var(--r-sm)] border p-4"
                 style={{ background: "var(--navy-wash)", borderColor: "color-mix(in srgb, var(--navy) 22%, transparent)" }}>
              <p className="spec spec--navy">Below our minimum</p>
              <p className="mt-1.5 text-[.92rem] leading-relaxed text-ink-2">
                At {num(calc.totalKg, 0)} kg this is under our {SITE.moqKg} kg {SITE.moqBasis}
                minimum, and near it the one-time cylinder cost dominates the job anyway.
                A plain bag with a printed label is often the cheaper answer — we will say
                so rather than take the order.
              </p>
            </div>
          )}

          <div>
            <p className="spec spec--lime">Artwork checklist</p>
            <ul className="mt-3 grid gap-2.5">
              {CHECKLIST.map((c) => (
                <li key={c.t} className="flex gap-3">
                  <span className="mt-[.5rem] h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "var(--lime)" }} />
                  <span className="text-[.92rem] leading-relaxed text-ink-2">
                    <strong className="text-ink">{c.t}</strong> — {c.d}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap gap-2.5 border-t border-hairline pt-5">
            <button
              className="btn btn--primary"
              onClick={() => {
                add({
                  product: "Printed polybags",
                  slug: "printed",
                  size: `${w}" × ${l}"`,
                  micron: String(um),
                  quantity: `${num0(qty)} pcs (≈ ${num(calc.totalKg, 0)} kg)`,
                  note: `${colours} colour${colours > 1 ? "s" : ""}, ${faces === 2 ? "both sides" : "one side"}, ~${coverage}% coverage`,
                });
                setOpen(true);
              }}
            >
              Add this print job to my quote
            </button>
            <Link href="/products/printed" className="btn">About printed bags</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

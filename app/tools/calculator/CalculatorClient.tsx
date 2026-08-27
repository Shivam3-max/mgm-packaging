"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useQuote } from "@/components/QuoteProvider";
import {
  calcBag, calcOrder, micronToGauge, inr, num, num0, type Material,
} from "@/lib/calc";
import { SITE } from "@/data/company";

const PRESETS = [
  { label: '8" × 10"', w: 8, l: 10, um: 40 },
  { label: '10" × 12"', w: 10, l: 12, um: 50 },
  { label: '12" × 16"', w: 12, l: 16, um: 60 },
  { label: '14" × 20"', w: 14, l: 20, um: 75 },
];

export default function CalculatorClient() {
  const [w, setW] = useState(10);
  const [l, setL] = useState(12);
  const [um, setUm] = useState(50);
  const [gusset, setGusset] = useState(0);
  const [material, setMaterial] = useState<Material>("LLD");
  const [qty, setQty] = useState(10000);
  const [rate, setRate] = useState(150);

  const { add, setOpen } = useQuote();

  const res = useMemo(
    () => calcBag({ widthIn: w, lengthIn: l, micron: um, gussetIn: gusset, material }),
    [w, l, um, gusset, material]
  );
  const order = useMemo(() => calcOrder(res, qty, rate), [res, qty, rate]);

  const valid = w > 0 && l > 0 && um > 0;

  const results = [
    { k: "Weight per bag", v: valid ? `${num(res.gramsPerBag, 2)} g` : "—", hero: false },
    { k: "Bags per kilogram", v: valid ? num0(res.bagsPerKg) : "—", hero: true },
    { k: "Kilograms per 1,000 bags", v: valid ? `${num(res.kgPer1000, 2)} kg` : "—", hero: false },
    { k: "Thickness in gauge", v: valid ? `${num0(res.gauge)} gauge` : "—", hero: false },
  ];

  const orderRows = [
    { k: `Film for ${num0(qty)} bags`, v: `${num(order.totalKg, 1)} kg` },
    { k: "Cost per bag", v: inr(order.costPerBag) },
    { k: "Order value", v: inr(order.totalCost) },
  ];

  return (
    <div className="grid gap-4">
      {/* inputs */}
      <div className="card p-6 sm:p-7">
        <p className="spec spec--lime">Your bag</p>
        <h2 className="display-sm mt-1.5 text-[1.2rem]">Enter the specification</h2>

        {/* presets */}
        <div className="mt-5 flex flex-wrap gap-2">
          <span className="spec self-center pr-1">Stock sizes</span>
          {PRESETS.map((p) => {
            const on = w === p.w && l === p.l;
            return (
              <button
                key={p.label}
                onClick={() => { setW(p.w); setL(p.l); setUm(p.um); }}
                className="tag transition-colors"
                style={
                  on
                    ? { background: "var(--navy)", color: "#fff" }
                    : undefined
                }
              >
                {p.label}
              </button>
            );
          })}
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="field">
            <label className="label" htmlFor="w">Width (inches)</label>
            <input id="w" type="number" min={1} step={0.5} className="input tnum"
                   value={w} onChange={(e) => setW(+e.target.value)} />
          </div>
          <div className="field">
            <label className="label" htmlFor="l">Length (inches)</label>
            <input id="l" type="number" min={1} step={0.5} className="input tnum"
                   value={l} onChange={(e) => setL(+e.target.value)} />
          </div>
          <div className="field">
            <label className="label" htmlFor="um">
              Thickness — micron ({num0(micronToGauge(um))} gauge)
            </label>
            <input id="um" type="number" min={SITE.micronMin} max={SITE.micronMax} step={5}
                   className="input tnum" value={um} onChange={(e) => setUm(+e.target.value)} />
          </div>
          <div className="field">
            <label className="label" htmlFor="g">Gusset depth (inches, 0 if none)</label>
            <input id="g" type="number" min={0} step={0.5} className="input tnum"
                   value={gusset} onChange={(e) => setGusset(+e.target.value)} />
          </div>
          <div className="field">
            <label className="label" htmlFor="mat">Material</label>
            <select id="mat" className="select" value={material}
                    onChange={(e) => setMaterial(e.target.value as Material)}>
              <option value="LLD">LLDPE — our default</option>
              <option value="LD">LDPE</option>
              <option value="HD">HDPE</option>
            </select>
          </div>
          <div className="field">
            <label className="label" htmlFor="qty">Quantity (pieces)</label>
            <input id="qty" type="number" min={1} step={500} className="input tnum"
                   value={qty} onChange={(e) => setQty(+e.target.value)} />
          </div>
        </div>

        <div className="field mt-4">
          <label className="label" htmlFor="rate">
            Your rate per kilogram (₹) — use whatever you are quoted
          </label>
          <input id="rate" type="number" min={1} step={5} className="input tnum"
                 value={rate} onChange={(e) => setRate(+e.target.value)} />
          <p className="spec mt-1.5" style={{ letterSpacing: ".06em", textTransform: "none", fontSize: ".78rem" }}>
            We quote per kilogram. Put our number — or anyone&apos;s — in here and the tool
            converts it to a price per bag.
          </p>
        </div>
      </div>

      {/* results */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="card p-6">
          <p className="spec spec--lime">The bag</p>
          <dl className="mt-4 grid gap-3.5">
            {results.map((r, i, arr) => (
              <div key={r.k}
                   className="flex items-baseline justify-between gap-4"
                   style={{
                     borderBottom: i < arr.length - 1 ? "1px solid var(--hairline)" : "none",
                     paddingBottom: i < arr.length - 1 ? ".9rem" : 0,
                   }}>
                <dt className="spec">{r.k}</dt>
                <dd
                  className="tnum text-right"
                  style={{
                    fontSize: r.hero ? "1.55rem" : "1rem",
                    fontWeight: r.hero ? 700 : 500,
                    fontFamily: r.hero ? "var(--font-archivo)" : undefined,
                    letterSpacing: r.hero ? "-.02em" : undefined,
                    color: r.hero ? "var(--navy)" : "var(--ink)",
                  }}
                >
                  {r.v}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="card p-6" style={{ background: "var(--navy)", borderColor: "var(--navy)" }}>
          <p className="spec" style={{ color: "var(--lime)" }}>Your order</p>
          <dl className="mt-4 grid gap-3.5">
            {orderRows.map((r, i, arr) => (
              <div key={r.k}
                   className="flex items-baseline justify-between gap-4"
                   style={{
                     borderBottom: i < arr.length - 1 ? "1px solid rgba(255,255,255,.16)" : "none",
                     paddingBottom: i < arr.length - 1 ? ".9rem" : 0,
                   }}>
                <dt className="spec" style={{ color: "var(--on-dark-3)" }}>{r.k}</dt>
                <dd
                  className="tnum text-right text-white"
                  style={{
                    fontSize: i === 1 ? "1.55rem" : "1rem",
                    fontWeight: i === 1 ? 700 : 500,
                    fontFamily: i === 1 ? "var(--font-archivo)" : undefined,
                    letterSpacing: i === 1 ? "-.02em" : undefined,
                  }}
                >
                  {r.v}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-5 text-[.82rem] leading-relaxed" style={{ color: "var(--on-dark-3)" }}>
            Indicative only — it uses the rate you typed, not ours. For a real quote, send us
            the specification.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2.5">
        <button
          className="btn btn--primary"
          onClick={() => {
            add({
              product: "Polybags",
              slug: "custom-sizes",
              size: `${w}" × ${l}"${gusset ? ` × ${gusset}" gusset` : ""}`,
              micron: String(um),
              quantity: `${num0(qty)} pcs (≈ ${num(order.totalKg, 1)} kg)`,
              note: `${material}PE`,
            });
            setOpen(true);
          }}
        >
          Add this spec to my quote
        </button>
        <Link href="/rfq" className="btn">Go to the quote form</Link>
      </div>
    </div>
  );
}

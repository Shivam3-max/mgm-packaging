"use client";

import { useMemo, useState } from "react";
import { gaugeToMicron, micronToGauge, micronToMil, milToMicron, recommendMicron, num, num0 } from "@/lib/calc";
import { useQuote } from "@/components/QuoteProvider";

const COMMON = [15, 20, 25, 30, 40, 50, 60, 75, 100, 125, 150, 200];

export default function ThicknessClient() {
  const [micron, setMicron] = useState(50);

  // advisor
  const [loadKg, setLoadKg] = useState(2);
  const [sharp, setSharp] = useState(false);
  const [transit, setTransit] = useState(true);

  const advice = useMemo(
    () => recommendMicron({ loadKg, sharp, transit }),
    [loadKg, sharp, transit]
  );

  const { add, setOpen } = useQuote();

  function setFrom(kind: "micron" | "gauge" | "mil", value: number) {
    if (!Number.isFinite(value) || value <= 0) return;
    if (kind === "micron") setMicron(value);
    if (kind === "gauge") setMicron(gaugeToMicron(value));
    if (kind === "mil") setMicron(milToMicron(value));
  }

  return (
    <div className="grid gap-4">
      {/* converter */}
      <div className="card p-6 sm:p-7">
        <p className="spec spec--lime">Converter</p>
        <h2 className="display-sm mt-1.5 text-[1.2rem]">Three units, one thickness</h2>
        <p className="mt-2 max-w-[52ch] text-[.93rem] leading-relaxed text-ink-2">
          Change any one and the other two follow. 100 gauge = 25 micron = 1 mil ÷ 1.016.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            { id: "micron", label: "Micron (µm)", value: num(micron, 1), kind: "micron" as const },
            { id: "gauge", label: "Gauge", value: num0(micronToGauge(micron)), kind: "gauge" as const },
            { id: "mil", label: "Mil (thou)", value: num(micronToMil(micron), 2), kind: "mil" as const },
          ].map((f) => (
            <div key={f.id} className="field">
              <label className="label" htmlFor={f.id}>{f.label}</label>
              <input
                id={f.id}
                type="number"
                min={0}
                step={f.kind === "mil" ? 0.1 : 1}
                className="input tnum"
                style={{ fontSize: "1.15rem", fontFamily: "var(--font-plex-mono)" }}
                value={f.value.replace(/,/g, "")}
                onChange={(e) => setFrom(f.kind, +e.target.value)}
              />
            </div>
          ))}
        </div>

        <div className="mt-6">
          <p className="spec mb-2.5">Thicknesses we run</p>
          <div className="flex flex-wrap gap-2">
            {COMMON.map((c) => (
              <button
                key={c}
                onClick={() => setMicron(c)}
                className="tag transition-colors"
                style={Math.round(micron) === c ? { background: "var(--navy)", color: "#fff" } : undefined}
              >
                {c}µ · {micronToGauge(c)}g
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* advisor */}
      <div className="card p-6 sm:p-7">
        <p className="spec spec--lime">Thickness advisor</p>
        <h2 className="display-sm mt-1.5 text-[1.2rem]">How thick does it actually need to be?</h2>
        <p className="mt-2 max-w-[52ch] text-[.93rem] leading-relaxed text-ink-2">
          Over-specifying is the most common and most expensive mistake in polybag buying.
          Three answers and we will show you where the number comes from.
        </p>

        <div className="mt-6 grid gap-5">
          <div className="field">
            <label className="label" htmlFor="load">
              What will the bag hold? — {loadKg} kg
            </label>
            <input
              id="load"
              type="range"
              min={0.1}
              max={40}
              step={0.1}
              value={loadKg}
              onChange={(e) => setLoadKg(+e.target.value)}
              className="w-full"
              style={{ accentColor: "var(--navy)" }}
            />
            <div className="flex justify-between">
              <span className="spec">100 g</span>
              <span className="spec">40 kg</span>
            </div>
          </div>

          <div className="grid gap-2.5 sm:grid-cols-2">
            {[
              { on: sharp, set: setSharp, t: "Contents are sharp or angular", d: "Fasteners, castings, machined parts, anything with a corner." },
              { on: transit, set: setTransit, t: "Couriered or handled repeatedly", d: "Sorting networks, repeat lifting, stacked under load." },
            ].map((c) => (
              <button
                key={c.t}
                onClick={() => c.set(!c.on)}
                aria-pressed={c.on}
                className="grid gap-1 rounded-[var(--r-sm)] border p-4 text-left transition-colors"
                style={{
                  borderColor: c.on ? "var(--navy)" : "var(--hairline-2)",
                  background: c.on ? "var(--navy-wash)" : "var(--surface)",
                }}
              >
                <span className="flex items-center gap-2.5">
                  <span
                    className="grid h-4 w-4 shrink-0 place-items-center rounded-[3px] border text-[10px] font-bold text-white"
                    style={{
                      borderColor: c.on ? "var(--navy)" : "var(--hairline-2)",
                      background: c.on ? "var(--navy)" : "transparent",
                    }}
                  >
                    {c.on ? "✓" : ""}
                  </span>
                  <span className="display-sm text-[.95rem]">{c.t}</span>
                </span>
                <span className="pl-[1.6rem] text-[.84rem] leading-relaxed text-ink-2">{c.d}</span>
              </button>
            ))}
          </div>
        </div>

        {/* result */}
        <div className="mt-6 rounded-[var(--r)] p-6" style={{ background: "var(--navy)" }}>
          <p className="spec" style={{ color: "var(--lime)" }}>Recommended</p>
          <p className="display mt-2 text-[2.6rem] text-white">
            {advice.micron}<span className="text-[1.4rem]"> micron</span>
          </p>
          <p className="tnum mt-1 text-[.95rem]" style={{ color: "var(--on-dark-2)" }}>
            {num0(advice.gauge)} gauge · {num(micronToMil(advice.micron), 2)} mil
          </p>

          <ol className="mt-5 grid gap-2 border-t pt-4" style={{ borderColor: "rgba(255,255,255,.16)" }}>
            {advice.reasons.map((r) => (
              <li key={r} className="flex gap-2.5 text-[.89rem] leading-relaxed" style={{ color: "var(--on-dark-2)" }}>
                <span style={{ color: "var(--lime)" }}>→</span>
                {r}
              </li>
            ))}
          </ol>

          <div className="mt-5 flex flex-wrap gap-2.5">
            <button
              className="btn btn--lime"
              onClick={() => {
                add({
                  product: "Polybags",
                  slug: "custom-sizes",
                  size: "To be advised",
                  micron: String(advice.micron),
                  quantity: "To be advised",
                  note: `For ${loadKg} kg contents${sharp ? ", sharp" : ""}${transit ? ", couriered" : ""}`,
                });
                setOpen(true);
              }}
            >
              Add to quote
            </button>
            <button className="btn btn--ghost-dark" onClick={() => setMicron(advice.micron)}>
              Use in converter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

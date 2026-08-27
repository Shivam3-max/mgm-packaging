"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useQuote } from "@/components/QuoteProvider";
import { MATERIALS } from "@/data/content";

type Answer = string | null;

const QUESTIONS = [
  {
    id: "contents",
    q: "What goes in the bag?",
    options: [
      { v: "soft", label: "Soft goods", d: "Garments, textiles, foam, paper" },
      { v: "sharp", label: "Sharp or angular", d: "Fasteners, castings, tools, components" },
      { v: "loose", label: "Loose or granular", d: "Grains, powders, pellets, spares" },
      { v: "boxed", label: "Boxed or regular", d: "Cartons, bottles, retail units" },
    ],
  },
  {
    id: "weight",
    q: "Roughly how heavy?",
    options: [
      { v: "light", label: "Under 1 kg", d: "Small parts, single garments" },
      { v: "mid", label: "1 – 5 kg", d: "Most retail and dispatch packing" },
      { v: "heavy", label: "Over 5 kg", d: "Bulk packs, liners, industrial" },
    ],
  },
  {
    id: "looks",
    q: "Does the bag need to look good?",
    options: [
      { v: "yes", label: "Yes — the customer sees it", d: "Retail, D2C, anything on a shelf" },
      { v: "some", label: "Somewhat", d: "Contents should be identifiable" },
      { v: "no", label: "No — it's internal", d: "Stores, transfer, liners" },
    ],
  },
  {
    id: "handling",
    q: "How much handling will it take?",
    options: [
      { v: "hard", label: "Courier or repeated handling", d: "Sorting networks, repeat lifting" },
      { v: "normal", label: "Normal warehouse handling", d: "Packed, palletised, delivered" },
      { v: "gentle", label: "Very little", d: "Packed and stored" },
    ],
  },
] as const;

function decide(a: Record<string, Answer>) {
  if (Object.values(a).some((v) => v === null)) return null;

  let ld = 0, lld = 0, hd = 0;
  const why: string[] = [];

  if (a.contents === "sharp") {
    lld += 3; hd += 1;
    why.push("Sharp contents make puncture resistance the deciding property, and LLDPE leads there by a clear margin.");
  }
  if (a.contents === "soft") {
    ld += 2; lld += 1;
    why.push("Soft contents put little stress on the film, so clarity and feel can lead.");
  }
  if (a.contents === "loose") {
    lld += 2; hd += 2;
    why.push("Loose contents settle and press outward, which rewards tensile strength over softness.");
  }
  if (a.contents === "boxed") {
    lld += 2;
    why.push("Regular contents stress the corners more than the faces — LLDPE handles corner load well.");
  }

  if (a.weight === "heavy") {
    lld += 2; hd += 2; ld -= 1;
    why.push("Over 5 kg the seal carries real load, so LDPE's lower tensile strength starts to matter.");
  }
  if (a.weight === "light") {
    ld += 1; hd += 1;
    why.push("At light weights you can downgauge substantially without risk.");
  }

  if (a.looks === "yes") {
    ld += 3; hd -= 3;
    why.push("If the customer sees the bag, HDPE's haze and crinkle rule it out; LDPE has the best gloss.");
  }
  if (a.looks === "some") {
    lld += 1; hd -= 1;
    why.push("Contents need to be identifiable, so clarity matters but does not have to be perfect.");
  }
  if (a.looks === "no") {
    hd += 2;
    why.push("Nobody sees this bag, so you can trade appearance for strength-to-weight.");
  }

  if (a.handling === "hard") {
    lld += 3; ld -= 1;
    why.push("Courier networks test tear and puncture resistance more than anything else on this list.");
  }
  if (a.handling === "gentle") {
    ld += 1; hd += 1;
    why.push("Light handling widens your options — cost can lead the decision.");
  }

  const scores: Record<string, number> = { LD: ld, LLD: lld, HD: hd };
  const winner = (Object.keys(scores) as Array<keyof typeof scores>).reduce((a1, b) =>
    scores[b] > scores[a1] ? b : a1
  );

  return { winner, scores, why };
}

export default function MaterialClient() {
  const [answers, setAnswers] = useState<Record<string, Answer>>({
    contents: null, weight: null, looks: null, handling: null,
  });
  const result = useMemo(() => decide(answers), [answers]);
  const { add, setOpen } = useQuote();

  const answered = Object.values(answers).filter(Boolean).length;
  const mat = result ? MATERIALS.find((m) => m.code === result.winner) : null;

  return (
    <div className="grid gap-4">
      {/* progress */}
      <div className="flex items-center gap-3">
        <div className="flex flex-1 gap-1.5">
          {QUESTIONS.map((q) => (
            <span
              key={q.id}
              className="h-[3px] flex-1 rounded-full transition-colors duration-300"
              style={{ background: answers[q.id] ? "var(--lime)" : "var(--hairline-2)" }}
            />
          ))}
        </div>
        <span className="spec tnum">{answered} / {QUESTIONS.length}</span>
      </div>

      {QUESTIONS.map((q, qi) => (
        <fieldset key={q.id} className="card p-6 sm:p-7">
          <legend className="contents">
            <span className="spec spec--lime">Question {qi + 1}</span>
            <h2 className="display-sm mt-1.5 text-[1.2rem]">{q.q}</h2>
          </legend>

          <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
            {q.options.map((o) => {
              const on = answers[q.id] === o.v;
              return (
                <button
                  key={o.v}
                  onClick={() => setAnswers((s) => ({ ...s, [q.id]: o.v }))}
                  aria-pressed={on}
                  className="grid gap-1 rounded-[var(--r-sm)] border p-4 text-left transition-all"
                  style={{
                    borderColor: on ? "var(--navy)" : "var(--hairline-2)",
                    background: on ? "var(--navy-wash)" : "var(--surface)",
                  }}
                >
                  <span className="display-sm text-[.96rem]" style={{ color: on ? "var(--navy)" : "var(--ink)" }}>
                    {o.label}
                  </span>
                  <span className="text-[.84rem] leading-relaxed text-ink-2">{o.d}</span>
                </button>
              );
            })}
          </div>
        </fieldset>
      ))}

      {/* result */}
      {result && mat ? (
        <div className="card overflow-hidden">
          <div className="p-6 sm:p-8" style={{ background: "var(--navy)" }}>
            <p className="spec" style={{ color: "var(--lime)" }}>Our recommendation</p>
            <p className="display mt-2 text-[2.8rem] text-white">{mat.name}</p>
            <p className="mt-1 text-[1rem]" style={{ color: "var(--on-dark-2)" }}>{mat.full}</p>
            <p className="mt-4 max-w-[46ch] text-[.96rem] leading-relaxed" style={{ color: "var(--on-dark-2)" }}>
              {mat.use}
            </p>
          </div>

          <div className="p-6 sm:p-8">
            <p className="spec spec--lime">Why — check our working</p>
            <ol className="mt-4 grid gap-2.5">
              {result.why.map((w) => (
                <li key={w} className="flex gap-2.5 text-[.93rem] leading-relaxed text-ink-2">
                  <span style={{ color: "var(--lime-ink)" }}>→</span>
                  {w}
                </li>
              ))}
            </ol>

            <div className="mt-6 border-t border-hairline pt-5">
              <p className="spec">How the three scored</p>
              <div className="mt-3 grid gap-2">
                {(["LD", "LLD", "HD"] as const).map((k) => {
                  const max = Math.max(...Object.values(result.scores), 1);
                  const pct = Math.max(0, (result.scores[k] / max) * 100);
                  const win = k === result.winner;
                  return (
                    <div key={k} className="flex items-center gap-3">
                      <span className="spec w-12 shrink-0">{k}PE</span>
                      <div className="h-2 flex-1 overflow-hidden rounded-full" style={{ background: "var(--ground-2)" }}>
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{ width: `${pct}%`, background: win ? "var(--lime)" : "var(--hairline-2)" }}
                        />
                      </div>
                      <span className="spec tnum w-6 text-right">{result.scores[k]}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2.5">
              <button
                className="btn btn--primary"
                onClick={() => {
                  add({
                    product: "Polybags",
                    slug: "custom-sizes",
                    size: "To be advised",
                    micron: "To be advised",
                    quantity: "To be advised",
                    note: `${mat.name} recommended by the material selector`,
                  });
                  setOpen(true);
                }}
              >
                Add {mat.name} to my quote
              </button>
              <Link href="/why-lldpe" className="btn">Compare all three</Link>
              <Link href="/tools/thickness" className="btn">Now find the thickness</Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="card p-8 text-center">
          <p className="text-[.95rem] text-ink-2">
            Answer all four questions and the recommendation appears here, with the reasoning.
          </p>
        </div>
      )}
    </div>
  );
}

"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { COMPLIANCE_UPDATED } from "@/data/content";

type Use = "carry" | "product" | "internal" | null;
type Role = "brand" | "converter" | "user" | null;


function Q({
  n, q, children,
}: { n: number; q: string; children: React.ReactNode }) {
  return (
    <fieldset className="card p-6 sm:p-7">
      <legend className="contents">
        <span className="spec spec--lime">Question {n}</span>
        <h2 className="display-sm mt-1.5 text-[1.2rem]">{q}</h2>
      </legend>
      <div className="mt-5 grid gap-2.5">{children}</div>
    </fieldset>
  );
}

function Opt({
  on, onClick, t, d,
}: { on: boolean; onClick: () => void; t: string; d: string }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={on}
      className="grid gap-1 rounded-[var(--r-sm)] border p-4 text-left transition-colors"
      style={{
        borderColor: on ? "var(--navy)" : "var(--hairline-2)",
        background: on ? "var(--navy-wash)" : "var(--surface)",
      }}
    >
      <span className="display-sm text-[.96rem]" style={{ color: on ? "var(--navy)" : "var(--ink)" }}>{t}</span>
      <span className="text-[.85rem] leading-relaxed text-ink-2">{d}</span>
    </button>
  );
}

const COLOURS = {
  applies: { bg: "var(--warn-wash)", fg: "var(--warn)", label: "Applies to you" },
  clear: { bg: "var(--ok-wash)", fg: "var(--ok)", label: "Does not apply" },
  check: { bg: "var(--navy-wash)", fg: "var(--navy)", label: "Worth checking" },
} as const;

export default function ComplianceClient() {
  const [use, setUse] = useState<Use>(null);
  const [role, setRole] = useState<Role>(null);
  const [retail, setRetail] = useState<boolean | null>(null);

  const done = use !== null && role !== null && retail !== null;

  const findings = useMemo(() => {
    if (!done) return null;

    const out: { verdict: "applies" | "clear" | "check"; title: string; body: string }[] = [];

    // 1 — thickness
    if (use === "carry") {
      out.push({
        verdict: "applies",
        title: "Minimum thickness applies — 120 micron",
        body:
          "A bag given to a customer to carry goods away is a carry bag. Since 31 December 2022 these must be at least 120 micron. Below that they are not permitted, and penalties have been levied per tonne.",
      });
    } else {
      out.push({
        verdict: "clear",
        title: "The 120-micron minimum does not apply",
        body:
          use === "product"
            ? "Packaging that contains or protects a product is not a carry bag. There is no minimum thickness on it — specify from what the bag has to do, not from a headline about carry bags."
            : "Bags used inside your own process — liners, transfer, in-process packing — are not carry bags and carry no minimum thickness.",
      });
    }

    // 2 — marking
    if (use !== "internal" && (role === "brand" || retail)) {
      out.push({
        verdict: "applies",
        title: "Marking obligations likely apply",
        body:
          "Plastic packaging placed in the market carries marking requirements — a barcode, QR code or unique identifier with prescribed details including thickness. As the brand owner this falls to you. We can print what you need onto the bag.",
      });
    } else {
      out.push({
        verdict: "clear",
        title: "Marking is unlikely to fall on you",
        body:
          role === "converter"
            ? "As a converter you are not the entity placing packaged product into the market — but your customer is, so expect them to ask you for it."
            : "Bags used internally and never placed in the market with product are outside the marking requirement.",
      });
    }

    // 3 — EPR
    if (role === "brand") {
      out.push({
        verdict: "applies",
        title: "EPR registration applies to you",
        body:
          "Producers, importers and brand owners handling plastic packaging must register on the CPCB EPR portal, declare their packaging categories and meet category-wise recycling targets against what they put into the market.",
      });
    } else if (role === "converter") {
      out.push({
        verdict: "check",
        title: "Check your position as a producer",
        body:
          "Manufacturers of plastic packaging can fall within the producer definition depending on what you make and who you supply. Worth confirming rather than assuming.",
      });
    } else {
      out.push({
        verdict: "clear",
        title: "EPR registration is unlikely to apply",
        body:
          "Buying and using bags does not by itself create an EPR obligation — placing packaged product into the market does. If you sell packaged goods under your own brand, re-answer as a brand owner.",
      });
    }

    // 4 — always
    out.push({
      verdict: "clear",
      title: "Your film is recyclable either way",
      body:
        "Our bags are single-material LLDPE, resin code 4, with no laminate layers. That makes them substantially easier to recover than multi-layer structures, which have to be separated first and usually are not.",
    });

    return out;
  }, [done, use, role, retail]);


  return (
    <div className="grid gap-4">
      <Q n={1} q="How is the bag used?">
        <Opt on={use === "carry"} onClick={() => setUse("carry")}
             t="Handed to a customer to carry goods"
             d="A shop or counter bag the customer walks out with." />
        <Opt on={use === "product"} onClick={() => setUse("product")}
             t="It contains or protects a product"
             d="Primary or secondary packaging, courier mailers, retail packs." />
        <Opt on={use === "internal"} onClick={() => setUse("internal")}
             t="Used inside our own process"
             d="Liners, in-process transfer, stores issue — never leaves the site with product." />
      </Q>

      <Q n={2} q="Which best describes you?">
        <Opt on={role === "brand"} onClick={() => setRole("brand")}
             t="Brand owner — we sell packaged product"
             d="Our name is on what goes into the market." />
        <Opt on={role === "converter"} onClick={() => setRole("converter")}
             t="Manufacturer or converter of packaging"
             d="We make or convert packaging for others." />
        <Opt on={role === "user"} onClick={() => setRole("user")}
             t="We only use the bags ourselves"
             d="Internal use, contract packing for someone else's brand." />
      </Q>

      <Q n={3} q="Does the packaged product reach a retail market?">
        <Opt on={retail === true} onClick={() => setRetail(true)}
             t="Yes" d="Sold to consumers, online or in store." />
        <Opt on={retail === false} onClick={() => setRetail(false)}
             t="No" d="Business to business, or never leaves our operation." />
      </Q>

      {findings ? (
        <div className="grid gap-3">
          {findings.map((f) => {
            const c = COLOURS[f.verdict];
            return (
              <div key={f.title} className="card overflow-hidden">
                <div className="flex items-center gap-3 border-b border-hairline px-5 py-3" style={{ background: c.bg }}>
                  <span className="spec" style={{ color: c.fg }}>{c.label}</span>
                </div>
                <div className="p-5 sm:p-6">
                  <h3 className="display-sm text-[1.05rem]">{f.title}</h3>
                  <p className="measure mt-2 text-[.93rem] leading-relaxed text-ink-2">{f.body}</p>
                </div>
              </div>
            );
          })}

          <div
            className="rounded-[var(--r)] border p-5"
            style={{ background: "var(--warn-wash)", borderColor: "color-mix(in srgb, var(--warn) 30%, transparent)" }}
          >
            <p className="spec" style={{ color: "var(--warn)" }}>This is guidance, not legal advice</p>
            <p className="measure mt-2 text-[.92rem] leading-relaxed text-ink-2">
              These answers follow the general structure of the Plastic Waste Management Rules
              as we understand them, reviewed {COMPLIANCE_UPDATED}. Rules change and your exact
              position depends on facts this tool does not ask about. Confirm with a competent
              adviser before you rely on it.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <Link href="/compliance" className="btn btn--primary">Read the full explanation</Link>
            <Link href="/contact" className="btn">Ask for a material declaration</Link>
          </div>
        </div>
      ) : (
        <div className="card p-8 text-center">
          <p className="text-[.95rem] text-ink-2">
            Answer the three questions above and your position appears here.
          </p>
        </div>
      )}
    </div>
  );
}

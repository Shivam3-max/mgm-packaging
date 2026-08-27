import type { Metadata } from "next";
import Link from "next/link";
import ToolShell, { ToolCTA } from "@/components/ToolShell";
import CalculatorClient from "./CalculatorClient";

export const metadata: Metadata = {
  title: "Polybag Weight & Cost Calculator — Bags per Kg",
  description:
    "Work out weight per bag, bags per kilogram and cost per piece from size, micron and rate per kg. The conversion every polybag buyer needs and almost nobody publishes.",
};

export default function CalculatorPage() {
  return (
    <ToolShell
      eyebrow="Bag weight & cost"
      title="Polybags are sold by the kilo. You use them by the piece."
      lede="That one conversion causes more confusion in this trade than anything else. Enter your size and thickness, put in whatever rate you have been quoted — ours or anyone's — and see what a bag actually costs you."
      aside={
        <>
          <ToolCTA
            title="Know your spec? Get a real rate."
            body="Send us the size, micron and quantity you just worked out and we will quote against it — usually the same day."
          />
          <div className="card p-6">
            <p className="spec spec--lime">Related</p>
            <ul className="mt-3 grid gap-2">
              {[
                ["Not sure of the thickness?", "/tools/thickness"],
                ["Not sure of the size?", "/tools/size-finder"],
                ["LD, LLD or HD?", "/tools/material"],
              ].map(([t, h]) => (
                <li key={h}>
                  <Link href={h} className="link-underline text-[.9rem] text-ink-2 hover:text-[var(--navy)]">
                    {t}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </>
      }
      footnote={
        <>
          <p>
            Weight is calculated as{" "}
            <strong className="text-ink">kg per 1,000 bags = width (cm) × length (cm) × micron × 0.0001849</strong>,
            the standard metric trade formula. The constant encodes a film density of
            0.9245 g/cm³ — two layers of film, micron converted to centimetres, across a
            thousand bags. A gusset adds its full depth to the effective width, because that
            material has to come from somewhere.
          </p>
          <p className="mt-3">
            The imperial rule of thumb — width (in) × length (in) × gauge ÷ 3300 — gives an
            answer about 1.6% heavier. Both are used in the trade; we use the metric one
            because it is the more conservative of the two for a buyer.
          </p>
          <p className="mt-3">
            Worked example: a 10&quot; × 12&quot; bag at 50 micron weighs 7.16 g, which is about
            140 bags per kilogram. At ₹150/kg that is ₹1.07 a bag.
          </p>
        </>
      }
    >
      <CalculatorClient />
    </ToolShell>
  );
}

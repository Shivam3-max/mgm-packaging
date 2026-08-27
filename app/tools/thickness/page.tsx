import type { Metadata } from "next";
import ToolShell, { ToolCTA } from "@/components/ToolShell";
import ThicknessClient from "./ThicknessClient";

export const metadata: Metadata = {
  title: "Micron, Gauge & Mil Converter — Polybag Thickness Advisor",
  description:
    "Convert polybag thickness between micron, gauge and mil, and get a recommended thickness from what the bag has to carry. 100 gauge = 25 micron.",
};

export default function Page() {
  return (
    <ToolShell
      eyebrow="Micron · gauge · mil"
      title="Three units for one thickness, and one honest recommendation"
      lede="Indian trade quotes in gauge. Written specifications use micron. Imported standards use mil. They all describe the same thing, and confusing them is how buyers end up ordering film four times thicker than they meant to."
      aside={
        <ToolCTA
          title="Send us the thickness"
          body="Tell us the micron and size you have landed on and we will quote it. If we think it is over-specified, we will say so."
        />
      }
      footnote={
        <>
          <p>
            The conversions are exact: <strong className="text-ink">100 gauge = 25 micron</strong>,
            so gauge is simply micron × 4. One mil is one thousandth of an inch, which is
            25.4 micron.
          </p>
          <p className="mt-3">
            The advisor works from a load-based baseline, then adds 35% for sharp or angular
            contents and 20% for courier handling and repeat abrasion, before rounding to a
            thickness that is actually run on a line. It is deliberately conservative — but it
            is a starting point for a conversation, not a substitute for testing a sample
            against your own contents.
          </p>
        </>
      }
    >
      <ThicknessClient />
    </ToolShell>
  );
}

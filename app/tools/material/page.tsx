import type { Metadata } from "next";
import ToolShell, { ToolCTA } from "@/components/ToolShell";
import MaterialClient from "./MaterialClient";

export const metadata: Metadata = {
  title: "LD, LLD or HD? — Polybag Material Selector",
  description:
    "Four questions about your contents and handling, and a recommendation of LDPE, LLDPE or HDPE — with the reasoning shown so you can check the working.",
};

export default function Page() {
  return (
    <ToolShell
      eyebrow="Material selector"
      title="LD, LLD or HD — and why"
      lede="Most buyers inherit their material from whoever supplied them last. Four questions about what you actually pack, and we will tell you which of the three fits — including when that is not the one we would rather sell you."
      aside={
        <ToolCTA
          title="Try all three"
          body="We will send samples of LD, LLD and HD in your size so you can test them against your own contents rather than take our word for it."
        />
      }
      footnote={
        <p>
          The selector scores each material across your four answers and shows the working,
          because a recommendation you cannot check is just an opinion. Weighting reflects
          how these materials behave in practice: puncture resistance dominates for sharp
          contents, clarity dominates when the customer sees the bag, and tensile strength
          starts to matter above about five kilograms.
        </p>
      }
    >
      <MaterialClient />
    </ToolShell>
  );
}

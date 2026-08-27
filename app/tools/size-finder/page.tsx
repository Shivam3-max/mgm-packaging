import type { Metadata } from "next";
import ToolShell, { ToolCTA } from "@/components/ToolShell";
import SizeFinderClient from "./SizeFinderClient";

export const metadata: Metadata = {
  title: "Bag Size Finder — What Size Polybag Do I Need?",
  description:
    "Enter your product dimensions and get the right flat or gusseted polybag size, with seal and headspace allowance already added.",
};

export default function Page() {
  return (
    <ToolShell
      eyebrow="Bag size finder"
      title="The right size, worked out from your product"
      lede="Most units are running a bag an inch or two larger than they need, and paying for that inch on every single piece. Measure the product, not the bag you buy today, and this will tell you what it should have been."
      aside={
        <ToolCTA
          title="Custom sizes from about 100 kg"
          body="Below that a stock size is usually the better buy. Above it, sizing properly pays for the setup within weeks."
        />
      }
      footnote={
        <>
          <p>
            For a flat bag the film has to wrap around the product&apos;s depth, so the flat
            width is the product width plus its depth, plus half an inch of ease so the bag is
            not a struggle to fill. For a gusseted bag the depth is carried by the gusset
            instead, so the flat width stays close to the product width.
          </p>
          <p className="mt-3">
            Length is the product height plus a closing allowance — two inches for a fold-over,
            one for a heat seal, one and a half for a zip track and lip — plus half an inch
            consumed by the bottom seal. Everything rounds up to the half inch, because that is
            how bags are cut.
          </p>
        </>
      }
    >
      <SizeFinderClient />
    </ToolShell>
  );
}

import type { Metadata } from "next";
import ToolShell, { ToolCTA } from "@/components/ToolShell";
import PrintClient from "./PrintClient";

export const metadata: Metadata = {
  title: "Print & Artwork Estimator — Printed Polybags",
  description:
    "Work out usable print area, cylinder count and film weight for printed polybags, with an artwork checklist that turns a logo into a quotable specification.",
};

export default function Page() {
  return (
    <ToolShell
      eyebrow="Print & artwork"
      title="Turn “can you print our logo?” into a specification"
      lede="Printing questions stall more quotes than pricing does, because the answer depends on things nobody thinks to mention — how many colours, which faces, how much of the bag it covers. Answer them here and the quote takes a day instead of a week."
      aside={
        <ToolCTA
          title="Send the artwork"
          body="Attach your logo to a quote request and we will send back a digital proof before anything is printed."
        />
      }
      footnote={
        <>
          <p>
            Usable print area allows half an inch off the length for the seal margin — heat
            through ink is the most common printing failure — and a quarter inch at each side.
            Cylinder count is colours multiplied by printed faces; each cylinder is a one-time
            cost per design and we keep it for your repeat orders.
          </p>
          <p className="mt-3">
            Ink coverage does not change the film cost, but it does change ink consumption and
            drying, which is why we ask. Solid coverage across a large bag behaves very
            differently from a small logo.
          </p>
        </>
      }
    >
      <PrintClient />
    </ToolShell>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { SectionHead } from "@/components/Cards";

export const metadata: Metadata = {
  title: "Polybag Tools — Weight, Cost, Thickness & Size Calculators",
  description:
    "Six free calculators for polybag buyers: bag weight and cost per piece, micron–gauge–mil conversion, material selection, bag sizing, plastic-rule compliance and print estimating.",
};

const TOOLS = [
  {
    href: "/tools/calculator",
    n: "01",
    name: "Bag weight & cost calculator",
    desc: "Polybags are sold by the kilo and used by the piece. Enter size, thickness and your rate per kilogram to get weight per bag, bags per kilo and cost per piece.",
    flag: "Most used",
  },
  {
    href: "/tools/thickness",
    n: "02",
    name: "Micron · gauge · mil converter",
    desc: "Indian trade quotes gauge, specifications are written in micron, imported standards use mil. Convert all three — plus a thickness advisor based on what the bag has to carry.",
  },
  {
    href: "/tools/material",
    n: "03",
    name: "Material selector",
    desc: "LD, LLD or HD? Four questions about your contents and handling, and a recommendation with the reasoning shown so you can check our working.",
  },
  {
    href: "/tools/size-finder",
    n: "04",
    name: "Bag size finder",
    desc: "Enter your product's dimensions and get the right flat or gusseted bag size, with seal and headspace allowance already added.",
  },
  {
    href: "/tools/compliance-check",
    n: "05",
    name: "Plastic rules checker",
    desc: "Three questions to find out whether the 120-micron rule, Rule 11A marking or EPR registration actually apply to your packaging.",
  },
  {
    href: "/tools/print-estimator",
    n: "06",
    name: "Print & artwork estimator",
    desc: "Colours, coverage and print area against bag size — with an artwork checklist that turns “can you print our logo?” into a quotable specification.",
  },
];

export default function ToolsPage() {
  return (
    <>
      <section className="section--tight pt-12 md:pt-16">
        <div className="wrap">
          <Reveal immediate>
            <SectionHead
              eyebrow="Buyer tools"
              title="Six calculators that do the arithmetic buyers actually have to do"
              lede="Free, no sign-up, and no email gate. They exist because we would rather deal with a buyer who knows their specification than one who is guessing — the quote is faster and neither of us wastes a week."
            />
          </Reveal>
        </div>
      </section>

      <section className="pb-6">
        <div className="wrap">
          <Reveal group className="grid gap-4 md:grid-cols-2">
            {TOOLS.map((t) => (
              <Link key={t.href} href={t.href} className="card card--hover group grid content-start gap-3 p-7">
                <div className="flex items-center justify-between gap-3">
                  <span className="spec spec--lime">{t.n}</span>
                  {t.flag && <span className="tag tag--lime">{t.flag}</span>}
                </div>
                <h2 className="display-sm text-[1.2rem]">{t.name}</h2>
                <p className="text-[.93rem] leading-relaxed text-ink-2">{t.desc}</p>
                <span className="spec spec--navy pt-1 transition-transform duration-300 group-hover:translate-x-1">
                  Open the tool →
                </span>
              </Link>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <Reveal>
            <div className="dark-block rounded-[var(--r-lg)] p-8 sm:p-11">
              <div className="grid gap-7 lg:grid-cols-12 lg:items-center">
                <div className="lg:col-span-8">
                  <p className="spec" style={{ color: "var(--lime)" }}>Why these are free</p>
                  <h2 className="display-md mt-2.5 text-[clamp(1.5rem,3vw,2.1rem)] text-white">
                    An informed buyer is a cheaper customer to serve.
                  </h2>
                  <p className="measure mt-3.5 text-[1rem] leading-relaxed text-on-dark-2">
                    Most of the back-and-forth in this trade is people working out what they
                    need. If you arrive with a size, a micron and a quantity, we can quote you
                    the same day — and you can check our number against your own.
                  </p>
                </div>
                <div className="grid gap-2.5 lg:col-span-4">
                  <Link href="/rfq" className="btn btn--lime w-full">Request a quote</Link>
                  <Link href="/downloads" className="btn btn--ghost-dark w-full">Download the charts</Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import EnquiryForm from "@/components/EnquiryForm";
import { SITE } from "@/data/company";

export const metadata: Metadata = {
  title: "Free Polybag Samples — Delivered Across the BBN Belt",
  description:
    "Request free LLDPE polybag samples in the sizes and thicknesses that suit what you pack. No commitment, delivered across Baddi, Barotiwala, Nalagarh and beyond.",
};

const INCLUDED = [
  "Bags in the sizes and thicknesses that suit what you actually pack",
  "More than one micron, so you can feel the difference before you commit",
  "Zip lock, gusset or plain — whichever is relevant to your job",
  "The specification written down, so you know exactly what you tested",
];

export default function SamplesPage() {
  return (
    <>
      <section className="section--tight pt-12 md:pt-16">
        <div className="wrap grid gap-10 lg:grid-cols-12 lg:items-start">
          <Reveal className="lg:col-span-7">
            <p className="spec spec--lime">Free samples</p>
            <h1 className="display mt-3 text-[clamp(2.1rem,5vw,3.4rem)]">
              Hold the bag before you buy a hundred kilos of it.
            </h1>
            <p className="measure mt-5 text-[1.04rem] leading-relaxed text-ink-2">
              The most useful quality test is the one you run yourself: fill it, seal it, drop
              it, and see what happens. Tell us what you pack and we will send samples that
              are actually relevant to it — not a generic pack of whatever was on the shelf.
            </p>
            <p className="measure mt-4 text-[1.04rem] leading-relaxed text-ink-2">
              Free, no commitment, and nobody will call you every week afterwards.
            </p>

            <ul className="mt-7 grid gap-2.5">
              {INCLUDED.map((i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-[.55rem] h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "var(--lime)" }} />
                  <span className="text-[.95rem] leading-relaxed text-ink-2">{i}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="lg:col-span-5" delay={120}>
            <div className="film-stack">
              <div className="film-stack-inner overflow-hidden">
                <Image
                  src="/img/feature-bags-pair.webp"
                  alt="LLDPE polybags — filled and folded"
                  width={880}
                  height={940}
                  priority
                  className="h-auto w-full"
                />
                <div className="grid gap-1 border-t border-hairline px-5 py-4">
                  <p className="spec spec--lime">Delivery</p>
                  <p className="text-[.92rem] leading-relaxed text-ink-2">
                    Usually within the week across {SITE.serviceArea.slice(0, 4).join(", ")} and
                    the rest of the belt.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="pb-16">
        <div className="wrap">
          <Reveal className="mx-auto max-w-[760px]">
            <EnquiryForm kind="sample" />
          </Reveal>
        </div>
      </section>
    </>
  );
}

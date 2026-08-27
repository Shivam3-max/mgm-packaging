import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { IndustryCard, SectionHead } from "@/components/Cards";
import { industries } from "@/data/industries";
import { BBN } from "@/data/company";

export const metadata: Metadata = {
  title: "Industries We Supply — Pharma, Garment, Food, Industrial, E-commerce",
  description:
    "LLDPE polybags for pharmaceutical, garment, food, industrial, e-commerce and general packing — supplied across the Baddi–Barotiwala–Nalagarh belt.",
};

export default function IndustriesPage() {
  return (
    <>
      <section className="section--tight pt-12 md:pt-16">
        <div className="wrap">
          <Reveal>
            <SectionHead
              eyebrow="Who we supply"
              title="Six industries, six different definitions of a good bag"
              lede="A garment exporter, a QA head and a D2C operations lead will all say they need a “strong, moisture-resistant bag”. They mean three completely different specifications. Each page below is written for the person who actually signs the packaging off."
            />
          </Reveal>
        </div>
      </section>

      <section className="pb-6">
        <div className="wrap">
          <Reveal group className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((i) => <IndustryCard key={i.slug} i={i} />)}
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <Reveal>
            <div className="dark-block rounded-[var(--r-lg)] p-8 sm:p-12">
              <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
                <div className="lg:col-span-7">
                  <p className="spec" style={{ color: "var(--lime)" }}>Our neighbourhood</p>
                  <h2 className="display-md mt-3 text-[clamp(1.6rem,3.2vw,2.3rem)] text-white">
                    {BBN.industrialUnits} units, and most of them need polybags.
                  </h2>
                  <p className="measure mt-4 text-[1rem] leading-relaxed text-on-dark-2">
                    The Baddi–Barotiwala–Nalagarh corridor produces {BBN.formulationShare} of
                    India&apos;s formulation drugs and employs {BBN.workers} people. We are
                    inside it — which means the industries listed here are not target markets,
                    they are the units down the road.
                  </p>
                </div>
                <div className="grid gap-2.5 lg:col-span-5">
                  <Link href="/samples" className="btn btn--lime w-full">Get free samples</Link>
                  <Link href="/contact" className="btn btn--ghost-dark w-full">Visit the unit</Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import Seal from "@/components/Seal";
import ProcessSequence from "@/components/ProcessSequence";
import { SectionHead } from "@/components/Cards";
import { SITE } from "@/data/company";

export const metadata: Metadata = {
  title: "How We Make It — Granule to Gusset",
  description:
    "From virgin LLDPE granule to finished polybag: extrusion, printing, sealing and dispatch at MGM Packaging, Barotiwala, Baddi. What we check and why.",
};

const CHECKS = [
  { t: "Granule grade", d: "Every batch is virgin film-grade LLDPE. We do not run reprocessed material, and we record the grade against the batch." },
  { t: "Thickness profile", d: "Gauge is checked through the run, not just at the start. An underweight bag is a shortfall you pay for on every kilogram." },
  { t: "Seal integrity", d: "Seals are checked for full fusion. Under-fused peels; over-fused goes brittle at the weld. Both fail in the customer's hands." },
  { t: "Dimension", d: "Cut size checked against the specification, because a bag half an inch short is a bag that does not close." },
  { t: "Print registration", d: "Where printed, position is held across the run. Drift means we stop the line rather than ship it." },
  { t: "Count and weight", d: "Packed by weight and counted, so what is on the invoice is what is in the carton." },
];

export default function QualityPage() {
  return (
    <>
      <section className="section--tight pt-12 md:pt-16">
        <div className="wrap grid gap-10 lg:grid-cols-12 lg:items-start">
          <Reveal immediate className="lg:col-span-7">
            <SectionHead
              eyebrow="How it's made"
              title="Granule to gusset"
              lede="Five steps, and the one thing that decides quality at each. Scroll the sequence below and the material moves with you — because it is one continuous body of polyethylene from the heap to the finished bag."
            />
          </Reveal>
          <Reveal className="lg:col-span-5" delay={120}>
            <div className="film-stack">
              <div className="film-stack-inner overflow-hidden">
                <Image
                  src="/img/feature-bags-trio.webp"
                  alt="Finished LLDPE bags — stand-up, folded and flat"
                  width={880}
                  height={892}
                  priority
                  className="h-auto w-full"
                />
                <div className="flex items-center justify-between gap-3 border-t border-hairline px-4 py-3">
                  <p className="spec spec--navy">{SITE.extruders} extrusion lines</p>
                  <p className="spec">{SITE.capacityKgDay} kg / day</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* the pinned sequence */}
      <section className="pb-4">
        <div className="wrap">
          <ProcessSequence />
        </div>
      </section>

      <div className="wrap"><Seal faint /></div>

      {/* checks */}
      <section className="section">
        <div className="wrap">
          <Reveal>
            <SectionHead
              eyebrow="What we check"
              title="Six checks, and why each one exists"
              lede="We hold no third-party quality certification today, so we are not going to imply one. What we can tell you is exactly what gets checked and what happens when it fails — which is more useful anyway."
            />
          </Reveal>

          <Reveal group className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {CHECKS.map((c, i) => (
              <div key={c.t} className="card p-6">
                <span className="spec spec--lime">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="display-sm mt-2 text-[1.02rem]">{c.t}</h3>
                <p className="mt-2 text-[.91rem] leading-relaxed text-ink-2">{c.d}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* material statement */}
      <section className="section" style={{ background: "var(--ground-2)" }}>
        <div className="wrap grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <p className="spec spec--lime">Material statement</p>
            <h2 className="display-md mt-2 text-[clamp(1.5rem,3vw,2.1rem)]">
              What we will put in writing
            </h2>
            <p className="measure mt-5 text-[1rem] leading-relaxed text-ink-2">
              For pharmaceutical and food customers, the specification matters more than the
              sales pitch. Against any enquiry we will confirm the following in writing, so it
              can go straight into your supplier file.
            </p>
            <ul className="mt-6 grid gap-3">
              {SITE.materialClaims.map((c) => (
                <li key={c} className="card flex gap-3 p-4">
                  <span
                    className="mt-[.45rem] h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ background: "var(--lime)" }}
                  />
                  <span className="text-[.93rem] leading-relaxed text-ink-2">{c}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="lg:col-span-6" delay={120}>
            <div className="dark-block rounded-[var(--r)] p-7 sm:p-8">
              <p className="spec" style={{ color: "var(--lime)" }}>The unit, in numbers</p>
              <dl className="mt-5 grid gap-4">
                {[
                  ["Extrusion lines", `${SITE.extruders}`],
                  ["Sealing machines", `${SITE.sealingMachines}`],
                  ["Printing", SITE.printingInHouse ? `In-house, up to ${SITE.printColours} colours` : "Outsourced"],
                  ["Thickness range", `${SITE.micronMin} – ${SITE.micronMax} micron`],
                  ["Flat width range", `${SITE.minBagWidthInch}" – ${SITE.maxBagWidthInch}"`],
                  ["Daily capacity", `${SITE.capacityKgDay} kg`],
                  ["Minimum order", `${SITE.moqKg} kg ${SITE.moqBasis}`],
                ].map(([k, v], i, arr) => (
                  <div
                    key={k}
                    className="flex items-baseline justify-between gap-4"
                    style={{
                      borderBottom: i < arr.length - 1 ? "1px solid rgba(255,255,255,.13)" : "none",
                      paddingBottom: i < arr.length - 1 ? ".9rem" : 0,
                    }}
                  >
                    <dt className="spec" style={{ color: "var(--on-dark-3)" }}>{k}</dt>
                    <dd className="tnum text-right text-[.95rem] text-white">{v}</dd>
                  </div>
                ))}
              </dl>
              <Link href="/contact" className="btn btn--lime mt-6 w-full">
                Come and see the line
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section--tight pb-16">
        <div className="wrap">
          <Reveal className="grid gap-5 text-center">
            <h2 className="display-md mx-auto max-w-[24ch] text-[clamp(1.5rem,3vw,2.1rem)]">
              The best quality check is the one you do yourself.
            </h2>
            <p className="measure mx-auto text-[1rem] leading-relaxed text-ink-2">
              Ask for samples, put them through whatever your line does to a bag, and buy from
              us only if they hold. That is a better test than any certificate we could show you.
            </p>
            <div className="mt-2 flex flex-wrap justify-center gap-2.5">
              <Link href="/samples" className="btn btn--primary">Request free samples</Link>
              <Link href="/compliance" className="btn">Plastic rules, explained</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

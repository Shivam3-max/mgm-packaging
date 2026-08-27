import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import Seal from "@/components/Seal";
import { SectionHead } from "@/components/Cards";
import { MATERIALS, DOWNGAUGE_NOTE } from "@/data/content";
import { SITE } from "@/data/company";

export const metadata: Metadata = {
  title: "Why LLDPE — LDPE vs LLDPE vs HDPE Compared",
  description:
    "An honest comparison of LDPE, LLDPE and HDPE for polybags: tensile strength, puncture resistance, clarity, sealing and cost. Which material your packing actually needs.",
};

const PROPERTIES = [
  { prop: "Tensile strength", ld: "Moderate", lld: "High", hd: "Highest" },
  { prop: "Puncture resistance", ld: "Low", lld: "High", hd: "Moderate" },
  { prop: "Tear resistance", ld: "Moderate", lld: "High", hd: "Moderate" },
  { prop: "Clarity", ld: "Excellent", lld: "Good", hd: "Poor — hazy" },
  { prop: "Gloss", ld: "High", lld: "Moderate", hd: "Low" },
  { prop: "Heat-seal window", ld: "Wide — very forgiving", lld: "Narrower", hd: "Narrow" },
  { prop: "Flexibility", ld: "Very soft", lld: "Soft, stretchy", hd: "Stiff, crinkly" },
  { prop: "Downgauging potential", ld: "Limited", lld: "Excellent", hd: "Good" },
];

export default function WhyLLDPE() {
  return (
    <>
      <section className="section--tight pt-12 md:pt-16">
        <div className="wrap grid gap-10 lg:grid-cols-12 lg:items-start">
          <Reveal className="lg:col-span-7">
            <SectionHead
              eyebrow="The material"
              title="LDPE, LLDPE, HDPE — and which one your packing actually needs"
            />
            <div className="measure mt-6 grid gap-4 text-[1.02rem] leading-relaxed text-ink-2">
              <p>
                Three materials, one family, and a great deal of confusion. They are all
                polyethylene, they all look broadly similar on a shelf, and they behave
                very differently in a warehouse.
              </p>
              <p>
                We build our range on LLDPE, and this page explains why — including the
                cases where it is the wrong answer and you should be buying something else.
              </p>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-5" delay={120}>
            <div className="film-stack">
              <div className="film-stack-inner overflow-hidden">
                <Image
                  src="/img/feature-ziplock-stack.webp"
                  alt="LLDPE zip lock bags and folded film stack"
                  width={880}
                  height={1000}
                  priority
                  className="h-auto w-full"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="wrap"><Seal faint /></div>

      {/* three materials */}
      <section className="section">
        <div className="wrap">
          <Reveal>
            <p className="spec spec--lime">Side by side</p>
            <h2 className="display-md mt-2 text-[clamp(1.5rem,3vw,2.1rem)]">The three of them</h2>
          </Reveal>

          <Reveal group className="mt-8 grid gap-4 lg:grid-cols-3">
            {MATERIALS.map((m) => {
              const hero = m.code === "LLD";
              return (
                <div
                  key={m.code}
                  className="card grid content-start gap-4 p-6"
                  style={hero ? { borderColor: "var(--lime)", borderWidth: 2 } : undefined}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="display-md text-[1.9rem]" style={{ color: hero ? "var(--lime-ink)" : "var(--navy)" }}>
                        {m.name}
                      </p>
                      <p className="spec mt-1">{m.full}</p>
                    </div>
                    {hero && <span className="tag tag--lime">Our default</span>}
                  </div>

                  <dl className="grid gap-1.5 border-y border-hairline py-3">
                    <div className="flex justify-between gap-3">
                      <dt className="spec">Density</dt>
                      <dd className="tnum text-[.85rem] text-ink-2">{m.density}</dd>
                    </div>
                    <div className="flex justify-between gap-3">
                      <dt className="spec">Feel</dt>
                      <dd className="text-[.85rem] text-ink-2">{m.feel}</dd>
                    </div>
                  </dl>

                  <div>
                    <p className="spec" style={{ color: "var(--ok)" }}>Strengths</p>
                    <ul className="mt-2 grid gap-1.5">
                      {m.strengths.map((s) => (
                        <li key={s} className="pl-4 text-[.89rem] leading-relaxed text-ink-2" style={{ position: "relative" }}>
                          <span style={{ position: "absolute", left: 0, top: ".6em", width: 6, height: 2, background: "var(--ok)", borderRadius: 1 }} />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="spec" style={{ color: "var(--warn)" }}>Trade-offs</p>
                    <ul className="mt-2 grid gap-1.5">
                      {m.weaknesses.map((s) => (
                        <li key={s} className="pl-4 text-[.89rem] leading-relaxed text-ink-2" style={{ position: "relative" }}>
                          <span style={{ position: "absolute", left: 0, top: ".6em", width: 6, height: 2, background: "var(--warn)", borderRadius: 1 }} />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <p className="mt-1 border-t border-hairline pt-3 text-[.89rem] leading-relaxed text-ink">
                    <strong>Use it for:</strong> {m.use}
                  </p>
                </div>
              );
            })}
          </Reveal>
        </div>
      </section>

      {/* property table */}
      <section className="section" style={{ background: "var(--ground-2)" }}>
        <div className="wrap">
          <Reveal>
            <p className="spec spec--lime">Property by property</p>
            <h2 className="display-md mt-2 text-[clamp(1.5rem,3vw,2.1rem)]">
              What changes when you change material
            </h2>
          </Reveal>

          <Reveal className="tablewrap mt-8">
            <table className="spec-table">
              <thead>
                <tr>
                  <th>Property</th>
                  <th>LDPE</th>
                  <th style={{ color: "var(--lime-ink)" }}>LLDPE</th>
                  <th>HDPE</th>
                </tr>
              </thead>
              <tbody>
                {PROPERTIES.map((p) => (
                  <tr key={p.prop}>
                    <td className="display-sm text-[.9rem]">{p.prop}</td>
                    <td className="text-ink-2">{p.ld}</td>
                    <td style={{ color: "var(--lime-ink)", fontWeight: 500 }}>{p.lld}</td>
                    <td className="text-ink-2">{p.hd}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </div>
      </section>

      {/* downgauging */}
      <section className="section dark-block" style={{ background: "var(--navy)" }}>
        <div className="wrap grid gap-10 lg:grid-cols-12 lg:items-center">
          <Reveal className="lg:col-span-7">
            <p className="spec" style={{ color: "var(--lime)" }}>The argument that costs us money</p>
            <h2 className="display-md mt-3 text-[clamp(1.6rem,3.2vw,2.3rem)] text-white">
              A thinner bag that works better
            </h2>
            <p className="measure mt-5 text-[1.02rem] leading-relaxed text-on-dark-2">{DOWNGAUGE_NOTE}</p>
          </Reveal>

          <Reveal className="lg:col-span-5" delay={120}>
            <div
              className="rounded-[var(--r)] p-6"
              style={{ background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.15)" }}
            >
              <p className="spec" style={{ color: "var(--lime)" }}>Worked example</p>
              <dl className="mt-4 grid gap-3">
                {[
                  ["Current bag", 'LDPE, 10" × 12", 60 micron'],
                  ["Weight per bag", "8.6 g"],
                  ["Switched to", 'LLDPE, 10" × 12", 50 micron'],
                  ["New weight per bag", "7.2 g"],
                  ["Film saved", "≈ 17% per bag"],
                ].map(([k, v], i) => (
                  <div key={k} className="flex items-baseline justify-between gap-3"
                       style={{ borderBottom: i < 4 ? "1px solid rgba(255,255,255,.12)" : "none", paddingBottom: i < 4 ? ".7rem" : 0 }}>
                    <dt className="spec" style={{ color: "var(--on-dark-3)" }}>{k}</dt>
                    <dd className="tnum text-right text-[.92rem] text-white">{v}</dd>
                  </div>
                ))}
              </dl>
              <Link href="/tools/calculator" className="btn btn--lime mt-5 w-full">
                Run your own numbers
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="section--tight pb-16">
        <div className="wrap">
          <Reveal className="grid gap-5 text-center">
            <h2 className="display-md mx-auto max-w-[22ch] text-[clamp(1.5rem,3vw,2.1rem)]">
              Still not sure which material you need?
            </h2>
            <p className="measure mx-auto text-[1rem] leading-relaxed text-ink-2">
              Four questions and the selector will tell you — with the reasoning shown, so
              you can check our working rather than take our word for it.
            </p>
            <div className="mt-2 flex flex-wrap justify-center gap-2.5">
              <Link href="/tools/material" className="btn btn--primary">Open the selector</Link>
              <Link href="/samples" className="btn btn--lime">Get samples of each</Link>
            </div>
            <p className="spec mt-3">
              We run all three: LD, LLD and HD, {SITE.micronMin}–{SITE.micronMax} micron.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}

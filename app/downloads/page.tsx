import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Seal from "@/components/Seal";
import PrintButton from "@/components/PrintButton";
import { SectionHead } from "@/components/Cards";
import { MATERIALS } from "@/data/content";
import { SITE } from "@/data/company";
import { micronToGauge, micronToMil, calcBag, num, num0 } from "@/lib/calc";

export const metadata: Metadata = {
  title: "Reference Sheets — Size Chart, Micron Conversion, Capability",
  description:
    "Polybag stock size chart, micron–gauge–mil conversion table, material comparison and MGM Packaging's capability summary. Print or save as PDF.",
};

const SIZES = [
  { size: '8" × 10"', w: 8, l: 10, micron: "25 – 50", use: "Small components, garments, documents" },
  { size: '10" × 12"', w: 10, l: 12, micron: "30 – 60", use: "General purpose, retail packing" },
  { size: '12" × 16"', w: 12, l: 16, micron: "40 – 75", use: "Folded garments, mid-weight goods" },
  { size: '14" × 20"', w: 14, l: 20, micron: "50 – 100", use: "Bulk packing, dispatch" },
  { size: '16" × 24"', w: 16, l: 24, micron: "50 – 125", use: "Carton liners, large goods" },
  { size: '18" × 30"', w: 18, l: 30, micron: "75 – 150", use: "Heavy bulk, drum liners" },
];

const THICKNESSES = [15, 20, 25, 30, 40, 50, 60, 75, 100, 125, 150, 200];

const SECTIONS = [
  { id: "size-chart", n: "01", t: "Stock size chart", d: "Every stock size with recommended thickness and weight per bag." },
  { id: "conversion", n: "02", t: "Micron · gauge · mil", d: "The three units side by side, for the thicknesses we run." },
  { id: "materials", n: "03", t: "Material comparison", d: "LD, LLD and HD on strength, clarity, sealing and use." },
  { id: "capability", n: "04", t: "Capability summary", d: "What we run, in what range, and how fast." },
];

export default function DownloadsPage() {
  return (
    <>
      <section className="section--tight pt-12 md:pt-16">
        <div className="wrap">
          <Reveal immediate>
            <SectionHead
              eyebrow="Reference sheets"
              title="The four tables worth pinning above a packing bench"
              lede="No email gate and no download form — they are right here on the page. Use your browser's print dialogue to save any of them as a PDF, or just bookmark this page."
            />
          </Reveal>

          <Reveal className="mt-8 flex flex-wrap gap-2.5">
            <PrintButton />
            {SECTIONS.map((s) => (
              <a key={s.id} href={`#${s.id}`} className="btn">{s.t}</a>
            ))}
          </Reveal>
        </div>
      </section>

      <div className="wrap"><Seal faint /></div>

      {/* 01 — sizes */}
      <section id="size-chart" className="section">
        <div className="wrap">
          <Reveal>
            <p className="spec spec--lime">01 — Stock size chart</p>
            <h2 className="display-md mt-2 text-[clamp(1.5rem,3vw,2.1rem)]">Stock sizes</h2>
            <p className="measure mt-3 text-[.98rem] leading-relaxed text-ink-2">
              Weight is shown at the mid-point of the recommended range, for LLDPE. Any other
              size is a custom run — see the size finder.
            </p>
          </Reveal>

          <Reveal className="tablewrap mt-7">
            <table className="spec-table">
              <thead>
                <tr>
                  <th>Size</th><th>Recommended</th><th>Weight / bag</th>
                  <th>Bags / kg</th><th>Typical use</th>
                </tr>
              </thead>
              <tbody>
                {SIZES.map((s) => {
                  const mid = s.micron.split("–").map((x) => +x.trim());
                  const um = Math.round((mid[0] + mid[1]) / 2);
                  const b = calcBag({ widthIn: s.w, lengthIn: s.l, micron: um });
                  return (
                    <tr key={s.size}>
                      <td className="num" style={{ color: "var(--navy)" }}>{s.size}</td>
                      <td className="num text-ink-2">{s.micron} µ</td>
                      <td className="num text-ink-2">{num(b.gramsPerBag, 2)} g <span className="text-ink-4">@ {um}µ</span></td>
                      <td className="num text-ink-2">{num0(b.bagsPerKg)}</td>
                      <td className="text-ink-2">{s.use}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Reveal>
        </div>
      </section>

      {/* 02 — conversion */}
      <section id="conversion" className="section" style={{ background: "var(--ground-2)" }}>
        <div className="wrap">
          <Reveal>
            <p className="spec spec--lime">02 — Conversion</p>
            <h2 className="display-md mt-2 text-[clamp(1.5rem,3vw,2.1rem)]">Micron, gauge and mil</h2>
            <p className="measure mt-3 text-[.98rem] leading-relaxed text-ink-2">
              100 gauge = 25 micron. One mil = 25.4 micron. These are the thicknesses we
              actually run — anything between them is possible too.
            </p>
          </Reveal>

          <Reveal className="tablewrap mt-7">
            <table className="spec-table">
              <thead>
                <tr><th>Micron</th><th>Gauge</th><th>Mil</th><th>Typically used for</th></tr>
              </thead>
              <tbody>
                {THICKNESSES.map((t) => (
                  <tr key={t}>
                    <td className="num" style={{ color: "var(--navy)" }}>{t} µ</td>
                    <td className="num text-ink-2">{num0(micronToGauge(t))}</td>
                    <td className="num text-ink-2">{num(micronToMil(t), 2)}</td>
                    <td className="text-ink-2">
                      {t <= 25 ? "Very light — single garments, documents"
                        : t <= 40 ? "Light retail and general packing"
                        : t <= 60 ? "General purpose, most common range"
                        : t <= 100 ? "Heavier goods, courier, industrial"
                        : t <= 150 ? "Bulk, carton liners, sharp contents"
                        : "Drum liners, heavy industrial"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </div>
      </section>

      {/* 03 — materials */}
      <section id="materials" className="section">
        <div className="wrap">
          <Reveal>
            <p className="spec spec--lime">03 — Materials</p>
            <h2 className="display-md mt-2 text-[clamp(1.5rem,3vw,2.1rem)]">LD, LLD and HD</h2>
          </Reveal>

          <Reveal className="tablewrap mt-7">
            <table className="spec-table">
              <thead>
                <tr><th>Material</th><th>Density</th><th>Feel</th><th>Strongest at</th><th>Weakest at</th><th>Use for</th></tr>
              </thead>
              <tbody>
                {MATERIALS.map((m) => (
                  <tr key={m.code}>
                    <td className="display-sm text-[.95rem]" style={{ color: m.code === "LLD" ? "var(--lime-ink)" : "var(--navy)" }}>
                      {m.name}
                    </td>
                    <td className="num text-ink-2">{m.density}</td>
                    <td className="text-ink-2">{m.feel}</td>
                    <td className="text-ink-2">{m.strengths[0]}</td>
                    <td className="text-ink-2">{m.weaknesses[0]}</td>
                    <td className="text-ink-2">{m.use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>

          <Reveal className="mt-5">
            <Link href="/why-lldpe" className="btn">The full comparison</Link>
          </Reveal>
        </div>
      </section>

      {/* 04 — capability */}
      <section id="capability" className="section pb-16" style={{ background: "var(--ground-2)" }}>
        <div className="wrap">
          <Reveal>
            <p className="spec spec--lime">04 — Capability</p>
            <h2 className="display-md mt-2 text-[clamp(1.5rem,3vw,2.1rem)]">
              What MGM Packaging can run
            </h2>
            <p className="measure mt-3 text-[.98rem] leading-relaxed text-ink-2">
              The one-page summary a purchase team can put in a supplier file.
            </p>
          </Reveal>

          <Reveal className="mt-7 grid gap-4 lg:grid-cols-2">
            <div className="card p-6 sm:p-7">
              <p className="spec spec--lime">Production</p>
              <dl className="mt-4 grid gap-3">
                {[
                  ["Products", "Plain, printed, zip lock, gusset, coloured, custom"],
                  ["Materials", "LDPE, LLDPE, HDPE"],
                  ["Thickness range", `${SITE.micronMin} – ${SITE.micronMax} micron`],
                  ["Maximum flat width", `${SITE.maxBagWidthInch} inches`],
                  ["Extrusion lines", `${SITE.extruders}`],
                  ["Sealing machines", `${SITE.sealingMachines}`],
                  ["Printing", `In-house, up to ${SITE.printColours} colours`],
                  ["Daily capacity", `${SITE.capacityKgDay} kg`],
                ].map(([k, v], i, arr) => (
                  <div key={k} className="flex items-baseline justify-between gap-4"
                       style={{ borderBottom: i < arr.length - 1 ? "1px solid var(--hairline)" : "none", paddingBottom: i < arr.length - 1 ? ".75rem" : 0 }}>
                    <dt className="spec">{k}</dt>
                    <dd className="text-right text-[.9rem] text-ink">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="card p-6 sm:p-7">
              <p className="spec spec--lime">Commercial</p>
              <dl className="mt-4 grid gap-3">
                {[
                  ["Minimum order", `${SITE.moqKg} kg (stock sizes)`],
                  ["Custom size minimum", "≈ 100 kg"],
                  ["Custom colour minimum", "≈ 200 kg"],
                  ["Lead time — stock", SITE.leadTimeStock],
                  ["Lead time — custom", SITE.leadTimeCustom],
                  ["Lead time — printed", SITE.leadTimePrinted],
                  ["Payment terms", SITE.paymentTerms],
                  ["Delivery", SITE.freeDeliveryNote],
                ].map(([k, v], i, arr) => (
                  <div key={k} className="flex items-baseline justify-between gap-4"
                       style={{ borderBottom: i < arr.length - 1 ? "1px solid var(--hairline)" : "none", paddingBottom: i < arr.length - 1 ? ".75rem" : 0 }}>
                    <dt className="spec">{k}</dt>
                    <dd className="text-right text-[.9rem] text-ink">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>

          <Reveal className="mt-4">
            <div className="card p-6 sm:p-7">
              <p className="spec spec--lime">Material statement</p>
              <ul className="mt-4 grid gap-2.5">
                {SITE.materialClaims.map((c) => (
                  <li key={c} className="flex gap-3">
                    <span className="mt-[.55rem] h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "var(--lime)" }} />
                    <span className="text-[.93rem] leading-relaxed text-ink-2">{c}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 border-t border-hairline pt-4 text-[.88rem] leading-relaxed text-ink-3">
                MGM Packaging holds no third-party quality certification at present, and does
                not claim one. We will confirm material grade and specification in writing
                against any enquiry.
              </p>
            </div>
          </Reveal>

          <Reveal className="mt-7 flex flex-wrap gap-2.5">
            <PrintButton label="Print this page" />
            <Link href="/rfq" className="btn btn--primary">Request a quote</Link>
            <Link href="/contact" className="btn">Contact us</Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { ProductCard, SectionHead } from "@/components/Cards";
import { products } from "@/data/products";
import { SITE } from "@/data/company";

export const metadata: Metadata = {
  title: "Polybag Range — Plain, Printed, Zip Lock, Gusset & Coloured",
  description:
    "Six types of LLDPE polybag made in Barotiwala, Baddi: plain, printed, zip lock, gusset, LD/HD custom sizes and coloured. 15–200 micron, any size.",
};

export default function ProductsPage() {
  return (
    <>
      <section className="section--tight pt-12 md:pt-16">
        <div className="wrap">
          <Reveal>
            <SectionHead
              eyebrow="The range"
              title="Six bags. Pick by what you're packing, not by what it's called."
              lede="Every page below tells you what the bag is for and what it is not for. If a cheaper bag would do your job, we say so — you will find that out eventually anyway, and we would rather you heard it from us."
            />
          </Reveal>
        </div>
      </section>

      <section className="pb-6">
        <div className="wrap">
          <Reveal group className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p, i) => (
              <ProductCard key={p.slug} p={p} priority={i < 3} />
            ))}
          </Reveal>
        </div>
      </section>

      {/* comparison */}
      <section className="section">
        <div className="wrap">
          <Reveal>
            <SectionHead
              eyebrow="Side by side"
              title="The whole range, compared"
              lede="If you already know your specification, this table is faster than six pages."
            />
          </Reveal>

          <Reveal className="tablewrap mt-8">
            <table className="spec-table">
              <thead>
                <tr>
                  <th>Bag</th>
                  <th>Best for</th>
                  <th>Thickness</th>
                  <th>Printable</th>
                  <th>Typical use</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.slug}>
                    <td>
                      <Link href={`/products/${p.slug}`} className="display-sm text-[.95rem] link-underline">
                        {p.name}
                      </Link>
                    </td>
                    <td className="text-ink-2">{p.bestFor}</td>
                    <td className="num text-ink-2">{p.specs[1].value}</td>
                    <td className="text-ink-2">
                      {p.slug === "coloured" || p.slug === "printed" ? "Yes — 2 colours" :
                       p.slug === "custom-sizes" ? "Yes" : "Yes, on request"}
                    </td>
                    <td className="text-ink-2">{p.sizes[0].use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>

          <Reveal className="mt-6">
            <p className="spec">
              All sizes are indicative. Custom dimensions from {SITE.micronMin} to {SITE.micronMax} micron,
              up to {SITE.maxBagWidthInch}&quot; flat width.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section--tight pb-16">
        <div className="wrap">
          <Reveal>
            <div className="dark-block rounded-[var(--r-lg)] p-8 sm:p-11">
              <div className="grid gap-7 lg:grid-cols-12 lg:items-center">
                <div className="lg:col-span-8">
                  <p className="spec" style={{ color: "var(--lime)" }}>Not sure which?</p>
                  <h2 className="display-md mt-2.5 text-[clamp(1.5rem,3vw,2.1rem)] text-white">
                    Send us the bag you buy today.
                  </h2>
                  <p className="measure mt-3.5 text-[1rem] leading-relaxed text-on-dark-2">
                    It is the fastest route to an accurate quote. We will measure the size,
                    check the gauge, identify the material and quote against it — and tell you
                    if you are paying for more film than you need.
                  </p>
                </div>
                <div className="grid gap-2.5 lg:col-span-4">
                  <Link href="/samples" className="btn btn--lime w-full">Send us a sample</Link>
                  <Link href="/tools/material" className="btn btn--ghost-dark w-full">Use the selector</Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

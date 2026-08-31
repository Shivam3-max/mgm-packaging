import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Seal from "@/components/Seal";
import BagAnatomy from "@/components/BagAnatomy";
import AddToQuote from "@/components/AddToQuote";
import { ProductCard } from "@/components/Cards";
import { products, productBySlug } from "@/data/products";
import { industries } from "@/data/industries";
import { SITE } from "@/data/company";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = productBySlug(slug);
  if (!p) return {};
  return {
    title: `${p.name} — ${p.tagline}`,
    description: `${p.bestFor} Made in Barotiwala, Baddi. ${p.specs[1].value}. Custom sizes, free samples across the BBN belt.`,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = productBySlug(slug);
  if (!p) notFound();

  const related = products.filter((x) => x.slug !== p.slug).slice(0, 3);
  const forIndustries = industries.filter((i) => p.industries.includes(i.slug));

  return (
    <>
      {/* ═══════════ HEAD ═══════════ */}
      <section className="section--tight pt-10 md:pt-14">
        <div className="wrap">
          <Reveal immediate className="grid gap-10 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-7">
              <nav aria-label="Breadcrumb" className="spec mb-5">
                <Link href="/products" className="hover:text-[var(--navy)]">Products</Link>
                <span className="px-2 text-ink-4">/</span>
                <span className="text-ink-3">{p.short}</span>
              </nav>

              <h1 className="display text-[clamp(2.1rem,5vw,3.5rem)]">{p.name}</h1>
              <p className="display-sm mt-3 text-[1.1rem]" style={{ color: "var(--lime-ink)" }}>
                {p.tagline}
              </p>

              <div className="measure mt-6 grid gap-4 text-[1.02rem] leading-relaxed text-ink-2">
                {p.intro.map((t, i) => <p key={i}>{t}</p>)}
              </div>

              {/* the honest bit */}
              <div
                className="mt-7 rounded-[var(--r)] border p-5"
                style={{ background: "var(--warn-wash)", borderColor: "color-mix(in srgb, var(--warn) 28%, transparent)" }}
              >
                <p className="spec" style={{ color: "var(--warn)" }}>When not to buy this</p>
                <p className="mt-2 text-[.95rem] leading-relaxed text-ink-2">{p.notFor}</p>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="film-stack">
                <div className="film-stack-inner overflow-hidden">
                  <Image
                    src={p.image}
                    alt={p.name}
                    width={880}
                    height={730}
                    priority
                    className="h-auto w-full"
                  />
                  <div className="grid gap-1 border-t border-hairline px-5 py-4">
                    <p className="spec spec--lime">Best for</p>
                    <p className="text-[.92rem] leading-relaxed text-ink-2">{p.bestFor}</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="wrap"><Seal faint /></div>

      {/* ═══════════ ANATOMY (3D) ═══════════ */}
      <section className="section">
        <div className="wrap">
          <Reveal>
            <BagAnatomy slug={p.slug} image={p.image} name={p.name} anatomy={p.anatomy} />
          </Reveal>
        </div>
      </section>

      {/* ═══════════ FEATURES ═══════════ */}
      <section className="section" style={{ background: "var(--ground-2)" }}>
        <div className="wrap">
          <Reveal>
            <p className="spec spec--lime">What you get</p>
            <h2 className="display-md mt-2 text-[clamp(1.5rem,3vw,2.1rem)]">
              Four things we hold to
            </h2>
          </Reveal>

          <Reveal group className="mt-8 grid gap-3 sm:grid-cols-2">
            {p.features.map((f) => (
              <div key={f.title} className="card p-6">
                <h3 className="display-sm text-[1.02rem]">{f.title}</h3>
                <p className="mt-2 text-[.92rem] leading-relaxed text-ink-2">{f.body}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ═══════════ SPECS + SIZES ═══════════ */}
      <section className="section">
        <div className="wrap grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="spec spec--lime">Specification</p>
            <h2 className="display-md mt-2 text-[1.5rem]">The numbers</h2>
            <dl className="mt-6 grid overflow-hidden rounded-[var(--r)] border border-hairline">
              {p.specs.map((s, i) => (
                <div
                  key={s.label}
                  className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] gap-3 px-4 py-3"
                  style={{
                    background: i % 2 ? "var(--surface-2)" : "var(--surface)",
                    borderBottom: i === p.specs.length - 1 ? "none" : "1px solid var(--hairline)",
                  }}
                >
                  <dt className="spec">{s.label}</dt>
                  <dd className="text-[.9rem] text-ink">{s.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal className="lg:col-span-7">
            <p className="spec spec--lime">Sizes</p>
            <h2 className="display-md mt-2 text-[1.5rem]">Stock sizes, and anything else</h2>
            <div className="tablewrap mt-6">
              <table className="spec-table">
                <thead>
                  <tr><th>Size</th><th>Thickness</th><th>Typical use</th></tr>
                </thead>
                <tbody>
                  {p.sizes.map((s) => (
                    <tr key={s.size}>
                      <td className="num" style={{ color: "var(--navy)" }}>{s.size}</td>
                      <td className="num text-ink-2">{s.micron} micron</td>
                      <td className="text-ink-2">{s.use}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-[.88rem] leading-relaxed text-ink-3">
              Don&apos;t see your size? That is what{" "}
              <Link href="/tools/size-finder" className="link-underline" style={{ color: "var(--navy)" }}>
                the size finder
              </Link>{" "}
              is for.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═══════════ QUOTE + FAQ ═══════════ */}
      <section className="section" style={{ background: "var(--ground-2)" }}>
        <div className="wrap grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <AddToQuote product={p} />
          </Reveal>

          <Reveal className="lg:col-span-6">
            <p className="spec spec--lime">Common questions</p>
            <h2 className="display-md mt-2 text-[1.5rem]">Before you ask</h2>
            <dl className="mt-6 grid gap-4">
              {p.faq.map((f) => (
                <div key={f.q} className="card p-5">
                  <dt className="display-sm text-[.98rem]">{f.q}</dt>
                  <dd className="mt-2 text-[.92rem] leading-relaxed text-ink-2">{f.a}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-5 flex flex-wrap gap-2.5">
              <Link href="/faq" className="btn">All questions</Link>
              <Link href="/samples" className="btn btn--lime">Free samples</Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════ INDUSTRIES ═══════════ */}
      {forIndustries.length > 0 && (
        <section className="section">
          <div className="wrap">
            <Reveal>
              <p className="spec spec--lime">Who buys this</p>
              <h2 className="display-md mt-2 text-[clamp(1.5rem,3vw,2.1rem)]">
                {p.short} bags are specified most often by
              </h2>
            </Reveal>
            <Reveal group className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {forIndustries.map((i) => (
                <Link key={i.slug} href={`/industries/${i.slug}`} className="card card--hover group grid gap-2 p-5">
                  <p className="spec spec--navy">{i.short}</p>
                  <p className="text-[.9rem] leading-relaxed text-ink-2">{i.tagline}</p>
                  <span className="spec spec--lime pt-1 transition-transform duration-300 group-hover:translate-x-1">
                    Read →
                  </span>
                </Link>
              ))}
            </Reveal>
          </div>
        </section>
      )}

      {/* ═══════════ RELATED ═══════════ */}
      <section className="section--tight pb-16">
        <div className="wrap">
          <Reveal className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="spec spec--lime">Also in the range</p>
              <h2 className="display-md mt-2 text-[1.5rem]">Other bags we make</h2>
            </div>
            <Link href="/products" className="btn shrink-0">All products</Link>
          </Reveal>
          <Reveal group className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => <ProductCard key={r.slug} p={r} />)}
          </Reveal>

          <Reveal className="mt-10">
            <p className="spec text-center">
              Minimum order {SITE.moqKg} kg · {SITE.leadTimeStock} for stock sizes ·{" "}
              {SITE.freeDeliveryNote}
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Seal from "@/components/Seal";
import { IndustryCard } from "@/components/Cards";
import { industries, industryBySlug } from "@/data/industries";
import { productBySlug } from "@/data/products";
import { SITE } from "@/data/company";

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params,
}: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const i = industryBySlug(slug);
  if (!i) return {};
  return {
    title: `${i.name} — ${i.tagline}`,
    description: `LLDPE polybags for ${i.short.toLowerCase()}. ${i.tagline}. Manufactured in Barotiwala, Baddi — free samples across the BBN belt.`,
  };
}

export default async function IndustryPage({
  params,
}: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const ind = industryBySlug(slug);
  if (!ind) notFound();

  const others = industries.filter((x) => x.slug !== ind.slug).slice(0, 3);

  return (
    <>
      <section className="section--tight pt-10 md:pt-14">
        <div className="wrap grid gap-10 lg:grid-cols-12 lg:items-start">
          <Reveal className="lg:col-span-7">
            <nav aria-label="Breadcrumb" className="spec mb-5">
              <Link href="/industries" className="hover:text-[var(--navy)]">Industries</Link>
              <span className="px-2 text-ink-4">/</span>
              <span className="text-ink-3">{ind.short}</span>
            </nav>

            <p className="spec spec--lime">Written for {ind.reader.toLowerCase()}</p>
            <h1 className="display mt-3 text-[clamp(2rem,4.6vw,3.3rem)]">{ind.name}</h1>
            <p className="display-sm mt-3 text-[1.1rem]" style={{ color: "var(--lime-ink)" }}>
              {ind.tagline}
            </p>

            <div className="measure mt-6 grid gap-4 text-[1.02rem] leading-relaxed text-ink-2">
              {ind.intro.map((t, i) => <p key={i}>{t}</p>)}
            </div>
          </Reveal>

          <Reveal className="lg:col-span-5" delay={120}>
            <div className="film-stack">
              <div className="film-stack-inner overflow-hidden">
                <Image
                  src={ind.image}
                  alt={ind.name}
                  width={880}
                  height={740}
                  priority
                  className="h-auto w-full"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="wrap"><Seal faint /></div>

      {/* concerns */}
      <section className="section">
        <div className="wrap">
          <Reveal>
            <p className="spec spec--lime">What actually matters here</p>
            <h2 className="display-md mt-2 text-[clamp(1.5rem,3vw,2.1rem)]">
              The four things {ind.reader.toLowerCase()} ask about
            </h2>
          </Reveal>

          <Reveal group className="mt-8 grid gap-3 sm:grid-cols-2">
            {ind.concerns.map((c, n) => (
              <div key={c.title} className="card p-6">
                <span className="spec spec--lime">{String(n + 1).padStart(2, "0")}</span>
                <h3 className="display-sm mt-2 text-[1.02rem]">{c.title}</h3>
                <p className="mt-2 text-[.92rem] leading-relaxed text-ink-2">{c.body}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* recommended spec */}
      <section className="section" style={{ background: "var(--ground-2)" }}>
        <div className="wrap">
          <Reveal>
            <p className="spec spec--lime">Where we would start</p>
            <h2 className="display-md mt-2 text-[clamp(1.5rem,3vw,2.1rem)]">
              A specification for {ind.short.toLowerCase()}
            </h2>
            <p className="measure mt-4 text-[1rem] leading-relaxed text-ink-2">{ind.specNote}</p>
          </Reveal>

          <Reveal className="tablewrap mt-8">
            <table className="spec-table">
              <thead>
                <tr><th>Product</th><th>Thickness</th><th>Why</th><th></th></tr>
              </thead>
              <tbody>
                {ind.recommended.map((r) => {
                  const p = productBySlug(r.slug);
                  return (
                    <tr key={r.slug}>
                      <td>
                        <Link href={`/products/${r.slug}`} className="display-sm text-[.95rem] link-underline">
                          {r.product}
                        </Link>
                      </td>
                      <td className="num" style={{ color: "var(--navy)" }}>{r.micron}</td>
                      <td className="text-ink-2">{r.note}</td>
                      <td>
                        <Link href={`/products/${r.slug}`} className="spec spec--lime whitespace-nowrap">
                          {p ? "Specify →" : ""}
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Reveal>

          <Reveal className="mt-7 flex flex-wrap gap-2.5">
            <Link href="/rfq" className="btn btn--primary">Request a quote</Link>
            <Link href="/samples" className="btn btn--lime">Get free samples</Link>
            <Link href="/tools/thickness" className="btn">Work out the thickness</Link>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="section--tight pb-16">
        <div className="wrap">
          <Reveal>
            <div className="dark-block rounded-[var(--r-lg)] p-8 sm:p-11">
              <div className="grid gap-7 lg:grid-cols-12 lg:items-center">
                <div className="lg:col-span-8">
                  <p className="spec" style={{ color: "var(--lime)" }}>Talk to a partner</p>
                  <h2 className="display-md mt-2.5 text-[clamp(1.5rem,3vw,2.1rem)] text-white">
                    Tell us what you pack. We&apos;ll tell you what it needs.
                  </h2>
                  <p className="measure mt-3.5 text-[1rem] leading-relaxed text-on-dark-2">
                    {SITE.partners[0].name} handles specification and samples, and answers{" "}
                    {SITE.responseTime}. No form-filling required — a photograph of the bag you
                    use today is usually enough to get started.
                  </p>
                </div>
                <div className="grid gap-2.5 lg:col-span-4">
                  <Link href="/contact" className="btn btn--lime w-full">Contact us</Link>
                  <a href={`tel:${SITE.partners[0].phoneIntl}`} className="btn btn--ghost-dark w-full">
                    {SITE.partners[0].phone}
                  </a>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal className="mt-12">
            <div className="flex flex-wrap items-end justify-between gap-5">
              <h2 className="display-md text-[1.4rem]">Other industries</h2>
              <Link href="/industries" className="btn shrink-0">All industries</Link>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((o) => <IndustryCard key={o.slug} i={o} />)}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

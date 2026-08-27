import Link from "next/link";
import type { ReactNode } from "react";
import Reveal from "./Reveal";
import Seal from "./Seal";

export default function ToolShell({
  eyebrow,
  title,
  lede,
  children,
  aside,
  footnote,
}: {
  eyebrow: string;
  title: string;
  lede: string;
  children: ReactNode;
  aside?: ReactNode;
  footnote?: ReactNode;
}) {
  return (
    <>
      <section className="section--tight pt-10 md:pt-14">
        <div className="wrap">
          <nav aria-label="Breadcrumb" className="spec mb-5">
            <Link href="/tools" className="hover:text-[var(--navy)]">Tools</Link>
            <span className="px-2 text-ink-4">/</span>
            <span className="text-ink-3">{eyebrow}</span>
          </nav>
          <Reveal className="grid gap-3.5">
            <p className="spec spec--lime">{eyebrow}</p>
            <h1 className="display text-[clamp(2rem,4.6vw,3.2rem)]">{title}</h1>
            <p className="measure text-[1.04rem] leading-relaxed text-ink-2">{lede}</p>
          </Reveal>
        </div>
      </section>

      <div className="wrap"><Seal faint /></div>

      <section className="section">
        <div className="wrap grid gap-8 lg:grid-cols-12">
          <div className={aside ? "lg:col-span-8" : "lg:col-span-12"}>{children}</div>
          {aside && (
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-[calc(var(--header-h)+1.5rem)] grid gap-4">{aside}</div>
            </div>
          )}
        </div>

        {footnote && (
          <div className="wrap mt-10">
            <div className="card p-6">
              <p className="spec spec--lime">How this works</p>
              <div className="measure mt-2.5 text-[.92rem] leading-relaxed text-ink-2">{footnote}</div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}

export function ToolCTA({ title, body }: { title: string; body: string }) {
  return (
    <div className="dark-block rounded-[var(--r)] p-6">
      <p className="spec" style={{ color: "var(--lime)" }}>Next step</p>
      <h2 className="display-sm mt-2 text-[1.1rem] text-white">{title}</h2>
      <p className="mt-2.5 text-[.91rem] leading-relaxed text-on-dark-2">{body}</p>
      <div className="mt-5 grid gap-2">
        <Link href="/rfq" className="btn btn--lime w-full">Request a quote</Link>
        <Link href="/samples" className="btn btn--ghost-dark w-full">Get free samples</Link>
      </div>
    </div>
  );
}

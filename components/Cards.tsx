import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/products";
import type { Industry } from "@/data/industries";

export function ProductCard({ p, priority = false }: { p: Product; priority?: boolean }) {
  return (
    <Link href={`/products/${p.slug}`} className="card card--hover group grid overflow-hidden">
      <div className="relative aspect-[4/3] overflow-hidden bg-[var(--ground-2)]">
        <Image
          src={p.image}
          alt={p.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={priority}
          className="object-cover transition-transform duration-[700ms]"
          style={{ transitionTimingFunction: "cubic-bezier(.16,1,.3,1)" }}
        />
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
             style={{ background: "linear-gradient(to top, rgba(2,47,115,.16), transparent 55%)" }} />
      </div>
      <div className="grid gap-2 p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="display-sm text-[1.05rem]">{p.name}</h3>
          <span
            className="spec spec--navy shrink-0 pt-1 transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden="true"
          >
            →
          </span>
        </div>
        <p className="text-[.89rem] leading-relaxed text-ink-2">{p.bestFor}</p>
        <p className="spec pt-1">{p.specs[1].value}</p>
      </div>
    </Link>
  );
}

export function IndustryCard({ i, priority = false }: { i: Industry; priority?: boolean }) {
  return (
    <Link href={`/industries/${i.slug}`} className="card card--hover group grid overflow-hidden">
      <div className="relative aspect-[4/3] overflow-hidden bg-[var(--ground-2)]">
        <Image
          src={i.image}
          alt={i.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={priority}
          className="object-cover"
        />
        <div className="absolute inset-x-0 bottom-0 p-4"
             style={{ background: "linear-gradient(to top, rgba(1,30,76,.92), rgba(1,30,76,0))" }}>
          <h3 className="display-sm text-[1rem] text-white">{i.short}</h3>
        </div>
      </div>
      <div className="grid gap-2 p-5">
        <p className="spec spec--lime">{i.reader}</p>
        <p className="text-[.89rem] leading-relaxed text-ink-2">{i.tagline}</p>
        <span className="spec spec--navy pt-1 transition-transform duration-300 group-hover:translate-x-1">
          What they need →
        </span>
      </div>
    </Link>
  );
}

export function SectionHead({
  eyebrow,
  title,
  lede,
  align = "left",
  onDark = false,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  align?: "left" | "center";
  onDark?: boolean;
}) {
  return (
    <div className={`grid gap-3.5 ${align === "center" ? "justify-items-center text-center mx-auto" : ""}`}>
      <p className={`spec ${onDark ? "spec--ondark" : "spec--lime"}`}>{eyebrow}</p>
      <h2 className={`display-md text-[clamp(1.7rem,3.4vw,2.5rem)] ${onDark ? "text-white" : ""}`}>
        {title}
      </h2>
      {lede && (
        <p
          className={`measure text-[1.02rem] leading-relaxed ${onDark ? "text-on-dark-2" : "text-ink-2"}`}
        >
          {lede}
        </p>
      )}
    </div>
  );
}

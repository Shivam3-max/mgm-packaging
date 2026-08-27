import Link from "next/link";
import Seal from "@/components/Seal";

export default function NotFound() {
  return (
    <section className="section">
      <div className="wrap grid gap-6 py-16 text-center">
        <p className="spec spec--lime">404</p>
        <h1 className="display mx-auto max-w-[18ch] text-[clamp(2rem,5vw,3.2rem)]">
          That page isn&apos;t in the range.
        </h1>
        <Seal faint className="mx-auto max-w-[240px]" />
        <p className="measure mx-auto text-[1.02rem] leading-relaxed text-ink-2">
          The link may be out of date. The whole catalogue is two clicks away, and if you are
          looking for something specific, either partner will find it faster than a search box.
        </p>
        <div className="mt-2 flex flex-wrap justify-center gap-2.5">
          <Link href="/products" className="btn btn--primary">Browse the range</Link>
          <Link href="/tools" className="btn">Buyer tools</Link>
          <Link href="/contact" className="btn">Contact us</Link>
        </div>
      </div>
    </section>
  );
}

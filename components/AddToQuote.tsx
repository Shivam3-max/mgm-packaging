"use client";

import { useState } from "react";
import { useQuote } from "./QuoteProvider";
import type { Product } from "@/data/products";

export default function AddToQuote({ product }: { product: Product }) {
  const { add, setOpen } = useQuote();
  const [size, setSize] = useState(product.sizes[0].size);
  const [micron, setMicron] = useState("");
  const [quantity, setQuantity] = useState("");
  const [note, setNote] = useState("");
  const [done, setDone] = useState(false);

  const defaultMicron = product.sizes.find((s) => s.size === size)?.micron ?? "";

  function submit(e: React.FormEvent) {
    e.preventDefault();
    add({
      product: product.name,
      slug: product.slug,
      size,
      micron: micron.trim() || defaultMicron,
      quantity: quantity.trim() || "To be advised",
      note: note.trim() || undefined,
    });
    setDone(true);
    setQuantity("");
    setNote("");
    window.setTimeout(() => setDone(false), 2400);
  }

  return (
    <form onSubmit={submit} className="card p-5 sm:p-6 grid gap-4">
      <div>
        <p className="spec spec--lime">Build your quote</p>
        <h3 className="display-sm mt-1.5 text-lg">Add {product.short.toLowerCase()} to your list</h3>
        <p className="text-sm text-ink-2 mt-1.5 leading-relaxed">
          Add as many lines as you need from anywhere on the site, then send one enquiry.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="field">
          <label className="label" htmlFor={`size-${product.slug}`}>Size</label>
          <select
            id={`size-${product.slug}`}
            className="select"
            value={size}
            onChange={(e) => { setSize(e.target.value); setMicron(""); }}
          >
            {product.sizes.map((s) => (
              <option key={s.size} value={s.size}>{s.size}</option>
            ))}
          </select>
        </div>

        <div className="field">
          <label className="label" htmlFor={`micron-${product.slug}`}>Thickness (micron)</label>
          <input
            id={`micron-${product.slug}`}
            className="input"
            value={micron}
            onChange={(e) => setMicron(e.target.value)}
            placeholder={defaultMicron}
            inputMode="numeric"
          />
        </div>
      </div>

      <div className="field">
        <label className="label" htmlFor={`qty-${product.slug}`}>Quantity</label>
        <input
          id={`qty-${product.slug}`}
          className="input"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="e.g. 500 kg, or 20,000 pieces"
        />
      </div>

      <div className="field">
        <label className="label" htmlFor={`note-${product.slug}`}>Anything else? (optional)</label>
        <input
          id={`note-${product.slug}`}
          className="input"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Printing, colour, gusset depth…"
        />
      </div>

      <div className="flex flex-wrap gap-2.5 items-center">
        <button type="submit" className="btn btn--primary">
          {done ? "Added ✓" : "Add to quote list"}
        </button>
        <button type="button" className="btn" onClick={() => setOpen(true)}>
          View list
        </button>
      </div>
    </form>
  );
}

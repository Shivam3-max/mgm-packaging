import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { industries } from "@/data/industries";
import { SITE } from "@/data/company";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = `https://${SITE.domain}`;
  const now = new Date();

  const statics = [
    "", "/products", "/industries", "/why-lldpe", "/quality", "/compliance",
    "/tools", "/tools/calculator", "/tools/thickness", "/tools/material",
    "/tools/size-finder", "/tools/compliance-check", "/tools/print-estimator",
    "/rfq", "/samples", "/about", "/contact", "/faq", "/downloads",
  ];

  return [
    ...statics.map((path) => ({
      url: `${base}${path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : path === "/rfq" || path === "/samples" ? 0.9 : 0.7,
    })),
    ...products.map((p) => ({
      url: `${base}/products/${p.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...industries.map((i) => ({
      url: `${base}/industries/${i.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}

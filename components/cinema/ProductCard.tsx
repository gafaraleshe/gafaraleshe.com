/*
 * Shop products on the cinema side: each product's colour swatch printed as
 * a frame of film stock (sprocket holes top and bottom), with the name in
 * the condensed cinema face. `compact` is the teaser on /cinema, linking to
 * the product on /cinema/shop; the full card there carries the description
 * and the Polar checkout button.
 */

import { ArrowUpRight } from "lucide-react";
import { isLive, type Product } from "@/lib/shop";

// Two rows of sprocket holes, drawn with a repeating gradient.
const SPROCKETS = {
  backgroundImage:
    "repeating-linear-gradient(90deg, transparent 0 6px, rgb(0 0 0 / 0.85) 6px 14px, transparent 14px 20px)",
} as const;

function Swatch({ product, tall }: { product: Product; tall?: boolean }) {
  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br ${product.accent} ${
        tall ? "aspect-[16/9] md:aspect-[21/9]" : "aspect-[16/10]"
      }`}
    >
      <span
        aria-hidden
        className="absolute inset-x-0 top-1.5 h-2 opacity-70"
        style={SPROCKETS}
      />
      <span
        aria-hidden
        className="absolute inset-x-0 bottom-1.5 h-2 opacity-70"
        style={SPROCKETS}
      />
      <span className="absolute bottom-5 left-3 bg-black/40 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.15em] text-white backdrop-blur-sm">
        {product.kind}
      </span>
      <span className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/15" />
    </div>
  );
}

export function ProductTeaser({ product }: { product: Product }) {
  return (
    <a
      href={`/cinema/shop#${product.slug}`}
      className="group block border border-white/10 bg-black transition-colors hover:border-white/30"
    >
      <Swatch product={product} />
      <div className="flex items-start justify-between gap-3 p-4">
        <p className="font-cine text-[21px] uppercase leading-none tracking-wide text-white">
          {product.name}
        </p>
        <span className="shrink-0 font-mono text-[12px] text-white/70">
          {product.price}
        </span>
      </div>
    </a>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const live = isLive(product);
  return (
    <article
      id={product.slug}
      className="group flex scroll-mt-28 flex-col border border-white/10 bg-black transition-colors hover:border-white/25"
    >
      <Swatch product={product} tall />
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <h2 className="font-cine text-[30px] uppercase leading-none tracking-wide text-white">
            {product.name}
          </h2>
          <span className="shrink-0 font-cine text-[26px] leading-none text-white">
            {product.price}
          </span>
        </div>
        <p className="mt-3 flex-1 text-[14px] leading-relaxed text-white/60">
          {product.description}
        </p>
        <a
          href={product.checkoutUrl}
          target={live ? "_blank" : undefined}
          rel={live ? "noreferrer" : undefined}
          aria-disabled={!live}
          {...(live
            ? {
                "data-polar-checkout": "",
                "data-polar-checkout-theme": "dark",
              }
            : { tabIndex: -1 })}
          className={`mt-5 flex items-center justify-center gap-2 px-4 py-2.5 font-cine text-[19px] uppercase tracking-wide transition-opacity ${
            live
              ? "bg-white text-black hover:opacity-85"
              : "pointer-events-none border border-white/15 text-white/40"
          }`}
        >
          {live ? (
            <>
              Buy {product.price}
              <ArrowUpRight className="h-4 w-4" />
            </>
          ) : (
            "Coming soon"
          )}
        </a>
      </div>
    </article>
  );
}

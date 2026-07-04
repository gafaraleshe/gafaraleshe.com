"use client";

import { useEffect } from "react";

// Wires up any <a data-polar-checkout> on the page to open Polar's embedded
// checkout as an on-site overlay instead of navigating away.
export default function PolarEmbed() {
  useEffect(() => {
    let cancelled = false;
    import("@polar-sh/checkout/embed").then(({ PolarEmbedCheckout }) => {
      if (!cancelled) PolarEmbedCheckout.init();
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}

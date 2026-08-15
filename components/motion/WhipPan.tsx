"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * WHIP PAN · Section 09 — "Fast horizontal movement for energy."
 *
 * Used exactly ONCE on this site: Production → Post. It is the loudest
 * transition in the vocabulary, so a second one would spend the effect.
 *
 * Motion blur is present on the fast move and resolves to zero at both
 * ends, per Section 09's animation principles. Under reduced motion it
 * degrades to a straight cut — which is what a whip pan is anyway, with
 * the theatre removed.
 */
export default function WhipPan({ label }: { label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0.5);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const r = prefersReducedMotion();
    setReduced(r);
    if (r) return;

    const el = ref.current;
    if (!el) return;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const total = rect.height + window.innerHeight;
        const seen = window.innerHeight - rect.top;
        setP(Math.max(0, Math.min(1, seen / total)));
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const x = (0.5 - p) * 160; // vw travel across the band
  const blur = reduced ? 0 : Math.sin(p * Math.PI) * 14;

  return (
    <div
      ref={ref}
      className="relative h-[55svh] overflow-hidden bg-black"
      aria-hidden="true"
    >
      <div className="sticky top-0 flex h-[55svh] items-center">
        <div
          className="flex shrink-0 gap-[6vw] whitespace-nowrap will-change-transform"
          style={{
            transform: `translate3d(${x}vw, 0, 0)`,
            filter: blur > 0.2 ? `blur(${blur.toFixed(1)}px)` : "none",
          }}
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <span
              key={i}
              className="font-display text-display-xl font-black uppercase leading-none text-white/12"
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { hasFinePointer, prefersReducedMotion } from "@/lib/motion";

/**
 * A Crimson dot that becomes a word — VIEW, PLAY, EXPLORE — depending on
 * what is under it. Any element can drive it with `data-cursor="VIEW"`.
 *
 * Fine pointers only. Touch never sees it, keyboard never loses the real
 * focus ring, and reduced motion drops the follow easing.
 */
export default function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!hasFinePointer()) return;

    document.body.dataset.cursor = "on";
    setActive(true);

    const reduced = prefersReducedMotion();
    let raf = 0;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let cx = x;
    let cy = y;

    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      const el = (e.target as HTMLElement | null)?.closest?.("[data-cursor]");
      setLabel(el ? (el as HTMLElement).dataset.cursor || null : null);
    };

    const loop = () => {
      // Weighted follow. Nothing springs; it catches up and settles.
      const ease = reduced ? 1 : 0.18;
      cx += (x - cx) * ease;
      cy += (y - cy) * ease;
      if (dot.current) {
        dot.current.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", move, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(raf);
      delete document.body.dataset.cursor;
    };
  }, []);

  if (!active) return null;

  return (
    <div
      ref={dot}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[70] grid place-items-center"
    >
      {label ? (
        <span className="whitespace-nowrap bg-crimson px-3 py-1.5 text-label uppercase text-white">
          {label}
        </span>
      ) : (
        <span
          className="block size-2 bg-crimson"
          style={{ borderRadius: "50%" }}
        />
      )}
    </div>
  );
}

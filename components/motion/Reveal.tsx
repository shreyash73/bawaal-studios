"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Text enters fast (200ms), holds, and stays. Images breathe slower.
 * Stagger is 80ms and is passed in by the caller as an index.
 *
 * IntersectionObserver + CSS rather than a scroll library: an entrance
 * this small does not justify a timeline, and this costs nothing.
 */

type Props = {
  children: React.ReactNode;
  /** Multiplied by 80ms. Section 09 — never simultaneous. */
  index?: number;
  duration?: "type" | "image";
  className?: string;
  as?: "div" | "span" | "li" | "p";
};

export default function Reveal({
  children,
  index = 0,
  duration = "type",
  className = "",
  as: Tag = "div",
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      // @ts-expect-error — polymorphic ref across the small tag union
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translate3d(0,0,0)" : "translate3d(0, 0.16em, 0)",
        transition: `opacity var(--duration-${duration}) var(--ease-cut) ${index * 80}ms, transform var(--duration-${duration}) var(--ease-cut) ${index * 80}ms`,
        willChange: shown ? "auto" : "opacity, transform",
      }}
    >
      {children}
    </Tag>
  );
}

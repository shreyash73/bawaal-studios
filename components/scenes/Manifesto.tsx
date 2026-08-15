"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SceneLabel from "@/components/primitives/SceneLabel";
import { MANIFESTO, MANIFESTO_CLOSE } from "@/content/manifesto";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * SCENE 10 · THE MANIFESTO
 *
 * Full-bleed Crimson. White type only. Zero images. Section 12's Story
 * Template B at full scale — the colour IS the message.
 *
 * One statement at a time, and between statements a single frame of black.
 * Crimson → black → Crimson. Four frames of flicker across the whole
 * scene: the most aggressive thing on the site, over before it can become
 * a gimmick. Then it cuts to black and the site goes quiet — the silence
 * afterwards is what makes the Crimson land.
 *
 * White on Crimson is 5.8:1 and every line here is large display type.
 */
export default function Manifesto() {
  const section = useRef<HTMLElement>(null);
  const [index, setIndex] = useState(0);
  const [flash, setFlash] = useState(false);
  const [reduced, setReduced] = useState(false);
  const previous = useRef(0);

  useEffect(() => {
    const r = prefersReducedMotion();
    setReduced(r);
    if (r) return;

    const el = section.current;
    if (!el) return;

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          const next = Math.min(
            MANIFESTO.length - 1,
            Math.floor(self.progress * MANIFESTO.length * 1.04),
          );
          setIndex(next);
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  // One frame of black on every change of statement.
  useEffect(() => {
    if (reduced || index === previous.current) return;
    previous.current = index;
    setFlash(true);
    const t = window.setTimeout(() => setFlash(false), 70);
    return () => clearTimeout(t);
  }, [index, reduced]);

  if (reduced) {
    return (
      <section
        data-scene="10"
        data-scene-name="Manifesto"
        data-mode="alert"
        className="bg-crimson px-5 py-28 md:px-8"
      >
        <SceneLabel tone="white" className="mb-12">
          The Manifesto
        </SceneLabel>
        <ol className="flex flex-col gap-10">
          {MANIFESTO.map((line) => (
            <li
              key={line}
              className="text-display-l font-black uppercase text-white"
            >
              {line}
            </li>
          ))}
        </ol>
        <p className="mt-16 text-lead text-white/80">{MANIFESTO_CLOSE}</p>
      </section>
    );
  }

  return (
    <section
      ref={section}
      data-scene="10"
      data-scene-name="Manifesto"
      data-mode="alert"
      className="relative bg-crimson"
      style={{ height: `${(MANIFESTO.length + 1) * 100}vh` }}
    >
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden bg-crimson px-5 md:px-8">
        <SceneLabel tone="white" className="absolute left-5 top-24 md:left-8">
          The Manifesto
        </SceneLabel>

        <h2 className="max-w-[16ch] text-display-xl font-black uppercase text-white">
          {MANIFESTO.map((line, i) => (
            <span
              key={line}
              className="block"
              style={{
                display: i === index ? "block" : "none",
                animation:
                  "coldopen-in var(--duration-type) var(--ease-cut) both",
              }}
            >
              {line}
            </span>
          ))}
        </h2>

        <SceneLabel
          tone="white"
          className="absolute bottom-24 left-5 opacity-70 md:left-8"
        >
          {String(index + 1).padStart(2, "0")} /{" "}
          {String(MANIFESTO.length).padStart(2, "0")}
        </SceneLabel>

        {/* The single frame of black. */}
        {flash && <div className="absolute inset-0 z-10 bg-black" />}
      </div>
    </section>
  );
}

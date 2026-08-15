"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SceneLabel from "@/components/primitives/SceneLabel";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * SCENE 03B · POST — Midnight Navy + Gold, the one editorial mode.
 *
 * One frame is held and scroll drives four states on it: RAW → GRADE →
 * CUT → SOUND. This is the only place technical precision is the flex, and
 * the reason it never becomes a software demo is that you never see a UI.
 * You only see the film changing.
 *
 * While footage is pending the frame carries a reference chart built from
 * the brand palette — a post-production artefact rather than a blank box,
 * and the only way a grade shift is legible without a real frame. It is
 * replaced the moment a still lands at the path shown.
 */

const STATES = ["Raw", "Grade", "Cut", "Sound"] as const;

/** Section 10 · The Bawaal Signature Grade. */
const GRADE_PARAMS = [
  ["Lift", "blue-green in shadows"],
  ["Gamma", "pulled down"],
  ["Gain", "clean, slightly warm"],
  ["Sat", "−8 to −12"],
  ["Grain", "8–12%"],
  ["Curve", "S-curve, mid-contrast"],
] as const;

const CHART = [
  "#0a0a0a",
  "#3d3d3d",
  "#10102a",
  "#d72638",
  "#c9a84c",
  "#f4a261",
  "#f5f0eb",
];

export default function PostGradeSequence() {
  const section = useRef<HTMLElement>(null);
  const [state, setState] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setState(1);
      return;
    }
    const el = section.current;
    if (!el) return;

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          setState(Math.min(3, Math.floor(self.progress * 4.4)));
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  const graded = state >= 1;

  return (
    <section
      ref={section}
      id="post"
      data-scene="04"
      data-scene-name="Post"
      className="relative h-[420vh] bg-navy"
    >
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden px-5 md:px-8">
        <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-8 lg:flex-row lg:items-center lg:gap-16">
          {/* The held frame. */}
          <div className="relative w-full lg:w-[62%]">
            <div
              className={[
                "crop-marks relative aspect-[16/9] w-full overflow-hidden border border-white/10",
                "grade-transition",
                graded ? "grade-bawaal" : "grade-raw",
              ].join(" ")}
              style={
                {
                  "--crop-colour": "rgb(201 168 76 / 0.45)",
                } as React.CSSProperties
              }
            >
              <div className="flex size-full">
                {CHART.map((c) => (
                  <span
                    key={c}
                    className="h-full flex-1"
                    style={{ background: c }}
                  />
                ))}
              </div>

              {/* CUT — the frame hard-cuts. One frame. No transition. */}
              {state >= 2 && (
                <div className="absolute inset-0 flex items-end bg-navy/70 p-6">
                  <SceneLabel tone="gold">Frame 02</SceneLabel>
                </div>
              )}

              {/* SOUND leads picture — the waveform draws along the edge. */}
              {state >= 3 && (
                <svg
                  viewBox="0 0 600 60"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-12 w-full"
                >
                  <polyline
                    points={waveform()}
                    fill="none"
                    stroke="#c9a84c"
                    strokeWidth="1.5"
                    style={{
                      strokeDasharray: 2400,
                      strokeDashoffset: 2400,
                      animation:
                        "draw 900ms var(--ease-cut) forwards",
                    }}
                  />
                </svg>
              )}

              <span className="pointer-events-none absolute left-6 top-5 font-mono text-[10px] tracking-[0.12em] text-white/35">
                /assets/chapters/post-frame-01.jpg
              </span>
            </div>

            <SceneLabel className="mt-4">
              Reference chart — frame pending
            </SceneLabel>
          </div>

          {/* The margin prints what is happening to the frame. */}
          <div className="w-full lg:w-[38%]">
            <SceneLabel tone="gold" className="mb-5">
              02 / Post
            </SceneLabel>

            <h2 className="mb-8 text-display-l font-black uppercase text-white">
              <span className="block">The story continues</span>
              <span className="block">after the shoot.</span>
            </h2>

            <ol className="flex gap-5">
              {STATES.map((s, i) => (
                <li key={s}>
                  <SceneLabel tone={i === state ? "gold" : "muted"}>
                    {String(i + 1).padStart(2, "0")} {s}
                  </SceneLabel>
                </li>
              ))}
            </ol>

            <dl className="mt-8 border-t border-white/12 pt-5">
              {GRADE_PARAMS.map(([k, v], i) => (
                <div
                  key={k}
                  className="flex justify-between gap-6 py-1.5"
                  style={{
                    opacity: graded ? 1 : 0,
                    transform: graded
                      ? "translate3d(0,0,0)"
                      : "translate3d(0,0.4em,0)",
                    transition: `opacity var(--duration-type) var(--ease-cut) ${i * 80}ms, transform var(--duration-type) var(--ease-cut) ${i * 80}ms`,
                  }}
                >
                  <SceneLabel tone="gold">{k}</SceneLabel>
                  <span className="font-mono text-[10px] tracking-[0.1em] text-white/45">
                    {v}
                  </span>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}

/** A plausible audio contour. Deterministic — no randomness in render. */
function waveform() {
  const pts: string[] = [];
  for (let x = 0; x <= 600; x += 4) {
    const a = Math.sin(x / 17) * Math.cos(x / 41) * 18;
    const b = Math.sin(x / 6) * 5;
    pts.push(`${x},${(30 + a + b).toFixed(2)}`);
  }
  return pts.join(" ");
}

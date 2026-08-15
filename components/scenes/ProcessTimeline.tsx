"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SceneLabel from "@/components/primitives/SceneLabel";
import AssetPlaceholder from "@/components/primitives/AssetPlaceholder";
import { STAGES, stageAsset } from "@/content/process";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * SCENE 08 · HOW WE MAKE BAWAAL — warmth mode, the site's only Ember
 * Amber moment besides the faces, and placed deliberately just before them.
 *
 * Vertical scroll drives horizontal travel along a film timeline. As each
 * stage centres, its number scales up, its BTS still cuts in behind, and
 * one line lands. The amber rule along the bottom is the scrubber — the
 * only progress indicator on the site, and it earns its place by being a
 * timeline.
 *
 * Under reduced motion the track releases into a plain vertical list.
 */
export default function ProcessTimeline() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  /**
   * Horizontal travel is a desktop camera move. On a phone it slices the
   * copy mid-sentence, so small screens get the vertical timeline instead —
   * a different design, not a shrunken one. Starts false so the server and
   * the first client paint agree.
   */
  const [horizontal, setHorizontal] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const decide = () => setHorizontal(mq.matches && !prefersReducedMotion());
    decide();
    mq.addEventListener("change", decide);
    return () => mq.removeEventListener("change", decide);
  }, []);

  useEffect(() => {
    if (!horizontal) return;

    const sectionEl = section.current;
    const trackEl = track.current;
    if (!sectionEl || !trackEl) return;

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.to(trackEl, {
        xPercent: -100 * ((STAGES.length - 1) / STAGES.length),
        ease: "none",
        scrollTrigger: {
          trigger: sectionEl,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            setProgress(self.progress);
            setActive(
              Math.min(
                STAGES.length - 1,
                Math.floor(self.progress * STAGES.length * 1.02),
              ),
            );
          },
        },
      });
    }, sectionEl);

    return () => ctx.revert();
  }, [horizontal]);

  if (!horizontal) {
    return (
      <section
        id="process"
        data-scene="08"
        data-scene-name="How We Make Bawaal"
        className="bg-black px-5 py-24 md:px-8"
      >
        <Heading />
        <ol className="mt-14 flex flex-col gap-14">
          {STAGES.map((s) => (
            <li key={s.index}>
              <SceneLabel tone="amber">{s.index}</SceneLabel>
              <h3 className="mt-2 text-display-m font-black uppercase text-white">
                {s.title}
              </h3>
              <p className="mt-3 max-w-[52ch] text-lead text-white/55">
                {s.line}
              </p>
            </li>
          ))}
        </ol>
      </section>
    );
  }

  return (
    <section
      ref={section}
      id="process"
      data-scene="08"
      data-scene-name="How We Make Bawaal"
      className="relative bg-black"
      style={{ height: `${STAGES.length * 100}vh` }}
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div className="absolute inset-x-5 top-24 z-10 md:inset-x-8 md:top-28">
          <Heading />
        </div>

        <div
          ref={track}
          className="flex h-full"
          style={{ width: `${STAGES.length * 100}%` }}
        >
          {STAGES.map((stage, i) => (
            <div
              key={stage.index}
              className="relative flex h-full shrink-0 flex-col justify-center px-5 md:px-8"
              style={{ width: `${100 / STAGES.length}%` }}
            >
              {/* BTS cuts in behind at 20%. */}
              <div
                className="absolute inset-x-5 inset-y-[18%] md:inset-x-8"
                style={{
                  opacity: i === active ? 0.2 : 0,
                  transition: "opacity var(--duration-image) var(--ease-breathe)",
                }}
                aria-hidden="true"
              >
                <AssetPlaceholder
                  path={stageAsset(stage)}
                  slate={`BTS ${stage.index}`}
                  cropColour="rgb(244 162 97 / 0.4)"
                  className="size-full"
                />
              </div>

              <div className="relative max-w-[46ch]">
                <span
                  className="block font-display font-black uppercase leading-none text-amber"
                  style={{
                    fontSize:
                      i === active
                        ? "clamp(3rem,9vw,7rem)"
                        : "clamp(1rem,2vw,1.6rem)",
                    transition:
                      "font-size var(--duration-image) var(--ease-breathe)",
                  }}
                >
                  {stage.index}
                </span>
                <h3 className="mt-3 text-display-m font-black uppercase text-white">
                  {stage.title}
                </h3>
                <p
                  className="mt-4 text-lead text-white/55"
                  style={{
                    opacity: i === active ? 1 : 0,
                    transform:
                      i === active
                        ? "translate3d(0,0,0)"
                        : "translate3d(0,0.4em,0)",
                    transition:
                      "opacity var(--duration-type) var(--ease-cut) 80ms, transform var(--duration-type) var(--ease-cut) 80ms",
                  }}
                >
                  {stage.line}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* The scrubber. */}
        <div className="absolute inset-x-0 bottom-0 h-px bg-white/12">
          <div
            className="h-full bg-amber"
            style={{ width: `${Math.round(progress * 100)}%` }}
          />
        </div>
      </div>
    </section>
  );
}

function Heading() {
  return (
    <>
      <SceneLabel tone="amber" className="mb-4">
        The Process
      </SceneLabel>
      <h2 className="text-display-l font-black uppercase text-white">
        How we make Bawaal
      </h2>
    </>
  );
}

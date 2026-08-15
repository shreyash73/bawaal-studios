"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import VideoFrame from "@/components/primitives/VideoFrame";
import SceneLabel from "@/components/primitives/SceneLabel";
import { REEL } from "@/content/site";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * SCENE 02 · SHOWREEL
 *
 * The hero does not scroll away — it contracts. Full bleed insets into a
 * 16:9 frame surrounded by black, so it literally becomes a cinema screen
 * inside a dark room. Frame within a frame, Section 09.
 *
 * Scrolling inside the pin scrubs the reel through seven chapters. You
 * learn the studio's range without reading a services list. The pin holds
 * one extra beat at chapter 07 — held shot ①.
 */
export default function Showreel() {
  const section = useRef<HTMLElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const [chapter, setChapter] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const sectionEl = section.current;
    const frameEl = frame.current;
    if (!sectionEl || !frameEl) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Scale needed for the framed 16:9 to cover the viewport at t0.
      const cover = () => {
        const r = frameEl.getBoundingClientRect();
        if (!r.width || !r.height) return 1;
        return Math.max(
          window.innerWidth / r.width,
          window.innerHeight / r.height,
        );
      };

      gsap.set(frameEl, { scale: cover(), transformOrigin: "50% 50%" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionEl,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          invalidateOnRefresh: true,
          onRefresh: () => gsap.set(frameEl, { scale: cover() }),
          onUpdate: (self) => {
            // First 22% is the contraction; the rest scrubs the chapters,
            // with the last beat held.
            const p = Math.max(0, (self.progress - 0.22) / 0.72);
            const i = Math.min(
              REEL.chapters.length - 1,
              Math.floor(p * REEL.chapters.length),
            );
            setChapter(i);
          },
        },
      });

      tl.to(frameEl, { scale: 1, ease: "none", duration: 0.22 }).to(
        {},
        { duration: 0.78 },
      );
    }, sectionEl);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={section}
      id="showreel"
      data-scene="02"
      data-scene-name="Showreel"
      className="relative h-[420vh] bg-black"
    >
      <div className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden px-5 md:px-[12vw]">
        <div ref={frame} className="w-full" data-cursor="Play">
          <VideoFrame
            src={REEL.src}
            poster={REEL.poster}
            path={REEL.file}
            slate="Showreel"
            aspect="16:9"
            aperture
            className="w-full"
          />
        </div>

        {/* Two labels. Nothing else in the room. */}
        <div className="pointer-events-none absolute inset-x-5 top-24 flex items-start justify-between md:inset-x-[12vw] md:top-28">
          <SceneLabel tone="crimson">Showreel / 2026</SceneLabel>
          <SceneLabel>{REEL.runtime}</SceneLabel>
        </div>

        <div className="pointer-events-none absolute inset-x-5 bottom-24 flex items-end justify-between md:inset-x-[12vw] md:bottom-28">
          <SceneLabel tone="white" className="transition-opacity duration-200">
            {REEL.chapters[chapter]}
          </SceneLabel>
          <SceneLabel>
            {String(chapter + 1).padStart(2, "0")} /{" "}
            {String(REEL.chapters.length).padStart(2, "0")}
          </SceneLabel>
        </div>
      </div>
    </section>
  );
}

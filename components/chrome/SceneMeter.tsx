"use client";

import { useEffect, useState } from "react";
import { timecode } from "@/lib/motion";

/**
 * PRODUCTION FURNITURE, QUIETLY.
 *
 * A running timecode in one corner, the scene position in the other. It
 * reads as a slate, not as UI — which is why it is 10px at 40% and never
 * animates, expands, or asks for anything.
 *
 * The clock runs because the camera is rolling. The scene number comes
 * from whatever `[data-scene]` section is currently holding the frame.
 */
export default function SceneMeter({ total }: { total: number }) {
  const [tc, setTc] = useState<string | null>(null);
  const [scene, setScene] = useState<{ n: string; name: string } | null>(null);

  // Rolling clock at 24fps. Mounted-only so server and client agree.
  useEffect(() => {
    const start = performance.now();
    let raf = 0;
    let last = -1;
    const tick = () => {
      const secs = (performance.now() - start) / 1000;
      const frame = Math.floor(secs * 24);
      if (frame !== last) {
        last = frame;
        setTc(timecode(secs));
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  /**
   * Whichever scene contains the middle of the viewport owns the counter.
   *
   * Deliberately not IntersectionObserver: several scenes are four or five
   * viewports tall, so their intersection ratio never approaches a usable
   * threshold and the counter would simply stop advancing. A midpoint hit
   * test is exact at any scene height.
   */
  useEffect(() => {
    const scenes = Array.from(
      document.querySelectorAll<HTMLElement>("[data-scene]"),
    );
    if (!scenes.length) return;

    let raf = 0;
    const update = () => {
      const mid = window.innerHeight / 2;
      const hit = scenes.find((s) => {
        const r = s.getBoundingClientRect();
        return r.top <= mid && r.bottom >= mid;
      });
      if (!hit) return;
      setScene((prev) =>
        prev?.n === hit.dataset.scene
          ? prev
          : { n: hit.dataset.scene ?? "", name: hit.dataset.sceneName ?? "" },
      );
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 bottom-4 z-40 flex items-end justify-between px-5 md:bottom-6 md:px-8"
    >
      <span className="text-label uppercase text-white/35 mix-blend-difference">
        {scene ? (
          <>
            Scene {scene.n} / {String(total).padStart(2, "0")}
            {scene.name ? <span className="ml-3">{scene.name}</span> : null}
          </>
        ) : null}
      </span>
      <span className="hidden font-mono text-[10px] tracking-[0.14em] text-white/28 mix-blend-difference md:block">
        {tc ?? "00:00:00:00"}
      </span>
    </div>
  );
}

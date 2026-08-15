"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Wordmark from "@/components/chrome/Wordmark";
import AssetPlaceholder from "@/components/primitives/AssetPlaceholder";
import SceneLabel from "@/components/primitives/SceneLabel";
import { HERO, REEL } from "@/content/site";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * SCENE 00 · COLD OPEN
 *
 * Black. Four hundred milliseconds of nothing — not a spinner, not a
 * percentage. A real cold open has the nerve to make you wait.
 *
 * Then one point of Crimson light, the aperture opening around it, the
 * reel already running (in medias res — never over-set-up), the wordmark,
 * the statement, and a cut to black.
 *
 * 3.2 seconds. Skippable on any input. Once per session, because a gift
 * the first time is a toll booth the fourth.
 */

const SEEN_KEY = "bawaal:opened";

const BEATS = [
  { phase: 1, at: 400 }, // the point of light
  { phase: 2, at: 1000 }, // aperture opens, reel behind it
  { phase: 3, at: 1900 }, // wordmark resolves
  { phase: 4, at: 2450 }, // statement slams in
  { phase: 5, at: 3050 }, // cut to black
  { phase: 6, at: 3170 }, // gone
] as const;

export default function ColdOpen() {
  const [phase, setPhase] = useState(0);
  const [mounted, setMounted] = useState(false);
  const timers = useRef<number[]>([]);

  const finish = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setPhase(6);
    try {
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {
      /* private mode — the open simply replays. Not worth handling. */
    }
  }, []);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(SEEN_KEY) === "1";
    } catch {
      /* ignore */
    }

    if (seen || prefersReducedMotion()) {
      setPhase(6);
      return;
    }

    setMounted(true);
    document.documentElement.style.overflow = "hidden";

    timers.current = BEATS.map((b) =>
      window.setTimeout(() => setPhase(b.phase), b.at),
    );

    const skip = () => finish();
    window.addEventListener("pointerdown", skip);
    window.addEventListener("keydown", skip);
    window.addEventListener("wheel", skip, { passive: true });
    window.addEventListener("touchstart", skip, { passive: true });

    return () => {
      timers.current.forEach(clearTimeout);
      window.removeEventListener("pointerdown", skip);
      window.removeEventListener("keydown", skip);
      window.removeEventListener("wheel", skip);
      window.removeEventListener("touchstart", skip);
    };
  }, [finish]);

  useEffect(() => {
    if (phase >= 6) document.documentElement.style.overflow = "";
  }, [phase]);

  if (!mounted || phase >= 6) return null;

  return (
    <div
      className="fixed inset-0 z-[80] overflow-hidden bg-black"
      role="presentation"
      aria-hidden="true"
    >
      {/* The reel, revealed through the opening aperture. Already running. */}
      {phase >= 2 && (
        <div className="aperture-open absolute inset-0">
          <AssetPlaceholder
            variant="bleed"
            path={REEL.file}
            slate="Showreel"
            /* The wordmark owns the centre of this frame. */
            info={false}
            className="size-full"
          />
        </div>
      )}

      {/* A dot of light — the spark that begins every story. Section 05. */}
      {phase >= 1 && phase < 2 && (
        <div className="absolute inset-0 grid place-items-center">
          <span
            className="block size-1.5 bg-crimson"
            style={{
              borderRadius: "50%",
              animation: "coldopen-breathe 600ms var(--ease-cut)",
            }}
          />
        </div>
      )}

      {/* Wordmark, then the statement. Second line 80ms behind the first. */}
      <div className="absolute inset-0 grid place-items-center px-6 text-center">
        {phase >= 3 && phase < 4 && (
          <div style={{ animation: "coldopen-in 400ms var(--ease-cut) both" }}>
            <Wordmark
              variant="vertical"
              className="text-[clamp(2rem,8vw,5rem)]"
            />
          </div>
        )}

        {phase >= 4 && (
          <h1 className="text-display-xl font-black uppercase text-white">
            {HERO.statement.map((line, i) => (
              <span
                key={line}
                className="block"
                style={{
                  animation: `coldopen-in var(--duration-type) var(--ease-cut) ${i * 80}ms both`,
                }}
              >
                {line}
              </span>
            ))}
          </h1>
        )}
      </div>

      {phase >= 1 && phase < 5 && (
        <SceneLabel className="absolute bottom-6 left-5 md:left-8" tone="muted">
          Press any key to skip
        </SceneLabel>
      )}

      {/* CUT TO BLACK. The full stop that means business. */}
      {phase >= 5 && <div className="absolute inset-0 bg-black" />}
    </div>
  );
}

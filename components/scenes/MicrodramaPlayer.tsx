"use client";

import { useEffect, useRef, useState } from "react";
import VideoFrame from "@/components/primitives/VideoFrame";
import SceneLabel from "@/components/primitives/SceneLabel";
import {
  EPISODES,
  MICRODRAMA_STATEMENT,
  episodeAsset,
} from "@/content/microdramas";

/**
 * SCENE 06 · MICRODRAMA — the signature experience.
 *
 * Not another service. Its own colour, its own aspect ratio, its own
 * scroll behaviour. A 9:16 frame held in a black void and treated as a
 * physical object: hairline frame, Crimson rule above it, the episode
 * marking set OUTSIDE the frame like a slate.
 *
 * Mobile is better than desktop here, on purpose — the phone IS the frame.
 * One implementation, two intentions: the stage is sticky, and each
 * episode block claims it as it passes.
 */
export default function MicrodramaPlayer() {
  const [active, setActive] = useState(0);
  const blocks = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const top = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!top) return;
        const i = Number((top.target as HTMLElement).dataset.index);
        if (!Number.isNaN(i)) setActive(i);
      },
      { threshold: 0.5 },
    );
    blocks.current.forEach((b) => b && io.observe(b));
    return () => io.disconnect();
  }, []);

  const episode = EPISODES[active];

  return (
    <section
      id="microdramas"
      data-scene="06"
      data-scene-name="Microdramas"
      className="relative bg-black"
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* ---- MOBILE: the phone IS the frame. Full bleed, overlaid marks.
             This is the one scene designed for the small screen first and
             adapted upward, not shrunk down. ---- */}
        <div className="relative size-full md:hidden">
          <VideoFrame
            key={`m-${episode.id}`}
            src={episode.video}
            poster={episode.poster}
            path={episodeAsset(episode, "video")}
            slate={episode.ep}
            variant="bleed"
            info={false}
            className="absolute inset-0 size-full"
          />

          <div className="absolute inset-x-5 top-24">
            <div className="mb-3 flex items-end justify-between">
              <SceneLabel tone="crimson">{episode.ep}</SceneLabel>
              <SceneLabel>{episode.runtime ?? "Runtime pending"}</SceneLabel>
            </div>
            <div className="h-[3px] w-full bg-crimson" />
          </div>

          <div className="absolute inset-x-5 bottom-28">
            <h2 className="text-display-m font-black uppercase text-white">
              {MICRODRAMA_STATEMENT.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
            <p className="mt-3 text-caption text-white/50">
              {episode.logline ?? "Logline pending."}
            </p>
            <SceneLabel className="mt-4">
              {String(active + 1).padStart(2, "0")} /{" "}
              {String(EPISODES.length).padStart(2, "0")}
            </SceneLabel>
          </div>
        </div>

        {/* ---- DESKTOP: the frame becomes an object in a black void. ---- */}
        <div className="hidden h-full items-center md:flex">
          <div className="mx-auto flex w-full max-w-[1500px] items-center justify-center gap-[6vw] px-8">
            {/* Type wider than its column, clipped by the viewport edge. */}
            <div className="hidden shrink-0 lg:block">
              <SceneLabel tone="crimson" className="mb-6">
                Microdramas
              </SceneLabel>
              <h2 className="-ml-[3vw] text-display-l font-black uppercase text-white">
                {MICRODRAMA_STATEMENT.map((line) => (
                  <span key={line} className="block whitespace-nowrap">
                    {line}
                  </span>
                ))}
              </h2>
            </div>

            <div className="relative w-full max-w-[calc(60svh*9/16)]">
              <div className="mb-3 flex items-end justify-between">
                <SceneLabel tone="crimson">{episode.ep}</SceneLabel>
                <SceneLabel>{episode.runtime ?? "Runtime pending"}</SceneLabel>
              </div>

              <div className="h-[3px] w-full bg-crimson" />

              <div className="mt-3">
                <VideoFrame
                  key={`d-${episode.id}`}
                  src={episode.video}
                  poster={episode.poster}
                  path={episodeAsset(episode, "video")}
                  slate={episode.ep}
                  aspect="9:16"
                  className="w-full"
                />
              </div>

              <p className="mt-4 text-caption text-white/45">
                {episode.logline ?? "Logline pending."}
              </p>
            </div>
          </div>

          {/* No carousel dots. Ever. A counter, like a slate. */}
          <SceneLabel className="pointer-events-none absolute bottom-20 left-1/2 -translate-x-1/2">
            {String(active + 1).padStart(2, "0")} /{" "}
            {String(EPISODES.length).padStart(2, "0")}
          </SceneLabel>
        </div>
      </div>

      {/* Scroll drivers — one viewport per episode. */}
      <div className="pointer-events-none relative -mt-[100svh]">
        {EPISODES.map((e, i) => (
          <div
            key={e.id}
            data-index={i}
            ref={(el) => {
              blocks.current[i] = el;
            }}
            className="h-[100svh]"
            aria-hidden="true"
          />
        ))}
      </div>
    </section>
  );
}

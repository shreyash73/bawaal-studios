"use client";

import { useEffect, useRef, useState } from "react";
import AssetPlaceholder from "./AssetPlaceholder";
import { ASPECT, type Aspect, claimPlayback, releasePlayback } from "@/lib/media";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * Poster first, source second, one decode at a time.
 *
 * The source is only attached once the frame is within a viewport of the
 * fold, playback is claimed exclusively, and reduced-motion visitors get a
 * held poster with a real control instead of movement they did not ask for.
 *
 * With no `src` it degrades to the designed placeholder — which is the
 * state the entire site currently ships in.
 */

type Props = {
  src?: string | null;
  poster?: string | null;
  aspect?: Aspect;
  /** Path shown inside the placeholder while media is pending. */
  path?: string;
  slate?: string;
  variant?: "framed" | "bleed";
  aperture?: boolean;
  /** Suppress the placeholder's slate + path markings. */
  info?: boolean;
  cropColour?: string;
  className?: string;
  /** Lets the POST scene transition ungraded → graded on the same frame. */
  grade?: "raw" | "bawaal";
  loop?: boolean;
  /** Sound is opt-in, always. Never autoplay audio. */
  muted?: boolean;
};

export default function VideoFrame({
  src,
  poster,
  aspect,
  path,
  slate,
  variant = "framed",
  aperture = false,
  info = true,
  cropColour,
  className = "",
  grade,
  loop = true,
  muted = true,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [near, setNear] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => setReduced(prefersReducedMotion()), []);

  // Attach the source only when the frame is within one viewport.
  useEffect(() => {
    const el = ref.current;
    if (!el || !src) return;
    const io = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setNear(true),
      { rootMargin: "100% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [src]);

  // Play only while on screen. Pause and yield the moment it leaves.
  useEffect(() => {
    const el = ref.current;
    const v = video.current;
    if (!el || !v || !near || reduced) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) claimPlayback(v);
        else releasePlayback(v);
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      releasePlayback(v);
    };
  }, [near, reduced]);

  if (!src) {
    return (
      <div ref={ref} className={className}>
        <AssetPlaceholder
          aspect={aspect}
          path={path}
          slate={slate}
          variant={variant}
          aperture={aperture}
          info={info}
          cropColour={cropColour}
          className="size-full"
        />
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={[
        "relative overflow-hidden bg-black",
        aspect ? ASPECT[aspect] : "",
        className,
      ].join(" ")}
    >
      <video
        ref={video}
        poster={poster ?? undefined}
        src={near ? src : undefined}
        preload={near ? "metadata" : "none"}
        muted={muted}
        loop={loop}
        playsInline
        controls={reduced}
        className={[
          "size-full object-cover",
          grade === "raw" ? "grade-raw" : "",
          grade === "bawaal" ? "grade-bawaal" : "",
          grade ? "grade-transition" : "",
        ].join(" ")}
      />
    </div>
  );
}

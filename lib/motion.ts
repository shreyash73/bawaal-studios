/**
 * THE BAWAAL MOTION VOCABULARY — Brand Book Section 09.
 * Single source of truth. If a duration or easing is not in this file,
 * it does not exist on this site.
 */

export const EASE = {
  /** Weighted ease-in-out. Cuts, irises, whip pans. Nothing bounces or pops. */
  cut: "cubic-bezier(0.83, 0, 0.17, 1)",
  /** Slower resolve for anything image-sized. */
  breathe: "cubic-bezier(0.33, 1, 0.68, 1)",
} as const;

/** GSAP takes named easings; these are the same two curves. */
export const GSAP_EASE = {
  cut: "expo.inOut",
  breathe: "power2.out",
} as const;

export const DURATION = {
  /** "Text enters fast (0.2s), holds, exits fast." */
  type: 0.2,
  /** "Images breathe slower (0.6–0.8s)." */
  image: 0.7,
  iris: 0.9,
  whip: 0.26,
  /** A cut is one frame. The hold either side is the punctuation. */
  cut: 0.08,
  hold: 0.22,
} as const;

/** "Multiple elements stagger at 80ms intervals — never simultaneously." */
export const STAGGER = 0.08;

/**
 * SOUND LEADS PICTURE — Section 11.
 * The audio edit runs 2–4 frames ahead of the visual cut. On the web the
 * translation is literal: incoming type begins before the black clears.
 */
export const LEAD = -0.1;

/** Respect the OS setting before any animation is scheduled. */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Real pointer device — gates the custom cursor and hover-only behaviour. */
export function hasFinePointer(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

/** Frame-accurate timecode from seconds. Production furniture, quietly. */
export function timecode(seconds: number, fps = 24): string {
  const f = Math.floor((seconds % 1) * fps);
  const s = Math.floor(seconds) % 60;
  const m = Math.floor(seconds / 60) % 60;
  const h = Math.floor(seconds / 3600);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(h)}:${pad(m)}:${pad(s)}:${pad(f)}`;
}

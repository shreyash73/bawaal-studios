/**
 * MEDIA POLICY.
 *
 * One video decodes at a time. A cinematic site that attaches ten video
 * sources at once is unusable on a mid-range Android, and this studio's
 * audience is 18–34 urban India — that is the device that matters.
 */

const active = new Set<HTMLVideoElement>();

/** Play `el` and stop everything else that is currently decoding. */
export function claimPlayback(el: HTMLVideoElement) {
  for (const other of active) {
    if (other !== el) {
      other.pause();
      active.delete(other);
    }
  }
  active.add(el);
  const p = el.play();
  if (p && typeof p.catch === "function") p.catch(() => {});
}

export function releasePlayback(el: HTMLVideoElement) {
  el.pause();
  active.delete(el);
}

export const ASPECT = {
  "16:9": "aspect-[16/9]",
  "4:5": "aspect-[4/5]",
  "9:16": "aspect-[9/16]",
} as const;

export type Aspect = keyof typeof ASPECT;

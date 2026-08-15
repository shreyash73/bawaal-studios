/**
 * MICRODRAMAS — the owned category.
 *
 * PLACEHOLDER SLATE. Replace `title`, `logline`, `runtime` and the media
 * paths as episodes are delivered. 9:16 only — this format is the point.
 */

export type Episode = {
  id: string;
  /** Slate identity. Always present. */
  ep: string;
  series: string | null;
  title: string | null;
  logline: string | null;
  runtime: string | null;
  poster: string | null;
  video: string | null;
};

/** Section 13 · Approved copy — "90 seconds. One decision. Everything changes." */
export const MICRODRAMA_STATEMENT = [
  "90 seconds.",
  "One decision.",
  "Everything changes.",
] as const;

export const EPISODES: Episode[] = [
  {
    id: "ep-01",
    ep: "EP. 01",
    series: null,
    title: null,
    logline: null,
    runtime: null,
    poster: null,
    video: null,
  },
  {
    id: "ep-02",
    ep: "EP. 02",
    series: null,
    title: null,
    logline: null,
    runtime: null,
    poster: null,
    video: null,
  },
  {
    id: "ep-03",
    ep: "EP. 03",
    series: null,
    title: null,
    logline: null,
    runtime: null,
    poster: null,
    video: null,
  },
  {
    id: "ep-04",
    ep: "EP. 04",
    series: null,
    title: null,
    logline: null,
    runtime: null,
    poster: null,
    video: null,
  },
  {
    id: "ep-05",
    ep: "EP. 05",
    series: null,
    title: null,
    logline: null,
    runtime: null,
    poster: null,
    video: null,
  },
  {
    id: "ep-06",
    ep: "EP. 06",
    series: null,
    title: null,
    logline: null,
    runtime: null,
    poster: null,
    video: null,
  },
];

export function episodeAsset(e: Episode, kind: "video" | "poster") {
  return `/assets/microdramas/${e.id}.${kind === "video" ? "mp4" : "jpg"}`;
}

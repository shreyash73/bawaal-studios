/**
 * THE PEOPLE — "Five friends. One obsession."
 *
 * PLACEHOLDER SLATE. Names, personal lines and portraits are pending.
 * The five disciplines are NOT invented: Brand Book Section 01 states the
 * founding team's "expertise spanning film, marketing, strategy,
 * production, and digital content".
 *
 * Each founder needs TWO portrait frames — the hover is a cut between
 * them, which requires two real frames, not one image filtered twice.
 */

export type Founder = {
  id: string;
  /** Slate identity. Always present. */
  slate: string;
  name: string | null;
  /** From the brand book. Safe to display before names arrive. */
  discipline: string;
  role: string | null;
  line: string | null;
  portrait: string | null;
  /** The cut-to frame on hover. */
  portraitAlt: string | null;
  /** Intentionally uneven row — off-balance, District logic. Never a grid. */
  offset: string;
  height: string;
};

export const PEOPLE_STATEMENT = ["Five friends.", "One obsession."] as const;

/** Section 01 · Our Founding Story. Verbatim. */
export const FOUNDING_LINE =
  "Not born in a boardroom. Born in arguments over chai, in 2 AM edit sessions, in the kind of friendship where you trust someone enough to take a creative risk.";

export const FOUNDERS: Founder[] = [
  {
    id: "founder-01",
    slate: "01",
    name: null,
    discipline: "Film",
    role: null,
    line: null,
    portrait: null,
    portraitAlt: null,
    offset: "lg:mt-0",
    height: "lg:h-[68vh]",
  },
  {
    id: "founder-02",
    slate: "02",
    name: null,
    discipline: "Marketing",
    role: null,
    line: null,
    portrait: null,
    portraitAlt: null,
    offset: "lg:mt-24",
    height: "lg:h-[52vh]",
  },
  {
    id: "founder-03",
    slate: "03",
    name: null,
    discipline: "Strategy",
    role: null,
    line: null,
    portrait: null,
    portraitAlt: null,
    offset: "lg:mt-8",
    height: "lg:h-[60vh]",
  },
  {
    id: "founder-04",
    slate: "04",
    name: null,
    discipline: "Production",
    role: null,
    line: null,
    portrait: null,
    portraitAlt: null,
    offset: "lg:mt-32",
    height: "lg:h-[46vh]",
  },
  {
    id: "founder-05",
    slate: "05",
    name: null,
    discipline: "Digital Content",
    role: null,
    line: null,
    portrait: null,
    portraitAlt: null,
    offset: "lg:mt-12",
    height: "lg:h-[58vh]",
  },
];

export function portraitPath(f: Founder, frame: 1 | 2 = 1) {
  return `/assets/team/${f.id}${frame === 2 ? "-b" : ""}.jpg`;
}

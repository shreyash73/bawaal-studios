/**
 * CLIENTS / COLLABORATORS.
 *
 * DELIBERATELY EMPTY. A client relationship is never invented, and a logo
 * is never shown without written permission to display the work.
 *
 * While CLIENTS is empty the section renders its designed fallback state:
 * the crafts the studio works in, set as type in a slow marquee, under an
 * explicit placeholder label. Those are disciplines, not clients — the
 * section stays full and stays honest.
 *
 * To go live: add entries below and the fallback disappears on its own.
 */

export type Client = {
  name: string;
  /** Mono-white SVG only. Null renders the name as type instead. */
  logo: string | null;
  /** Project slug this client is associated with, if any. */
  project: string | null;
  /** Film still revealed behind the name on hover. */
  still: string | null;
};

export const CLIENTS: Client[] = [];

/** Fallback marquee — crafts, not clients. Nothing here is a claim. */
export const CRAFTS = [
  "Direction",
  "Cinematography",
  "Colour",
  "Sound Design",
  "Original Score",
  "Edit",
  "VFX",
  "Production Design",
  "Casting",
  "Styling",
] as const;

export const COLLABORATORS_HEADLINE = "People we've made things with.";

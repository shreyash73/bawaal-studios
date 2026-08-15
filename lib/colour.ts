/**
 * SCENE COLOUR MODES — Brand Book Section 07, "Approved Pairings".
 *
 * Five combinations are approved. There is no sixth. Every scene on the
 * site is assigned one of these, like a lighting plan, and scenes may not
 * mix their own colours.
 */

export type SceneMode =
  | "cinematic" /* Black + White + Crimson  — primary, DNEG-influenced authority */
  | "editorial" /* Navy  + White + Gold     — premium editorial, prestige */
  | "day" /* Cream + Navy  + Crimson  — editorial long-form, day mode */
  | "alert" /* Crimson + White only     — high-impact, the colour IS the message */
  | "warmth"; /* Black + Amber            — human stories, behind the scenes */

type ModeTokens = {
  /** Background + default type colour for the scene. */
  surface: string;
  /** The single accent permitted inside this mode. */
  accent: string;
  /** Muted type inside this mode. */
  muted: string;
  /** Hairline rules and frame edges inside this mode. */
  hairline: string;
  /** Crop-mark colour handed to the .crop-marks custom property. */
  cropColour: string;
};

export const MODE: Record<SceneMode, ModeTokens> = {
  cinematic: {
    surface: "bg-black text-white",
    accent: "text-crimson",
    muted: "text-white/45",
    hairline: "border-white/12",
    cropColour: "rgb(245 240 235 / 0.28)",
  },
  editorial: {
    surface: "bg-navy text-white",
    accent: "text-gold",
    muted: "text-white/45",
    hairline: "border-white/12",
    cropColour: "rgb(201 168 76 / 0.4)",
  },
  day: {
    surface: "bg-white text-navy",
    accent: "text-crimson",
    muted: "text-navy/55",
    hairline: "border-navy/15",
    cropColour: "rgb(16 16 42 / 0.3)",
  },
  alert: {
    surface: "bg-crimson text-white",
    accent: "text-white",
    muted: "text-white/70",
    hairline: "border-white/25",
    cropColour: "rgb(245 240 235 / 0.4)",
  },
  warmth: {
    surface: "bg-black text-white",
    accent: "text-amber",
    muted: "text-white/45",
    hairline: "border-amber/20",
    cropColour: "rgb(244 162 97 / 0.35)",
  },
};

/** The cut list. Mirrors the approved creative direction, scene for scene. */
export const SCENE_MODES = {
  coldOpen: "cinematic",
  hero: "cinematic",
  showreel: "cinematic",
  production: "cinematic",
  post: "editorial",
  microdramaCard: "alert",
  microdrama: "cinematic",
  work: "cinematic",
  process: "warmth",
  people: "editorial",
  manifesto: "alert",
  collaborators: "cinematic",
  contact: "cinematic",
  endSlate: "cinematic",
} as const satisfies Record<string, SceneMode>;

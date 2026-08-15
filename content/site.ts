/**
 * SITE-WIDE CONTENT.
 * Values marked PENDING are placeholders awaiting confirmation from the
 * studio. Nothing here invents a claim the brand book does not support.
 */

export const SITE = {
  name: "Bawaal Studios",
  /** Section 13, Approved Tagline Suite. */
  tagline: "We Don't Make Ads. We Make Bawaal.",
  description:
    "Bangalore-born production and storytelling studio. Microdramas, brand films and post.",

  /** PENDING — confirm the real address before launch. */
  email: "hello@bawaalstudios.com",
  /** Section 14, Email Signature. */
  instagram: "@bawaalstudios",
  instagramUrl: "https://instagram.com/bawaalstudios",
  location: "Bangalore, India",
  /** A location expressed the way a production slate would express it. */
  coordinates: "12.9716° N, 77.5946° E",

  nav: [
    { label: "Work", href: "/work" },
    { label: "Make", href: "/#make" },
    { label: "Microdramas", href: "/microdramas" },
    { label: "Studio", href: "/#studio" },
    { label: "Contact", href: "/#contact" },
  ],
} as const;

/**
 * BRAND ASSETS.
 *
 * Section 06 is explicit: "NEVER recreate the logo from memory or from a
 * scan — always use master vector files." So the mark is not drawn here.
 * Until real SVGs land, the logo renders as plain type with a visible
 * pending marker.
 *
 * TO GO LIVE: drop the master files at the paths below and set them here.
 * Nothing else changes.
 */
export const BRAND = {
  wordmarkWhite: null as string | null, // "/assets/brand/wordmark-white.svg"
  wordmarkBlack: null as string | null, // "/assets/brand/wordmark-black.svg"
  iconWhite: null as string | null, // "/assets/brand/b-mark-white.svg"
} as const;

/** Scene 01 · Hero. The tagline carries it — it survives at 120px. */
export const HERO = {
  statement: ["We don't make ads.", "We make Bawaal."],
  disciplines: ["Production", "Post", "Microdramas"],
} as const;

/**
 * Scene 03 · What We Make.
 * Capabilities render as a slate strip along the bottom edge — never cards.
 */
export const CHAPTERS = [
  {
    id: "production",
    index: "01",
    title: "Production",
    statement: ["From first idea", "to final frame."],
    capabilities: [
      "Brand Films",
      "TVCs",
      "Commercials",
      "YouTube",
      "Campaign Films",
      "Shoot Production",
    ],
    media: "/assets/chapters/production.mp4",
    poster: "/assets/chapters/production.jpg",
  },
  {
    id: "post",
    index: "02",
    title: "Post",
    statement: ["The story continues", "after the shoot."],
    capabilities: [
      "Editing",
      "Colour",
      "Sound Design",
      "Motion",
      "VFX",
      "Finishing",
    ],
    media: "/assets/chapters/post.mp4",
    poster: "/assets/chapters/post.jpg",
  },
  {
    id: "microdramas",
    index: "03",
    title: "Microdramas",
    statement: ["90 seconds.", "Full emotion."],
    capabilities: [
      "Short-form Narrative",
      "Branded Storytelling",
      "Social-first Stories",
      "Original IP",
      "Episodic Content",
    ],
    media: "/assets/chapters/microdrama.mp4",
    poster: "/assets/chapters/microdrama.jpg",
  },
] as const;

/**
 * Scene 02 · Showreel.
 * PENDING — chapter marks are provisional until the master cut is delivered.
 */
export const REEL = {
  src: null as string | null,
  poster: null as string | null,
  file: "/assets/reel/showreel-2026.mp4",
  runtime: "02:14",
  chapters: [
    "Brand Film",
    "TVC",
    "Microdrama",
    "Colour",
    "Sound",
    "Campaign",
    "Original IP",
  ],
} as const;

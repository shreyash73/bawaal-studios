/**
 * SELECTED WORK.
 *
 * Every project below is a PLACEHOLDER. `slate` is the always-present
 * identity ("PROJECT 01") that renders until a real title arrives.
 * Null fields render as designed pending states — never as empty gaps,
 * and never as invented client relationships.
 *
 * To publish a real project: fill title, client, runtime, description,
 * credits and the media paths. Touch nothing else.
 */

export type Category =
  | "brand-film"
  | "tvc"
  | "microdrama"
  | "youtube"
  | "post";

export const CATEGORY_LABEL: Record<Category, string> = {
  "brand-film": "Brand Film",
  tvc: "TVC",
  microdrama: "Microdrama",
  youtube: "YouTube",
  post: "Post",
};

export type Project = {
  slug: string;
  /** Slate identity. Always present. */
  slate: string;
  title: string | null;
  client: string | null;
  category: Category;
  year: number;
  runtime: string | null;
  aspect: "16:9" | "4:5" | "9:16";
  /** Drives the rhythm of Scene 05 — the sequence must never settle. */
  layout: "full-bleed" | "inset-right" | "vertical-centre";
  poster: string | null;
  video: string | null;
  stills: string[];
  bts: string[];
  description: string | null;
  credits: { role: string; name: string }[];
};

export const PROJECTS: Project[] = [
  {
    slug: "project-01",
    slate: "Project 01",
    title: null,
    client: null,
    category: "brand-film",
    year: 2026,
    runtime: null,
    aspect: "16:9",
    layout: "full-bleed",
    poster: null,
    video: null,
    stills: [],
    bts: [],
    description: null,
    credits: [],
  },
  {
    slug: "project-02",
    slate: "Project 02",
    title: null,
    client: null,
    category: "tvc",
    year: 2026,
    runtime: null,
    aspect: "4:5",
    layout: "inset-right",
    poster: null,
    video: null,
    stills: [],
    bts: [],
    description: null,
    credits: [],
  },
  {
    slug: "project-03",
    slate: "Project 03",
    title: null,
    client: null,
    category: "microdrama",
    year: 2026,
    runtime: null,
    aspect: "9:16",
    layout: "vertical-centre",
    poster: null,
    video: null,
    stills: [],
    bts: [],
    description: null,
    credits: [],
  },
  {
    slug: "project-04",
    slate: "Project 04",
    title: null,
    client: null,
    category: "youtube",
    year: 2026,
    runtime: null,
    aspect: "16:9",
    layout: "full-bleed",
    poster: null,
    video: null,
    stills: [],
    bts: [],
    description: null,
    credits: [],
  },
  {
    slug: "project-05",
    slate: "Project 05",
    title: null,
    client: null,
    category: "post",
    year: 2025,
    runtime: null,
    aspect: "4:5",
    layout: "inset-right",
    poster: null,
    video: null,
    stills: [],
    bts: [],
    description: null,
    credits: [],
  },
  {
    slug: "project-06",
    slate: "Project 06",
    title: null,
    client: null,
    category: "brand-film",
    year: 2025,
    runtime: null,
    aspect: "16:9",
    layout: "full-bleed",
    poster: null,
    video: null,
    stills: [],
    bts: [],
    description: null,
    credits: [],
  },
];

/** Media path a real asset should land on, shown inside the placeholder. */
export function assetPath(p: Project, kind: "video" | "poster") {
  return `/assets/work/${p.slug}.${kind === "video" ? "mp4" : "jpg"}`;
}

export function getProject(slug: string) {
  return PROJECTS.find((p) => p.slug === slug);
}

export function nextProject(slug: string) {
  const i = PROJECTS.findIndex((p) => p.slug === slug);
  return PROJECTS[(i + 1) % PROJECTS.length];
}

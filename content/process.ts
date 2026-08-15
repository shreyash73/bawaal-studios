/**
 * HOW WE MAKE BAWAAL — the production journey.
 * Copy describes the studio's own process. It makes no claim about
 * any client or any piece of work.
 */

export type Stage = {
  index: string;
  title: string;
  line: string;
  bts: string | null;
};

export const STAGES: Stage[] = [
  {
    index: "01",
    title: "Idea",
    line: "It usually starts as an argument. The idea that survives it is the one we shoot.",
    bts: null,
  },
  {
    index: "02",
    title: "Pre-Production",
    line: "Every frame is decided before a camera moves. Compression is craft, and craft starts on paper.",
    bts: null,
  },
  {
    index: "03",
    title: "Production",
    line: "The plan meets the room. The room usually wins — so we build a plan that can take a punch.",
    bts: null,
  },
  {
    index: "04",
    title: "Post",
    line: "Where the story is actually written. Colour, sound, the cut. The shoot was the raw material.",
    bts: null,
  },
  {
    index: "05",
    title: "Final Cut",
    line: "We hold one beat longer than expected. That extra beat is where the feeling lands.",
    bts: null,
  },
];

export function stageAsset(s: Stage) {
  return `/assets/bts/stage-${s.index}.jpg`;
}

import SceneLabel from "@/components/primitives/SceneLabel";

/**
 * CUT TO BLACK · Section 09 — "Signature. Abrupt. Cinematic. Confident.
 * The full stop that means business."
 *
 * In scroll, a cut is a held stretch of nothing carrying one label. The
 * emptiness is the punctuation; filling it would remove the edit.
 */
export default function SceneCut({
  index,
  title,
  tone = "crimson",
}: {
  index: string;
  title: string;
  tone?: "crimson" | "gold" | "amber" | "muted";
}) {
  return (
    <div
      className="flex h-[42svh] items-center bg-black px-5 md:px-8"
      aria-hidden="true"
    >
      <SceneLabel tone={tone}>
        {index} / {title}
      </SceneLabel>
    </div>
  );
}

import VideoFrame from "@/components/primitives/VideoFrame";
import SceneLabel from "@/components/primitives/SceneLabel";
import Reveal from "@/components/motion/Reveal";

/**
 * SCENE 03 · WHAT WE MAKE — a chapter, not a service card.
 *
 * Each capability occupies a full viewport. The capability list is a slate
 * strip along the bottom edge at 10px: it reads in one second and occupies
 * no attention. Cards would have cost the whole scene.
 */

type Props = {
  scene: string;
  index: string;
  title: string;
  statement: readonly string[];
  capabilities: readonly string[];
  media: string;
  poster: string;
  src?: string | null;
};

export default function ServiceChapter({
  scene,
  index,
  title,
  statement,
  capabilities,
  media,
  src = null,
}: Props) {
  return (
    <section
      id={title.toLowerCase()}
      data-scene={scene}
      data-scene-name={title}
      className="relative h-[100svh] w-full overflow-hidden bg-black"
    >
      <VideoFrame
        src={src}
        path={media}
        slate={`${index} ${title}`}
        variant="bleed"
        className="absolute inset-0 size-full"
      />

      <div className="relative flex h-full flex-col justify-end px-5 pb-14 md:px-8 md:pb-12">
        <Reveal className="mb-5">
          <SceneLabel tone="crimson">
            {index} / {title}
          </SceneLabel>
        </Reveal>

        {/* Oversized type butting past the frame edge. Section 09, motif 03. */}
        <h2 className="-mr-[6vw] text-display-xl font-black uppercase text-white">
          {statement.map((line, i) => (
            <Reveal key={line} index={i} as="span" className="block">
              {line}
            </Reveal>
          ))}
        </h2>

        <Reveal index={2} className="mt-10 border-t border-white/12 pt-4">
          <SceneLabel className="leading-relaxed">
            {capabilities.join(" · ")}
          </SceneLabel>
        </Reveal>
      </div>
    </section>
  );
}

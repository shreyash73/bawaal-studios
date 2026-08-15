import VideoFrame from "@/components/primitives/VideoFrame";
import SceneLabel from "@/components/primitives/SceneLabel";
import { HERO, REEL, SITE } from "@/content/site";

/**
 * SCENE 01 · HERO
 *
 * Section 14 · "Full-viewport dark video reel. Minimal text overlay.
 * Nothing competes with the work."
 *
 * Type sits on the lower third, left-anchored, bleeding a hair past the
 * margin so it reads printed rather than placed. There is no scroll
 * chevron — a bouncing arrow is the most template-shaped object on the
 * internet. The running timecode is the invitation.
 */
export default function Hero() {
  return (
    <section
      id="hero"
      data-scene="01"
      data-scene-name="Hero"
      className="relative h-[100svh] w-full overflow-hidden bg-black"
    >
      <VideoFrame
        src={REEL.src}
        poster={REEL.poster}
        path={REEL.file}
        slate="Showreel 2026"
        variant="bleed"
        /* One strong element per frame — the statement. The reel's path is
           documented in content/site.ts and shown in Scene 02. */
        info={false}
        className="absolute inset-0 size-full"
      />

      {/* Lower third. Never centred. */}
      {/* Bottom padding clears the fixed scene meter — production furniture
          and scene typography never share a line. */}
      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-6 px-5 pb-28 md:flex-row md:items-end md:justify-between md:px-8 md:pb-20">
        <div>
          <SceneLabel tone="crimson" className="mb-4">
            {SITE.name} — {SITE.location}
          </SceneLabel>
          <h1 className="edge-left text-display-xl font-black uppercase text-white">
            {HERO.statement.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>
        </div>

        <SceneLabel className="shrink-0 md:pb-3 md:text-right">
          {HERO.disciplines.join(" · ")}
        </SceneLabel>
      </div>
    </section>
  );
}

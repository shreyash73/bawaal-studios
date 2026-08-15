import type { Metadata } from "next";
import VideoFrame from "@/components/primitives/VideoFrame";
import SceneLabel from "@/components/primitives/SceneLabel";
import RuledLine from "@/components/primitives/RuledLine";
import EndSlate from "@/components/scenes/EndSlate";
import {
  EPISODES,
  MICRODRAMA_STATEMENT,
  episodeAsset,
} from "@/content/microdramas";

export const metadata: Metadata = {
  title: "Microdramas",
  description:
    "90 seconds. One decision. Everything changes. Short-form narrative from Bawaal Studios.",
};

/**
 * THE CHANNEL.
 *
 * Entering this route should feel like leaving a website and opening a
 * channel — which is why Microdrama gets its own page rather than a
 * section anchor. Vertical, snap-scrolled, one episode per screen.
 *
 * On a phone the frame is the screen. That is the native case, and this
 * page is built for it first.
 */
export default function MicrodramasPage() {
  return (
    <>
      <section className="flex min-h-[80svh] flex-col justify-end bg-black px-5 pb-16 pt-32 md:px-8">
        <SceneLabel tone="crimson" className="mb-6">
          Original format
        </SceneLabel>
        <h1 className="-ml-[0.04em] text-display-xl font-black uppercase text-white">
          {MICRODRAMA_STATEMENT.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h1>
        <RuledLine className="mt-10" />
        <p className="mt-8 max-w-[54ch] text-lead text-white/55">
          Short-form is not a lesser format. It is the most demanding one —
          every second has to earn its place.
        </p>
      </section>

      <div className="snap-y snap-mandatory bg-black">
        {EPISODES.map((e) => (
          <article
            key={e.id}
            className="flex min-h-[100svh] snap-start flex-col items-center justify-center gap-6 px-5 py-16 md:flex-row md:items-center md:justify-center md:gap-[6vw] md:px-8"
          >
            <div className="w-full max-w-[min(88vw,calc(66svh*9/16))] md:order-2">
              <div className="mb-3 flex items-end justify-between">
                <SceneLabel tone="crimson">{e.ep}</SceneLabel>
                <SceneLabel>{e.runtime ?? "Runtime pending"}</SceneLabel>
              </div>
              <div className="h-[3px] w-full bg-crimson" />
              <div className="mt-3 md:h-[66svh]">
                <VideoFrame
                  src={e.video}
                  poster={e.poster}
                  path={episodeAsset(e, "video")}
                  slate={e.ep}
                  aspect="9:16"
                  className="mx-auto h-full w-auto max-w-full"
                />
              </div>
            </div>

            <div className="w-full max-w-[36ch] md:order-1">
              <h2 className="text-display-m font-black uppercase text-white">
                {e.title ?? `Episode ${e.ep.replace("EP. ", "")}`}
              </h2>
              <p className="mt-3 text-caption text-white/45">
                {e.logline ?? "Logline pending."}
              </p>
              <SceneLabel className="mt-6">
                {e.series ?? "Series pending"}
              </SceneLabel>
            </div>
          </article>
        ))}
      </div>

      <EndSlate />
    </>
  );
}

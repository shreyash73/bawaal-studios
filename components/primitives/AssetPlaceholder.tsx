import { ASPECT, type Aspect } from "@/lib/media";

/**
 * THE PLACEHOLDER IS A DESIGNED STATE, NOT A GAP.
 *
 * Requirement 10 of the creative direction: the site has to be beautiful
 * with zero assets. So an empty frame reads as a film held back — crop
 * marks, a slate label, the exact path the asset will land on — never as
 * a broken template.
 *
 * It stays quiet on purpose: low contrast, no fill weight. The typography
 * and the negative space carry the composition; the frame just holds space
 * with intent until real footage takes over.
 */

type Props = {
  aspect?: Aspect;
  /** The path the real asset should be dropped at. Shown, deliberately. */
  path?: string;
  /** Slate marking — "PROJECT 01", "EP. 03", scene name. */
  slate?: string;
  /** Full-viewport frames drop the border and widen the crop inset. */
  variant?: "framed" | "bleed";
  /** The aperture ring echoes the B-mark. On for hero-scale frames only. */
  aperture?: boolean;
  /**
   * Suppress the slate + path markings. Used where the scene's own
   * typography is the one strong element and a second label system would
   * be competing with it.
   */
  info?: boolean;
  cropColour?: string;
  className?: string;
};

export default function AssetPlaceholder({
  aspect,
  path,
  slate,
  variant = "framed",
  aperture = false,
  info = true,
  cropColour = "rgb(245 240 235 / 0.22)",
  className = "",
}: Props) {
  const bleed = variant === "bleed";

  return (
    <div
      className={[
        "crop-marks @container relative overflow-hidden bg-smoke/10",
        bleed ? "" : "border border-white/8",
        aspect ? ASPECT[aspect] : "",
        className,
      ].join(" ")}
      style={
        {
          "--crop-colour": cropColour,
          "--crop-inset": bleed ? "28px" : "12px",
          "--crop-length": bleed ? "26px" : "16px",
        } as React.CSSProperties
      }
      role="img"
      aria-label={
        slate ? `${slate} — media pending` : "Media pending — placeholder frame"
      }
    >
      {/* Full-bleed frames stack their markings in the centre: the corners
          of a full-viewport scene belong to the scene's own typography, and
          two label systems fighting for the same corner is the fastest way
          to look unfinished rather than intentional. */}
      {bleed ? (
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-5 px-6 text-center">
          {aperture && (
            /* The aperture is the one circle the system allows — it is the mark. */
            <div
              className="grid size-16 place-items-center border border-white/12 md:size-24"
              style={{ borderRadius: "50%" }}
            >
              <span
                className="size-1.5 bg-crimson/70"
                style={{ borderRadius: "50%" }}
              />
            </div>
          )}
          {info && slate && (
            <span className="text-label uppercase text-white/30">{slate}</span>
          )}
          {info && path && (
            <span className="max-w-full truncate font-mono text-[10px] tracking-[0.12em] text-white/20">
              {path}
            </span>
          )}
        </div>
      ) : (
        <>
          {aperture && (
            <div className="pointer-events-none absolute inset-0 grid place-items-center">
              <div
                className="grid size-16 place-items-center border border-white/12 md:size-24"
                style={{ borderRadius: "50%" }}
              >
                <span
                  className="size-1.5 bg-crimson/70"
                  style={{ borderRadius: "50%" }}
                />
              </div>
            </div>
          )}

          <div className="pointer-events-none absolute inset-x-6 bottom-5 flex items-end justify-between gap-4">
            {info && slate && (
              <span className="shrink-0 whitespace-nowrap text-label uppercase text-white/35">
                {slate}
              </span>
            )}
            {/* The path yields first — narrow frames drop it rather than
                letting two markings collide. */}
            {info && path && (
              <span className="hidden min-w-0 truncate font-mono text-[10px] tracking-[0.12em] text-white/22 @[22rem]:block">
                {path}
              </span>
            )}
          </div>

          <span className="pointer-events-none absolute right-6 top-5 text-label uppercase text-white/22">
            {aspect ?? "Pending"}
          </span>
        </>
      )}
    </div>
  );
}

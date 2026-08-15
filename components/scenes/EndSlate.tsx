import Wordmark from "@/components/chrome/Wordmark";
import { SITE } from "@/content/site";

/**
 * SCENE 13 · END SLATE
 *
 * Section 14, verbatim: "3 seconds. Black. White logo centred. Gold
 * tagline below. No other elements."
 *
 * That specification is already perfect, so it becomes the footer. Legal
 * sits at 20% and surfaces on hover — it exists without intruding on the
 * last frame anyone sees.
 */
export default function EndSlate() {
  return (
    <footer
      data-scene="13"
      data-scene-name="End Slate"
      className="relative flex h-[70svh] flex-col items-center justify-center bg-black px-5 text-center"
    >
      <Wordmark
        variant="vertical"
        className="text-[clamp(1.75rem,6vw,4rem)]"
      />
      <p className="mt-6 text-label uppercase text-gold">{SITE.tagline}</p>

      <p className="absolute inset-x-0 bottom-6 text-[9px] uppercase tracking-[0.3em] text-white/20 transition-opacity duration-200 hover:text-white/45">
        © {new Date().getFullYear()} {SITE.name} · {SITE.location}
      </p>
    </footer>
  );
}

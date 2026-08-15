/**
 * SCENE 03C · MICRODRAMA TITLE CARD
 *
 * Full-bleed Crimson. White type only. One word.
 *
 * Section 12, Story Template B: "Full-bleed Crimson, White typography
 * only, zero images. The colour IS the message." Six hundred milliseconds
 * of Crimson does more positioning work than a paragraph would.
 */
export default function MicrodramaCard() {
  return (
    <section
      data-scene="05"
      data-scene-name="Microdrama"
      data-mode="alert"
      className="flex h-[70svh] items-center justify-center bg-crimson px-5"
    >
      <h2 className="text-center text-display-xl font-black uppercase text-white">
        Microdrama
      </h2>
    </section>
  );
}

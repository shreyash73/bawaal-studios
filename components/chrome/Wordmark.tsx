import { BRAND } from "@/content/site";

/**
 * THE MARK IS NOT DRAWN HERE.
 *
 * Brand Book Section 06: the logo is never recreated from memory or from a
 * scan, and the B's aperture is a custom letterform, not something to
 * approximate in CSS.
 *
 * So this is honest placeholder typography — the wordmark set as plain
 * type, following the lockup's construction ratios (STUDIOS at 0.33× the
 * cap height, wider tracking, subordinate to BAWAAL) with a Crimson pending
 * marker. The moment master SVGs are set in content/site.ts, they take over
 * and the marker disappears.
 */

type Props = {
  variant?: "vertical" | "horizontal";
  tone?: "white" | "black";
  className?: string;
};

export default function Wordmark({
  variant = "horizontal",
  tone = "white",
  className = "",
}: Props) {
  const src = tone === "white" ? BRAND.wordmarkWhite : BRAND.wordmarkBlack;
  const colour = tone === "white" ? "text-white" : "text-navy";

  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt="Bawaal Studios"
        className={`block h-auto ${className}`}
      />
    );
  }

  if (variant === "vertical") {
    return (
      <span
        className={`group relative inline-block font-display leading-[0.9] ${colour} ${className}`}
        title="Placeholder typography — master logo SVG pending"
        data-placeholder="logo"
      >
        <span className="block text-[1em] font-black tracking-[-0.03em] uppercase">
          Bawaal
        </span>
        <span className="block text-[0.33em] font-bold tracking-[0.34em] uppercase">
          Studios
        </span>
        <PendingDot />
      </span>
    );
  }

  return (
    <span
      className={`relative inline-flex items-baseline gap-[0.5em] font-display ${colour} ${className}`}
      title="Placeholder typography — master logo SVG pending"
      data-placeholder="logo"
    >
      <span className="text-[1em] font-black tracking-[-0.03em] uppercase">
        Bawaal
      </span>
      <span aria-hidden="true" className="h-[0.8em] w-px self-center bg-crimson" />
      <span className="text-[0.5em] font-bold tracking-[0.3em] uppercase opacity-80">
        Studios
      </span>
      <PendingDot />
    </span>
  );
}

/** Small, deliberate, and gone the second a real SVG is supplied. */
function PendingDot() {
  return (
    <span
      aria-hidden="true"
      title="Logo SVG pending"
      className="absolute -right-2.5 -top-0.5 size-[3px] bg-crimson"
      style={{ borderRadius: "50%" }}
    />
  );
}

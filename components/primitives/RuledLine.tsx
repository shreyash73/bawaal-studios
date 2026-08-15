/**
 * Section 09 · "Thin horizontal rules (6pt, Crimson) as section dividers.
 * Never decorative — always structural."
 */

export default function RuledLine({
  className = "",
  tone = "crimson",
  width = "w-16",
}: {
  className?: string;
  tone?: "crimson" | "gold" | "amber" | "hairline";
  width?: string;
}) {
  const TONE = {
    crimson: "bg-crimson h-[3px]",
    gold: "bg-gold h-[3px]",
    amber: "bg-amber h-[3px]",
    hairline: "bg-white/12 h-px",
  } as const;

  return <hr className={`border-0 ${TONE[tone]} ${width} ${className}`} />;
}

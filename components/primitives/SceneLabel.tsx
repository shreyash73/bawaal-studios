/**
 * 10px · ALL CAPS · +300 tracking. Section 08.
 * Production furniture: quiet, structural, never chrome.
 */

type Props = {
  children: React.ReactNode;
  tone?: "muted" | "crimson" | "gold" | "amber" | "white";
  className?: string;
  as?: "span" | "div" | "p";
};

const TONE = {
  muted: "text-white/40",
  crimson: "text-crimson",
  gold: "text-gold",
  amber: "text-amber",
  white: "text-white",
} as const;

export default function SceneLabel({
  children,
  tone = "muted",
  className = "",
  as: Tag = "span",
}: Props) {
  return (
    <Tag
      className={`block text-label uppercase ${TONE[tone]} ${className}`}
    >
      {children}
    </Tag>
  );
}

import Link from "next/link";
import SceneLabel from "@/components/primitives/SceneLabel";

/**
 * MISSING FRAME. Black, one word, one way out.
 */
export default function NotFound() {
  return (
    <div className="flex h-[100svh] flex-col items-center justify-center bg-black px-5 text-center">
      <h1 className="text-display-xl font-black uppercase text-white">Cut.</h1>
      <SceneLabel tone="crimson" className="mt-6">
        404 — frame not found
      </SceneLabel>
      <Link
        href="/"
        className="mt-12 border-b border-white/30 pb-1 text-label uppercase text-white transition-colors duration-200 hover:border-crimson hover:text-crimson"
      >
        Back to the film →
      </Link>
    </div>
  );
}

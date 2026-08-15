"use client";

import { useState } from "react";
import ProjectFrame from "./ProjectFrame";
import SceneLabel from "@/components/primitives/SceneLabel";
import {
  CATEGORY_LABEL,
  PROJECTS,
  type Category,
} from "@/content/projects";

/**
 * THE INDEX — WORK / 2026.
 *
 * Filtering is an edit, not a filter. Selecting a category does not fade
 * and reflow: non-matching frames are gone in one frame. It reads
 * editorial; it must never read like an e-commerce facet.
 *
 * The category strip runs vertically along the left edge on desktop, which
 * keeps it out of the frames entirely.
 */

const FILTERS: { key: Category | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "brand-film", label: CATEGORY_LABEL["brand-film"] },
  { key: "tvc", label: CATEGORY_LABEL.tvc },
  { key: "microdrama", label: CATEGORY_LABEL.microdrama },
  { key: "youtube", label: CATEGORY_LABEL.youtube },
  { key: "post", label: CATEGORY_LABEL.post },
];

export default function WorkIndex() {
  const [filter, setFilter] = useState<Category | "all">("all");

  const shown =
    filter === "all"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === filter);

  return (
    <div className="relative bg-black">
      <header className="flex items-end justify-between px-5 pb-12 pt-32 md:px-8 md:pt-36">
        <h1 className="text-display-xl font-black uppercase text-white">
          Work
        </h1>
        <SceneLabel tone="crimson" className="pb-3">
          {String(shown.length).padStart(2, "0")} / 2026
        </SceneLabel>
      </header>

      {/* Desktop: vertical strip on the left edge. */}
      <nav
        aria-label="Filter work"
        className="fixed left-0 top-1/2 z-40 hidden -translate-y-1/2 lg:block"
      >
        <ul className="flex flex-col gap-6 px-3 [writing-mode:vertical-rl]">
          {FILTERS.map((f) => (
            <li key={f.key}>
              <button
                type="button"
                onClick={() => setFilter(f.key)}
                aria-pressed={filter === f.key}
                className={[
                  "rotate-180 text-label uppercase transition-colors duration-150",
                  filter === f.key
                    ? "text-crimson"
                    : "text-white/35 hover:text-white",
                ].join(" ")}
              >
                {f.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile: a single quiet row, and deliberately not sticky — a filter
          that follows you down a full-bleed portfolio is chrome competing
          with the frames, and it lands on the captions. */}
      <nav
        aria-label="Filter work"
        className="overflow-x-auto border-y border-white/12 bg-black lg:hidden"
      >
        <ul className="flex gap-6 px-5 py-4">
          {FILTERS.map((f) => (
            <li key={f.key} className="shrink-0">
              <button
                type="button"
                onClick={() => setFilter(f.key)}
                aria-pressed={filter === f.key}
                className={[
                  "text-label uppercase transition-colors duration-150",
                  filter === f.key ? "text-crimson" : "text-white/40",
                ].join(" ")}
              >
                {f.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {shown.length === 0 ? (
        <div className="flex h-[60svh] items-center px-5 md:px-8">
          <SceneLabel>No frames in this category yet.</SceneLabel>
        </div>
      ) : (
        shown.map((project) => (
          <ProjectFrame key={project.slug} project={project} />
        ))
      )}
    </div>
  );
}

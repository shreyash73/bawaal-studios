"use client";

import { useState } from "react";
import AssetPlaceholder from "@/components/primitives/AssetPlaceholder";
import SceneLabel from "@/components/primitives/SceneLabel";
import Reveal from "@/components/motion/Reveal";
import {
  FOUNDERS,
  FOUNDING_LINE,
  PEOPLE_STATEMENT,
  portraitPath,
} from "@/content/team";

/**
 * SCENE 09 · THE PEOPLE — Midnight Navy, per Section 14's ABOUT spec.
 *
 * Five portraits in an intentionally uneven row. Not a five-column grid:
 * a tidy row would say "leadership team", and this section has to say
 * "five friends". The off-balance is the argument.
 *
 * Hover cuts to a second frame — one frame, no crossfade — shifts the crop
 * 2%, and lands the personal line. Restraint is the whole job here.
 */
export default function TeamSection() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section
      id="studio"
      data-scene="09"
      data-scene-name="The People"
      className="relative bg-navy px-5 py-24 md:px-8 md:py-32"
    >
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <h2 className="-ml-[0.04em] text-display-xl font-black uppercase text-white">
          {PEOPLE_STATEMENT.map((line, i) => (
            <Reveal key={line} index={i} as="span" className="block">
              {line}
            </Reveal>
          ))}
        </h2>
        <Reveal index={2} className="max-w-[34ch] md:pb-4">
          <p className="text-caption leading-relaxed text-white/45">
            {FOUNDING_LINE}
          </p>
        </Reveal>
      </div>

      <ul className="mt-20 grid grid-cols-2 items-start gap-x-4 gap-y-12 md:grid-cols-3 lg:flex lg:gap-5">
        {FOUNDERS.map((f, i) => {
          const on = hovered === f.id;
          return (
            <li
              key={f.id}
              className={`lg:flex-1 ${f.offset}`}
              onMouseEnter={() => setHovered(f.id)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(f.id)}
              onBlur={() => setHovered(null)}
            >
              <Reveal index={i} duration="image">
                <div
                  tabIndex={0}
                  className={`relative overflow-hidden outline-offset-4 ${f.height} h-[34svh]`}
                  aria-label={`Founder ${f.slate} — ${f.discipline}`}
                >
                  <div
                    className="size-full"
                    style={{
                      transform: on
                        ? "translate3d(0,-2%,0)"
                        : "translate3d(0,0,0)",
                      transition:
                        "transform var(--duration-image) var(--ease-breathe)",
                    }}
                  >
                    <AssetPlaceholder
                      path={portraitPath(f, on ? 2 : 1)}
                      slate={f.slate}
                      cropColour="rgb(245 240 235 / 0.24)"
                      className="size-full"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <h3 className="text-caption font-bold uppercase tracking-[0.14em] text-white">
                    {f.name ?? `Founder ${f.slate}`}
                  </h3>
                  <SceneLabel tone="crimson" className="mt-1.5">
                    {f.role ?? f.discipline}
                  </SceneLabel>
                  <p
                    className="mt-2 text-caption text-white/45"
                    style={{
                      opacity: on ? 1 : 0,
                      transition:
                        "opacity var(--duration-type) var(--ease-cut)",
                    }}
                  >
                    {f.line ?? "Personal line pending."}
                  </p>
                </div>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

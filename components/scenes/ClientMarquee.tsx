"use client";

import { useState } from "react";
import SceneLabel from "@/components/primitives/SceneLabel";
import AssetPlaceholder from "@/components/primitives/AssetPlaceholder";
import { CLIENTS, CRAFTS, COLLABORATORS_HEADLINE } from "@/content/clients";

/**
 * SCENE 11 · COLLABORATORS
 *
 * Not a logo wall — names set as type in a slow marquee. Hovering stops it
 * dead (a freeze frame), turns the name Crimson, and cuts a still in
 * behind at 30%.
 *
 * Names-as-type solves two problems at once: it obeys "no giant logo wall",
 * and it looks equally intentional with three clients or thirty.
 *
 * With no roster yet the marquee runs the crafts the studio works in,
 * under an explicit placeholder label. Those are disciplines, not clients.
 * Nothing here claims a relationship that does not exist.
 */
export default function ClientMarquee() {
  const [frozen, setFrozen] = useState<string | null>(null);

  const hasClients = CLIENTS.length > 0;
  const items: { key: string; label: string; still: string | null }[] =
    hasClients
      ? CLIENTS.map((c) => ({ key: c.name, label: c.name, still: c.still }))
      : CRAFTS.map((c) => ({ key: c, label: c, still: null }));

  const active = items.find((i) => i.key === frozen);

  return (
    <section
      data-scene="11"
      data-scene-name="Collaborators"
      className="relative overflow-hidden bg-black py-24 md:py-32"
    >
      {/* The still cuts in behind. One frame, no fade. */}
      {active?.still && (
        <div className="pointer-events-none absolute inset-0 opacity-30">
          <AssetPlaceholder
            variant="bleed"
            path={active.still}
            slate={active.label}
            className="size-full"
          />
        </div>
      )}

      <div className="relative px-5 md:px-8">
        <h2 className="max-w-[18ch] text-display-l font-black uppercase text-white">
          {COLLABORATORS_HEADLINE}
        </h2>
        <SceneLabel tone={hasClients ? "crimson" : "muted"} className="mt-5">
          {hasClients
            ? "Selected clients"
            : "Client roster pending — crafts shown in placeholder"}
        </SceneLabel>
      </div>

      <div
        className="relative mt-16 overflow-hidden"
        role="list"
        aria-label={hasClients ? "Clients" : "Crafts"}
      >
        <div
          className="marquee-track"
          data-frozen={frozen ? "true" : "false"}
          style={{ ["--marquee-duration" as string]: "52s" }}
        >
          {[0, 1].map((pass) => (
            <div key={pass} className="flex shrink-0" aria-hidden={pass === 1}>
              {items.map((item) => (
                <button
                  key={`${pass}-${item.key}`}
                  type="button"
                  role="listitem"
                  onMouseEnter={() => setFrozen(item.key)}
                  onMouseLeave={() => setFrozen(null)}
                  onFocus={() => setFrozen(item.key)}
                  onBlur={() => setFrozen(null)}
                  className={[
                    "whitespace-nowrap px-[3vw] text-display-m font-bold uppercase transition-colors duration-200",
                    frozen === item.key ? "text-crimson" : "text-white/70",
                  ].join(" ")}
                >
                  {item.label}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

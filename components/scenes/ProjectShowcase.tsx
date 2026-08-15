import Link from "next/link";
import ProjectFrame from "@/components/work/ProjectFrame";
import SceneLabel from "@/components/primitives/SceneLabel";
import { PROJECTS } from "@/content/projects";

/**
 * SCENE 07 · SELECTED WORK
 *
 * No grid. A vertical sequence of full-viewport frames whose format
 * alternates so the rhythm never settles — 16:9, then 4:5 held right with
 * the type in the negative space, then 9:16 in a void.
 *
 * The fixed WORK / 2026 marking sits with the scene the whole way through.
 */
export default function ProjectShowcase() {
  return (
    <section
      id="work"
      data-scene="07"
      data-scene-name="Selected Work"
      className="relative bg-black"
    >
      <div className="flex items-end justify-between px-5 pb-10 pt-24 md:px-8 md:pt-28">
        <h2 className="text-display-l font-black uppercase text-white">
          Selected Work
        </h2>
        <SceneLabel tone="crimson" className="pb-2">
          Work / 2026
        </SceneLabel>
      </div>

      {PROJECTS.slice(0, 4).map((project) => (
        <ProjectFrame key={project.slug} project={project} />
      ))}

      <div className="flex justify-between border-t border-white/12 px-5 py-10 md:px-8">
        <SceneLabel>
          {String(PROJECTS.length).padStart(2, "0")} projects
        </SceneLabel>
        <Link
          href="/work"
          data-cursor="Explore"
          className="text-label uppercase text-white transition-colors duration-200 hover:text-crimson"
        >
          All work →
        </Link>
      </div>
    </section>
  );
}

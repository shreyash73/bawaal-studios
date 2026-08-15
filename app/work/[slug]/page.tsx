import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import VideoFrame from "@/components/primitives/VideoFrame";
import AssetPlaceholder from "@/components/primitives/AssetPlaceholder";
import SceneLabel from "@/components/primitives/SceneLabel";
import RuledLine from "@/components/primitives/RuledLine";
import EndSlate from "@/components/scenes/EndSlate";
import {
  CATEGORY_LABEL,
  PROJECTS,
  assetPath,
  getProject,
  nextProject,
} from "@/content/projects";
import { STAGES } from "@/content/process";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title ?? project.slate,
    description:
      project.description ??
      `${CATEGORY_LABEL[project.category]} — ${project.year}`,
  };
}

/**
 * THE CASE STUDY — film first.
 *
 * Opens on the film. No page header, no breadcrumb. The description is
 * capped at three sentences: if there is more to say, the film failed.
 *
 * PROCESS inverts to day mode — Studio White ground, Midnight Navy type.
 * The only light screen on the entire site, landing exactly where sustained
 * reading happens. It is an approved pairing (Section 07 assigns cream to
 * editorial long-form) and it feels like house lights after a screening.
 */
export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const next = nextProject(slug);

  return (
    <>
      {/* THE FILM */}
      <section className="relative h-[100svh] w-full overflow-hidden bg-black">
        <VideoFrame
          src={project.video}
          poster={project.poster}
          path={assetPath(project, "video")}
          slate={project.slate}
          variant="bleed"
          aperture
          className="absolute inset-0 size-full"
        />
        <div className="absolute inset-x-0 bottom-0 px-5 pb-16 md:px-8 md:pb-14">
          <h1 className="edge-left text-display-xl font-black uppercase text-white">
            {project.title ?? project.slate}
          </h1>
        </div>
      </section>

      {/* METADATA STRIP */}
      <section className="border-b border-white/12 bg-black px-5 py-8 md:px-8">
        <dl className="flex flex-wrap gap-x-12 gap-y-5">
          {[
            ["Client", project.client ?? "Client TBC"],
            ["Category", CATEGORY_LABEL[project.category]],
            ["Year", String(project.year)],
            ["Runtime", project.runtime ?? "TBC"],
          ].map(([k, v]) => (
            <div key={k}>
              <SceneLabel tone="crimson" as="div">
                {k}
              </SceneLabel>
              <dd className="mt-2 text-caption uppercase tracking-[0.14em] text-white">
                {v}
              </dd>
            </div>
          ))}
        </dl>

        <p className="mt-12 max-w-[62ch] text-lead text-white/60">
          {project.description ??
            "Description pending. Three sentences maximum — the film carries the argument, the copy only footnotes it."}
        </p>
      </section>

      {/* SELECTED FRAMES */}
      <section className="bg-black">
        <div className="px-5 py-14 md:px-8">
          <SceneLabel>Selected frames</SceneLabel>
        </div>
        {(project.stills.length
          ? project.stills
          : [1, 2, 3].map((n) => `/assets/work/${project.slug}-still-0${n}.jpg`)
        ).map((still, i) => (
          <div key={still} className="h-[85svh] w-full">
            <AssetPlaceholder
              variant="bleed"
              path={still}
              slate={`Frame ${String(i + 1).padStart(2, "0")}`}
              className="size-full"
            />
          </div>
        ))}
      </section>

      {/* PROCESS — THE LIGHTS COME UP */}
      <section
        data-mode="day"
        className="bg-white px-5 py-28 text-navy md:px-8 md:py-36"
      >
        <SceneLabel tone="crimson" className="mb-5">
          Process
        </SceneLabel>
        <h2 className="max-w-[20ch] text-display-l font-black uppercase text-navy">
          From first idea to final frame.
        </h2>
        <RuledLine className="mt-10" />

        <ol className="mt-14 grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {STAGES.map((stage) => (
            <li key={stage.index}>
              <span className="block text-label uppercase text-crimson">
                {stage.index}
              </span>
              <h3 className="mt-3 text-display-m font-black uppercase text-navy">
                {stage.title}
              </h3>
              <p className="mt-3 max-w-[46ch] text-body text-navy/65">
                {stage.line}
              </p>
            </li>
          ))}
        </ol>

        {/* BTS stays in day mode. Warm, candid, real. */}
        <div className="mt-20">
          <span className="block text-label uppercase text-navy/50">
            Behind the scenes
          </span>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {(project.bts.length
              ? project.bts
              : [1, 2, 3].map(
                  (n) => `/assets/work/${project.slug}-bts-0${n}.jpg`,
                )
            ).map((src, i) => (
              <AssetPlaceholder
                key={src}
                aspect="4:5"
                path={src}
                slate={`BTS ${String(i + 1).padStart(2, "0")}`}
                cropColour="rgb(16 16 42 / 0.3)"
              />
            ))}
          </div>
        </div>
      </section>

      {/* FINAL FILM — cut back to black */}
      <section className="bg-black px-5 py-24 md:px-8">
        <SceneLabel className="mb-8">Final film</SceneLabel>
        <VideoFrame
          src={project.video}
          poster={project.poster}
          path={assetPath(project, "video")}
          slate={project.slate}
          aspect="16:9"
          className="w-full"
        />
      </section>

      {/* NEXT PROJECT — the whole viewport is the link */}
      <Link
        href={`/work/${next.slug}`}
        data-cursor="Next"
        className="group relative flex h-[70svh] w-full items-center justify-center overflow-hidden bg-black"
      >
        <div className="absolute inset-0 opacity-40 transition-opacity duration-700 group-hover:opacity-60">
          <AssetPlaceholder
            variant="bleed"
            path={assetPath(next, "poster")}
            slate={next.slate}
            className="size-full"
          />
        </div>
        <div className="relative text-center">
          <SceneLabel tone="crimson" className="mb-4">
            Next
          </SceneLabel>
          <span className="block text-display-l font-black uppercase text-white">
            {next.title ?? next.slate}
          </span>
        </div>
      </Link>

      <EndSlate />
    </>
  );
}

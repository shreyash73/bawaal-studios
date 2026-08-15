import Link from "next/link";
import VideoFrame from "@/components/primitives/VideoFrame";
import SceneLabel from "@/components/primitives/SceneLabel";
import {
  CATEGORY_LABEL,
  assetPath,
  type Project,
} from "@/content/projects";

/**
 * One project, one viewport. The frame dominates; the information is
 * secondary — Section 14: "Full-bleed thumbnails, hover reveals title and
 * client. No text before hover. Let the frames do the work."
 *
 * On touch there is no hover, so metadata is simply present. Designing a
 * reveal for a device that cannot perform it is designing for nobody.
 */
export default function ProjectFrame({ project }: { project: Project }) {
  const meta = [
    CATEGORY_LABEL[project.category],
    project.client ?? "Client TBC",
    String(project.year),
  ];

  const media = (
    <VideoFrame
      src={project.video}
      poster={project.poster}
      path={assetPath(project, "video")}
      /* No slate here — the caption already names the project, and two
         markings for one frame is exactly the competition the direction
         forbids. The asset path stays; it is the useful half. */
      aspect={project.aspect}
      variant={project.layout === "full-bleed" ? "bleed" : "framed"}
      aperture={project.layout === "full-bleed"}
      className={
        project.layout === "full-bleed"
          ? "absolute inset-0 size-full"
          : "size-full"
      }
    />
  );

  return (
    <Link
      href={`/work/${project.slug}`}
      data-cursor="View"
      className="group relative flex h-[100svh] w-full items-center overflow-hidden bg-black"
      aria-label={`${project.title ?? project.slate} — ${meta.join(", ")}`}
    >
      {project.layout === "full-bleed" && (
        <>
          <div className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(.33,1,.68,1)] group-hover:scale-[1.04]">
            {media}
          </div>
          <Caption project={project} meta={meta} className="px-5 md:px-8" />
        </>
      )}

      {project.layout === "inset-right" && (
        <div className="grid w-full grid-cols-1 items-center gap-8 px-5 md:grid-cols-12 md:px-8">
          <div className="order-2 md:order-1 md:col-span-4">
            <Caption project={project} meta={meta} inline />
          </div>
          <div className="order-1 md:order-2 md:col-span-8">
            <div className="transition-transform duration-700 ease-[cubic-bezier(.33,1,.68,1)] group-hover:scale-[1.03]">
              {media}
            </div>
          </div>
        </div>
      )}

      {project.layout === "vertical-centre" && (
        <div className="flex w-full flex-col items-center justify-center px-5">
          <div className="h-[64svh] transition-transform duration-700 ease-[cubic-bezier(.33,1,.68,1)] group-hover:scale-[1.03]">
            <div className="h-full">{media}</div>
          </div>
          <div className="mt-6 w-full max-w-md">
            <Caption project={project} meta={meta} inline />
          </div>
        </div>
      )}
    </Link>
  );
}

function Caption({
  project,
  meta,
  inline = false,
  className = "",
}: {
  project: Project;
  meta: string[];
  inline?: boolean;
  className?: string;
}) {
  return (
    <div
      className={[
        inline ? "" : "absolute inset-x-0 bottom-16 md:bottom-14",
        className,
      ].join(" ")}
    >
      {/* Title slams in on hover. Never clutters the image before that. */}
      <h3 className="text-display-m font-black uppercase text-white opacity-100 transition-opacity duration-200 md:opacity-0 md:group-hover:opacity-100">
        {project.title ?? project.slate}
      </h3>
      <SceneLabel
        tone="white"
        className="mt-2 opacity-100 transition-opacity duration-200 md:opacity-40 md:group-hover:opacity-100"
      >
        {meta.join(" · ")}
      </SceneLabel>
    </div>
  );
}

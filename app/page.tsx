import ColdOpen from "@/components/scenes/ColdOpen";
import Hero from "@/components/scenes/Hero";
import Showreel from "@/components/scenes/Showreel";
import SceneCut from "@/components/scenes/SceneCut";
import ServiceChapter from "@/components/scenes/ServiceChapter";
import PostGradeSequence from "@/components/scenes/PostGradeSequence";
import MicrodramaCard from "@/components/scenes/MicrodramaCard";
import MicrodramaPlayer from "@/components/scenes/MicrodramaPlayer";
import ProjectShowcase from "@/components/scenes/ProjectShowcase";
import ProcessTimeline from "@/components/scenes/ProcessTimeline";
import TeamSection from "@/components/scenes/TeamSection";
import Manifesto from "@/components/scenes/Manifesto";
import ClientMarquee from "@/components/scenes/ClientMarquee";
import ContactSection from "@/components/scenes/ContactSection";
import EndSlate from "@/components/scenes/EndSlate";
import SceneMeter from "@/components/chrome/SceneMeter";
import WhipPan from "@/components/motion/WhipPan";
import { CHAPTERS } from "@/content/site";

/**
 * THE FILM — thirteen scenes, one continuous cut.
 *
 * The work opens before the copy: reel at scene 02, work at scene 07.
 * Explanation is the second act. Section boundaries are edits, not gaps.
 */
export default function Home() {
  const production = CHAPTERS[0];

  return (
    <>
      <ColdOpen />
      <SceneMeter total={13} />

      <Hero />
      <Showreel />

      <SceneCut index="01" title="Production" />
      <ServiceChapter
        scene="03"
        index={production.index}
        title={production.title}
        statement={production.statement}
        capabilities={production.capabilities}
        media={production.media}
        poster={production.poster}
      />

      {/* The one whip pan on the site. Production → Post. */}
      <WhipPan label="Post" />
      <PostGradeSequence />

      <MicrodramaCard />
      <MicrodramaPlayer />

      <SceneCut index="03" title="Selected Work" />
      <ProjectShowcase />

      <ProcessTimeline />
      <TeamSection />
      <Manifesto />
      <ClientMarquee />
      <ContactSection />
      <EndSlate />
    </>
  );
}

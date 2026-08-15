import type { Metadata } from "next";
import WorkIndex from "@/components/work/WorkIndex";
import EndSlate from "@/components/scenes/EndSlate";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected work — brand films, TVCs, microdramas, YouTube and post.",
};

export default function WorkPage() {
  return (
    <>
      <WorkIndex />
      <EndSlate />
    </>
  );
}

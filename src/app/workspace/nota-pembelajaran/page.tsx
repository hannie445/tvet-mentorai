import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WorkspacePage } from "@/components/workspace/workspace-page";
import { getWorkflowItem } from "@/lib/workflow-items";

export const metadata: Metadata = {
  title: "Nota Pembelajaran — TVET MentorAI",
};

export default function NotaPembelajaranPage() {
  const item = getWorkflowItem("nota-pembelajaran");
  if (!item) notFound();

  return <WorkspacePage item={item} />;
}

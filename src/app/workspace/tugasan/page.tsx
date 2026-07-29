import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WorkspacePage } from "@/components/workspace/workspace-page";
import { getWorkflowItem } from "@/lib/workflow-items";

export const metadata: Metadata = {
  title: "Tugasan — TVET MentorAI",
};

export default function TugasanPage() {
  const item = getWorkflowItem("tugasan");
  if (!item) notFound();

  return <WorkspacePage item={item} />;
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WorkspacePage } from "@/components/workspace/workspace-page";
import { getWorkflowItem } from "@/lib/workflow-items";

export const metadata: Metadata = {
  title: "DPSK — TVET MentorAI",
};

export default function DpskPage() {
  const item = getWorkflowItem("dpsk");
  if (!item) notFound();

  return <WorkspacePage item={item} />;
}

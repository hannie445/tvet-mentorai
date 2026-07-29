import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WorkspacePage } from "@/components/workspace/workspace-page";
import { getWorkflowItem } from "@/lib/workflow-items";

export const metadata: Metadata = {
  title: "PB Teori — TVET MentorAI",
};

export default function PbPage() {
  const item = getWorkflowItem("pb");
  if (!item) notFound();

  return <WorkspacePage item={item} />;
}

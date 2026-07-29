import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WorkspacePage } from "@/components/workspace/workspace-page";
import { getWorkflowItem } from "@/lib/workflow-items";

export const metadata: Metadata = {
  title: "PB Amali — TVET MentorAI",
};

export default function PbAmaliPage() {
  const item = getWorkflowItem("pb-amali");
  if (!item) notFound();

  return <WorkspacePage item={item} />;
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WorkspacePage } from "@/components/workspace/workspace-page";
import { getWorkflowItem } from "@/lib/workflow-items";

export const metadata: Metadata = {
  title: "Latihan Amali — TVET MentorAI",
};

export default function LatihanAmaliPage() {
  const item = getWorkflowItem("latihan-amali");
  if (!item) notFound();

  return <WorkspacePage item={item} />;
}

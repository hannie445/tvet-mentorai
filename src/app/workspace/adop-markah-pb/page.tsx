import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WorkspacePage } from "@/components/workspace/workspace-page";
import { getWorkflowItem } from "@/lib/workflow-items";

export const metadata: Metadata = {
  title: "ADOP Markah PB — TVET MentorAI",
};

export default function AdopMarkahPbPage() {
  const item = getWorkflowItem("adop-markah-pb");
  if (!item) notFound();

  return <WorkspacePage item={item} />;
}

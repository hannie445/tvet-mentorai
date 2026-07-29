import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AiCoachModulePage } from "@/components/ai-coach/ai-coach-module-page";
import { getAiCoachAction } from "@/lib/ai-coach-actions";

export const metadata: Metadata = {
  title: "Set Induksi — TVET MentorAI",
};

export default function SetInduksiPage() {
  const action = getAiCoachAction("set-induksi");
  if (!action) notFound();

  return <AiCoachModulePage action={action} />;
}

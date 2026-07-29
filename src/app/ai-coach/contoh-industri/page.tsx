import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AiCoachModulePage } from "@/components/ai-coach/ai-coach-module-page";
import { getAiCoachAction } from "@/lib/ai-coach-actions";

export const metadata: Metadata = {
  title: "Contoh Industri — TVET MentorAI",
};

export default function ContohIndustriPage() {
  const action = getAiCoachAction("contoh-industri");
  if (!action) notFound();

  return <AiCoachModulePage action={action} />;
}

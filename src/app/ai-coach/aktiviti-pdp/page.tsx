import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AiCoachModulePage } from "@/components/ai-coach/ai-coach-module-page";
import { getAiCoachAction } from "@/lib/ai-coach-actions";

export const metadata: Metadata = {
  title: "Cadangan Aktiviti — TVET MentorAI",
};

export default function AktivitiPdpPage() {
  const action = getAiCoachAction("aktiviti-pdp");
  if (!action) notFound();

  return <AiCoachModulePage action={action} />;
}

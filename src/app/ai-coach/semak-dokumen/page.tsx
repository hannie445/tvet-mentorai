import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AiCoachModulePage } from "@/components/ai-coach/ai-coach-module-page";
import { getAiCoachAction } from "@/lib/ai-coach-actions";

export const metadata: Metadata = {
  title: "Semakan Dokumen — TVET MentorAI",
};

export default function SemakDokumenPage() {
  const action = getAiCoachAction("semak-dokumen");
  if (!action) notFound();

  return <AiCoachModulePage action={action} />;
}

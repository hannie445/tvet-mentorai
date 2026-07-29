import { Lightbulb, Users, FileCheck2, Factory } from "lucide-react";
import type { CoachAction } from "@/types/dashboard";

export const aiCoachActions: CoachAction[] = [
  {
    id: "set-induksi",
    label: "Set Induksi",
    description: "Jana pengenalan pengajaran yang menarik",
    icon: Lightbulb,
  },
  {
    id: "aktiviti-pdp",
    label: "Cadangan Aktiviti",
    description: "Cadangan aktiviti pengajaran & pembelajaran",
    icon: Users,
  },
  {
    id: "semak-dokumen",
    label: "Semakan Dokumen",
    description: "Semakan pantas dokumen pengajaran",
    icon: FileCheck2,
  },
  {
    id: "contoh-industri",
    label: "Contoh Industri",
    description: "Kaitkan topik dengan amalan industri",
    icon: Factory,
  },
];

export function getAiCoachAction(id: string): CoachAction | undefined {
  return aiCoachActions.find((action) => action.id === id);
}

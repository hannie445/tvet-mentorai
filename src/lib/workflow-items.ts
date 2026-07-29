import { FileText, Users, FileEdit, FlaskConical, GraduationCap, ClipboardList, BarChart3 } from "lucide-react";
import type { WorkflowItem } from "@/types/dashboard";

export const workflowItems: WorkflowItem[] = [
  {
    id: "dpsk",
    label: "DPSK / KSKV",
    description: "Analisis Standard Kompetensi",
    icon: FileText,
    documentName: "DPSK",
  },
  {
    id: "nota-pembelajaran",
    label: "Nota Pembelajaran",
    description: "AI Jana Nota Berdasarkan DPSK/KSKV",
    icon: Users,
    documentName: "Nota Pembelajaran 1",
  },
  {
    id: "tugasan",
    label: "Kertas Tugasan",
    description: "AI Jana Soalan Berdasarkan Nota",
    icon: FileEdit,
    documentName: "Tugasan 1",
  },
  {
    id: "latihan-amali",
    label: "Kertas Latihan Amali",
    description: "AI Jana Soalan Amali",
    icon: FlaskConical,
    documentName: "Latihan Amali 1",
  },
  {
    id: "pb",
    label: "PB Teori",
    description: "Penilaian Berterusan (Teori)",
    icon: GraduationCap,
    documentName: "PB Teori",
  },
  {
    id: "pb-amali",
    label: "PB Amali",
    description: "Penilaian Berterusan (Amali)",
    icon: ClipboardList,
    documentName: "PB Amali",
  },
  {
    id: "adop-markah-pb",
    label: "ADOP Markah PB",
    description: "Analisis & Laporan Prestasi",
    icon: BarChart3,
    documentName: "ADOP Markah PB",
  },
];

export function getWorkflowItem(id: string): WorkflowItem | undefined {
  return workflowItems.find((item) => item.id === id);
}

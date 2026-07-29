import { FileText, Users, ClipboardCheck, TrendingUp } from "lucide-react";
import { KpiCard, type KpiCardData } from "@/components/dashboard/kpi-card";

const cards: KpiCardData[] = [
  {
    id: "documents",
    icon: FileText,
    value: "128",
    label: "Total Dokumen",
    trend: "+12 minggu ini",
    gradient: "bg-gradient-to-br from-blue-500 to-blue-600",
  },
  {
    id: "active-classes",
    icon: Users,
    value: "24",
    label: "Kelas Aktif",
    trend: "+3 minggu ini",
    gradient: "bg-gradient-to-br from-purple-500 to-purple-600",
  },
  {
    id: "assignments-graded",
    icon: ClipboardCheck,
    value: "186",
    label: "Tugasan Dinilai",
    trend: "+18 minggu ini",
    gradient: "bg-gradient-to-br from-emerald-500 to-emerald-600",
  },
  {
    id: "average-performance",
    icon: TrendingUp,
    value: "92%",
    label: "Purata Prestasi",
    trend: "+5% minggu ini",
    gradient: "bg-gradient-to-br from-orange-500 to-orange-600",
  },
];

export function KpiSection() {
  return (
    <section className="grid shrink-0 grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:h-[115px] lg:grid-cols-4">
      {cards.map((card) => (
        <KpiCard key={card.id} {...card} />
      ))}
    </section>
  );
}

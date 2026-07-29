import Link from "next/link";
import type { WorkflowItem } from "@/types/dashboard";

export type WorkflowAccent = "blue" | "purple" | "emerald" | "amber" | "rose" | "orange" | "indigo";

interface WorkflowCardProps {
  item: WorkflowItem;
  accent: WorkflowAccent;
  stepNumber: number;
}

const ACCENT_CLASSES: Record<WorkflowAccent, { chip: string; hoverBg: string; border: string; badge: string }> = {
  blue: { chip: "bg-blue-50 text-blue-600", hoverBg: "group-hover:bg-blue-600", border: "hover:border-blue-100", badge: "bg-blue-500" },
  purple: { chip: "bg-purple-50 text-purple-600", hoverBg: "group-hover:bg-purple-600", border: "hover:border-purple-100", badge: "bg-purple-500" },
  emerald: { chip: "bg-emerald-50 text-emerald-600", hoverBg: "group-hover:bg-emerald-600", border: "hover:border-emerald-100", badge: "bg-emerald-500" },
  amber: { chip: "bg-amber-50 text-amber-600", hoverBg: "group-hover:bg-amber-600", border: "hover:border-amber-100", badge: "bg-amber-500" },
  rose: { chip: "bg-rose-50 text-rose-600", hoverBg: "group-hover:bg-rose-600", border: "hover:border-rose-100", badge: "bg-rose-500" },
  orange: { chip: "bg-orange-50 text-orange-600", hoverBg: "group-hover:bg-orange-600", border: "hover:border-orange-100", badge: "bg-orange-500" },
  indigo: { chip: "bg-indigo-50 text-indigo-600", hoverBg: "group-hover:bg-indigo-600", border: "hover:border-indigo-100", badge: "bg-indigo-500" },
};

export function WorkflowCard({ item, accent, stepNumber }: WorkflowCardProps) {
  const Icon = item.icon;
  const colors = ACCENT_CLASSES[accent];

  return (
    <Link
      href={`/workspace/${item.id}`}
      aria-label={`Langkah ${stepNumber}: ${item.label} — ${item.description}`}
      className={`group relative flex flex-col gap-1.5 rounded-2xl border border-slate-100 bg-white p-3.5 pt-7 text-left shadow-soft transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-soft-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 active:translate-y-0 ${colors.border}`}
    >
      <span
        className={`absolute -top-2.5 left-3 flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold text-white shadow-soft ${colors.badge}`}
        aria-hidden="true"
      >
        {stepNumber}
      </span>

      <div className={`flex h-9 w-9 items-center justify-center rounded-lg transition-all duration-200 group-hover:scale-105 group-hover:text-white ${colors.chip} ${colors.hoverBg}`}>
        <Icon className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
      </div>

      <div className="space-y-0.5">
        <h3 className="text-xs font-semibold leading-tight text-slate-900">{item.label}</h3>
        <p className="text-[11px] leading-snug text-slate-500">{item.description}</p>
      </div>
    </Link>
  );
}

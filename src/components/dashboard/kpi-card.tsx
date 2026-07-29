import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface KpiCardData {
  id: string;
  icon: LucideIcon;
  value: string;
  label: string;
  trend: string;
  gradient: string;
}

export function KpiCard({ icon: Icon, value, label, trend, gradient }: KpiCardData) {
  return (
    <div
      className={cn(
        "group flex h-full items-center gap-3 rounded-3xl p-4 text-white shadow-soft-lg transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-soft-xl lg:p-3.5",
        gradient
      )}
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm lg:h-10 lg:w-10" aria-hidden="true">
        <Icon className="h-5 w-5 lg:h-4.5 lg:w-4.5" strokeWidth={2} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-xl font-bold tracking-tight lg:text-lg">{value}</p>
        <p className="truncate text-xs font-medium text-white/85 lg:text-[11px]">{label}</p>
        <p className="truncate text-[11px] text-white/70 lg:text-[10px]">{trend}</p>
      </div>
    </div>
  );
}

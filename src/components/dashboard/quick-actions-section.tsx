import Link from "next/link";
import { Upload, BookOpen, HeartPulse, BarChart3, Settings2, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuickAction {
  id: string;
  icon: LucideIcon;
  label: string;
  colorClass: string;
  href?: string;
}

const actions: QuickAction[] = [
  {
    id: "upload",
    icon: Upload,
    label: "Upload Dokumen",
    colorClass: "bg-purple-50 text-purple-600 group-hover:bg-purple-600",
    href: "/workspace/dpsk",
  },
  {
    id: "notes",
    icon: BookOpen,
    label: "Buka Nota",
    colorClass: "bg-blue-50 text-blue-600 group-hover:bg-blue-600",
    href: "/workspace/nota-pembelajaran",
  },
  {
    id: "lesson-health",
    icon: HeartPulse,
    label: "Lesson Health",
    colorClass: "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600",
  },
  {
    id: "analytics",
    icon: BarChart3,
    label: "Analytics",
    colorClass: "bg-orange-50 text-orange-600 group-hover:bg-orange-600",
    href: "#student-progress",
  },
  {
    id: "ai-settings",
    icon: Settings2,
    label: "AI Settings",
    colorClass: "bg-pink-50 text-pink-600 group-hover:bg-pink-600",
  },
];

const itemClassName =
  "group flex flex-1 flex-col items-center gap-2 rounded-xl border border-slate-100 bg-white px-2.5 py-3.5 text-center shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:shadow-soft-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2";

export function QuickActionsSection() {
  return (
    <section className="shrink-0 space-y-2">
      <p className="text-xs font-bold text-slate-900">Quick Actions</p>
      <div className="flex gap-2.5">
        {actions.map((action) => {
          const Icon = action.icon;
          const content = (
            <>
              <span className={cn("flex h-10 w-10 items-center justify-center rounded-full transition-colors group-hover:text-white", action.colorClass)}>
                <Icon className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
              </span>
              <span className="text-[11px] font-medium leading-tight text-slate-700">{action.label}</span>
            </>
          );

          if (!action.href) {
            return (
              <div key={action.id} className={itemClassName}>
                {content}
              </div>
            );
          }

          return (
            <Link key={action.id} href={action.href} className={itemClassName}>
              {content}
            </Link>
          );
        })}
      </div>
    </section>
  );
}

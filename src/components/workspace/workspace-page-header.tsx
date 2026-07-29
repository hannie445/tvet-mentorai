import type { LucideIcon } from "lucide-react";

interface WorkspacePageHeaderProps {
  icon: LucideIcon;
  title: string;
  description: string;
  courseLabel: string;
}

export function WorkspacePageHeader({
  icon: Icon,
  title,
  description,
  courseLabel,
}: WorkspacePageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="flex items-start gap-4">
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary-600 text-white shadow-soft-lg sm:h-14 sm:w-14"
          aria-hidden="true"
        >
          <Icon className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={2} />
        </div>
        <div className="space-y-1">
          <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            {title}
          </h2>
          <p className="text-sm text-slate-500 sm:text-base">{description}</p>
        </div>
      </div>

      <span className="inline-flex w-fit items-center rounded-full bg-primary-50 px-3 py-1 text-xs font-medium text-primary-700 sm:mt-1">
        {courseLabel}
      </span>
    </div>
  );
}

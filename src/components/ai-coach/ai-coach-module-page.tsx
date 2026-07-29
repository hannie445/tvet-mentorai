import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { BackButton } from "@/components/ui/back-button";
import { AiCoachModuleOutput } from "@/components/ai-coach/ai-coach-module-output";
import { isAiCoachModuleId } from "@/lib/ai-coach-engine";
import type { CoachAction } from "@/types/dashboard";

interface AiCoachModulePageProps {
  action: CoachAction;
}

export function AiCoachModulePage({ action }: AiCoachModulePageProps) {
  const Icon = action.icon;

  if (!isAiCoachModuleId(action.id)) {
    return null;
  }

  return (
    <DashboardShell>
      <div className="space-y-6 lg:space-y-8">
        <div className="space-y-3">
          <BackButton href="/" />
          <Breadcrumb
            items={[
              { label: "Dashboard", href: "/" },
              { label: "AI Coach" },
              { label: action.label },
            ]}
          />
        </div>

        <div className="flex items-start gap-4">
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary-600 text-white shadow-soft-lg sm:h-14 sm:w-14"
            aria-hidden="true"
          >
            <Icon className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={2} />
          </div>
          <div className="space-y-1">
            <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
              {action.label}
            </h2>
            <p className="text-sm text-slate-500 sm:text-base">{action.description}</p>
          </div>
        </div>

        <AiCoachModuleOutput moduleId={action.id} />
      </div>
    </DashboardShell>
  );
}

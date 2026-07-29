import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { HeroBanner } from "@/components/dashboard/hero-banner";
import { KpiSection } from "@/components/dashboard/kpi-section";
import { WorkflowSection } from "@/components/dashboard/workflow-section";
import { StudentProgressCard } from "@/components/dashboard/student-progress-card";
import { QuickActionsSection } from "@/components/dashboard/quick-actions-section";
import type { ProgressMetric } from "@/types/dashboard";

const studentProgressMetrics: ProgressMetric[] = [
  { id: "pb-theory", label: "PB Theory", percentage: 85 },
  { id: "pb-practical", label: "PB Practical", percentage: 78 },
  { id: "assignment-marks", label: "Assignment", percentage: 90 },
  { id: "overall-progress", label: "Overall", percentage: 88 },
];

export default function HomePage() {
  return (
    <DashboardShell
      fitViewport
      mainClassName="mx-auto w-full max-w-[1440px] flex-1 px-4 py-6 sm:px-6 sm:py-8 lg:flex lg:min-h-0 lg:flex-col lg:overflow-hidden lg:px-8 lg:py-4 focus:outline-none"
    >
      <div className="space-y-4 lg:flex lg:h-full lg:min-h-0 lg:flex-1 lg:flex-col lg:gap-3 lg:space-y-0">
        <HeroBanner />

        <KpiSection />

        <div className="grid grid-cols-1 gap-4 lg:min-h-0 lg:flex-1 lg:grid-cols-[1fr_340px]">
          <div className="lg:flex lg:min-h-0 lg:flex-col">
            <WorkflowSection />
          </div>
          <div className="lg:flex lg:min-h-0 lg:flex-col">
            <StudentProgressCard metrics={studentProgressMetrics} trendLabel="Meningkat 6% berbanding minggu lepas" />
          </div>
        </div>

        <QuickActionsSection />
      </div>
    </DashboardShell>
  );
}

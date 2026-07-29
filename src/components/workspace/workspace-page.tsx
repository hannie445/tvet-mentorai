import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { AiCoachSection } from "@/components/dashboard/ai-coach-section";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { BackButton } from "@/components/ui/back-button";
import { WorkspacePageHeader } from "@/components/workspace/workspace-page-header";
import { PdfViewerLoader } from "@/components/workspace/pdf-viewer-loader";
import { activeCourse } from "@/lib/active-course";
import type { WorkflowItem } from "@/types/dashboard";

interface WorkspacePageProps {
  item: WorkflowItem;
}

export function WorkspacePage({ item }: WorkspacePageProps) {
  return (
    <DashboardShell>
      <div className="space-y-6 lg:space-y-8">
        <div className="space-y-3">
          <BackButton href="/" />
          <Breadcrumb
            items={[
              { label: "Dashboard", href: "/" },
              { label: "Workspace" },
              { label: item.label },
            ]}
          />
        </div>

        <WorkspacePageHeader
          icon={item.icon}
          title={item.label}
          description={item.description}
          courseLabel={`${activeCourse.code} · ${activeCourse.name}`}
        />

        <section className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
          <div className="lg:col-span-2">
            <PdfViewerLoader documentLabel={item.documentName} />
          </div>
          <div>
            <AiCoachSection stackButtons />
          </div>
        </section>
      </div>
    </DashboardShell>
  );
}

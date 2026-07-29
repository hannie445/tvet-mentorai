import { Workflow, CheckCircle2 } from "lucide-react";
import { WorkflowCard, type WorkflowAccent } from "@/components/dashboard/workflow-card";
import { workflowItems } from "@/lib/workflow-items";

const ACCENTS: WorkflowAccent[] = ["blue", "purple", "emerald", "amber", "rose", "orange", "indigo"];

export function WorkflowSection() {
  return (
    <section className="flex h-full flex-col gap-3 overflow-hidden rounded-3xl border border-slate-100 bg-white/70 p-4 shadow-soft-lg backdrop-blur-sm sm:p-5 lg:gap-2.5">
      <div className="flex shrink-0 items-center gap-2.5">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600" aria-hidden="true">
          <Workflow className="h-4 w-4" strokeWidth={2} />
        </div>
        <div className="min-w-0">
          <h2 className="text-sm font-bold tracking-tight text-slate-900">Workflow JPK</h2>
          <p className="hidden truncate text-xs text-slate-500 xl:block">
            Aliran kerja Digital Instructional Coach berdasarkan standard JPK.
          </p>
        </div>
      </div>

      <div className="grid flex-1 grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-rows-2 lg:gap-2.5">
        {workflowItems.map((item, index) => (
          <WorkflowCard key={item.id} item={item} accent={ACCENTS[index % ACCENTS.length]} stepNumber={index + 1} />
        ))}
      </div>

      <div className="flex shrink-0 items-center gap-2.5 rounded-xl bg-emerald-50 px-3 py-2 text-xs text-emerald-700">
        <CheckCircle2 className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden="true" />
        <p className="min-w-0 flex-1 truncate font-medium">
          Aliran kerja lengkap dan sedia untuk digunakan dalam sesi pengajaran.
        </p>
      </div>
    </section>
  );
}

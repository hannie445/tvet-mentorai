import Link from "next/link";
import { Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { aiCoachActions } from "@/lib/ai-coach-actions";

interface AiCoachSectionProps {
  stackButtons?: boolean;
}

export function AiCoachSection({ stackButtons = false }: AiCoachSectionProps) {
  return (
    <Card className="overflow-hidden shadow-soft-lg">
      <CardHeader className="border-b border-slate-100 bg-gradient-to-br from-primary-50/60 to-white">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-600 text-white shadow-soft" aria-hidden="true">
            <Sparkles className="h-5 w-5" strokeWidth={2} />
          </div>
          <CardTitle>AI Coach</CardTitle>
        </div>
        <CardDescription>Bimbingan pengajaran pintar untuk sesi anda</CardDescription>
      </CardHeader>
      <CardContent
        className={cn("grid grid-cols-1 gap-4 pt-6", !stackButtons && "sm:grid-cols-2")}
      >
        {aiCoachActions.map((action) => {
          const Icon = action.icon;
          return (
            <Link
              key={action.id}
              href={`/ai-coach/${action.id}`}
              aria-label={`${action.label} — ${action.description}`}
              className="group flex items-center gap-3 rounded-xl border border-slate-100 bg-white p-4 text-left transition-all duration-200 ease-out hover:-translate-y-1 hover:border-primary-200 hover:bg-primary-50/60 hover:shadow-soft-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 active:translate-y-0"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600 transition-all duration-200 group-hover:scale-105 group-hover:bg-primary-600 group-hover:text-white">
                <Icon className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
              </div>
              <div className="space-y-0.5">
                <p className="text-sm font-semibold text-slate-900">{action.label}</p>
                <p className="text-xs text-slate-500">{action.description}</p>
              </div>
            </Link>
          );
        })}
      </CardContent>
    </Card>
  );
}

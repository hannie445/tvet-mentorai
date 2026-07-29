import { Star, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { LessonHealth } from "@/types/dashboard";

interface LessonHealthCardProps {
  health: LessonHealth;
}

export function LessonHealthCard({ health }: LessonHealthCardProps) {
  const stars = Array.from({ length: health.maxRating }, (_, index) => index < health.rating);

  return (
    <Card id="lesson-health" className="shadow-soft-lg scroll-mt-24">
      <CardHeader>
        <CardTitle>Lesson Health</CardTitle>
        <CardDescription>Status kesediaan pengajaran anda</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-5 pb-8 pt-2 text-center">
        <div className="flex gap-1.5" role="img" aria-label={`${health.rating} out of ${health.maxRating} stars`}>
          {stars.map((filled, index) => (
            <Star
              key={index}
              aria-hidden="true"
              className={filled ? "h-7 w-7 fill-primary-500 text-primary-500" : "h-7 w-7 text-slate-200"}
              strokeWidth={1.5}
            />
          ))}
        </div>

        <div className="flex items-center gap-2 rounded-full bg-primary-50 px-4 py-2">
          <CheckCircle2 className="h-4 w-4 text-primary-600" aria-hidden="true" />
          <span className="text-sm font-semibold text-primary-700">{health.status}</span>
        </div>

        <div className="w-full max-w-[200px] space-y-2">
          <div className="flex items-center justify-between text-xs font-medium text-slate-500">
            <span id="lesson-readiness-label">Kesediaan</span>
            <span className="text-sm font-bold text-primary-600">{health.percentage}%</span>
          </div>
          <div
            className="h-2 w-full overflow-hidden rounded-full bg-slate-100"
            role="progressbar"
            aria-labelledby="lesson-readiness-label"
            aria-valuenow={health.percentage}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="h-full rounded-full bg-primary-500 transition-[width] duration-700 ease-out"
              style={{ width: `${health.percentage}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

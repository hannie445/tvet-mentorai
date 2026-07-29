import { TrendingUp, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ProgressMetric } from "@/types/dashboard";

interface StudentProgressCardProps {
  metrics: ProgressMetric[];
  trendLabel: string;
}

const BAR_COLORS: Record<string, string> = {
  "pb-theory": "bg-gradient-to-r from-violet-500 to-purple-500",
  "pb-practical": "bg-gradient-to-r from-blue-500 to-primary-500",
  "assignment-marks": "bg-gradient-to-r from-emerald-500 to-emerald-400",
  "overall-progress": "bg-gradient-to-r from-orange-500 to-amber-400",
};

const RADIUS = 28;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const SPARKLINE_POINTS = "0,20 15,16 30,18 45,10 60,12 75,4 90,6";

function performanceLevel(percentage: number): string {
  if (percentage >= 90) return "Cemerlang";
  if (percentage >= 75) return "Baik";
  if (percentage >= 60) return "Sederhana";
  return "Perlu Perhatian";
}

export function StudentProgressCard({ metrics, trendLabel }: StudentProgressCardProps) {
  const overallMetric = metrics.find((metric) => metric.id === "overall-progress");
  const overall =
    overallMetric?.percentage ??
    Math.round(metrics.reduce((total, metric) => total + metric.percentage, 0) / metrics.length);
  const dashOffset = CIRCUMFERENCE * (1 - overall / 100);

  return (
    <Card id="student-progress" className="shadow-soft-lg scroll-mt-24 lg:flex lg:h-full lg:flex-col lg:overflow-hidden">
      <CardHeader className="pb-2 lg:shrink-0 lg:py-3">
        <CardTitle className="lg:text-sm">Student Progress Overview</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col justify-between space-y-3 pt-0 lg:space-y-2 lg:overflow-hidden lg:pb-3">
        <div className="space-y-2 lg:space-y-1.5">
          {metrics.map((metric) => {
            const labelId = `student-progress-${metric.id}-label`;
            const barColor = BAR_COLORS[metric.id] ?? "bg-primary-500";

            return (
              <div key={metric.id} className="space-y-1">
                <div className="flex items-center justify-between text-xs font-medium text-slate-600 lg:text-[11px]">
                  <span id={labelId}>{metric.label}</span>
                  <span className="text-xs font-bold text-slate-900 lg:text-[11px]">{metric.percentage}%</span>
                </div>
                <div
                  className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100"
                  role="progressbar"
                  aria-labelledby={labelId}
                  aria-valuenow={metric.percentage}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div
                    className={`h-full rounded-full ${barColor} transition-[width] duration-700 ease-out`}
                    style={{ width: `${metric.percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-slate-100 pt-2.5">
          <div className="relative flex h-14 w-14 shrink-0 items-center justify-center">
            <svg className="h-14 w-14 -rotate-90" viewBox="0 0 64 64" role="img" aria-label={`Purata prestasi keseluruhan ${overall} peratus`}>
              <circle cx="32" cy="32" r={RADIUS} fill="none" stroke="#f1f5f9" strokeWidth="6" />
              <circle
                cx="32"
                cy="32"
                r={RADIUS}
                fill="none"
                stroke="url(#student-progress-ring-gradient)"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={CIRCUMFERENCE}
                strokeDashoffset={dashOffset}
                className="transition-[stroke-dashoffset] duration-700 ease-out"
              />
              <defs>
                <linearGradient id="student-progress-ring-gradient" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-xs font-bold text-slate-900">{overall}%</span>
            </div>
          </div>

          <div className="min-w-0 flex-1 space-y-1">
            <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-600">
              {performanceLevel(overall)}
            </span>
            <p className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-600">
              <TrendingUp className="h-3 w-3 shrink-0" strokeWidth={2} aria-hidden="true" />
              <span className="truncate">{trendLabel}</span>
            </p>
          </div>

          <svg className="hidden h-8 w-16 shrink-0 sm:block" viewBox="0 0 90 24" fill="none" aria-hidden="true">
            <polyline points={SPARKLINE_POINTS} stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <button
          type="button"
          className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-lg bg-primary-50 px-3 py-2 text-xs font-semibold text-primary-700 transition-colors hover:bg-primary-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2"
        >
          View Full Analytics
          <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
        </button>
      </CardContent>
    </Card>
  );
}

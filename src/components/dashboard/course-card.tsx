import Link from "next/link";
import { BookMarked, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { CourseInfo } from "@/types/dashboard";

interface CourseCardProps {
  course: CourseInfo;
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Card className="relative overflow-hidden p-6 shadow-soft-lg sm:p-8">
      <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-primary-50" />
      <div className="pointer-events-none absolute -right-6 -top-6 h-32 w-32 rounded-full bg-primary-100/70" />

      <div className="relative flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
        <div className="flex items-start gap-4 sm:gap-5">
          <div
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary-600 text-white shadow-soft-lg"
            aria-hidden="true"
          >
            <BookMarked className="h-7 w-7" strokeWidth={2} />
          </div>
          <div className="space-y-2">
            <Badge variant="default">{course.sessionLabel}</Badge>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              {course.code}
            </h2>
            <p className="text-base font-medium text-slate-600">{course.name}</p>
          </div>
        </div>

        <Link
          href="/workspace/dpsk"
          className="inline-flex w-full items-center justify-center gap-1.5 self-start rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-soft transition-all duration-200 hover:border-primary-200 hover:bg-primary-50 hover:text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 sm:w-auto sm:self-center"
        >
          View course
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </Card>
  );
}

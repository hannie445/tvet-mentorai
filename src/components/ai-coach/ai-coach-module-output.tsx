"use client";

import { useCallback, useEffect, useState } from "react";
import { Loader2, RefreshCcw, AlertCircle, Inbox } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { runAiCoachModule } from "@/lib/ai-coach-engine";
import type { AiCoachModuleId, AiCoachModuleResult } from "@/lib/ai-coach-engine";
import { activeCourse } from "@/lib/active-course";
import { brand } from "@/lib/brand";

interface AiCoachModuleOutputProps {
  moduleId: AiCoachModuleId;
}

type Status = "loading" | "error" | "empty" | "success";

export function AiCoachModuleOutput({ moduleId }: AiCoachModuleOutputProps) {
  const [status, setStatus] = useState<Status>("loading");
  const [result, setResult] = useState<AiCoachModuleResult | null>(null);
  const [requestKey, setRequestKey] = useState(0);

  const retry = useCallback(() => setRequestKey((key) => key + 1), []);

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");
    setResult(null);

    runAiCoachModule(moduleId, {
      courseCode: activeCourse.code,
      courseName: activeCourse.name,
    })
      .then((response) => {
        if (cancelled) return;
        if (!response.sections || response.sections.length === 0) {
          setStatus("empty");
          return;
        }
        setResult(response);
        setStatus("success");
      })
      .catch((error) => {
        if (cancelled) return;
        console.error("[ai-coach] Failed to load module output:", error);
        setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, [moduleId, requestKey]);

  if (status === "loading") {
    return (
      <Card
        role="status"
        aria-live="polite"
        aria-busy="true"
        className="flex min-h-[320px] flex-col items-center justify-center gap-3 shadow-soft-lg"
      >
        <Loader2 className="h-6 w-6 animate-spin text-primary-400" strokeWidth={2} aria-hidden="true" />
        <p className="text-sm text-slate-400">Menjana cadangan AI Coach...</p>
      </Card>
    );
  }

  if (status === "error") {
    return (
      <Card
        role="alert"
        className="flex min-h-[320px] flex-col items-center justify-center gap-4 px-6 py-12 text-center shadow-soft-lg"
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-400" aria-hidden="true">
          <AlertCircle className="h-8 w-8" strokeWidth={1.5} aria-hidden="true" />
        </div>
        <div className="space-y-1">
          <p className="text-sm font-semibold text-slate-600">AI Coach tidak dapat dihubungi</p>
          <p className="max-w-xs text-xs leading-relaxed text-slate-400">
            Berlaku masalah semasa menjana cadangan. Sila cuba lagi sebentar.
          </p>
        </div>
        <button
          type="button"
          onClick={retry}
          className="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-soft transition-colors hover:bg-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2"
        >
          <RefreshCcw className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
          Cuba lagi
        </button>
      </Card>
    );
  }

  if (status === "empty") {
    return (
      <Card className="flex min-h-[320px] flex-col items-center justify-center gap-4 px-6 py-12 text-center shadow-soft-lg">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-300" aria-hidden="true">
          <Inbox className="h-8 w-8" strokeWidth={1.5} aria-hidden="true" />
        </div>
        <div className="space-y-1">
          <p className="text-sm font-semibold text-slate-600">Tiada cadangan tersedia</p>
          <p className="max-w-xs text-xs leading-relaxed text-slate-400">
            AI Coach tidak mempunyai cadangan buat masa ini. Cuba jana semula.
          </p>
        </div>
        <button
          type="button"
          onClick={retry}
          className="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-soft transition-colors hover:bg-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2"
        >
          <RefreshCcw className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
          Jana semula
        </button>
      </Card>
    );
  }

  if (!result) {
    return null;
  }

  return (
    <Card className="overflow-hidden shadow-soft-lg">
      <div className="flex flex-col gap-3 border-b border-slate-100 bg-gradient-to-br from-primary-50/60 to-white px-6 py-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          {result.source === "fallback" && (
            <div className="space-y-0.5" data-hide-in-screenshot="true">
              <Badge variant="outline">AI Coach Demo Mode</Badge>
              <p className="text-xs text-slate-400">{brand.tagline} for TVET Malaysia</p>
            </div>
          )}
          {result.source === "demo" && (
            <Badge variant="outline" data-hide-in-screenshot="true">
              Mod Demo
            </Badge>
          )}
          <p className="text-sm text-slate-600">{result.summary}</p>
        </div>
        <button
          type="button"
          onClick={retry}
          data-hide-in-screenshot="true"
          className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 shadow-soft transition-colors hover:border-primary-200 hover:bg-primary-50 hover:text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2"
        >
          <RefreshCcw className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
          Jana semula
        </button>
      </div>

      <div className="divide-y divide-slate-100">
        {result.sections.map((section, sectionIndex) => (
          <div key={`${sectionIndex}-${section.heading}`} className="px-6 py-5">
            <h3 className="text-sm font-semibold text-slate-900">{section.heading}</h3>
            <ul className="mt-2 space-y-1.5">
              {section.items.map((item, index) => (
                <li key={index} className="flex gap-2 text-sm leading-relaxed text-slate-600">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary-400" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Card>
  );
}

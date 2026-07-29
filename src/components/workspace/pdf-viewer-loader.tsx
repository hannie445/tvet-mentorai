"use client";

import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";

const PdfViewer = dynamic(
  () => import("@/components/workspace/pdf-viewer").then((mod) => mod.PdfViewer),
  {
    ssr: false,
    loading: () => (
      <Card
        role="status"
        aria-live="polite"
        className="flex min-h-[420px] flex-col items-center justify-center gap-3 shadow-soft-lg sm:min-h-[560px]"
      >
        <Loader2 className="h-6 w-6 animate-spin text-primary-400" strokeWidth={2} aria-hidden="true" />
        <p className="text-sm text-slate-400">Memuatkan pratonton PDF...</p>
      </Card>
    ),
  }
);

interface PdfViewerLoaderProps {
  documentLabel: string;
}

export function PdfViewerLoader({ documentLabel }: PdfViewerLoaderProps) {
  return <PdfViewer documentLabel={documentLabel} />;
}

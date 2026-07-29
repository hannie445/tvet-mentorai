"use client";

import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import {
  FileUp,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { Card } from "@/components/ui/card";

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;

interface PdfViewerProps {
  documentLabel: string;
}

const MAX_PAGE_WIDTH = 720;
const MIN_ZOOM = 0.6;
const MAX_ZOOM = 2;

export function PdfViewer({ documentLabel }: PdfViewerProps) {
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [zoom, setZoom] = useState(1);
  const [loadError, setLoadError] = useState(false);
  const [containerWidth, setContainerWidth] = useState<number>();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!file) {
      setFileUrl(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setFileUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width;
      if (width) setContainerWidth(width);
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const selected = event.target.files?.[0];
    event.target.value = "";
    if (!selected || selected.type !== "application/pdf") return;

    setFile(selected);
    setNumPages(null);
    setPageNumber(1);
    setZoom(1);
    setLoadError(false);
  }

  const pageWidth = containerWidth
    ? Math.min(containerWidth - 32, MAX_PAGE_WIDTH) * zoom
    : undefined;

  return (
    <Card className="overflow-hidden shadow-soft-lg">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 bg-slate-50/70 px-4 py-3">
        <span className="truncate text-sm font-medium text-slate-600">
          {file ? file.name : `${documentLabel}.pdf`}
        </span>

        <div className="flex flex-wrap items-center gap-1.5">
          {file && numPages ? (
            <>
              <button
                type="button"
                onClick={() => setZoom((z) => Math.max(MIN_ZOOM, +(z - 0.2).toFixed(1)))}
                disabled={zoom <= MIN_ZOOM}
                aria-label="Zoom out"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-primary-50 hover:text-primary-600 disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
              >
                <ZoomOut className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => setZoom((z) => Math.min(MAX_ZOOM, +(z + 0.2).toFixed(1)))}
                disabled={zoom >= MAX_ZOOM}
                aria-label="Zoom in"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-primary-50 hover:text-primary-600 disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
              >
                <ZoomIn className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
              </button>

              <div className="mx-1 h-5 w-px bg-slate-200" aria-hidden="true" />

              <button
                type="button"
                onClick={() => setPageNumber((p) => Math.max(1, p - 1))}
                disabled={pageNumber <= 1}
                aria-label="Previous page"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-primary-50 hover:text-primary-600 disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
              >
                <ChevronLeft className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
              </button>
              <span className="min-w-[52px] text-center text-xs font-medium text-slate-500" aria-live="polite">
                {pageNumber} / {numPages}
              </span>
              <button
                type="button"
                onClick={() => setPageNumber((p) => Math.min(numPages, p + 1))}
                disabled={pageNumber >= numPages}
                aria-label="Next page"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-primary-50 hover:text-primary-600 disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
              >
                <ChevronRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
              </button>

              <div className="mx-1 h-5 w-px bg-slate-200" aria-hidden="true" />
            </>
          ) : null}

          <label className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 shadow-soft transition-colors hover:border-primary-200 hover:bg-primary-50 hover:text-primary-700 focus-within:ring-2 focus-within:ring-primary-400 focus-within:ring-offset-2">
            <FileUp className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
            Muat naik PDF
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="sr-only"
              aria-label="Muat naik fail PDF dari peranti anda"
            />
          </label>
        </div>
      </div>

      <div
        ref={containerRef}
        className="flex min-h-[420px] items-start justify-center overflow-auto bg-slate-50/40 px-4 py-8 sm:min-h-[560px]"
      >
        {fileUrl && !loadError ? (
          <Document
            file={fileUrl}
            onLoadSuccess={({ numPages: total }) => setNumPages(total)}
            onLoadError={() => setLoadError(true)}
            loading={
              <div className="flex flex-col items-center gap-3 self-center text-center" role="status" aria-live="polite">
                <Loader2 className="h-6 w-6 animate-spin text-primary-400" strokeWidth={2} aria-hidden="true" />
                <p className="text-sm text-slate-400">Memuatkan dokumen...</p>
              </div>
            }
            error={
              <div className="flex flex-col items-center gap-2 self-center text-center" role="alert">
                <AlertCircle className="h-6 w-6 text-red-400" strokeWidth={2} aria-hidden="true" />
                <p className="text-sm text-red-500">Gagal memuatkan PDF.</p>
              </div>
            }
            className="flex justify-center"
          >
            <Page
              pageNumber={pageNumber}
              width={pageWidth}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              className="overflow-hidden rounded-lg shadow-soft"
            />
          </Document>
        ) : (
          <div
            className="flex flex-col items-center gap-4 self-center text-center"
            role={loadError ? "alert" : undefined}
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-slate-300 shadow-soft">
              {loadError ? (
                <AlertCircle className="h-8 w-8" strokeWidth={1.5} aria-hidden="true" />
              ) : (
                <FileUp className="h-8 w-8" strokeWidth={1.5} aria-hidden="true" />
              )}
            </div>
            <div className="space-y-1">
              <p className="text-sm font-semibold text-slate-600">
                {loadError ? "Gagal memuatkan PDF" : "PDF tidak dijumpai"}
              </p>
              <p className="max-w-xs text-xs leading-relaxed text-slate-400">
                {loadError
                  ? "Fail yang dipilih tidak dapat dipaparkan atau rosak. Sila cuba fail PDF lain."
                  : "Tiada fail PDF dimuat naik lagi. Muat naik fail PDF dari peranti anda untuk memaparkannya di sini."}
              </p>
            </div>
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-soft transition-colors hover:bg-primary-700 focus-within:ring-2 focus-within:ring-primary-400 focus-within:ring-offset-2">
              <FileUp className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
              {loadError ? "Muat naik fail lain" : "Muat naik PDF"}
              <input
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className="sr-only"
                aria-label="Muat naik fail PDF dari peranti anda"
              />
            </label>
          </div>
        )}
      </div>
    </Card>
  );
}

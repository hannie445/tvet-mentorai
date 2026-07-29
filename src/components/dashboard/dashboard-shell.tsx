import type { ReactNode } from "react";
import { Heart } from "lucide-react";
import { Sidebar } from "@/components/dashboard/sidebar";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { SkipLink } from "@/components/ui/skip-link";
import { currentUser } from "@/lib/current-user";
import { brand } from "@/lib/brand";
import { cn } from "@/lib/utils";

interface DashboardShellProps {
  children: ReactNode;
  mainClassName?: string;
  /**
   * When true, locks the shell to exactly one viewport height on large
   * screens (no page scroll) and lets `main` absorb the remaining space
   * after the header/footer via flexbox - so header/footer never need
   * hardcoded pixel heights. Small/tablet screens still scroll normally;
   * this is a desktop-only constraint. Only the dashboard homepage uses
   * this - every other page keeps its normal scrolling behavior.
   */
  fitViewport?: boolean;
}

export function DashboardShell({ children, mainClassName, fitViewport = false }: DashboardShellProps) {
  return (
    <div className={cn("flex min-h-screen bg-transparent", fitViewport && "lg:h-screen lg:overflow-hidden")}>
      <SkipLink />
      <Sidebar />

      <div className={cn("flex min-w-0 flex-1 flex-col", fitViewport && "lg:h-full lg:overflow-hidden")}>
        <DashboardHeader user={currentUser} />

        <main
          id="main-content"
          tabIndex={-1}
          className={
            mainClassName ??
            cn(
              "mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12 focus:outline-none",
              fitViewport && "lg:flex lg:min-h-0 lg:flex-col lg:overflow-hidden lg:py-4"
            )
          }
        >
          {children}
        </main>

        <footer
          className={cn(
            "shrink-0 border-t border-white/10 bg-gradient-to-r from-slate-900 via-indigo-950 to-purple-950 px-4 py-3.5 sm:px-6 lg:px-8",
            fitViewport && "lg:py-2"
          )}
        >
          <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-2 text-center text-xs text-indigo-200 sm:flex-row sm:justify-between sm:text-left">
            <p>© 2026 {brand.name}. Hak Cipta Terpelihara.</p>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-end">
              <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-[11px] font-medium text-indigo-100">
                Versi 1.1 Competition Edition
              </span>
              <span className="flex items-center gap-1.5 text-[11px] text-indigo-200">
                <Heart className="h-3 w-3 shrink-0" strokeWidth={2} aria-hidden="true" />
                Dibangunkan untuk Pensyarah TVET Malaysia
              </span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

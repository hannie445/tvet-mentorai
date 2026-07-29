import { Sun, Bell, ChevronDown } from "lucide-react";
import { brand } from "@/lib/brand";
import type { CoachUser } from "@/types/dashboard";

interface DashboardHeaderProps {
  user: CoachUser;
}

export function DashboardHeader({ user }: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-10 border-b border-white/60 bg-white/70 shadow-[0_1px_0_0_rgba(15,23,42,0.03)] backdrop-blur-xl">
      <h1 className="sr-only">{brand.name}</h1>
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div className="flex items-center gap-2.5">
          <Sun className="h-5 w-5 shrink-0 text-amber-400" strokeWidth={2} aria-hidden="true" />
          <div className="min-w-0">
            <p className="truncate text-xl font-bold text-slate-900 sm:text-[28px]">
              Selamat pagi, {user.name}
              <span aria-hidden="true"> 👋</span>
            </p>
            <p className="truncate text-sm text-slate-500 sm:text-base">{brand.tagline}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 self-end sm:self-auto">
          <span
            className="hidden items-center gap-1.5 rounded-full border border-white/70 bg-white/80 px-2.5 py-1.5 text-xs font-semibold text-slate-700 shadow-soft backdrop-blur-sm sm:inline-flex"
            aria-hidden="true"
          >
            <span aria-hidden="true">🇲🇾</span>
            BM
            <ChevronDown className="h-3 w-3 text-slate-400" strokeWidth={2} />
          </span>

          <span
            className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/70 bg-white/80 shadow-soft backdrop-blur-sm"
            aria-hidden="true"
          >
            <Bell className="h-4 w-4 text-slate-500" strokeWidth={2} />
            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white">
              3
            </span>
          </span>

          <div className="flex items-center gap-2 rounded-full border border-white/70 bg-white/80 py-1.5 pl-1.5 pr-3 shadow-soft backdrop-blur-sm">
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-purple-600 text-base font-semibold text-white"
              aria-hidden="true"
            >
              {user.initials}
            </div>
            <span className="leading-tight">
              <span className="block text-sm font-medium text-slate-700">
                {user.name}
                <span className="sr-only"> — signed in</span>
              </span>
              <span className="block text-[11px] text-slate-400">Instructor</span>
            </span>
            <ChevronDown className="h-3.5 w-3.5 text-slate-400" strokeWidth={2} aria-hidden="true" />
          </div>
        </div>
      </div>
    </header>
  );
}

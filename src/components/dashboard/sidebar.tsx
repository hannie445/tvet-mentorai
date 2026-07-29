"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  Sparkles,
  LineChart,
  Settings,
  Bot,
  LogOut,
  MessageCircle,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/logo";
import { brand } from "@/lib/brand";

interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
  href?: string;
  matchPrefix?: string;
}

const navItems: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "/", matchPrefix: "/" },
  {
    id: "workspace",
    label: "AI Teaching Workspace",
    icon: FolderKanban,
    href: "/workspace/dpsk",
    matchPrefix: "/workspace",
  },
  {
    id: "ai-coach",
    label: "AI Coach",
    icon: Sparkles,
    href: "/ai-coach/set-induksi",
    matchPrefix: "/ai-coach",
  },
  { id: "student-progress", label: "Student Progress", icon: LineChart },
  { id: "settings", label: "Settings", icon: Settings },
];

function isNavItemActive(item: NavItem, pathname: string): boolean {
  if (!item.matchPrefix) return false;
  if (item.matchPrefix === "/") return pathname === "/";
  return pathname === item.matchPrefix || pathname.startsWith(`${item.matchPrefix}/`);
}

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      aria-label="Main navigation"
      className="hidden shrink-0 bg-gradient-to-b from-slate-900 via-indigo-950 to-purple-950 shadow-soft-xl md:sticky md:top-0 md:flex md:h-screen md:w-20 md:flex-col lg:w-[280px]"
    >
      <div className="flex h-24 items-center gap-3 border-b border-white/10 px-4 lg:px-6">
        <Logo className="h-12 w-12 rounded-2xl lg:h-14 lg:w-14" iconClassName="h-6 w-6 lg:h-7 lg:w-7" />
        <div className="hidden min-w-0 lg:block">
          <p className="truncate text-base font-bold leading-tight tracking-tight text-white">
            {brand.name}
          </p>
          <p className="truncate text-xs leading-snug text-indigo-200">
            {brand.tagline}
          </p>
        </div>
      </div>

      <nav aria-label="Sidebar menu" className="flex-1 space-y-1.5 overflow-y-auto px-3 py-7 lg:px-4">
        <p className="hidden px-3 pb-3 text-xs font-semibold uppercase tracking-wider text-indigo-300/70 lg:block">
          Menu
        </p>
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isNavItemActive(item, pathname);

          const itemClassName = cn(
            "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-indigo-950",
            active
              ? "bg-gradient-to-r from-primary-500 to-purple-600 text-white shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_8px_24px_-4px_rgba(129,86,255,0.6)]"
              : "text-indigo-100/80 hover:bg-white/10 hover:text-white"
          );

          const content = (
            <>
              <span
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors",
                  active ? "bg-white/15" : "bg-transparent"
                )}
              >
                <Icon className="h-[18px] w-[18px] shrink-0" strokeWidth={2} aria-hidden="true" />
              </span>
              <span className="hidden lg:inline">{item.label}</span>
            </>
          );

          if (item.href) {
            return (
              <Link
                key={item.id}
                href={item.href}
                aria-label={item.label}
                aria-current={active ? "page" : undefined}
                className={itemClassName}
              >
                {content}
              </Link>
            );
          }

          return (
            <button
              key={item.id}
              type="button"
              aria-label={item.label}
              aria-disabled="true"
              title="Akan datang"
              className={cn(itemClassName, "cursor-not-allowed opacity-60")}
            >
              {content}
            </button>
          );
        })}
      </nav>

      <div className="hidden border-t border-white/10 p-4 lg:block">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-950 shadow-soft-lg">
          <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-purple-500/20 blur-2xl" aria-hidden="true" />

          <div className="relative flex flex-col items-center gap-2 p-3.5 text-center">
            <div className="relative h-[240px] w-[160px]">
              <Image
                src="/images/ai-hani.png"
                alt="AI Hani, Digital Instructional Coach avatar"
                fill
                sizes="160px"
                className="object-contain object-top drop-shadow-xl"
              />
            </div>

            <div>
              <div className="flex items-center justify-center gap-1.5">
                <p className="text-sm font-bold text-white">AI Hani</p>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-300">
                  <span aria-hidden="true">🟢</span>
                  Online
                </span>
              </div>
              <p className="text-[11px] text-indigo-200">Digital Instructional Coach</p>
            </div>

            <p className="text-xs leading-snug text-indigo-100">
              Hai Hani <span aria-hidden="true">👋</span>
              <br />
              Saya sedia membantu anda.
            </p>

            <Link
              href="/ai-coach/set-induksi"
              className="mt-1 flex h-[52px] w-full items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-primary-500 to-purple-500 px-3 text-xs font-semibold text-white shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:shadow-soft-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-indigo-950"
            >
              <MessageCircle className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden="true" />
              Mulakan Sesi AI Hani
            </Link>
          </div>
        </div>
      </div>

      <div className="hidden border-t border-white/10 p-4 lg:block">
        <div className="flex items-center gap-3 rounded-xl bg-white/10 px-3.5 py-3 backdrop-blur-sm">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary-400 to-purple-500 text-white" aria-hidden="true">
            <Bot className="h-4 w-4" strokeWidth={2} />
          </div>
          <div className="min-w-0">
            <p className="truncate text-xs font-semibold text-white">AI Coach Demo Mode</p>
            <p className="flex items-center gap-1 text-[11px] text-indigo-200">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
              Sistem sedia membantu
            </p>
          </div>
        </div>

        <button
          type="button"
          aria-disabled="true"
          title="Tiada sistem log masuk pada demo ini"
          className="mt-3 flex w-full cursor-not-allowed items-center gap-2 rounded-xl px-3.5 py-2.5 text-xs font-medium text-indigo-200 opacity-70 transition-colors hover:bg-white/10 hover:text-white"
        >
          <LogOut className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
          Logout
        </button>
      </div>
    </aside>
  );
}

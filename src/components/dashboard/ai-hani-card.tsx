import Image from "next/image";
import Link from "next/link";
import { MessageCircle } from "lucide-react";

export function AiHaniCard() {
  return (
    <div className="relative flex flex-col overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-950 shadow-soft-xl lg:h-full">
      <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-purple-500/20 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-14 -left-10 h-40 w-40 rounded-full bg-primary-500/20 blur-3xl" aria-hidden="true" />

      <div className="relative flex flex-1 flex-col gap-2.5 p-4 lg:gap-2 lg:overflow-hidden lg:p-3">
        <div className="flex shrink-0 items-center justify-between gap-2">
          <div className="min-w-0">
            <p className="text-sm font-bold text-white lg:text-xs">AI Hani</p>
            <p className="truncate text-[11px] text-indigo-200">Digital Instructional Coach</p>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-semibold text-emerald-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
            Online
          </span>
        </div>

        <div className="relative min-h-[182px] flex-1">
          <Image
            src="/images/ai-hani.png"
            alt="AI Hani, Digital Instructional Coach avatar"
            fill
            sizes="(min-width: 1024px) 320px, 90vw"
            className="object-contain object-bottom drop-shadow-2xl"
            priority
          />
        </div>

        <div className="hidden shrink-0 rounded-xl bg-white/5 p-2.5 sm:block lg:hidden">
          <p className="text-[11px] font-semibold text-white">Hai Hani!</p>
          <p className="mt-0.5 text-[11px] leading-relaxed text-indigo-100">
            Saya sedia membantu anda.
          </p>
        </div>

        <Link
          href="/ai-coach/set-induksi"
          className="inline-flex w-full shrink-0 items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-primary-500 to-purple-500 px-3 py-2 text-xs font-semibold text-white shadow-soft-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-soft-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-indigo-950 lg:text-[11px]"
        >
          <MessageCircle className="h-3.5 w-3.5 shrink-0" strokeWidth={2} aria-hidden="true" />
          <span className="truncate">Mulakan Sesi AI Hani</span>
        </Link>
      </div>
    </div>
  );
}

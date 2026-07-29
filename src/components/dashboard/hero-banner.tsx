import Link from "next/link";
import { Rocket, Sparkles } from "lucide-react";
import { brand } from "@/lib/brand";

export function HeroBanner() {
  return (
    <div className="relative flex shrink-0 flex-col overflow-hidden rounded-[28px] bg-gradient-to-br from-slate-950 via-indigo-900 to-purple-800 shadow-soft-xl lg:h-[220px]">
      <div className="pointer-events-none absolute -left-16 -top-20 h-64 w-64 rounded-full bg-primary-500/25 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-24 right-1/3 h-72 w-72 rounded-full bg-purple-500/25 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-10 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full bg-fuchsia-500/15 blur-3xl" aria-hidden="true" />

      <div
        className="pointer-events-none absolute right-10 top-10 hidden h-24 w-40 rotate-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md lg:block"
        aria-hidden="true"
      />

      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.07]"
        viewBox="0 0 1200 220"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <g stroke="#7dd3fc" strokeWidth="1" fill="none">
          <path d="M700 20 Q 850 100 1000 40" />
          <path d="M750 190 Q 900 110 1050 170" />
          <path d="M640 110 Q 700 60 760 110" />
        </g>
        <g fill="#7dd3fc">
          <circle cx="700" cy="20" r="2.5" />
          <circle cx="1000" cy="40" r="2.5" />
          <circle cx="850" cy="60" r="2" />
          <circle cx="920" cy="150" r="2" />
          <circle cx="1050" cy="170" r="2.5" />
          <circle cx="780" cy="180" r="2" />
          <circle cx="640" cy="110" r="2" />
          <circle cx="600" cy="50" r="1.5" />
        </g>

        <g transform="translate(760,55)" fill="none" stroke="white" strokeWidth="2">
          <rect x="0" y="0" width="60" height="60" rx="10" />
          <rect x="20" y="20" width="20" height="20" rx="3" />
          <line x1="30" y1="0" x2="30" y2="-10" />
          <line x1="30" y1="60" x2="30" y2="70" />
          <line x1="0" y1="30" x2="-10" y2="30" />
          <line x1="60" y1="30" x2="70" y2="30" />
        </g>

        <g transform="translate(870,80)" fill="white">
          <path d="M0 40 L14 12 L106 12 L120 40 Z" />
          <rect x="0" y="40" width="120" height="6" rx="2" />
          <rect x="12" y="18" width="96" height="18" rx="2" fill="none" stroke="white" strokeWidth="1.5" />
        </g>

        <g transform="translate(1020,70)" fill="white">
          <rect x="0" y="55" width="12" height="35" rx="2" />
          <rect x="18" y="35" width="12" height="55" rx="2" />
          <rect x="36" y="15" width="12" height="75" rx="2" />
          <rect x="54" y="40" width="12" height="50" rx="2" />
        </g>

        <g transform="translate(1010,140)" fill="none" stroke="white" strokeWidth="1.5">
          <rect x="0" y="0" width="46" height="58" rx="4" />
          <line x1="8" y1="14" x2="38" y2="14" />
          <line x1="8" y1="26" x2="30" y2="26" />
          <line x1="8" y1="38" x2="34" y2="38" />
        </g>
      </svg>

      <span className="absolute right-5 top-5 z-10 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[11px] font-semibold text-white shadow-soft backdrop-blur-md">
        <Sparkles className="h-3.5 w-3.5 text-cyan-300" strokeWidth={2} aria-hidden="true" />
        AI Powered
      </span>

      <div className="relative z-10 flex flex-1 flex-col items-start justify-center gap-1.5 px-6 py-5 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:gap-4 lg:px-9 lg:py-0">
        <div className="min-w-0">
          <h2 className="text-xl font-extrabold tracking-tight text-white sm:text-2xl lg:text-4xl">
            <span className="bg-gradient-to-r from-cyan-300 to-white bg-clip-text text-transparent">TVET</span>{" "}
            <span className="bg-gradient-to-r from-white to-fuchsia-300 bg-clip-text text-transparent">MentorAI</span>
          </h2>
          <p className="mt-1 text-sm font-normal text-primary-100/95 sm:text-base lg:text-lg">
            {brand.tagline} for TVET Malaysia
          </p>
          <p className="mt-1.5 hidden text-xs font-medium uppercase tracking-wider text-primary-200/70 sm:block lg:text-[11px]">
            Pembantu Pintar • Kontekstual • Pedagogi TVET • JPK Aligned
          </p>
        </div>

        <Link
          href="/workspace/dpsk"
          className="relative z-10 mt-3 inline-flex shrink-0 items-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-400 via-primary-500 to-purple-600 px-4 py-2.5 text-xs font-semibold text-white shadow-[0_8px_24px_-6px_rgba(129,86,255,0.65)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_-6px_rgba(129,86,255,0.85)] hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-indigo-900 sm:text-sm lg:mt-0"
        >
          <Rocket className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={2} aria-hidden="true" />
          Buka AI Teaching Workspace
        </Link>
      </div>
    </div>
  );
}

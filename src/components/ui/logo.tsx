import { Brain } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  iconClassName?: string;
}

export function Logo({ className, iconClassName }: LogoProps) {
  return (
    <div
      className={cn(
        "flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 via-indigo-500 to-purple-600 text-white shadow-soft",
        className
      )}
      aria-hidden="true"
    >
      <Brain className={cn("h-5 w-5", iconClassName)} strokeWidth={2} />
    </div>
  );
}

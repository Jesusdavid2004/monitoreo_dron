import { cn } from "@/lib/utils";

interface BatteryBarProps {
  battery: number;
  className?: string;
}

function batteryColor(level: number): string {
  if (level <= 15) {
    return "bg-rose-500";
  }
  if (level <= 40) {
    return "bg-amber-500";
  }
  return "bg-emerald-500";
}

export function BatteryBar({ battery, className }: BatteryBarProps) {
  const level = Math.max(0, Math.min(100, Math.round(battery)));

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="h-2 w-full max-w-[5rem] overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
        <div
          className={cn("h-full rounded-full transition-all", batteryColor(level))}
          style={{ width: `${level}%` }}
          aria-hidden="true"
        />
      </div>
      <span className="text-xs font-semibold tabular-nums text-slate-600 dark:text-slate-300">
        {level} %
      </span>
    </div>
  );
}
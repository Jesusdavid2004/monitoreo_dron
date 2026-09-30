import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  className?: string;
}

export function EmptyState({ title, description, icon, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-slate-300 px-6 py-12 text-center dark:border-slate-700",
        className
      )}
    >
      {icon ? <div className="text-slate-400 dark:text-slate-500">{icon}</div> : null}
      <p className="font-medium text-slate-700 dark:text-slate-300">{title}</p>
      {description ? (
        <p className="max-w-sm text-sm text-slate-500 dark:text-slate-400">{description}</p>
      ) : null}
    </div>
  );
}
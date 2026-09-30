import { MissionStatusBadge } from "@/components/ui/StatusBadge";
import { Card } from "@/components/ui/Card";
import { formatDateTime, formatDuration } from "@/lib/utils";
import type { MissionWithDroneDTO } from "@/types";

interface MissionCardProps {
  mission: MissionWithDroneDTO;
}

export function MissionCard({ mission }: MissionCardProps) {
  return (
    <Card className="flex h-full flex-col transition hover:shadow-md">
      <div className="flex items-start justify-between gap-3 p-5">
        <div className="min-w-0">
          <h3 className="truncate font-semibold text-slate-900 dark:text-white">{mission.name}</h3>
          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
            Dron: {mission.drone.name}
          </p>
        </div>
        <MissionStatusBadge status={mission.status} />
      </div>

      {mission.description ? (
        <p className="line-clamp-2 px-5 text-sm text-slate-600 dark:text-slate-400">
          {mission.description}
        </p>
      ) : null}

      <div className="mt-auto space-y-2 border-t border-slate-100 px-5 py-4 text-sm dark:border-slate-800">
        <div className="flex items-center justify-between">
          <span className="text-slate-500 dark:text-slate-400">Inicio</span>
          <span className="font-medium text-slate-800 dark:text-slate-200">
            {formatDateTime(mission.startTime)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-500 dark:text-slate-400">Duración</span>
          <span className="font-medium text-slate-800 dark:text-slate-200">
            {formatDuration(mission.startTime, mission.endTime)}
          </span>
        </div>
      </div>
    </Card>
  );
}
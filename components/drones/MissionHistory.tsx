import { MissionStatusBadge } from "@/components/ui/StatusBadge";
import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { formatDateTime, formatDuration } from "@/lib/utils";
import type { MissionWithDroneDTO } from "@/types";

interface MissionHistoryProps {
  missions: MissionWithDroneDTO[];
}

export function MissionHistory({ missions }: MissionHistoryProps) {
  return (
    <Card>
      <CardHeader title="Historial de misiones" subtitle="Últimas misiones asignadas al dron" />
      <CardBody>
        {missions.length === 0 ? (
          <EmptyState
            title="Sin misiones registradas"
            description="Este dron aún no tiene misiones asignadas."
          />
        ) : (
          <ul className="divide-y divide-slate-100 dark:divide-slate-800">
            {missions.map((mission) => (
              <li key={mission.id} className="py-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate font-medium text-slate-900 dark:text-white">
                      {mission.name}
                    </p>
                    <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                      Inicio: {formatDateTime(mission.startTime)}
                    </p>
                    <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                      Duración: {formatDuration(mission.startTime, mission.endTime)}
                    </p>
                  </div>
                  <MissionStatusBadge status={mission.status} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardBody>
    </Card>
  );
}
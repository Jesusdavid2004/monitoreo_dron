import { MissionList } from "./MissionList";
import { StatCard } from "@/components/ui/StatCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { formatDateTime } from "@/lib/utils";
import { MISSIONS_REVALIDATE_SECONDS } from "@/lib/constants";
import type { MissionWithDroneDTO } from "@/types";

interface MissionsViewProps {
  initialMissions: MissionWithDroneDTO[];
  generatedAt: string;
  connectionError?: boolean;
}

function missionCount(missions: MissionWithDroneDTO[], status: string): number {
  return missions.filter((mission) => mission.status === status).length;
}

export function MissionsView({
  initialMissions,
  generatedAt,
  connectionError = false,
}: MissionsViewProps) {
  return (
    <div className="animate-fade-in mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Misiones
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Historial de misiones · Generación estática incremental (ISR)
          </p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
          Revalidación: cada {MISSIONS_REVALIDATE_SECONDS} s
          <span className="mx-2 text-slate-300 dark:text-slate-600">·</span>
          Generado: {formatDateTime(generatedAt)}
        </div>
      </div>

      {connectionError ? (
        <div
          role="alert"
          className="mt-6 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-300"
        >
          No se pudo conectar con la base de datos al generar esta página. Se reintentará
          automáticamente en {MISSIONS_REVALIDATE_SECONDS} segundos.
        </div>
      ) : null}

      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Total" value={initialMissions.length} accent="primary" />
        <StatCard label="En curso" value={missionCount(initialMissions, "IN_PROGRESS")} accent="info" />
        <StatCard label="Completadas" value={missionCount(initialMissions, "COMPLETED")} accent="success" />
        <StatCard label="Programadas" value={missionCount(initialMissions, "SCHEDULED")} accent="warning" />
      </div>

      <div className="mt-8">
        {initialMissions.length === 0 ? (
          <EmptyState
            title="No hay misiones disponibles"
            description="Cuando se registren misiones, aparecerán en esta página."
          />
        ) : (
          <MissionList initialMissions={initialMissions} />
        )}
      </div>
    </div>
  );
}
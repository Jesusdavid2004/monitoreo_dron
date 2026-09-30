import Link from "next/link";
import { DroneStatusBadge } from "@/components/ui/StatusBadge";
import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import { TelemetryGrid } from "./TelemetryGrid";
import { MissionHistory } from "./MissionHistory";
import { formatDateTime } from "@/lib/utils";
import type { DroneDTO, MissionWithDroneDTO } from "@/types";

interface DroneDetailViewProps {
  drone: DroneDTO;
  missions: MissionWithDroneDTO[];
}

export function DroneDetailView({ drone, missions }: DroneDetailViewProps) {
  return (
    <div className="animate-fade-in mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <nav className="mb-6 text-sm text-slate-500 dark:text-slate-400" aria-label="Miga de pan">
        <Link href="/dashboard" className="transition hover:text-primary-600 dark:hover:text-primary-400">
          Panel de control
        </Link>
        <span className="mx-2">/</span>
        <span className="text-slate-700 dark:text-slate-200">{drone.name}</span>
      </nav>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              {drone.name}
            </h1>
            <DroneStatusBadge status={drone.status} />
          </div>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {drone.model} · Renderizado en servidor (SSR)
          </p>
        </div>
        <div className="text-left text-xs text-slate-400 dark:text-slate-500 sm:text-right">
          <p>Actualizado en cada solicitud</p>
          <p>Última señal: {formatDateTime(drone.lastSeenAt)}</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader title="Telemetría" subtitle="Datos capturados en la última transmisión" />
            <CardBody>
              <TelemetryGrid drone={drone} />
            </CardBody>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader title="Registro del dron" subtitle="Información operativa" />
            <CardBody className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400">Identificador</span>
                <span className="font-mono text-xs text-slate-700 dark:text-slate-300">{drone.id}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400">Modelo</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{drone.model}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400">Creado</span>
                <span className="text-slate-800 dark:text-slate-200">{formatDateTime(drone.createdAt)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400">Última actualización</span>
                <span className="text-slate-800 dark:text-slate-200">{formatDateTime(drone.updatedAt)}</span>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>

      <div className="mt-6">
        <MissionHistory missions={missions} />
      </div>
    </div>
  );
}
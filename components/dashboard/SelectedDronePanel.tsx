"use client";

import Link from "next/link";
import { BatteryBar } from "@/components/ui/BatteryBar";
import { DroneStatusBadge } from "@/components/ui/StatusBadge";
import { formatDateTime } from "@/lib/utils";
import type { DroneSummaryDTO } from "@/types";

interface SelectedDronePanelProps {
  drone: DroneSummaryDTO | null;
}

function TelemetryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-slate-100 py-2 text-sm last:border-0 dark:border-slate-800">
      <span className="text-slate-500 dark:text-slate-400">{label}</span>
      <span className="font-semibold tabular-nums text-slate-800 dark:text-slate-200">{value}</span>
    </div>
  );
}

export function SelectedDronePanel({ drone }: SelectedDronePanelProps) {
  if (!drone) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 p-6 text-center dark:border-slate-700">
        <svg className="h-8 w-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Selecciona un dron en el mapa para ver su telemetría.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start justify-between gap-3 border-b border-slate-100 px-5 py-4 dark:border-slate-800">
        <div>
          <h3 className="font-semibold text-slate-900 dark:text-white">{drone.name}</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">{drone.model}</p>
        </div>
        <DroneStatusBadge status={drone.status} />
      </div>

      <div className="px-5 py-3">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="text-slate-500 dark:text-slate-400">Batería</span>
          <BatteryBar battery={drone.battery} />
        </div>
        <TelemetryRow label="Latitud" value={drone.latitude.toFixed(5)} />
        <TelemetryRow label="Longitud" value={drone.longitude.toFixed(5)} />
        <TelemetryRow label="Altitud" value={`${Math.round(drone.altitude)} m`} />
        <TelemetryRow label="Velocidad" value={`${drone.speed.toFixed(1)} m/s`} />
        <TelemetryRow label="Última señal" value={formatDateTime(drone.lastSeenAt)} />
      </div>

      <div className="border-t border-slate-100 px-5 py-3 dark:border-slate-800">
        <Link
          href={`/drones/${drone.id}`}
          className="inline-flex w-full items-center justify-center rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-700"
        >
          Ver ficha completa (SSR)
        </Link>
      </div>
    </div>
  );
}
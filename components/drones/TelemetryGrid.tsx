import { BatteryBar } from "@/components/ui/BatteryBar";
import type { DroneDTO } from "@/types";

interface TelemetryGridProps {
  drone: DroneDTO;
}

function TelemetryRow({ label, value, unit }: { label: string; value: string; unit?: string }) {
  return (
    <div className="rounded-lg border border-slate-100 bg-surface-50 p-4 dark:border-slate-800 dark:bg-slate-950">
      <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400 dark:text-slate-500">
        {label}
      </p>
      <p className="mt-1 text-lg font-bold tabular-nums text-slate-900 dark:text-white">
        {value}
        {unit ? <span className="ml-1 text-sm font-normal text-slate-400">{unit}</span> : null}
      </p>
    </div>
  );
}

export function TelemetryGrid({ drone }: TelemetryGridProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between rounded-lg border border-slate-100 px-4 py-3 dark:border-slate-800">
        <span className="text-sm text-slate-500 dark:text-slate-400">Nivel de batería</span>
        <BatteryBar battery={drone.battery} />
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <TelemetryRow label="Latitud" value={drone.latitude.toFixed(5)} />
        <TelemetryRow label="Longitud" value={drone.longitude.toFixed(5)} />
        <TelemetryRow label="Altitud" value={Math.round(drone.altitude).toString()} unit="m" />
        <TelemetryRow label="Velocidad" value={drone.speed.toFixed(1)} unit="m/s" />
        <TelemetryRow label="Estado" value={drone.status.replace("_", " ").toLowerCase()} />
        <TelemetryRow label="Batería" value={`${Math.round(drone.battery)}`} unit="%" />
      </div>
    </div>
  );
}
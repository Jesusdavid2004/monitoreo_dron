"use client";

import Link from "next/link";
import { BatteryBar } from "@/components/ui/BatteryBar";
import { DroneStatusBadge } from "@/components/ui/StatusBadge";
import { Card } from "@/components/ui/Card";
import { timeAgo } from "@/lib/utils";
import type { DroneSummaryDTO } from "@/types";

interface DroneCardProps {
  drone: DroneSummaryDTO;
  onSelect?: (id: string) => void;
}

export function DroneCard({ drone, onSelect }: DroneCardProps) {
  return (
    <Card
      className="cursor-pointer transition hover:shadow-md"
      onClick={() => onSelect?.(drone.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          onSelect?.(drone.id);
        }
      }}
    >
      <div className="flex items-start justify-between gap-3 p-5">
        <div className="min-w-0">
          <h3 className="truncate font-semibold text-slate-900 dark:text-white">{drone.name}</h3>
          <p className="mt-0.5 truncate text-xs text-slate-500 dark:text-slate-400">{drone.model}</p>
        </div>
        <DroneStatusBadge status={drone.status} />
      </div>

      <div className="space-y-3 border-t border-slate-100 px-5 py-4 dark:border-slate-800">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-500 dark:text-slate-400">Batería</span>
          <BatteryBar battery={drone.battery} />
        </div>
        <div className="grid grid-cols-3 gap-2 text-center">
          <div>
            <p className="text-[11px] uppercase text-slate-400 dark:text-slate-500">Altitud</p>
            <p className="text-sm font-semibold tabular-nums text-slate-800 dark:text-slate-200">
              {Math.round(drone.altitude)} m
            </p>
          </div>
          <div>
            <p className="text-[11px] uppercase text-slate-400 dark:text-slate-500">Velocidad</p>
            <p className="text-sm font-semibold tabular-nums text-slate-800 dark:text-slate-200">
              {drone.speed.toFixed(1)} m/s
            </p>
          </div>
          <div>
            <p className="text-[11px] uppercase text-slate-400 dark:text-slate-500">Activo</p>
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
              {timeAgo(drone.lastSeenAt)}
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-100 px-5 py-3 dark:border-slate-800">
        <Link
          href={`/drones/${drone.id}`}
          onClick={(event) => event.stopPropagation()}
          className="text-sm font-semibold text-primary-600 transition hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
        >
          Ver detalle (SSR) →
        </Link>
      </div>
    </Card>
  );
}
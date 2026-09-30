"use client";

import { useMemo, useState } from "react";
import { useDrones } from "@/hooks/useDrones";
import { useLiveSimulation } from "@/hooks/useLiveSimulation";
import { DroneMap } from "./DroneMap";
import { DroneList } from "./DroneList";
import { SelectedDronePanel } from "./SelectedDronePanel";
import { StatCard } from "@/components/ui/StatCard";
import { ErrorState } from "@/components/ui/ErrorState";
import { Spinner } from "@/components/ui/Spinner";
import { cn } from "@/lib/utils";
import type { DroneSummaryDTO } from "@/types";

export default function DashboardView() {
  const { data, isLoading, isError, error, refetch, dataUpdatedAt } = useDrones();
  const [simulationEnabled, setSimulationEnabled] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const drones = useLiveSimulation(data ?? [], simulationEnabled);

  const stats = useMemo(() => {
    const fleet = drones as DroneSummaryDTO[];
    const total = fleet.length;
    const inMission = fleet.filter((d) => d.status === "IN_MISSION").length;
    const operational = fleet.filter((d) => d.status === "OPERATIONAL").length;
    const averageBattery =
      total === 0 ? 0 : Math.round(fleet.reduce((sum, d) => sum + d.battery, 0) / total);
    return { total, inMission, operational, averageBattery };
  }, [drones]);

  const selectedDrone = drones.find((d) => d.id === selectedId) ?? null;

  const lastUpdate = dataUpdatedAt
    ? new Intl.DateTimeFormat("es-ES", { hour: "2-digit", minute: "2-digit", second: "2-digit" }).format(
        dataUpdatedAt
      )
    : "—";

  return (
    <div className="animate-fade-in mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Panel de control
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Flota en tiempo real · Renderizado en cliente (CSR)
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-400 dark:text-slate-500">
            Última actualización: {lastUpdate}
          </span>
          <button
            type="button"
            onClick={() => {
              void refetch();
            }}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Actualizar
          </button>
          <button
            type="button"
            onClick={() => setSimulationEnabled((value) => !value)}
            className={cn(
              "inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition",
              simulationEnabled
                ? "bg-emerald-600 text-white hover:bg-emerald-700"
                : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
            )}
          >
            <span
              className={cn("h-2 w-2 rounded-full", simulationEnabled ? "animate-pulse bg-white" : "bg-slate-400")}
            />
            {simulationEnabled ? "Simulación activa" : "Simular vuelo en vivo"}
          </button>
        </div>
      </div>

      {isLoading ? (
        <Spinner label="Cargando flota de drones..." className="py-20" />
      ) : isError ? (
        <div className="mt-8 space-y-4">
          <ErrorState
            title="No se pudieron cargar los drones"
            message={error instanceof Error ? error.message : "Error de conexión con la API."}
          />
          <div className="flex justify-center">
            <button
              type="button"
              onClick={() => {
                void refetch();
              }}
              className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-700"
            >
              Reintentar
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Stats */}
          <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
            <StatCard label="Drones totales" value={stats.total} accent="primary" />
            <StatCard label="En misión" value={stats.inMission} accent="info" hint="En vuelo activo" />
            <StatCard label="Operativos" value={stats.operational} accent="success" hint="Listos para despegar" />
            <StatCard label="Batería promedio" value={`${stats.averageBattery} %`} accent="warning" hint="Media de la flota" />
          </div>

          {/* Map + selection */}
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <DroneMap drones={drones} selectedId={selectedId} onSelect={setSelectedId} />
            </div>
            <div>
              <SelectedDronePanel drone={selectedDrone} />
            </div>
          </div>

          {/* Fleet list */}
          <div className="mt-10">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Flota registrada</h2>
              <span className="text-xs text-slate-400 dark:text-slate-500">
                Selecciona un dron en el mapa
              </span>
            </div>
            <DroneList drones={drones} onSelect={setSelectedId} />
          </div>
        </>
      )}
    </div>
  );
}
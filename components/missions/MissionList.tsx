"use client";

import { useMemo, useState } from "react";
import { MissionCard } from "./MissionCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { MISSION_STATUS_LABELS } from "@/lib/constants";
import { MISSION_STATUSES, type MissionStatusValue, type MissionWithDroneDTO } from "@/types";
import { cn } from "@/lib/utils";

interface MissionListProps {
  initialMissions: MissionWithDroneDTO[];
}

const FILTERS: Array<{ value: MissionStatusValue | "ALL"; label: string }> = [
  { value: "ALL", label: "Todas" },
  ...MISSION_STATUSES.map((status) => ({
    value: status as MissionStatusValue,
    label: MISSION_STATUS_LABELS[status as MissionStatusValue],
  })),
];

/**
 * Client-side island: filters the ISR-provided mission list without
 * making new network requests.
 */
export function MissionList({ initialMissions }: MissionListProps) {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<MissionStatusValue | "ALL">("ALL");

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return initialMissions.filter((mission) => {
      const matchesStatus = statusFilter === "ALL" || mission.status === statusFilter;
      const matchesQuery =
        normalized.length === 0 ||
        mission.name.toLowerCase().includes(normalized) ||
        mission.drone.name.toLowerCase().includes(normalized);
      return matchesStatus && matchesQuery;
    });
  }, [initialMissions, query, statusFilter]);

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative">
          <svg
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar misión o dron..."
            aria-label="Buscar misión"
            className="w-full rounded-lg border border-slate-300 bg-white py-2 pl-9 pr-3 text-sm text-slate-800 placeholder:text-slate-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/30 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 sm:w-72"
          />
        </div>

        <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por estado">
          {FILTERS.map((filter) => (
            <button
              key={filter.value}
              type="button"
              onClick={() => setStatusFilter(filter.value)}
              className={cn(
                "rounded-full px-3 py-1.5 text-xs font-semibold transition",
                statusFilter === filter.value
                  ? "bg-primary-600 text-white"
                  : "border border-slate-300 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
              )}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-4 text-xs text-slate-400 dark:text-slate-500">
        Mostrando {filtered.length} de {initialMissions.length} misiones
      </p>

      {filtered.length === 0 ? (
        <div className="mt-6">
          <EmptyState
            title="No se encontraron misiones"
            description="Prueba a cambiar el filtro de estado o el término de búsqueda."
          />
        </div>
      ) : (
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((mission) => (
            <MissionCard key={mission.id} mission={mission} />
          ))}
        </div>
      )}
    </div>
  );
}
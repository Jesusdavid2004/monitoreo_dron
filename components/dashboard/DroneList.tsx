"use client";

import { DroneCard } from "./DroneCard";
import { EmptyState } from "@/components/ui/EmptyState";
import type { DroneSummaryDTO } from "@/types";

interface DroneListProps {
  drones: DroneSummaryDTO[];
  onSelect: (id: string) => void;
}

export function DroneList({ drones, onSelect }: DroneListProps) {
  if (drones.length === 0) {
    return (
      <EmptyState
        title="No hay drones registrados"
        description="Cuando la flota esté registrada, aparecerá aquí en tiempo real."
      />
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {drones.map((drone) => (
        <DroneCard key={drone.id} drone={drone} onSelect={onSelect} />
      ))}
    </div>
  );
}
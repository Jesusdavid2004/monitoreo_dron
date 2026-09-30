"use client";

import { useQuery } from "@tanstack/react-query";
import type { DroneSummaryDTO } from "@/types";

async function fetchDrones(): Promise<DroneSummaryDTO[]> {
  const response = await fetch("/api/drones", {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Error al cargar la flota (${response.status})`);
  }

  const body = (await response.json()) as { data: DroneSummaryDTO[] };
  return body.data;
}

/** React Query hook for the drone fleet, refetched every 5 seconds. */
export function useDrones() {
  return useQuery({
    queryKey: ["drones"],
    queryFn: fetchDrones,
    refetchInterval: 5_000,
    staleTime: 2_000,
  });
}
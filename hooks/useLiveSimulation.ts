"use client";

import { useEffect, useState } from "react";
import { clamp } from "@/lib/utils";
import type { DroneSummaryDTO } from "@/types";

function randomDrift(): number {
  return (Math.random() - 0.5) * 0.002;
}

/**
 * Client-side flight simulation.
 * When enabled, applies a small random walk to every drone's telemetry
 * every 2 seconds so the dashboard behaves like a live tracking system.
 */
export function useLiveSimulation(
  drones: DroneSummaryDTO[],
  enabled: boolean
): DroneSummaryDTO[] {
  const [simulated, setSimulated] = useState<DroneSummaryDTO[]>(drones);

  useEffect(() => {
    if (!enabled) {
      setSimulated(drones);
    }
  }, [drones, enabled]);

  useEffect(() => {
    if (!enabled) {
      return undefined;
    }

    const interval = window.setInterval(() => {
      setSimulated((previous) =>
        previous.map((drone) => ({
          ...drone,
          latitude: drone.latitude + randomDrift(),
          longitude: drone.longitude + randomDrift(),
          altitude: clamp(drone.altitude + (Math.random() - 0.5) * 3, 0, 500),
          speed: clamp(drone.speed + (Math.random() - 0.5) * 2, 0, 60),
          battery: clamp(drone.battery - Math.random() * 0.05, 0, 100),
          lastSeenAt: new Date().toISOString(),
        }))
      );
    }, 2_000);

    return () => window.clearInterval(interval);
  }, [enabled]);

  return enabled ? simulated : drones;
}
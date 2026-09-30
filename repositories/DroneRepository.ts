/**
 * Repository layer (Data Access).
 * Encapsulates all Prisma / PostgreSQL queries for drones.
 * Falls back to the in-memory demo dataset when no database is
 * configured, so the platform works in "demo mode" deployments.
 */
import { prisma } from "@/lib/prisma";
import { DataAccessError } from "@/lib/errors";
import { createLogger } from "@/lib/logger";
import {
  DEMO_DRONE_SUMMARIES,
  DEMO_DRONES,
  isDemoMode,
} from "@/lib/demo-data";
import type { Drone, DroneSummary, DroneTelemetry } from "@/types";

const logger = createLogger("repository.drone");

export class DroneRepository {
  /** Returns every drone as a lightweight summary projection. */
  async findAll(): Promise<DroneSummary[]> {
    if (isDemoMode()) {
      logger.warn("Demo mode active: serving in-memory drones");
      return DEMO_DRONE_SUMMARIES;
    }

    try {
      return await prisma.drone.findMany({
        orderBy: [{ status: "asc" }, { name: "asc" }],
        select: {
          id: true,
          name: true,
          model: true,
          status: true,
          battery: true,
          latitude: true,
          longitude: true,
          altitude: true,
          speed: true,
          lastSeenAt: true,
        },
      });
    } catch (error) {
      logger.error("findAll failed, falling back to demo data", {
        error: String(error),
      });
      return DEMO_DRONE_SUMMARIES;
    }
  }

  /** Returns a single drone by id, including its latest mission. */
  async findById(id: string): Promise<(Drone & { lastMissionId: string | null }) | null> {
    if (isDemoMode()) {
      const drone = DEMO_DRONES.find((d) => d.id === id);
      if (!drone) {
        return null;
      }
      return { ...drone, lastMissionId: "mision-patrullaje-nocturno" };
    }

    try {
      const drone = await prisma.drone.findUnique({
        where: { id },
        include: {
          missions: {
            orderBy: { startTime: "desc" },
            take: 1,
            select: { id: true },
          },
        },
      });

      if (!drone) {
        return null;
      }

      const { missions, ...rest } = drone;
      return { ...rest, lastMissionId: missions[0]?.id ?? null };
    } catch (error) {
      logger.error("findById failed, falling back to demo data", {
        error: String(error),
        id,
      });
      const drone = DEMO_DRONES.find((d) => d.id === id);
      return drone ? { ...drone, lastMissionId: null } : null;
    }
  }

  /** Updates telemetry for a drone (used by the live simulation). */
  async updateTelemetry(id: string, telemetry: DroneTelemetry): Promise<Drone> {
    if (isDemoMode()) {
      logger.debug("Demo mode: simulating telemetry update", { id });
      const drone = DEMO_DRONES.find((d) => d.id === id);
      if (!drone) {
        throw new DataAccessError();
      }
      return { ...drone, ...telemetry };
    }

    try {
      return await prisma.drone.update({
        where: { id },
        data: {
          latitude: telemetry.latitude,
          longitude: telemetry.longitude,
          altitude: telemetry.altitude,
          speed: telemetry.speed,
          battery: telemetry.battery,
          lastSeenAt: telemetry.lastSeenAt,
        },
      });
    } catch (error) {
      logger.error("updateTelemetry failed", { error: String(error), id });
      throw new DataAccessError(undefined, error);
    }
  }
}

export const droneRepository = new DroneRepository();
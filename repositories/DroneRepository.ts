/**
 * Repository layer (Data Access).
 * Encapsulates all Prisma / PostgreSQL queries for drones.
 * Throws typed errors; business logic lives in the service layer.
 */
import { prisma } from "@/lib/prisma";
import { DataAccessError } from "@/lib/errors";
import { createLogger } from "@/lib/logger";
import type { Drone, DroneSummary, DroneTelemetry } from "@/types";

const logger = createLogger("repository.drone");

export class DroneRepository {
  /** Returns every drone as a lightweight summary projection. */
  async findAll(): Promise<DroneSummary[]> {
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
      logger.error("findAll failed", { error: String(error) });
      throw new DataAccessError(undefined, error);
    }
  }

  /** Returns a single drone by id, including its latest mission. */
  async findById(id: string): Promise<(Drone & { lastMissionId: string | null }) | null> {
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
      logger.error("findById failed", { error: String(error), id });
      throw new DataAccessError(undefined, error);
    }
  }

  /** Updates telemetry for a drone (used by the live simulation). */
  async updateTelemetry(id: string, telemetry: DroneTelemetry): Promise<Drone> {
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
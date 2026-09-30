/**
 * Repository layer (Data Access).
 * Encapsulates all Prisma / PostgreSQL queries for missions.
 */
import { prisma } from "@/lib/prisma";
import { DataAccessError } from "@/lib/errors";
import { createLogger } from "@/lib/logger";
import type { MissionWithDrone, Paginated } from "@/types";

const logger = createLogger("repository.mission");

export interface MissionListOptions {
  page?: number;
  pageSize?: number;
  status?: string;
  droneId?: string;
}

export class MissionRepository {
  /** Returns a paginated list of missions joined with their drone. */
  async findAll(options: MissionListOptions = {}): Promise<Paginated<MissionWithDrone>> {
    const page = Math.max(1, options.page ?? 1);
    const pageSize = Math.min(100, Math.max(1, options.pageSize ?? 20));

    const where = {
      ...(options.status ? { status: options.status as never } : {}),
      ...(options.droneId ? { droneId: options.droneId } : {}),
    };

    try {
      const [items, total] = await Promise.all([
        prisma.mission.findMany({
          where,
          include: {
            drone: {
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
            },
          },
          orderBy: { startTime: "desc" },
          skip: (page - 1) * pageSize,
          take: pageSize,
        }),
        prisma.mission.count({ where }),
      ]);

      return {
        items,
        total,
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize),
      };
    } catch (error) {
      logger.error("findAll failed", { error: String(error) });
      throw new DataAccessError(undefined, error);
    }
  }

  /** Returns missions for a specific drone. */
  async findByDroneId(droneId: string, limit = 10): Promise<MissionWithDrone[]> {
    try {
      return await prisma.mission.findMany({
        where: { droneId },
        include: {
          drone: {
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
          },
        },
        orderBy: { startTime: "desc" },
        take: limit,
      });
    } catch (error) {
      logger.error("findByDroneId failed", { error: String(error), droneId });
      throw new DataAccessError(undefined, error);
    }
  }
}

export const missionRepository = new MissionRepository();
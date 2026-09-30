/**
 * Repository layer (Data Access).
 * Encapsulates all Prisma / PostgreSQL queries for missions.
 * Falls back to the in-memory demo dataset when no database is
 * configured, so the platform works in "demo mode" deployments.
 */
import { prisma } from "@/lib/prisma";
import { createLogger } from "@/lib/logger";
import { DEMO_MISSIONS, isDemoMode } from "@/lib/demo-data";
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

    if (isDemoMode()) {
      logger.warn("Demo mode active: serving in-memory missions");
      const filtered = DEMO_MISSIONS.filter((mission) => {
        const matchesStatus = !options.status || mission.status === options.status;
        const matchesDrone = !options.droneId || mission.droneId === options.droneId;
        return matchesStatus && matchesDrone;
      });
      return {
        items: filtered.slice((page - 1) * pageSize, page * pageSize),
        total: filtered.length,
        page,
        pageSize,
        totalPages: Math.ceil(filtered.length / pageSize),
      };
    }

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
      logger.error("findAll failed, falling back to demo data", {
        error: String(error),
      });
      const filtered = DEMO_MISSIONS.filter((mission) => {
        const matchesStatus = !options.status || mission.status === options.status;
        const matchesDrone = !options.droneId || mission.droneId === options.droneId;
        return matchesStatus && matchesDrone;
      });
      return {
        items: filtered.slice((page - 1) * pageSize, page * pageSize),
        total: filtered.length,
        page,
        pageSize,
        totalPages: Math.ceil(filtered.length / pageSize),
      };
    }
  }

  /** Returns missions for a specific drone. */
  async findByDroneId(droneId: string, limit = 10): Promise<MissionWithDrone[]> {
    if (isDemoMode()) {
      logger.debug("Demo mode: serving in-memory missions by drone");
      return DEMO_MISSIONS.filter((mission) => mission.droneId === droneId).slice(0, limit);
    }

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
      logger.error("findByDroneId failed, falling back to demo data", {
        error: String(error),
        droneId,
      });
      return DEMO_MISSIONS.filter((mission) => mission.droneId === droneId).slice(0, limit);
    }
  }
}

export const missionRepository = new MissionRepository();
/**
 * Service layer (Business Logic) for missions.
 */
import { missionRepository, type MissionListOptions } from "@/repositories";
import { createLogger } from "@/lib/logger";
import type { MissionWithDrone, MissionWithDroneDTO, Paginated } from "@/types";

const logger = createLogger("service.mission");

function toDTO(mission: MissionWithDrone): MissionWithDroneDTO {
  return {
    ...mission,
    startTime: mission.startTime.toISOString(),
    endTime: mission.endTime ? mission.endTime.toISOString() : null,
    createdAt: mission.createdAt.toISOString(),
    updatedAt: mission.updatedAt.toISOString(),
    drone: {
      ...mission.drone,
      lastSeenAt: mission.drone.lastSeenAt.toISOString(),
    },
  };
}

export class MissionService {
  /** Returns a paginated list of mission DTOs. */
  async getMissions(options: MissionListOptions = {}): Promise<Paginated<MissionWithDroneDTO>> {
    const result = await missionRepository.findAll(options);
    logger.debug("Returning missions", {
      page: result.page,
      total: result.total,
    });
    return {
      ...result,
      items: result.items.map(toDTO),
    };
  }

  /** Returns the latest missions for a drone (used in drone detail). */
  async getMissionsByDroneId(droneId: string, limit = 5): Promise<MissionWithDroneDTO[]> {
    const missions = await missionRepository.findByDroneId(droneId, limit);
    return missions.map(toDTO);
  }
}

export const missionService = new MissionService();
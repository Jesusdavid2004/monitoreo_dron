/**
 * Service layer (Business Logic).
 * Orchestrates repositories, applies validation and mapping rules,
 * and converts domain entities into wire-ready DTOs.
 */
import { droneRepository } from "@/repositories";
import { NotFoundError } from "@/lib/errors";
import { createLogger } from "@/lib/logger";
import type {
  Drone,
  DroneDTO,
  DroneSummary,
  DroneSummaryDTO,
  DroneTelemetry,
} from "@/types";

const logger = createLogger("service.drone");

/** Maps a domain drone summary into its DTO shape (dates → ISO strings). */
function toSummaryDTO(drone: DroneSummary): DroneSummaryDTO {
  return {
    ...drone,
    lastSeenAt: drone.lastSeenAt.toISOString(),
  };
}

/** Maps a full domain drone into its DTO shape. */
function toDTO(drone: Drone): DroneDTO {
  return {
    ...drone,
    lastSeenAt: drone.lastSeenAt.toISOString(),
    createdAt: drone.createdAt.toISOString(),
    updatedAt: drone.updatedAt.toISOString(),
  };
}

export class DroneService {
  /** Returns every drone as DTO summaries (dashboard / list endpoints). */
  async getDroneSummaries(): Promise<DroneSummaryDTO[]> {
    const drones = await droneRepository.findAll();
    logger.debug("Returning drone summaries", { count: drones.length });
    return drones.map(toSummaryDTO);
  }

  /** Returns a single drone DTO or throws NotFoundError. */
  async getDroneById(id: string): Promise<DroneDTO> {
    const drone = await droneRepository.findById(id);
    if (!drone) {
      logger.warn("Drone not found", { id });
      throw new NotFoundError("Dron");
    }
    return toDTO(drone);
  }

  /** Applies live telemetry updates to a drone (simulation endpoint). */
  async updateDroneTelemetry(id: string, telemetry: DroneTelemetry): Promise<DroneDTO> {
    const drone = await droneRepository.updateTelemetry(id, telemetry);
    logger.debug("Drone telemetry updated", { id });
    return toDTO(drone);
  }

  /** Validates a drone id (cuid). */
  isValidId(id: string): boolean {
    return /^c[a-z0-9]{24}$/i.test(id);
  }
}

export const droneService = new DroneService();
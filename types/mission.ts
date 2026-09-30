/**
 * Domain types for Mission entities.
 */

import type { DroneSummary, DroneSummaryDTO } from "./drone";

export const MISSION_STATUSES = [
  "SCHEDULED",
  "IN_PROGRESS",
  "COMPLETED",
  "CANCELLED",
  "FAILED",
] as const;

export type MissionStatusValue = (typeof MISSION_STATUSES)[number];

/** Full mission entity used on the server side. */
export interface Mission {
  id: string;
  droneId: string;
  name: string;
  description: string | null;
  status: MissionStatusValue;
  startTime: Date;
  endTime: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

/** Mission joined with its assigned drone summary. */
export interface MissionWithDrone extends Mission {
  drone: DroneSummary;
}

/** Wire format for a mission (dates as ISO strings). */
export interface MissionDTO {
  id: string;
  droneId: string;
  name: string;
  description: string | null;
  status: MissionStatusValue;
  startTime: string;
  endTime: string | null;
  createdAt: string;
  updatedAt: string;
}

/** Wire format for a mission joined with its drone. */
export interface MissionWithDroneDTO extends MissionDTO {
  drone: DroneSummaryDTO;
}
/**
 * Domain types for Drone entities.
 * Kept independent from Prisma so the service layer and UI rely on
 * our own contract instead of the generated ORM types.
 */

export const DRONE_STATUSES = [
  "OPERATIONAL",
  "CHARGING",
  "MAINTENANCE",
  "OFFLINE",
  "IN_MISSION",
] as const;

export type DroneStatusValue = (typeof DRONE_STATUSES)[number];

/** Full drone entity used on the server side (dates are Date objects). */
export interface Drone {
  id: string;
  name: string;
  model: string;
  status: DroneStatusValue;
  battery: number;
  latitude: number;
  longitude: number;
  altitude: number;
  speed: number;
  lastSeenAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

/** Lightweight projection used in lists and the dashboard. */
export interface DroneSummary {
  id: string;
  name: string;
  model: string;
  status: DroneStatusValue;
  battery: number;
  latitude: number;
  longitude: number;
  altitude: number;
  speed: number;
  lastSeenAt: Date;
}

/** Live telemetry payload pushed to the dashboard. */
export interface DroneTelemetry {
  latitude: number;
  longitude: number;
  altitude: number;
  speed: number;
  battery: number;
  lastSeenAt: Date;
}

/** Wire format: dates serialized as ISO strings. */
export interface DroneDTO {
  id: string;
  name: string;
  model: string;
  status: DroneStatusValue;
  battery: number;
  latitude: number;
  longitude: number;
  altitude: number;
  speed: number;
  lastSeenAt: string;
  createdAt: string;
  updatedAt: string;
}

/** Wire format for list projections. */
export interface DroneSummaryDTO {
  id: string;
  name: string;
  model: string;
  status: DroneStatusValue;
  battery: number;
  latitude: number;
  longitude: number;
  altitude: number;
  speed: number;
  lastSeenAt: string;
}
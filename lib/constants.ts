import type { DroneStatusValue, MissionStatusValue } from "@/types";

/**
 * Spanish UI labels for drone statuses.
 * NOTE: domain values stay in English (OPERATIONAL, etc.); the
 * presentation layer maps them to Spanish for the interface.
 */
export const DRONE_STATUS_LABELS: Record<DroneStatusValue, string> = {
  OPERATIONAL: "Operativo",
  CHARGING: "Cargando",
  MAINTENANCE: "En mantenimiento",
  OFFLINE: "Desconectado",
  IN_MISSION: "En misión",
};

export const MISSION_STATUS_LABELS: Record<MissionStatusValue, string> = {
  SCHEDULED: "Programada",
  IN_PROGRESS: "En curso",
  COMPLETED: "Completada",
  CANCELLED: "Cancelada",
  FAILED: "Fallida",
};

/** Default revalidation period (in seconds) for ISR pages. */
export const MISSIONS_REVALIDATE_SECONDS =
  Number(process.env.MISSIONS_REVALIDATE ?? 60);

/** App branding used across the UI. */
export const APP_NAME = "DronePilot";
export const APP_DESCRIPTION =
  "Plataforma empresarial para el monitoreo de flotas de drones en tiempo real.";

export const HOME_COORDINATES = {
  latitude: 40.4168,
  longitude: -3.7038,
} as const;
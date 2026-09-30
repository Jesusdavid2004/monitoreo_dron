/**
 * Demo data source.
 * When no DATABASE_URL is configured (or the database is unreachable),
 * the repositories fall back to this in-memory dataset so the platform
 * can be deployed and demoed without provisioning a PostgreSQL database.
 */
import type {
  Drone,
  DroneSummary,
  MissionWithDrone,
} from "@/types";

function minutesAgo(minutes: number): Date {
  return new Date(Date.now() - minutes * 60_000);
}

function hoursAgo(hours: number): Date {
  return minutesAgo(hours * 60);
}

export const DEMO_DRONES: Drone[] = [
  {
    id: "dron-halcon-01",
    name: "Halcon-01",
    model: "DJI Matrice 300 RTK",
    status: "OPERATIONAL",
    battery: 87,
    latitude: 40.4168,
    longitude: -3.7038,
    altitude: 120,
    speed: 14.5,
    lastSeenAt: minutesAgo(0),
    createdAt: hoursAgo(720),
    updatedAt: minutesAgo(0),
  },
  {
    id: "dron-centinela-02",
    name: "Centinela-02",
    model: "Autel EVO II Pro",
    status: "IN_MISSION",
    battery: 63,
    latitude: 40.431,
    longitude: -3.691,
    altitude: 200,
    speed: 22,
    lastSeenAt: minutesAgo(0),
    createdAt: hoursAgo(700),
    updatedAt: minutesAgo(0),
  },
  {
    id: "dron-guardian-03",
    name: "Guardian-03",
    model: "Parrot Anafi USA",
    status: "CHARGING",
    battery: 41,
    latitude: 40.3982,
    longitude: -3.7523,
    altitude: 0,
    speed: 0,
    lastSeenAt: minutesAgo(3),
    createdAt: hoursAgo(680),
    updatedAt: minutesAgo(3),
  },
  {
    id: "dron-vigia-04",
    name: "Vigia-04",
    model: "DJI Mavic 3 Enterprise",
    status: "MAINTENANCE",
    battery: 95,
    latitude: 40.4101,
    longitude: -3.7102,
    altitude: 0,
    speed: 0,
    lastSeenAt: minutesAgo(12),
    createdAt: hoursAgo(660),
    updatedAt: minutesAgo(12),
  },
  {
    id: "dron-explorador-05",
    name: "Explorador-05",
    model: "WingtraOne Gen II",
    status: "OPERATIONAL",
    battery: 72,
    latitude: 40.4523,
    longitude: -3.6956,
    altitude: 300,
    speed: 11.2,
    lastSeenAt: minutesAgo(1),
    createdAt: hoursAgo(600),
    updatedAt: minutesAgo(1),
  },
  {
    id: "dron-aguila-06",
    name: "Aguila-06",
    model: "DJI Phantom 4 RTK",
    status: "OFFLINE",
    battery: 8,
    latitude: 40.3762,
    longitude: -3.7732,
    altitude: 0,
    speed: 0,
    lastSeenAt: minutesAgo(40),
    createdAt: hoursAgo(500),
    updatedAt: minutesAgo(40),
  },
];

function toSummary(drone: Drone): DroneSummary {
  return {
    id: drone.id,
    name: drone.name,
    model: drone.model,
    status: drone.status,
    battery: drone.battery,
    latitude: drone.latitude,
    longitude: drone.longitude,
    altitude: drone.altitude,
    speed: drone.speed,
    lastSeenAt: drone.lastSeenAt,
  };
}

export const DEMO_DRONE_SUMMARIES: DroneSummary[] = DEMO_DRONES.map(toSummary);

export const DEMO_MISSIONS: MissionWithDrone[] = [
  {
    id: "mision-linea-electrica",
    droneId: "dron-halcon-01",
    name: "Inspección de línea eléctrica",
    description: "Vuelo de rutina sobre la línea de alta tensión del sector norte.",
    status: "COMPLETED",
    startTime: hoursAgo(26),
    endTime: hoursAgo(25),
    createdAt: hoursAgo(27),
    updatedAt: hoursAgo(25),
    drone: toSummary(DEMO_DRONES[0]),
  },
  {
    id: "mision-patrullaje-nocturno",
    droneId: "dron-centinela-02",
    name: "Patrullaje perimetral nocturno",
    description: "Vigilancia del perímetro de la planta industrial.",
    status: "IN_PROGRESS",
    startTime: minutesAgo(30),
    endTime: null,
    createdAt: minutesAgo(35),
    updatedAt: minutesAgo(30),
    drone: toSummary(DEMO_DRONES[1]),
  },
  {
    id: "mision-fotogrametria",
    droneId: "dron-explorador-05",
    name: "Levantamiento fotogramétrico",
    description: "Mapeo topográfico de 40 hectáreas para planificación agrícola.",
    status: "COMPLETED",
    startTime: hoursAgo(50),
    endTime: hoursAgo(48),
    createdAt: hoursAgo(51),
    updatedAt: hoursAgo(48),
    drone: toSummary(DEMO_DRONES[4]),
  },
  {
    id: "mision-paneles-solares",
    droneId: "dron-halcon-01",
    name: "Inspección de paneles solares",
    description: "Detección de fallos térmicos en el campo fotovoltaico este.",
    status: "SCHEDULED",
    startTime: hoursAgo(-4),
    endTime: null,
    createdAt: hoursAgo(5),
    updatedAt: hoursAgo(5),
    drone: toSummary(DEMO_DRONES[0]),
  },
  {
    id: "mision-busqueda-rescate",
    droneId: "dron-guardian-03",
    name: "Búsqueda y rescate (simulación)",
    description: "Ejercicio de búsqueda de personal en zona boscosa.",
    status: "CANCELLED",
    startTime: hoursAgo(75),
    endTime: null,
    createdAt: hoursAgo(76),
    updatedAt: hoursAgo(75),
    drone: toSummary(DEMO_DRONES[2]),
  },
  {
    id: "mision-vigilancia-infra",
    droneId: "dron-centinela-02",
    name: "Vigilancia de infraestructura",
    description: "Monitoreo continuo de la estación de transformación.",
    status: "FAILED",
    startTime: hoursAgo(30),
    endTime: hoursAgo(29),
    createdAt: hoursAgo(31),
    updatedAt: hoursAgo(29),
    drone: toSummary(DEMO_DRONES[1]),
  },
];

export function isDemoMode(): boolean {
  return process.env.DEMO_MODE === "true" || !process.env.DATABASE_URL;
}
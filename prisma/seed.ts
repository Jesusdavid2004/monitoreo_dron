/**
 * Database seed script.
 * Creates realistic mock drones and missions for development.
 *
 * Run with: npm run db:seed
 */
import { PrismaClient, DroneStatus, MissionStatus } from "@prisma/client";

const prisma = new PrismaClient();

const DRONES = [
  {
    id: "dron-halcon-01",
    name: "Halcon-01",
    model: "DJI Matrice 300 RTK",
    status: DroneStatus.OPERATIONAL,
    battery: 87,
    latitude: 40.4168,
    longitude: -3.7038,
    altitude: 120,
    speed: 14.5,
  },
  {
    id: "dron-centinela-02",
    name: "Centinela-02",
    model: "Autel EVO II Pro",
    status: DroneStatus.IN_MISSION,
    battery: 63,
    latitude: 40.431,
    longitude: -3.691,
    altitude: 200,
    speed: 22.0,
  },
  {
    id: "dron-guardian-03",
    name: "Guardian-03",
    model: "Parrot Anafi USA",
    status: DroneStatus.CHARGING,
    battery: 41,
    latitude: 40.3982,
    longitude: -3.7523,
    altitude: 0,
    speed: 0,
  },
  {
    id: "dron-vigia-04",
    name: "Vigia-04",
    model: "DJI Mavic 3 Enterprise",
    status: DroneStatus.MAINTENANCE,
    battery: 95,
    latitude: 40.4101,
    longitude: -3.7102,
    altitude: 0,
    speed: 0,
  },
  {
    id: "dron-explorador-05",
    name: "Explorador-05",
    model: "WingtraOne Gen II",
    status: DroneStatus.OPERATIONAL,
    battery: 72,
    latitude: 40.4523,
    longitude: -3.6956,
    altitude: 300,
    speed: 11.2,
  },
  {
    id: "dron-aguila-06",
    name: "Aguila-06",
    model: "DJI Phantom 4 RTK",
    status: DroneStatus.OFFLINE,
    battery: 8,
    latitude: 40.3762,
    longitude: -3.7732,
    altitude: 0,
    speed: 0,
  },
];

const MISSIONS = [
  {
    id: "mision-linea-electrica",
    name: "Inspección de línea eléctrica",
    description: "Vuelo de rutina sobre la línea de alta tensión del sector norte.",
    status: MissionStatus.COMPLETED,
    startTime: new Date(Date.now() - 1000 * 60 * 60 * 26),
    endTime: new Date(Date.now() - 1000 * 60 * 60 * 25),
    droneId: "dron-halcon-01",
  },
  {
    id: "mision-patrullaje-nocturno",
    name: "Patrullaje perimetral nocturno",
    description: "Vigilancia del perímetro de la planta industrial.",
    status: MissionStatus.IN_PROGRESS,
    startTime: new Date(Date.now() - 1000 * 60 * 30),
    endTime: null,
    droneId: "dron-centinela-02",
  },
  {
    id: "mision-fotogrametria",
    name: "Levantamiento fotogramétrico",
    description: "Mapeo topográfico de 40 hectáreas para planificación agrícola.",
    status: MissionStatus.COMPLETED,
    startTime: new Date(Date.now() - 1000 * 60 * 60 * 50),
    endTime: new Date(Date.now() - 1000 * 60 * 60 * 48),
    droneId: "dron-explorador-05",
  },
  {
    id: "mision-paneles-solares",
    name: "Inspección de paneles solares",
    description: "Detección de fallos térmicos en el campo fotovoltaico este.",
    status: MissionStatus.SCHEDULED,
    startTime: new Date(Date.now() + 1000 * 60 * 60 * 4),
    endTime: null,
    droneId: "dron-halcon-01",
  },
  {
    id: "mision-busqueda-rescate",
    name: "Búsqueda y rescate (simulación)",
    description: "Ejercicio de búsqueda de personal en zona boscosa.",
    status: MissionStatus.CANCELLED,
    startTime: new Date(Date.now() - 1000 * 60 * 60 * 75),
    endTime: null,
    droneId: "dron-guardian-03",
  },
  {
    id: "mision-vigilancia-infra",
    name: "Vigilancia de infraestructura",
    description: "Monitoreo continuo de la estación de transformación.",
    status: MissionStatus.FAILED,
    startTime: new Date(Date.now() - 1000 * 60 * 60 * 30),
    endTime: new Date(Date.now() - 1000 * 60 * 60 * 29),
    droneId: "dron-centinela-02",
  },
];

async function main(): Promise<void> {
  console.log("🌱 Seeding database...");

  for (const drone of DRONES) {
    await prisma.drone.upsert({
      where: { id: drone.id },
      update: drone,
      create: drone,
    });
  }

  for (const mission of MISSIONS) {
    await prisma.mission.upsert({
      where: { id: mission.id },
      update: mission,
      create: mission,
    });
  }

  const droneCount = await prisma.drone.count();
  const missionCount = await prisma.mission.count();
  console.log(`✅ Seed complete: ${droneCount} drones, ${missionCount} missions.`);
}

main()
  .catch((error) => {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
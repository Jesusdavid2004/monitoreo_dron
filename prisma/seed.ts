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
    name: "Inspección de línea eléctrica",
    description: "Vuelo de rutina sobre la línea de alta tensión del sector norte.",
    status: MissionStatus.COMPLETED,
    startTime: new Date(Date.now() - 1000 * 60 * 60 * 26),
    endTime: new Date(Date.now() - 1000 * 60 * 60 * 25),
    droneIndex: 0,
  },
  {
    name: "Patrullaje perimetral nocturno",
    description: "Vigilancia del perímetro de la planta industrial.",
    status: MissionStatus.IN_PROGRESS,
    startTime: new Date(Date.now() - 1000 * 60 * 30),
    endTime: null,
    droneIndex: 1,
  },
  {
    name: "Levantamiento fotogramétrico",
    description: "Mapeo topográfico de 40 hectáreas para planificación agrícola.",
    status: MissionStatus.COMPLETED,
    startTime: new Date(Date.now() - 1000 * 60 * 60 * 50),
    endTime: new Date(Date.now() - 1000 * 60 * 60 * 48),
    droneIndex: 4,
  },
  {
    name: "Inspección de paneles solares",
    description: "Detección de fallos térmicos en el campo fotovoltaico este.",
    status: MissionStatus.SCHEDULED,
    startTime: new Date(Date.now() + 1000 * 60 * 60 * 4),
    endTime: null,
    droneIndex: 0,
  },
  {
    name: "Búsqueda y rescate (simulación)",
    description: "Ejercicio de búsqueda de personal en zona boscosa.",
    status: MissionStatus.CANCELLED,
    startTime: new Date(Date.now() - 1000 * 60 * 60 * 75),
    endTime: null,
    droneIndex: 2,
  },
  {
    name: "Vigilancia de infraestructura",
    description: "Monitoreo continuo de la estación de transformación.",
    status: MissionStatus.FAILED,
    startTime: new Date(Date.now() - 1000 * 60 * 60 * 30),
    endTime: new Date(Date.now() - 1000 * 60 * 60 * 29),
    droneIndex: 1,
  },
];

async function main(): Promise<void> {
  console.log("🌱 Seeding database...");

  const drones = await Promise.all(
    DRONES.map((drone) =>
      prisma.drone.upsert({
        where: { name: drone.name },
        update: drone,
        create: drone,
      })
    )
  );

  for (const mission of MISSIONS) {
    const drone = drones[mission.droneIndex];
    await prisma.mission.upsert({
      where: { id: `${drone.id}-${mission.name}` },
      update: {
        droneId: drone.id,
        name: mission.name,
        description: mission.description,
        status: mission.status,
        startTime: mission.startTime,
        endTime: mission.endTime,
      },
      create: {
        id: `${drone.id}-${mission.name}`,
        droneId: drone.id,
        name: mission.name,
        description: mission.description,
        status: mission.status,
        startTime: mission.startTime,
        endTime: mission.endTime,
      },
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
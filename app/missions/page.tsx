import type { Metadata } from "next";
import { missionService } from "@/services";
import { createLogger } from "@/lib/logger";
import { MISSIONS_REVALIDATE_SECONDS } from "@/lib/constants";
import { MissionsView } from "@/components/missions/MissionsView";

const logger = createLogger("page.missions");

export const metadata: Metadata = {
  title: "Misiones",
  description:
    "Historial de misiones de la flota de drones. Generación estática incremental (ISR).",
};

export const revalidate = MISSIONS_REVALIDATE_SECONDS;

/**
 * Missions page.
 * Uses the ISR pattern: the page is prerendered at build time and then
 * revalidated in the background every 60 seconds. If the database is not
 * reachable during a build, the page falls back to an empty state and
 * self-heals on the next revalidation.
 */
export default async function MissionsPage() {
  let missions = [];
  let connectionError = false;
  const generatedAt = new Date().toISOString();

  try {
    const result = await missionService.getMissions({ pageSize: 100 });
    missions = result.items;
  } catch (error) {
    connectionError = true;
    logger.error("Missions ISR generation failed", {
      error: error instanceof Error ? error.message : String(error),
    });
  }

  return (
    <MissionsView
      initialMissions={missions}
      generatedAt={generatedAt}
      connectionError={connectionError}
    />
  );
}
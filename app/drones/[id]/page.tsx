import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { droneService, missionService } from "@/services";
import { NotFoundError } from "@/lib/errors";
import { createLogger } from "@/lib/logger";
import { DroneDetailView } from "@/components/drones/DroneDetailView";
import { ErrorState } from "@/components/ui/ErrorState";

const logger = createLogger("page.drone-detail");

interface DroneDetailPageProps {
  params: Promise<{ id: string }>;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: DroneDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  try {
    const drone = await droneService.getDroneById(id);
    return { title: drone.name };
  } catch {
    return { title: "Dron no encontrado" };
  }
}

/**
 * Drone detail page.
 * Uses the SSR pattern: data is fetched from the service layer on every
 * request, so status, battery and mission info are always fresh.
 */
export default async function DroneDetailPage({ params }: DroneDetailPageProps) {
  const { id } = await params;

  try {
    const [drone, missions] = await Promise.all([
      droneService.getDroneById(id),
      missionService.getMissionsByDroneId(id, 5),
    ]);

    return <DroneDetailView drone={drone} missions={missions} />;
  } catch (error) {
    if (error instanceof NotFoundError) {
      notFound();
    }

    logger.error("Failed to render drone detail", {
      id,
      error: error instanceof Error ? error.message : String(error),
    });

    return (
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <ErrorState
          title="No se pudo cargar el dron"
          message="No fue posible conectar con la base de datos. Inténtalo de nuevo más tarde."
        />
      </div>
    );
  }
}
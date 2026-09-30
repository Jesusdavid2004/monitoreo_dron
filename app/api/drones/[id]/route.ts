/**
 * GET /api/drones/[id]
 * Returns a single drone by id.
 *
 * PATCH /api/drones/[id]
 * Updates drone telemetry (used by the live simulation feature).
 */
import { NextRequest, NextResponse } from "next/server";
import { droneService } from "@/services";
import { fail, ok } from "@/lib/api";
import { ValidationError } from "@/lib/errors";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(_request: NextRequest, context: RouteContext): Promise<NextResponse> {
  try {
    const { id } = await context.params;
    const drone = await droneService.getDroneById(id);
    return ok(drone);
  } catch (error) {
    return fail(error);
  }
}

export async function PATCH(request: NextRequest, context: RouteContext): Promise<NextResponse> {
  try {
    const { id } = await context.params;
    const body = (await request.json()) as Record<string, unknown>;

    const latitude = Number(body.latitude);
    const longitude = Number(body.longitude);
    const altitude = Number(body.altitude);
    const speed = Number(body.speed);
    const battery = Number(body.battery);

    if (
      !Number.isFinite(latitude) ||
      !Number.isFinite(longitude) ||
      !Number.isFinite(altitude) ||
      !Number.isFinite(speed) ||
      !Number.isFinite(battery)
    ) {
      throw new ValidationError("Los campos de telemetría deben ser numéricos");
    }

    const drone = await droneService.updateDroneTelemetry(id, {
      latitude,
      longitude,
      altitude,
      speed,
      battery,
      lastSeenAt: new Date(),
    });

    return ok(drone);
  } catch (error) {
    return fail(error);
  }
}
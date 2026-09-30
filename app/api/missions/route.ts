/**
 * GET /api/missions
 * Returns a paginated list of missions with their drones.
 * Supports ?page, ?pageSize, ?status and ?droneId filters.
 */
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { missionService } from "@/services";
import { fail, ok } from "@/lib/api";
import { ValidationError } from "@/lib/errors";
import { MISSION_STATUSES } from "@/types";

const querySchema = z.object({
  page: z.coerce.number().int().min(1).optional(),
  pageSize: z.coerce.number().int().min(1).max(100).optional(),
  status: z.enum(MISSION_STATUSES).optional(),
  droneId: z.string().min(1).optional(),
});

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const params = Object.fromEntries(request.nextUrl.searchParams.entries());
    const parsed = querySchema.safeParse(params);

    if (!parsed.success) {
      throw new ValidationError("Parámetros de consulta no válidos");
    }

    const result = await missionService.getMissions(parsed.data);
    return ok(result);
  } catch (error) {
    return fail(error);
  }
}
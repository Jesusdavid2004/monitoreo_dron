/**
 * GET /api/drones
 * Returns the full fleet of drones as lightweight summaries.
 * Consumed by the CSR Dashboard.
 */
import { NextResponse } from "next/server";
import { droneService } from "@/services";
import { fail, ok } from "@/lib/api";

export async function GET(): Promise<NextResponse> {
  try {
    const drones = await droneService.getDroneSummaries();
    return ok(drones);
  } catch (error) {
    return fail(error);
  }
}
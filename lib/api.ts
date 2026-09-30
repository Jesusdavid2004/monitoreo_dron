/**
 * API response helpers.
 * Guarantees a consistent envelope for every endpoint.
 */
import { NextResponse } from "next/server";
import { AppError } from "@/lib/errors";
import { createLogger } from "@/lib/logger";

const logger = createLogger("api");

/** Success envelope: { data: T }. */
export function ok<T>(data: T, init?: ResponseInit): NextResponse {
  return NextResponse.json({ data }, init);
}

/**
 * Error envelope: { error: { code, message } }.
 * Maps known AppErrors to their status code; everything else → 500.
 */
export function fail(error: unknown): NextResponse {
  if (error instanceof AppError) {
    return NextResponse.json(
      { error: { code: error.code, message: error.message } },
      { status: error.statusCode }
    );
  }

  logger.error("Unhandled API error", {
    error: error instanceof Error ? error.message : String(error),
  });

  return NextResponse.json(
    { error: { code: "INTERNAL_ERROR", message: "Error interno del servidor" } },
    { status: 500 }
  );
}
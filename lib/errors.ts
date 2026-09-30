/**
 * Base application error with an HTTP-compatible status code.
 * Used by the service layer to signal expected failure modes.
 */
export class AppError extends Error {
  readonly statusCode: number;
  readonly code: string;

  constructor(message: string, code: string, statusCode: number) {
    super(message);
    this.name = "AppError";
    this.code = code;
    this.statusCode = statusCode;
  }
}

/**
 * Raised when the underlying data source (PostgreSQL) cannot be reached.
 * The message is intentionally public-safe (no credentials or internals).
 */
export class DataAccessError extends AppError {
  constructor(message = "La base de datos no está disponible", cause?: unknown) {
    super(message, "DATABASE_UNAVAILABLE", 503);
    this.name = "DataAccessError";
    this.cause = cause;
  }
}

/** Raised when a requested resource does not exist. */
export class NotFoundError extends AppError {
  constructor(resource = "Recurso") {
    super(`${resource} no encontrado`, "NOT_FOUND", 404);
    this.name = "NotFoundError";
  }
}

/** Raised when client input fails validation. */
export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, "VALIDATION_ERROR", 400);
    this.name = "ValidationError";
  }
}
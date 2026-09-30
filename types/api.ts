/**
 * Shared API contract types.
 * Every endpoint responds with a consistent envelope so clients can
 * handle both success and error shapes uniformly.
 */

export interface ApiSuccess<T> {
  data: T;
}

export interface ApiErrorBody {
  code: string;
  message: string;
  details?: unknown;
}

export interface ApiError {
  error: ApiErrorBody;
}

export type ApiEnvelope<T> = ApiSuccess<T> | ApiError;

/** Generic paginated payload. */
export interface Paginated<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
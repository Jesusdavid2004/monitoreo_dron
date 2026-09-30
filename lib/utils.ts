/** Joins class names, filtering out falsy values. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/** Formats a battery percentage with a sign, e.g. "87 %". */
export function formatBattery(battery: number): string {
  return `${Math.round(battery)} %`;
}

/** Formats an ISO/Date value into a localized, human readable string. */
export function formatDateTime(value: Date | string, locale = "es-ES"): string {
  const date = typeof value === "string" ? new Date(value) : value;
  return new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

/** Formats a duration in milliseconds to "Xh Ym" (Spanish). */
export function formatDuration(start: Date | string, end?: Date | string | null): string {
  const from = typeof start === "string" ? new Date(start) : start;
  const to = end ? (typeof end === "string" ? new Date(end) : end) : new Date();
  const minutes = Math.max(0, Math.floor((to.getTime() - from.getTime()) / 60000));
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;

  if (hours === 0) {
    return `${rest} min`;
  }
  return `${hours} h ${rest} min`;
}

/** Clamps a number between min and max (inclusive). */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

/** Maps a battery level to a 0-100 scale already being the value itself. */
export function batteryLevel(battery: number): number {
  return clamp(Math.round(battery), 0, 100);
}

/** Returns a short relative time label in Spanish, e.g. "hace 2 min". */
export function timeAgo(value: Date | string): string {
  const date = typeof value === "string" ? new Date(value) : value;
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);

  if (seconds < 60) {
    return "hace unos segundos";
  }
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return `hace ${minutes} min`;
  }
  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `hace ${hours} h`;
  }
  const days = Math.floor(hours / 24);
  return `hace ${days} d`;
}
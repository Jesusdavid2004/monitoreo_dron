import { Badge } from "./Badge";
import { DRONE_STATUS_LABELS, MISSION_STATUS_LABELS } from "@/lib/constants";
import type { DroneStatusValue, MissionStatusValue } from "@/types";

type StatusVariant = "success" | "warning" | "danger" | "info" | "neutral";

const DRONE_VARIANTS: Record<DroneStatusValue, StatusVariant> = {
  OPERATIONAL: "success",
  IN_MISSION: "info",
  CHARGING: "warning",
  MAINTENANCE: "warning",
  OFFLINE: "danger",
};

const MISSION_VARIANTS: Record<MissionStatusValue, StatusVariant> = {
  COMPLETED: "success",
  IN_PROGRESS: "info",
  SCHEDULED: "neutral",
  CANCELLED: "warning",
  FAILED: "danger",
};

interface DroneStatusBadgeProps {
  status: DroneStatusValue;
}

export function DroneStatusBadge({ status }: DroneStatusBadgeProps) {
  return (
    <Badge variant={DRONE_VARIANTS[status]}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
      {DRONE_STATUS_LABELS[status]}
    </Badge>
  );
}

interface MissionStatusBadgeProps {
  status: MissionStatusValue;
}

export function MissionStatusBadge({ status }: MissionStatusBadgeProps) {
  return <Badge variant={MISSION_VARIANTS[status]}>{MISSION_STATUS_LABELS[status]}</Badge>;
}
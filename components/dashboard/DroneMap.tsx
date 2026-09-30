"use client";

import type { DroneSummaryDTO } from "@/types";

const WIDTH = 800;
const HEIGHT = 560;
const CENTER = { latitude: 40.42, longitude: -3.71 };
const SCALE = 2600;

interface Point {
  x: number;
  y: number;
}

function project(drone: Pick<DroneSummaryDTO, "latitude" | "longitude">): Point {
  const x = WIDTH / 2 + (drone.longitude - CENTER.longitude) * SCALE;
  const y = HEIGHT / 2 - (drone.latitude - CENTER.latitude) * SCALE;
  return { x, y };
}

function statusColor(status: DroneSummaryDTO["status"]): string {
  switch (status) {
    case "OPERATIONAL":
      return "#10b981";
    case "IN_MISSION":
      return "#3b82f6";
    case "CHARGING":
      return "#f59e0b";
    case "MAINTENANCE":
      return "#f59e0b";
    case "OFFLINE":
      return "#f43f5e";
    default:
      return "#94a3b8";
  }
}

interface DroneMapProps {
  drones: DroneSummaryDTO[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function DroneMap({ drones, selectedId, onSelect }: DroneMapProps) {
  const gridLines = [];
  for (let i = 0; i <= 8; i += 1) {
    gridLines.push(
      <line key={`v${i}`} x1={i * 100} y1={0} x2={i * 100} y2={HEIGHT} className="stroke-slate-200 dark:stroke-slate-800" strokeWidth={1} />
    );
    gridLines.push(
      <line key={`h${i}`} x1={0} y1={i * 70} x2={WIDTH} y2={i * 70} className="stroke-slate-200 dark:stroke-slate-800" strokeWidth={1} />
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800">
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        role="img"
        aria-label="Mapa interactivo de la flota de drones"
        className="h-auto w-full bg-white dark:bg-slate-900"
      >
        <defs>
          <pattern id="grid" width={100} height={70} patternUnits="userSpaceOnUse">
            <path d="M 100 0 L 0 0 0 70" fill="none" className="stroke-slate-200 dark:stroke-slate-800" strokeWidth={1} />
          </pattern>
        </defs>
        <rect width={WIDTH} height={HEIGHT} fill="url(#grid)" />
        {gridLines}

        {/* Selected drone range ring */}
        {selectedId ? (() => {
          const selected = drones.find((d) => d.id === selectedId);
          if (!selected) {
            return null;
          }
          const { x, y } = project(selected);
          return (
            <circle
              cx={x}
              cy={y}
              r={34}
              fill="none"
              className="stroke-primary-500/40 dark:stroke-primary-400/40"
              strokeWidth={2}
              strokeDasharray="4 4"
            />
          );
        })() : null}

        {/* Drone markers */}
        {drones.map((drone) => {
          const { x, y } = project(drone);
          const color = statusColor(drone.status);
          const isSelected = drone.id === selectedId;

          return (
            <g
              key={drone.id}
              onClick={() => onSelect(drone.id)}
              className="cursor-pointer"
              role="button"
              aria-label={`Seleccionar ${drone.name}`}
            >
              {drone.status === "IN_MISSION" ? (
                <circle cx={x} cy={y} r={12} fill={color} opacity={0.3}>
                  <animate attributeName="r" values="8;16;8" dur="1.6s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.4;0.1;0.4" dur="1.6s" repeatCount="indefinite" />
                </circle>
              ) : null}
              <circle
                cx={x}
                cy={y}
                r={isSelected ? 9 : 7}
                fill={color}
                stroke="#ffffff"
                strokeWidth={2}
                className="drop-shadow"
              />
              <text
                x={x + 12}
                y={y - 6}
                fontSize={11}
                fontWeight={600}
                className="fill-slate-700 dark:fill-slate-200"
              >
                {drone.name}
              </text>
              <title>{`${drone.name} · ${drone.status}`}</title>
            </g>
          );
        })}

        {/* Scale bar */}
        <g transform={`translate(${WIDTH - 120}, ${HEIGHT - 24})`}>
          <rect width={100} height={6} rx={2} className="fill-slate-300 dark:fill-slate-700" />
          <text x={0} y={-4} fontSize={10} className="fill-slate-500 dark:fill-slate-400">
            ~1 km
          </text>
        </g>
      </svg>
    </div>
  );
}
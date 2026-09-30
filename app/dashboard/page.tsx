import type { Metadata } from "next";
import DashboardView from "@/components/dashboard/DashboardView";

export const metadata: Metadata = {
  title: "Panel de control",
  description:
    "Monitoreo de la flota de drones en tiempo real. Renderizado en cliente (CSR).",
};

/**
 * Dashboard page.
 * The heavy lifting happens client-side (React Query + live simulation),
 * which is exactly the CSR pattern: data is fetched and rendered in the
 * browser after the initial shell loads.
 */
export default function DashboardPage() {
  return <DashboardView />;
}
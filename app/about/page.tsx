import type { Metadata } from "next";
import { APP_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Acerca de",
  description:
    "Información corporativa de la plataforma de monitoreo de drones. Generación estática (SSG).",
};

const VALUES = [
  {
    title: "Seguridad",
    description:
      "Operaciones supervisadas con protocolos de seguridad aérea y trazabilidad completa de cada vuelo.",
  },
  {
    title: "Precisión",
    description:
      "Telemetría de alta fidelidad y análisis de datos para tomar decisiones informadas en campo.",
  },
  {
    title: "Escalabilidad",
    description:
      "Arquitectura por capas preparada para crecer de decenas a miles de drones sin fricción.",
  },
  {
    title: "Innovación",
    description:
      "Aplicamos las estrategias de renderizado más modernas de la web para una experiencia ágil.",
  },
];

const STATS = [
  { value: "24/7", label: "Monitoreo continuo" },
  { value: "100 %", label: "Trazabilidad de vuelos" },
  { value: "60 s", label: "Revalidación ISR" },
  { value: "3", label: "Sectores industriales" },
];

export default function AboutPage() {
  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="border-b border-slate-200 dark:border-slate-800">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-primary-600 dark:text-primary-400">
              Generación estática (SSG)
            </span>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Tecnología al servicio de la flota aérea
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-slate-600 dark:text-slate-300">
              {APP_NAME} nace para ayudar a empresas de energía, seguridad y agricultura a
              supervisar sus drones con una consola unificada, segura y de alto rendimiento.
            </p>
          </div>

          <div className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-slate-200 bg-white p-4 text-center dark:border-slate-800 dark:bg-slate-900"
              >
                <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">{stat.value}</p>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Nuestra misión
            </h2>
            <p className="mt-4 leading-relaxed text-slate-600 dark:text-slate-400">
              Proveer a las organizaciones de una visión única y en tiempo real de sus operaciones
              con drones, reduciendo riesgos, optimizando recursos y acelerando la toma de
              decisiones en el terreno.
            </p>
            <p className="mt-4 leading-relaxed text-slate-600 dark:text-slate-400">
              Desde el panel de control en tiempo real hasta el historial completo de misiones,
              cada funcionalidad está diseñada con estándares empresariales de calidad, seguridad
              y rendimiento.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {VALUES.map((value) => (
              <div
                key={value.title}
                className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
              >
                <h3 className="font-semibold text-slate-900 dark:text-white">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/50">
        <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            ¿Listo para supervisar tu flota?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-600 dark:text-slate-400">
            Ponte en contacto con nuestro equipo para conocer cómo {APP_NAME} puede adaptarse a
            las necesidades de tu operación.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="mailto:contacto@dronepilot.example"
              className="inline-flex w-full items-center justify-center rounded-lg bg-primary-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-700 sm:w-auto"
            >
              Contactar por correo
            </a>
            <a
              href="/dashboard"
              className="inline-flex w-full items-center justify-center rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 sm:w-auto"
            >
              Probar el panel
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
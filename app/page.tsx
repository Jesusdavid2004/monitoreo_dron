import Link from "next/link";
import { APP_NAME } from "@/lib/constants";

const RENDERING_PATTERNS = [
  {
    title: "Panel en tiempo real",
    pattern: "CSR · Renderizado en cliente",
    description:
      "El panel de control consume la API desde el navegador y actualiza las posiciones de la flota en vivo con React Query.",
    href: "/dashboard",
    cta: "Abrir panel",
  },
  {
    title: "Detalle del dron",
    pattern: "SSR · Renderizado en servidor",
    description:
      "Cada consulta de un dron se resuelve en el servidor con datos frescos: estado, batería y misión actual.",
    href: "/dashboard",
    cta: "Ver un dron",
  },
  {
    title: "Historial de misiones",
    pattern: "ISR · Regeneración incremental",
    description:
      "El listado de misiones se genera estáticamente y se revalida cada 60 segundos en segundo plano.",
    href: "/missions",
    cta: "Ver misiones",
  },
  {
    title: "Información corporativa",
    pattern: "SSG · Generación estática",
    description:
      "La página institucional se compila una sola vez en el build y se sirve desde el CDN sin coste de cómputo.",
    href: "/about",
    cta: "Acerca de",
  },
];

const FEATURES = [
  {
    title: "Seguimiento en tiempo real",
    description: "Telemetría continua de posición, altitud, velocidad y batería de toda la flota.",
  },
  {
    title: "Gestión de misiones",
    description: "Programa, supervisa y analiza misiones de inspección, vigilancia y cartografía.",
  },
  {
    title: "Histórico consultable",
    description: "Accede al historial de vuelos y misiones con filtros por estado y por dron.",
  },
  {
    title: "Escala empresarial",
    description: "Arquitectura por capas, lista para desplegar en Railway o Render con PostgreSQL.",
  },
];

export default function HomePage() {
  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-200 dark:border-slate-800">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary-50 to-transparent dark:from-primary-950/30" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-4 py-1.5 text-xs font-semibold text-primary-700 dark:border-primary-800 dark:bg-primary-900/40 dark:text-primary-300">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
              Plataforma empresarial de monitoreo
            </span>
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">
              Supervisa tu flota de{" "}
              <span className="bg-gradient-to-r from-primary-600 to-sky-500 bg-clip-text text-transparent">
                drones
              </span>{" "}
              en tiempo real
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-slate-600 dark:text-slate-300">
              {APP_NAME} centraliza la telemetría, las misiones y el historial de tu flota aérea
              en una única consola moderna, segura y escalable.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/dashboard"
                className="inline-flex w-full items-center justify-center rounded-lg bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-700 sm:w-auto"
              >
                Abrir panel de control
              </Link>
              <Link
                href="/missions"
                className="inline-flex w-full items-center justify-center rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 sm:w-auto"
              >
                Ver misiones
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
            >
              <h3 className="font-semibold text-slate-900 dark:text-white">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Rendering patterns */}
      <section className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Cuatro patrones de renderizado, una sola plataforma
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-400">
              Cada sección demuestra una estrategia de renderizado de Next.js aplicada donde más conviene.
            </p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {RENDERING_PATTERNS.map((item) => (
              <div
                key={item.title}
                className="flex flex-col justify-between rounded-xl border border-slate-200 bg-surface-50 p-6 dark:border-slate-800 dark:bg-slate-950"
              >
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400">
                    {item.pattern}
                  </span>
                  <h3 className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    {item.description}
                  </p>
                </div>
                <Link
                  href={item.href}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary-600 transition hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
                >
                  {item.cta}
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
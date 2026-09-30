"use client";

import { useEffect } from "react";

interface RootErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function RootError({ error, reset }: RootErrorProps) {
  useEffect(() => {
    console.error("Root error boundary caught:", error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <p className="text-6xl font-extrabold text-rose-500">500</p>
      <h1 className="mt-4 text-2xl font-bold text-slate-900 dark:text-white">
        Algo salió mal
      </h1>
      <p className="mt-2 text-slate-600 dark:text-slate-400">
        Se produjo un error inesperado en la aplicación.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-6 inline-flex items-center justify-center rounded-lg bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-700"
      >
        Reintentar
      </button>
    </div>
  );
}
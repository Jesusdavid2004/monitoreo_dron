import Link from "next/link";
import { APP_NAME } from "@/lib/constants";

const FOOTER_LINKS = [
  { href: "/dashboard", label: "Panel de control" },
  { href: "/missions", label: "Misiones" },
  { href: "/about", label: "Acerca de" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 sm:px-6 md:flex-row lg:px-8">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          © {year} {APP_NAME}. Todos los derechos reservados.
        </p>
        <nav className="flex items-center gap-4" aria-label="Navegación del pie de página">
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-slate-500 transition hover:text-primary-600 dark:text-slate-400 dark:hover:text-primary-400"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
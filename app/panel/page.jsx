import Link from "next/link";
import { logoutAction } from "./productos/actions";

export const metadata = {
  title: "Panel",
  robots: { index: false, follow: false },
};

const sections = [
  {
    href: "/panel/productos",
    title: "Productos",
    description: "Ver, dar de alta y activar/desactivar productos de la tienda.",
    available: true,
  },
  {
    href: "#",
    title: "Pedidos",
    description: "Listado de pedidos y detalle de cada compra.",
    available: false,
  },
  {
    href: "#",
    title: "Noticias",
    description: "Avisos que salen en \"Últimos anuncios\" de la home.",
    available: false,
  },
  {
    href: "#",
    title: "Slider",
    description: "Fotos del banner principal de la portada.",
    available: false,
  },
];

export default function PanelHomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-4xl flex-col gap-6 px-4 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Panel Orgullo Cazurro</h1>
        <form action={logoutAction}>
          <button type="submit" className="text-sm text-[color:var(--color-muted)] underline">
            Cerrar sesión
          </button>
        </form>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {sections.map((section) =>
          section.available ? (
            <Link
              key={section.title}
              href={section.href}
              className="flex flex-col gap-2 rounded-[var(--radius-md)] border border-[color:var(--color-border)] bg-[color:var(--color-bg-elevated)] p-5 transition hover:border-[color:var(--color-accent)]"
            >
              <span className="font-semibold text-white">{section.title}</span>
              <span className="text-sm text-[color:var(--color-muted)]">{section.description}</span>
            </Link>
          ) : (
            <div
              key={section.title}
              className="flex flex-col gap-2 rounded-[var(--radius-md)] border border-[color:var(--color-border)] bg-[color:var(--color-bg-elevated)] p-5 opacity-50"
            >
              <span className="font-semibold text-white">{section.title}</span>
              <span className="text-sm text-[color:var(--color-muted)]">{section.description}</span>
              <span className="text-xs uppercase tracking-wide text-[color:var(--color-muted)]">
                Próximamente
              </span>
            </div>
          ),
        )}
      </div>
    </main>
  );
}

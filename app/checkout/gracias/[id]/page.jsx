import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { LinkButton } from "@/components/ui/Button";
import { backendUrl } from "@/lib/backend";

export const metadata = {
  title: "Pedido confirmado — Orgullo Cazurro",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

async function getOrder(id) {
  const res = await fetch(backendUrl(`/api/checkout/${id}`), { cache: "no-store" });

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    throw new Error("No se pudo cargar el pedido");
  }

  return res.json();
}

export default async function CheckoutGraciasPage({ params }) {
  const { id } = await params;
  const order = await getOrder(id);

  if (!order) {
    notFound();
  }

  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex min-h-screen max-w-2xl flex-col gap-6 px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-white">Pedido confirmado</h1>
        <p className="text-[color:var(--color-muted)]">
          Gracias, {order.customerName}. Te contactaremos a {order.customerEmail} con los
          próximos pasos.
        </p>

        <ul className="flex flex-col gap-2 rounded-[var(--radius-md)] border border-[color:var(--color-border)] bg-[color:var(--color-bg-elevated)] p-4 text-left">
          {order.items.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between text-sm text-[color:var(--color-muted)]"
            >
              <span>
                {item.quantity} × {item.productName}
                {item.size ? ` (${item.size})` : ""}
              </span>
              <span className="text-white">
                {(Number(item.unitPrice) * item.quantity).toFixed(2)} €
              </span>
            </li>
          ))}

          <li className="flex items-center justify-between border-t border-[color:var(--color-border)] pt-2 font-semibold">
            <span className="text-white">Total</span>
            <span className="text-[color:var(--color-accent)]">{order.total} €</span>
          </li>
        </ul>

        <LinkButton href="/tienda" variant="primary" className="mx-auto w-fit">
          Seguir en la tienda
        </LinkButton>
      </main>
      <SiteFooter />
    </>
  );
}

import Link from "next/link";
import { adminHeaders, backendUrl } from "@/lib/backend";
import { logoutAction } from "../productos/actions";
import { OrderStatusBadge } from "./OrderStatusBadge";

export const metadata = {
  title: "Panel — pedidos",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

async function getOrders() {
  const res = await fetch(backendUrl("/api/orders"), {
    headers: adminHeaders(),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("No se pudo cargar el listado de pedidos");
  }

  return res.json();
}

export default async function PanelPedidosPage() {
  const orders = await getOrders();

  return (
    <main className="mx-auto flex min-h-screen max-w-4xl flex-col gap-6 px-4 py-10">
      <Link href="/panel" className="text-sm text-[color:var(--color-muted)] underline">
        ← Panel
      </Link>

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Pedidos</h1>
        <form action={logoutAction}>
          <button type="submit" className="text-sm text-[color:var(--color-muted)] underline">
            Cerrar sesión
          </button>
        </form>
      </div>

      {orders.length === 0 ? (
        <p className="text-[color:var(--color-muted)]">Todavía no hay pedidos.</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {orders.map((order) => (
            <li key={order.id}>
              <Link
                href={`/panel/pedidos/${order.id}`}
                className="flex items-center justify-between gap-4 rounded-[var(--radius-md)] border border-[color:var(--color-border)] bg-[color:var(--color-bg-elevated)] p-4 transition hover:border-[color:var(--color-accent)]"
              >
                <div>
                  <p className="font-semibold text-white">{order.customerName}</p>
                  <p className="text-sm text-[color:var(--color-muted)]">
                    {order.items.length} producto{order.items.length === 1 ? "" : "s"} ·{" "}
                    {new Date(order.createdAt).toLocaleDateString("es-ES")}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-white">{order.total} €</span>
                  <OrderStatusBadge status={order.status} />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

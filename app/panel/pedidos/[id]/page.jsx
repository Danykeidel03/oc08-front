import Link from "next/link";
import { notFound } from "next/navigation";
import { adminHeaders, backendUrl } from "@/lib/backend";
import { PAYMENT_METHODS } from "@/lib/checkoutOptions";
import { OrderStatusBadge } from "../OrderStatusBadge";

export const metadata = {
  title: "Panel — detalle de pedido",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

async function getOrder(id) {
  const res = await fetch(backendUrl(`/api/orders/${id}`), {
    headers: adminHeaders(),
    cache: "no-store",
  });

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    throw new Error("No se pudo cargar el pedido");
  }

  return res.json();
}

function paymentLabel(value) {
  return PAYMENT_METHODS.find((method) => method.value === value)?.label ?? value;
}

export default async function PanelPedidoDetallePage({ params }) {
  const { id } = await params;
  const order = await getOrder(id);

  if (!order) {
    notFound();
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col gap-6 px-4 py-10">
      <Link href="/panel/pedidos" className="text-sm text-[color:var(--color-muted)] underline">
        ← Pedidos
      </Link>

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Pedido {order.id}</h1>
        <OrderStatusBadge status={order.status} />
      </div>

      <section className="grid gap-4 rounded-[var(--radius-md)] border border-[color:var(--color-border)] bg-[color:var(--color-bg-elevated)] p-5 sm:grid-cols-2">
        <div>
          <p className="text-xs uppercase tracking-wide text-[color:var(--color-muted)]">Cliente</p>
          <p className="text-white">{order.customerName}</p>
          <p className="text-sm text-[color:var(--color-muted)]">{order.customerEmail}</p>
          {order.customerPhone && (
            <p className="text-sm text-[color:var(--color-muted)]">{order.customerPhone}</p>
          )}
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-[color:var(--color-muted)]">Envío</p>
          <p className="text-white">{order.shippingAddress}</p>
          <p className="text-sm text-[color:var(--color-muted)]">
            {order.shippingCity}, {order.shippingPostalCode}
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-[color:var(--color-muted)]">Pago</p>
          <p className="text-white">{paymentLabel(order.paymentMethod)}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-[color:var(--color-muted)]">Fecha</p>
          <p className="text-white">{new Date(order.createdAt).toLocaleString("es-ES")}</p>
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold text-white">Productos</h2>
        <ul className="flex flex-col gap-3">
          {order.items.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between gap-4 rounded-[var(--radius-md)] border border-[color:var(--color-border)] bg-[color:var(--color-bg-elevated)] p-4"
            >
              <div>
                <p className="font-semibold text-white">{item.productName}</p>
                <p className="text-sm text-[color:var(--color-muted)]">
                  {item.size ? `Talle ${item.size} · ` : ""}
                  {item.quantity} × {item.unitPrice} €
                </p>
              </div>
              <span className="font-semibold text-white">
                {(Number(item.unitPrice) * item.quantity).toFixed(2)} €
              </span>
            </li>
          ))}
        </ul>
      </section>

      <div className="flex items-center justify-end border-t border-[color:var(--color-border)] pt-4">
        <span className="text-lg font-bold text-white">Total: {order.total} €</span>
      </div>
    </main>
  );
}

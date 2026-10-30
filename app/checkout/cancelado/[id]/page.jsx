import { notFound, redirect } from "next/navigation";
import { cookies } from "next/headers";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Button, LinkButton } from "@/components/ui/Button";
import { adminHeaders, backendUrl } from "@/lib/backend";
import { LAST_ORDER_COOKIE } from "@/lib/lastOrder";
import { retryPayment } from "./actions";

export const metadata = {
  title: "Pago no completado — Orgullo Cazurro",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

async function getOrder(id) {
  const res = await fetch(backendUrl(`/api/checkout/${id}`), {
    headers: adminHeaders(),
    cache: "no-store",
  });

  if (res.status === 404) return null;

  if (!res.ok) {
    throw new Error("No se pudo cargar el pedido");
  }

  return res.json();
}

export default async function CheckoutCanceladoPage({ params, searchParams }) {
  const { id } = await params;
  const { error } = await searchParams;
  const cookieStore = await cookies();

  // Sin la cookie del pedido recién hecho, el id solo no da acceso.
  if (cookieStore.get(LAST_ORDER_COOKIE)?.value !== id) {
    notFound();
  }

  const order = await getOrder(id);

  if (!order) {
    notFound();
  }

  if (order.status === "paid") {
    redirect(`/checkout/gracias/${id}`);
  }

  const expired = order.status === "cancelled";

  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex min-h-screen max-w-2xl flex-col gap-6 px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-white">Pago no completado</h1>

        <p className="text-[color:var(--color-muted)]">
          {expired
            ? "El tiempo para pagar este pedido ha terminado y se ha cancelado. Puedes volver a la tienda y hacer un pedido nuevo."
            : "No se ha realizado ningún cargo. Tu pedido sigue guardado y puedes intentar el pago de nuevo."}
        </p>

        {error && !expired && (
          <p className="text-sm text-white" role="alert">
            No hemos podido abrir la página de pago. Inténtalo de nuevo en unos segundos.
          </p>
        )}

        <div className="mx-auto flex flex-col gap-3 sm:flex-row">
          {!expired && (
            <form action={retryPayment.bind(null, id)}>
              <Button type="submit" variant="primary" className="w-full">
                Reintentar el pago
              </Button>
            </form>
          )}
          <LinkButton href="/tienda" variant="ghost-white" className="w-fit">
            Volver a la tienda
          </LinkButton>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

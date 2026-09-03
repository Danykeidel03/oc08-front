import Link from "next/link";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { LinkButton } from "@/components/ui/Button";
import { getCart, cartTotal } from "@/lib/cart";
import { CartLineControls } from "./CartLineControls";

export const metadata = {
  title: "Carrito — Orgullo Cazurro",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function CarritoPage() {
  const cart = await getCart();
  const items = cart?.items ?? [];
  const total = cartTotal(cart);

  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex min-h-screen max-w-4xl flex-col gap-6 px-4 py-10">
        <h1 className="text-2xl font-bold text-white">Carrito</h1>

        {items.length === 0 ? (
          <div className="flex flex-col gap-4">
            <p className="text-[color:var(--color-muted)]">Todavía no añadiste nada.</p>
            <LinkButton href="/tienda" variant="primary" className="w-fit">
              Ir a la tienda
            </LinkButton>
          </div>
        ) : (
          <>
            <ul className="flex flex-col gap-3">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex flex-wrap items-center justify-between gap-4 rounded-[var(--radius-md)] border border-[color:var(--color-border)] bg-[color:var(--color-bg-elevated)] p-4"
                >
                  <div className="flex items-center gap-4">
                    {item.product.images[0] && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.product.images[0].url}
                        alt={item.product.name}
                        className="h-14 w-14 rounded-[var(--radius-sm)] object-cover"
                      />
                    )}
                    <div>
                      <p className="font-semibold text-white">{item.product.name}</p>
                      <p className="text-sm text-[color:var(--color-muted)]">
                        {item.size ? `Talla ${item.size} · ` : ""}
                        {item.product.price} €
                      </p>
                    </div>
                  </div>

                  <CartLineControls itemId={item.id} quantity={item.quantity} />
                </li>
              ))}
            </ul>

            <div className="flex items-center justify-between border-t border-[color:var(--color-border)] pt-6">
              <span className="text-lg font-semibold text-white">Total</span>
              <span className="text-lg font-semibold text-[color:var(--color-accent)]">
                {total.toFixed(2)} €
              </span>
            </div>

            <div className="flex items-center justify-between gap-4">
              <Link
                href="/tienda"
                className="text-sm text-[color:var(--color-muted)] underline"
              >
                Seguir comprando
              </Link>
              <LinkButton href="/checkout" variant="primary">
                Ir a checkout
              </LinkButton>
            </div>
          </>
        )}
      </main>
      <SiteFooter />
    </>
  );
}

import { redirect } from "next/navigation";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { getCart, cartTotal } from "@/lib/cart";
import { CheckoutForm } from "./CheckoutForm";

export const metadata = {
  title: "Checkout — Orgullo Cazurro",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function CheckoutPage() {
  const cart = await getCart();

  if (!cart || cart.items.length === 0) {
    redirect("/carrito");
  }

  const total = cartTotal(cart);

  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex min-h-screen max-w-4xl flex-col gap-8 px-4 py-10 lg:flex-row">
        <div className="flex-1">
          <h1 className="mb-6 text-2xl font-bold text-white">Checkout</h1>
          <CheckoutForm />
        </div>

        <aside className="sticky top-24 flex w-full flex-col gap-4 self-start rounded-[var(--radius-md)] border border-[color:var(--color-border)] bg-[color:var(--color-bg-elevated)] p-4 lg:w-72">
          <h2 className="text-sm font-semibold tracking-[0.08em] text-white uppercase">
            Tu pedido
          </h2>

          <ul className="flex flex-col gap-2">
            {cart.items.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between text-sm text-[color:var(--color-muted)]"
              >
                <span>
                  {item.quantity} × {item.product.name}
                  {item.size ? ` (${item.size})` : ""}
                </span>
                <span className="text-white">
                  {(Number(item.product.price) * item.quantity).toFixed(2)} €
                </span>
              </li>
            ))}
          </ul>

          <div className="flex items-center justify-between border-t border-[color:var(--color-border)] pt-4">
            <span className="font-semibold text-white">Total</span>
            <span className="font-semibold text-[color:var(--color-accent)]">
              {total.toFixed(2)} €
            </span>
          </div>
        </aside>
      </main>
      <SiteFooter />
    </>
  );
}

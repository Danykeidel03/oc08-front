import { redirect } from "next/navigation";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { getCart, cartTotal } from "@/lib/cart";
import { getShippingOptions } from "@/lib/shipping";
import { CheckoutView } from "./CheckoutView";

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

  const shippingOptions = await getShippingOptions();

  const items = cart.items.map((item) => ({
    id: item.id,
    label: `${item.quantity} × ${item.product.name}${item.size ? ` (${item.size})` : ""}`,
    lineTotal: Number(item.product.price) * item.quantity,
  }));

  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex min-h-screen max-w-4xl flex-col gap-8 px-4 py-10 lg:flex-row">
        <CheckoutView items={items} subtotal={cartTotal(cart)} shippingOptions={shippingOptions} />
      </main>
      <SiteFooter />
    </>
  );
}

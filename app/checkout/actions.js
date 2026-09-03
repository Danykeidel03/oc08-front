"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { backendUrl } from "@/lib/backend";
import { CART_COOKIE } from "@/lib/cart";

export async function submitCheckout(_prevState, formData) {
  const cookieStore = await cookies();
  const cartId = cookieStore.get(CART_COOKIE)?.value;

  if (!cartId) {
    return { error: "Tu carrito está vacío" };
  }

  const payload = {
    cartId,
    customerName: formData.get("customerName"),
    customerEmail: formData.get("customerEmail"),
    customerPhone: formData.get("customerPhone"),
    shippingAddress: formData.get("shippingAddress"),
    shippingCity: formData.get("shippingCity"),
    shippingPostalCode: formData.get("shippingPostalCode"),
    paymentMethod: formData.get("paymentMethod"),
  };

  const res = await fetch(backendUrl("/api/checkout"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    return { error: body?.error ?? "No se pudo completar el pedido" };
  }

  const order = await res.json();
  cookieStore.delete(CART_COOKIE);
  redirect(`/checkout/gracias/${order.id}`);
}

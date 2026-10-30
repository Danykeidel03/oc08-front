"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { adminHeaders, backendUrl } from "@/lib/backend";
import { CART_COOKIE } from "@/lib/cart";
import { LAST_ORDER_COOKIE } from "@/lib/lastOrder";
import { createPaymentUrl } from "@/lib/payment";

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
    headers: { ...adminHeaders(), "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    return { error: body?.error ?? "No se pudo completar el pedido" };
  }

  const order = await res.json();
  cookieStore.delete(CART_COOKIE);
  // Prueba de propiedad: solo quien hizo el pedido puede ver /checkout/gracias/[id] y /checkout/cancelado/[id].
  // Cookie antigua (path /checkout/gracias): si sigue viva, pisaría a la nueva.
  cookieStore.delete({ name: LAST_ORDER_COOKIE, path: "/checkout/gracias" });
  cookieStore.set(LAST_ORDER_COOKIE, order.id, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/checkout",
    maxAge: 60 * 60,
  });

  // Pago online: se redirige a la página de pago de Stripe. Si no se pudo crear la
  // sesión, el pedido queda pendiente y el cliente puede reintentar desde "cancelado".
  if (order.paymentMethod === "tarjeta") {
    const paymentUrl = await createPaymentUrl(order.id);
    redirect(paymentUrl ?? `/checkout/cancelado/${order.id}?error=1`);
  }

  redirect(`/checkout/gracias/${order.id}`);
}

"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { LAST_ORDER_COOKIE } from "@/lib/lastOrder";
import { createPaymentUrl } from "@/lib/payment";

export async function retryPayment(orderId) {
  const cookieStore = await cookies();

  // Solo quien hizo el pedido puede reintentar el pago.
  if (cookieStore.get(LAST_ORDER_COOKIE)?.value !== orderId) {
    redirect("/tienda");
  }

  const paymentUrl = await createPaymentUrl(orderId);
  redirect(paymentUrl ?? `/checkout/cancelado/${orderId}?error=1`);
}

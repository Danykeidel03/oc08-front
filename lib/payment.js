import "server-only";
import { adminHeaders, backendUrl } from "@/lib/backend";

// Pide al back una sesión de pago de Stripe para el pedido. Devuelve la URL o null.
export async function createPaymentUrl(orderId) {
  try {
    const res = await fetch(backendUrl(`/api/checkout/${orderId}/session`), {
      method: "POST",
      headers: adminHeaders(),
      cache: "no-store",
      signal: AbortSignal.timeout(25000),
    });

    if (!res.ok) return null;

    const { url } = await res.json();
    return url ?? null;
  } catch {
    return null;
  }
}

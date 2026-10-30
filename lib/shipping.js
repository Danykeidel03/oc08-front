import "server-only";
import { backendUrl } from "@/lib/backend";

// Solo para mostrar precios: el back es quien aplica el coste real al pedido.
const FALLBACK_OPTIONS = [
  { value: "recogida", label: "Recogida en local", price: 0 },
  { value: "envio", label: "Envío a domicilio", price: 3 },
];

export async function getShippingOptions() {
  try {
    const res = await fetch(backendUrl("/api/shipping-options"), { cache: "no-store" });

    if (!res.ok) return FALLBACK_OPTIONS;

    return res.json();
  } catch {
    return FALLBACK_OPTIONS;
  }
}

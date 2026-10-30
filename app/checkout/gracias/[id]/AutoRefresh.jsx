"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LinkButton } from "@/components/ui/Button";

// El webhook de Stripe puede tardar unos segundos: se vuelve a pedir el pedido
// hasta que pase a pagado. Si se agotan los intentos se avisa y solo entonces
// se ofrece reintentar (antes, un segundo pago podría duplicar el cobro).
export function AutoRefresh({ orderId, intervalMs = 3000, maxTries = 10 }) {
  const router = useRouter();
  const [gaveUp, setGaveUp] = useState(false);

  useEffect(() => {
    let tries = 0;
    const timer = setInterval(() => {
      tries += 1;
      router.refresh();

      if (tries >= maxTries) {
        clearInterval(timer);
        setGaveUp(true);
      }
    }, intervalMs);

    return () => clearInterval(timer);
  }, [router, intervalMs, maxTries]);

  if (!gaveUp) return null;

  return (
    <div className="flex flex-col items-center gap-3">
      <p className="text-sm text-white" role="status">
        Todavía no hemos recibido la confirmación. Si ya has pagado, te escribiremos por email
        cuando se confirme; no hace falta que pagues otra vez.
      </p>
      <LinkButton
        href={`/checkout/cancelado/${orderId}`}
        variant="ghost-white"
        className="w-fit"
      >
        No he llegado a pagar: reintentar
      </LinkButton>
    </div>
  );
}

"use client";

import { useTransition } from "react";
import { updateCartItem, removeCartItem } from "./actions";
import { QuantityStepper } from "@/components/ui/QuantityStepper";

export function CartLineControls({ itemId, quantity }) {
  const [pending, startTransition] = useTransition();

  function handleChange(nextQuantity) {
    if (nextQuantity < 1 || nextQuantity > 20) {
      return;
    }
    startTransition(() => updateCartItem(itemId, nextQuantity));
  }

  return (
    <div className="flex items-center gap-4">
      <QuantityStepper value={quantity} onChange={handleChange} disabled={pending} />

      <button
        type="button"
        disabled={pending}
        onClick={() => startTransition(() => removeCartItem(itemId))}
        className="text-sm text-[color:var(--color-muted)] underline disabled:opacity-40"
      >
        Quitar
      </button>
    </div>
  );
}

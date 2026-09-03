"use client";

import { useActionState, useState } from "react";
import { addToCart } from "@/app/carrito/actions";
import { Button } from "@/components/ui/Button";
import { QuantityStepper } from "@/components/ui/QuantityStepper";

const initialState = { error: null, success: false };

const fieldClass =
  "rounded-[var(--radius-sm)] border border-[color:var(--color-border)] bg-[color:var(--color-bg-elevated)] px-4 py-3 text-white outline-none focus:border-[color:var(--color-accent)]";

export function AddToCartForm({ product }) {
  const [state, formAction, pending] = useActionState(addToCart, initialState);
  const [quantity, setQuantity] = useState(1);
  const hasSizes = Array.isArray(product.sizes) && product.sizes.length > 0;

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <input type="hidden" name="productId" value={product.id} />
      <input type="hidden" name="quantity" value={quantity} />

      {hasSizes && (
        <label className="flex flex-col gap-2">
          <span className="text-sm text-[color:var(--color-muted)]">Talla</span>
          <select name="size" required className={fieldClass}>
            {product.sizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </label>
      )}

      <div className="flex flex-col gap-2">
        <span className="text-sm text-[color:var(--color-muted)]">Cantidad</span>
        <QuantityStepper value={quantity} onChange={setQuantity} disabled={pending} />
      </div>

      {state.error && (
        <p className="text-sm text-white" role="alert">
          {state.error}
        </p>
      )}

      {state.success && <p className="text-sm text-white">Añadido al carrito.</p>}

      <Button type="submit" variant="primary" disabled={pending} className="w-full">
        {pending ? "Añadiendo..." : "Añadir al carrito"}
      </Button>
    </form>
  );
}

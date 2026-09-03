"use client";

import { useActionState } from "react";
import { submitCheckout } from "./actions";
import { Button } from "@/components/ui/Button";
import { PAYMENT_METHODS } from "@/lib/checkoutOptions";

const initialState = { error: null };

const fieldClass =
  "rounded-[var(--radius-sm)] border border-[color:var(--color-border)] bg-[color:var(--color-bg-elevated)] px-4 py-3 text-white outline-none focus:border-[color:var(--color-accent)]";

export function CheckoutForm() {
  const [state, formAction, pending] = useActionState(submitCheckout, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <Field label="Nombre y apellidos">
        <input name="customerName" type="text" required className={fieldClass} />
      </Field>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Email">
          <input name="customerEmail" type="email" required className={fieldClass} />
        </Field>

        <Field label="Teléfono (opcional)">
          <input name="customerPhone" type="tel" className={fieldClass} />
        </Field>
      </div>

      <Field label="Dirección de envío">
        <input name="shippingAddress" type="text" required className={fieldClass} />
      </Field>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Ciudad">
          <input name="shippingCity" type="text" required className={fieldClass} />
        </Field>

        <Field label="Código postal">
          <input name="shippingPostalCode" type="text" required className={fieldClass} />
        </Field>
      </div>

      <fieldset className="flex flex-col gap-2">
        <legend className="mb-1 text-sm text-[color:var(--color-muted)]">Forma de pago</legend>
        {PAYMENT_METHODS.map((method, index) => (
          <label key={method.value} className="flex items-center gap-3 text-white">
            <input
              type="radio"
              name="paymentMethod"
              value={method.value}
              defaultChecked={index === 0}
              required
              className="accent-[color:var(--color-accent)]"
            />
            {method.label}
          </label>
        ))}
      </fieldset>

      {state.error && (
        <p className="text-sm text-white" role="alert">
          {state.error}
        </p>
      )}

      <Button type="submit" variant="primary" disabled={pending} className="w-full">
        {pending ? "Confirmando..." : "Confirmar pedido"}
      </Button>
    </form>
  );
}

function Field({ label, children }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm text-[color:var(--color-muted)]">{label}</span>
      {children}
    </label>
  );
}

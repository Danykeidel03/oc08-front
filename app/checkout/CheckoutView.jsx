"use client";

import { useActionState, useState } from "react";
import { submitCheckout } from "./actions";
import { Button } from "@/components/ui/Button";
import { PAYMENT_METHODS } from "@/lib/checkoutOptions";

const initialState = { error: null };

const fieldClass =
  "rounded-[var(--radius-sm)] border border-[color:var(--color-border)] bg-[color:var(--color-bg-elevated)] px-4 py-3 text-white outline-none focus:border-[color:var(--color-accent)]";

function formatPrice(price) {
  return price === 0 ? "Gratis" : `${price.toFixed(2)} €`;
}

// Formulario y resumen viven juntos porque el total depende del tipo de envío elegido.
export function CheckoutView({ items, subtotal, shippingOptions }) {
  const [state, formAction, pending] = useActionState(submitCheckout, initialState);
  const [shippingType, setShippingType] = useState("envio");

  const selected = shippingOptions.find((option) => option.value === shippingType);
  const shippingCost = selected?.price ?? 0;
  const total = subtotal + shippingCost;

  return (
    <>
      <div className="flex-1">
        <h1 className="mb-6 text-2xl font-bold text-white">Checkout</h1>

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

          <fieldset className="flex flex-col gap-2">
            <legend className="mb-1 text-sm text-[color:var(--color-muted)]">Entrega</legend>
            {shippingOptions.map((option) => (
              <label key={option.value} className="flex items-center gap-3 text-white">
                <input
                  type="radio"
                  name="shippingType"
                  value={option.value}
                  checked={shippingType === option.value}
                  onChange={() => setShippingType(option.value)}
                  className="accent-[color:var(--color-accent)]"
                />
                <span className="flex-1">{option.label}</span>
                <span className="text-sm text-[color:var(--color-muted)]">
                  {formatPrice(option.price)}
                </span>
              </label>
            ))}
          </fieldset>

          {shippingType === "envio" && (
            <>
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
            </>
          )}

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
      </div>

      <aside className="sticky top-24 flex w-full flex-col gap-4 self-start rounded-[var(--radius-md)] border border-[color:var(--color-border)] bg-[color:var(--color-bg-elevated)] p-4 lg:w-72">
        <h2 className="text-sm font-semibold tracking-[0.08em] text-white uppercase">Tu pedido</h2>

        <ul className="flex flex-col gap-2">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between text-sm text-[color:var(--color-muted)]"
            >
              <span>{item.label}</span>
              <span className="text-white">{item.lineTotal.toFixed(2)} €</span>
            </li>
          ))}
          <li className="flex items-center justify-between text-sm text-[color:var(--color-muted)]">
            <span>{selected?.label ?? "Envío"}</span>
            <span className="text-white">{formatPrice(shippingCost)}</span>
          </li>
        </ul>

        <div className="flex items-center justify-between border-t border-[color:var(--color-border)] pt-4">
          <span className="font-semibold text-white">Total</span>
          <span className="font-semibold text-[color:var(--color-accent)]">
            {total.toFixed(2)} €
          </span>
        </div>
        <p className="text-xs text-[color:var(--color-muted)]">IVA incluido</p>
      </aside>
    </>
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

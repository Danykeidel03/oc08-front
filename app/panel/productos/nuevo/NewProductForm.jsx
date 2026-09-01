"use client";

import { useActionState } from "react";
import { createProduct } from "../actions";
import { PRODUCT_CATEGORIES, PRODUCT_BADGES } from "@/lib/productOptions";

const initialState = { error: null };

export function NewProductForm() {
  const [state, formAction, pending] = useActionState(createProduct, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <Field label="Nombre">
        <input name="name" type="text" required className={inputClass} />
      </Field>

      <Field label="Descripción">
        <textarea name="description" required rows={4} className={inputClass} />
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Precio (€)">
          <input name="price" type="number" step="0.01" min="0" required className={inputClass} />
        </Field>

        <Field label="Categoría">
          <select name="category" required className={inputClass}>
            {PRODUCT_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Badge (opcional)">
          <select name="badge" className={inputClass} defaultValue="">
            <option value="">Sin badge</option>
            {PRODUCT_BADGES.map((badge) => (
              <option key={badge} value={badge}>
                {badge}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Tallas (separadas por coma)">
          <input name="sizes" type="text" placeholder="S,M,L,XL" className={inputClass} />
        </Field>
      </div>

      <Field label="Fotos (hasta 6, jpg/png/webp)">
        <input
          name="images"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          required
          className={inputClass}
        />
      </Field>

      {state.error && (
        <p className="text-sm text-white" role="alert">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="rounded-[var(--radius-sm)] bg-[color:var(--color-accent)] px-4 py-3 font-semibold text-white transition disabled:opacity-60"
      >
        {pending ? "Guardando..." : "Crear producto"}
      </button>
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

const inputClass =
  "rounded-[var(--radius-sm)] border border-[color:var(--color-border)] bg-[color:var(--color-bg-elevated)] px-4 py-3 text-white outline-none focus:border-[color:var(--color-accent)]";

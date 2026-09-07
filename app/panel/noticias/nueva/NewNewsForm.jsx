"use client";

import { useActionState } from "react";
import { createNews } from "../actions";

const initialState = { error: null };

export function NewNewsForm() {
  const [state, formAction, pending] = useActionState(createNews, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <Field label="Título">
        <input name="title" type="text" required className={inputClass} />
      </Field>

      <Field label="Contenido">
        <textarea name="content" required rows={6} className={inputClass} />
      </Field>

      <Field label="Imagen (opcional, jpg/png/webp)">
        <input
          name="image"
          type="file"
          accept="image/jpeg,image/png,image/webp"
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
        {pending ? "Guardando..." : "Crear noticia"}
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

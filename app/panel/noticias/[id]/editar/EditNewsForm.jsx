"use client";

import { useActionState } from "react";

const initialState = { error: null };

export function EditNewsForm({ news, action }) {
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <Field label="Título">
        <input name="title" type="text" required defaultValue={news.title} className={inputClass} />
      </Field>

      <Field label="Contenido">
        <textarea
          name="content"
          required
          rows={6}
          defaultValue={news.content}
          className={inputClass}
        />
      </Field>

      {news.image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={news.image}
          alt={news.title}
          className="h-32 w-32 rounded-[var(--radius-sm)] object-cover"
        />
      )}

      <Field label="Reemplazar imagen (opcional, jpg/png/webp)">
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
        {pending ? "Guardando..." : "Guardar cambios"}
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

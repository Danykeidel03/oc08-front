"use client";

import { useTransition } from "react";
import { toggleProductEnabled } from "./actions";

export function ProductToggle({ id, enabled }) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => startTransition(() => toggleProductEnabled(id, !enabled))}
      aria-pressed={enabled}
      className={`rounded-[var(--radius-sm)] px-3 py-1.5 text-sm font-semibold transition disabled:opacity-60 ${
        enabled
          ? "bg-[color:var(--color-accent)] text-white"
          : "border border-[color:var(--color-border)] text-[color:var(--color-muted)]"
      }`}
    >
      {pending ? "..." : enabled ? "Habilitado" : "Deshabilitado"}
    </button>
  );
}

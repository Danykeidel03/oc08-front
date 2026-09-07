"use client";

import { useTransition } from "react";
import { deleteNews } from "./actions";

export function DeleteNewsButton({ id }) {
  const [pending, startTransition] = useTransition();

  function handleClick() {
    if (!confirm("¿Eliminar esta noticia?")) return;
    startTransition(() => deleteNews(id));
  }

  return (
    <button
      type="button"
      disabled={pending}
      onClick={handleClick}
      className="text-sm text-[color:var(--color-muted)] underline disabled:opacity-60"
    >
      {pending ? "..." : "Eliminar"}
    </button>
  );
}

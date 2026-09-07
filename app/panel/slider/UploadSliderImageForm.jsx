"use client";

import { useActionState, useEffect, useRef } from "react";
import { uploadSliderImage } from "./actions";

const initialState = { error: null };

export function UploadSliderImageForm() {
  const formRef = useRef(null);
  const [state, formAction, pending] = useActionState(uploadSliderImage, initialState);

  useEffect(() => {
    if (!pending && !state.error) {
      formRef.current?.reset();
    }
  }, [state, pending]);

  return (
    <form
      ref={formRef}
      action={formAction}
      className="flex flex-col gap-4 rounded-[var(--radius-md)] border border-[color:var(--color-border)] bg-[color:var(--color-bg-elevated)] p-4 sm:flex-row sm:items-end"
    >
      <label className="flex flex-1 flex-col gap-2">
        <span className="text-sm text-[color:var(--color-muted)]">
          Nueva foto del banner (jpg/png/webp)
        </span>
        <input
          name="image"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          required
          className="rounded-[var(--radius-sm)] border border-[color:var(--color-border)] bg-[color:var(--color-bg-elevated)] px-4 py-3 text-white outline-none focus:border-[color:var(--color-accent)]"
        />
      </label>

      <button
        type="submit"
        disabled={pending}
        className="rounded-[var(--radius-sm)] bg-[color:var(--color-accent)] px-4 py-3 font-semibold text-white transition disabled:opacity-60"
      >
        {pending ? "Subiendo..." : "Subir foto"}
      </button>

      {state.error && (
        <p className="text-sm text-white sm:basis-full" role="alert">
          {state.error}
        </p>
      )}
    </form>
  );
}

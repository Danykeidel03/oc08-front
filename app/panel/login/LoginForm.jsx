"use client";

import { useActionState } from "react";
import { loginAction } from "./actions";

const initialState = { error: false };

export function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, initialState);

  return (
    <form action={formAction} className="flex w-full max-w-sm flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label htmlFor="password" className="text-sm text-[color:var(--color-muted)]">
          Contraseña del panel
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoFocus
          className="rounded-[var(--radius-sm)] border border-[color:var(--color-border)] bg-[color:var(--color-bg-elevated)] px-4 py-3 text-white outline-none focus:border-[color:var(--color-accent)]"
        />
      </div>

      {state.error && (
        <p className="text-sm text-white" role="alert">
          Contraseña incorrecta.
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="rounded-[var(--radius-sm)] bg-[color:var(--color-accent)] px-4 py-3 font-semibold text-white transition disabled:opacity-60"
      >
        {pending ? "Entrando..." : "Entrar"}
      </button>
    </form>
  );
}

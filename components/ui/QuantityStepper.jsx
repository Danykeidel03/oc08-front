"use client";

export function QuantityStepper({ value, min = 1, max = 20, onChange, disabled = false }) {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        disabled={disabled || value <= min}
        onClick={() => onChange(value - 1)}
        className="h-9 w-9 rounded-[var(--radius-sm)] border border-[color:var(--color-border)] text-white transition-colors hover:border-[color:var(--color-accent)] disabled:opacity-40 disabled:hover:border-[color:var(--color-border)]"
        aria-label="Restar unidad"
      >
        −
      </button>
      <span className="w-8 text-center font-semibold text-white">{value}</span>
      <button
        type="button"
        disabled={disabled || value >= max}
        onClick={() => onChange(value + 1)}
        className="h-9 w-9 rounded-[var(--radius-sm)] border border-[color:var(--color-border)] text-white transition-colors hover:border-[color:var(--color-accent)] disabled:opacity-40 disabled:hover:border-[color:var(--color-border)]"
        aria-label="Sumar unidad"
      >
        +
      </button>
    </div>
  );
}

import clsx from "clsx";

const baseClasses =
  "inline-flex items-center justify-center rounded-none px-6 py-3 text-sm font-semibold tracking-[0.08em] uppercase whitespace-nowrap transition-colors";

const variantClasses = {
  primary:
    "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] active:translate-y-px",
  ghost:
    "border border-[var(--color-primary)] bg-transparent text-white hover:bg-[var(--color-primary)]",
  "ghost-white":
    "border border-white bg-transparent text-white hover:bg-white hover:text-[var(--color-primary)]",
};

export function LinkButton({
  variant = "ghost",
  className,
  href,
  ...props
}) {
  return (
    <a
      href={href}
      className={clsx(baseClasses, variantClasses[variant], className)}
      {...props}
    />
  );
}

export function Button({
  variant = "ghost",
  className,
  type = "button",
  ...props
}) {
  return (
    <button
      type={type}
      className={clsx(baseClasses, variantClasses[variant], className)}
      {...props}
    />
  );
}

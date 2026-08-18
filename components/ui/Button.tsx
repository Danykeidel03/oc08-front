import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import clsx from "clsx";

type Variant = "primary" | "ghost" | "ghost-white";

const baseClasses =
  "inline-flex items-center justify-center rounded-none px-6 py-3 text-sm font-semibold tracking-[0.08em] uppercase whitespace-nowrap transition-colors";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] active:translate-y-px",
  ghost:
    "border border-[var(--color-primary)] bg-transparent text-white hover:bg-[var(--color-primary)]",
  "ghost-white":
    "border border-white bg-transparent text-white hover:bg-white hover:text-[var(--color-primary)]",
};

type LinkButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant;
  href: string;
};

export function LinkButton({
  variant = "ghost",
  className,
  href,
  ...props
}: LinkButtonProps) {
  return (
    <a
      href={href}
      className={clsx(baseClasses, variantClasses[variant], className)}
      {...props}
    />
  );
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
};

export function Button({
  variant = "ghost",
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={clsx(baseClasses, variantClasses[variant], className)}
      {...props}
    />
  );
}

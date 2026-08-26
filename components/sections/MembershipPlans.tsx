import Image from "next/image";
import { LinkButton } from "@/components/ui/Button";
import type { MembershipPlan } from "@/types/membership";

const PLAN: MembershipPlan = {
  id: "anual",
  name: "Socio",
  priceNew: "25€",
  priceRenewal: "22€",
  period: "TEMPORADA 26/27",
  description: "Tu aportación nos ayuda a seguir haciendo más grande la grada.",
  benefits: [
    "Carnet oficial de socio",
    "Bufanda oficial de regalo",
    "Ventajas exclusivas en el local",
    "Actividades e iniciativas del grupo",
    "Sé parte del grupo",
    "Descuentos en la tienda del grupo",
  ],
  ctaLabel: "Hazte socio ✓",
  ctaHref:
    "https://docs.google.com/forms/d/e/1FAIpQLSeCc2q0P5zvtcksg9be5wJGKVcDzCzElA83VV8oxkFUd8y8EA/viewform",
};

function CheckIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className={`${className} mt-0.5 shrink-0 text-[var(--color-primary)]`}
    >
      <path
        d="M4 10.5l3.5 3.5L16 5.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PlanCard({ plan }: { plan: MembershipPlan }) {
  return (
    <div className="flex flex-col overflow-hidden border border-[var(--color-border)] bg-[var(--color-bg-elevated)] shadow-[var(--shadow-card)]">
      <div className="relative aspect-[3/2] overflow-hidden border-b border-[var(--color-border)]">
        <Image
          src="/images/logo_carnet.webp"
          alt="Carnet de socio"
          fill
          className="object-cover"
        />
      </div>

      <div className="flex flex-col gap-1.5 border-b border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-4">
        <p className="text-center text-[11px] font-semibold tracking-wide text-white uppercase">
          Bufanda de regalo al hacerte socio
        </p>
        <div className="grid grid-cols-2 gap-2">
          <div className="relative aspect-[2048/299] overflow-hidden rounded">
            <Image
              src="/images/west_front.webp"
              alt="Bufanda oficial - anverso"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative aspect-[2048/299] overflow-hidden rounded">
            <Image
              src="/images/west_back.webp"
              alt="Bufanda oficial - reverso"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6">
        <p className="text-sm text-[var(--color-muted)]">{plan.description}</p>

        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-6">
            <p className="flex flex-col">
              <span className="text-xs whitespace-nowrap text-[var(--color-muted)] uppercase">
                Renovación
              </span>
              <span className="text-4xl font-bold text-white">
                {plan.priceRenewal}
              </span>
            </p>
            <p className="flex flex-col">
              <span className="text-xs whitespace-nowrap text-[var(--color-muted)] uppercase">
                Nueva alta
              </span>
              <span className="text-4xl font-bold text-white">
                {plan.priceNew}
              </span>
            </p>
          </div>
          <span className="text-xs text-[var(--color-muted)]">
            {plan.period}
          </span>
        </div>

        <LinkButton
          href={plan.ctaHref}
          variant="ghost"
          className="w-full"
          target="_blank"
          rel="noopener noreferrer"
        >
          {plan.ctaLabel}
        </LinkButton>

        <ul className="grid grid-cols-2 gap-x-3 gap-y-2">
          {plan.benefits.map((benefit) => (
            <li
              key={benefit}
              className="flex items-start gap-1.5 text-xs leading-snug text-[var(--color-muted)]"
            >
              <CheckIcon className="h-4 w-4" />
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function MembershipPlans() {
  return (
    <section id="planes" className="mx-auto max-w-6xl px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-3xl font-bold tracking-tight text-white uppercase sm:text-4xl">
          Hazte socio
        </h2>
        <p className="mt-4 text-[var(--color-muted)]">
          Una temporada. Un sentimiento. Un mismo compromiso.
        </p>
      </div>

      <div className="mx-auto mt-16 max-w-md">
        <PlanCard plan={PLAN} />
      </div>
    </section>
  );
}

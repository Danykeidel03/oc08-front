import Image from "next/image";
import { LinkButton } from "@/components/ui/Button";
import type { MembershipPlan } from "@/types/membership";

const PLAN: MembershipPlan = {
  id: "anual",
  name: "Socio",
  price: "30€",
  period: "· TEMPORADA 26/27",
  description: "Tu aportación nos ayuda a seguir haciendo más grande la grada.",
  benefits: [
    "Carnet fisico de socio",
    "Acceso a sorteos y actos del grupo",
    "Bufanda de la temporada",
    "Prioridad en desplazamientos organizados",
    "Descuento en la tienda del grupo",
  ],
  ctaLabel: "Hazte socio ✓",
  ctaHref:
    "https://docs.google.com/forms/d/e/1FAIpQLSeCc2q0P5zvtcksg9be5wJGKVcDzCzElA83VV8oxkFUd8y8EA/viewform",
};

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className="h-5 w-5 shrink-0 text-[var(--color-primary)]"
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
          src="/images/logo_carnet.jpeg"
          alt="Carnet de socio"
          fill
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col gap-6 p-8">
        <p className="text-sm text-[var(--color-muted)]">{plan.description}</p>

        <p className="flex items-baseline gap-1">
          <span className="text-4xl font-bold text-white">{plan.price}</span>
          <span className="text-sm text-[var(--color-muted)]">{plan.period}</span>
        </p>

        <LinkButton
          href={plan.ctaHref}
          variant="ghost"
          className="w-full"
          target="_blank"
          rel="noopener noreferrer"
        >
          {plan.ctaLabel}
        </LinkButton>

        <ul className="flex flex-col gap-3">
          {plan.benefits.map((benefit) => (
            <li
              key={benefit}
              className="flex items-start gap-2 text-sm text-[var(--color-muted)]"
            >
              <CheckIcon />
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

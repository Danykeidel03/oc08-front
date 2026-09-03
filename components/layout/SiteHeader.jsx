import Image from "next/image";
import NextLink from "next/link";
import { LinkButton } from "@/components/ui/Button";
import { CartMenu } from "@/components/layout/CartMenu";
import { getCart } from "@/lib/cart";

export async function SiteHeader() {
  const cart = await getCart();

  return (
    <header className="sticky top-0 z-50 bg-[var(--color-primary)]">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-3">
        <a href="/#top" aria-label="Orgullo Cazurro — inicio">
          <Image
            src="/images/logo.webp"
            alt="Escudo de Orgullo Cazurro, afición de la Cultural y Deportiva Leonesa"
            width={52}
            height={52}
            priority
            className="h-[52px] w-[52px] object-contain"
          />
        </a>

        <div className="flex items-center gap-6">
          <NextLink
            href="/tienda"
            className="text-xs font-semibold tracking-[0.1em] text-white uppercase hover:text-white/80"
          >
            Tienda
          </NextLink>

          <CartMenu cart={cart} />

          <LinkButton href="/#planes" variant="ghost-white" className="!px-4 !py-2 text-xs">
            Carnet socio 26/27
          </LinkButton>
        </div>
      </div>
    </header>
  );
}

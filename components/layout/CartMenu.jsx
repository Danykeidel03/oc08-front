import NextLink from "next/link";
import { cartItemCount, cartTotal } from "@/lib/cart";

export function CartMenu({ cart }) {
  const items = cart?.items ?? [];
  const itemCount = cartItemCount(cart);
  const total = cartTotal(cart);

  return (
    <div className="group relative">
      <NextLink
        href="/carrito"
        className="flex items-center gap-1.5 py-2 text-xs font-semibold tracking-[0.1em] text-white uppercase hover:text-white/80"
      >
        Carrito
        {itemCount > 0 && (
          <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-white px-1 text-[10px] font-bold text-[color:var(--color-primary)]">
            {itemCount}
          </span>
        )}
      </NextLink>

      {items.length > 0 && (
        <div className="invisible absolute right-0 top-full w-72 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100">
          <div className="rounded-[var(--radius-md)] border border-[color:var(--color-border)] bg-[color:var(--color-bg-elevated)] p-4 shadow-[var(--shadow-card)]">
            <ul className="flex max-h-64 flex-col gap-3 overflow-y-auto">
              {items.map((item) => (
                <li key={item.id} className="flex items-center gap-3">
                  {item.product.images[0] && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.product.images[0].url}
                      alt={item.product.name}
                      className="h-12 w-12 rounded-[var(--radius-sm)] object-cover"
                    />
                  )}
                  <div className="flex-1 text-sm">
                    <p className="text-white">{item.product.name}</p>
                    <p className="text-[color:var(--color-muted)]">
                      {item.quantity} × {item.product.price} €
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-3 flex items-center justify-between border-t border-[color:var(--color-border)] pt-3 text-sm">
              <span className="text-[color:var(--color-muted)]">Total</span>
              <span className="font-semibold text-white">{total.toFixed(2)} €</span>
            </div>

            <div className="mt-3 flex flex-col gap-2">
              <NextLink
                href="/carrito"
                className="border border-[color:var(--color-primary)] px-4 py-2 text-center text-xs font-semibold uppercase text-white transition-colors hover:bg-[color:var(--color-primary)]"
              >
                Ver carrito
              </NextLink>
              <NextLink
                href="/checkout"
                className="bg-[color:var(--color-primary)] px-4 py-2 text-center text-xs font-semibold uppercase text-white transition-colors hover:bg-[color:var(--color-primary-hover)]"
              >
                Tramitar pedido
              </NextLink>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

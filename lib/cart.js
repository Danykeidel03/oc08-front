import "server-only";
import { cookies } from "next/headers";
import { backendUrl } from "@/lib/backend";

export const CART_COOKIE = "cartId";

export async function getCart() {
  const cookieStore = await cookies();
  const cartId = cookieStore.get(CART_COOKIE)?.value;

  if (!cartId) {
    return null;
  }

  const res = await fetch(backendUrl(`/api/cart/${cartId}`), { cache: "no-store" });

  if (!res.ok) {
    return null;
  }

  return res.json();
}

export function cartTotal(cart) {
  if (!cart) {
    return 0;
  }

  return cart.items.reduce((sum, item) => sum + Number(item.product.price) * item.quantity, 0);
}

export function cartItemCount(cart) {
  if (!cart) {
    return 0;
  }

  return cart.items.reduce((sum, item) => sum + item.quantity, 0);
}

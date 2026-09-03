"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { backendUrl } from "@/lib/backend";
import { CART_COOKIE } from "@/lib/cart";

async function ensureCartId(cookieStore) {
  const existing = cookieStore.get(CART_COOKIE)?.value;

  if (existing) {
    const res = await fetch(backendUrl(`/api/cart/${existing}`), { cache: "no-store" });
    if (res.ok) {
      return existing;
    }
  }

  const created = await fetch(backendUrl("/api/cart"), { method: "POST" });
  const cart = await created.json();

  cookieStore.set(CART_COOKIE, cart.id, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  return cart.id;
}

async function addItem(formData) {
  const cookieStore = await cookies();
  const cartId = await ensureCartId(cookieStore);

  const res = await fetch(backendUrl(`/api/cart/${cartId}/items`), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      productId: formData.get("productId"),
      quantity: formData.get("quantity"),
      size: formData.get("size") ?? "",
    }),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    return { error: body?.error ?? "No se pudo añadir al carrito", success: false };
  }

  revalidatePath("/carrito");
  return { error: null, success: true };
}

// Para <form action={addToCart}> usado con useActionState (ficha de producto).
export async function addToCart(_prevState, formData) {
  return addItem(formData);
}

// Para <form action={quickAddToCart}> plano, sin useActionState (tarjeta de producto en /tienda).
export async function quickAddToCart(formData) {
  await addItem(formData);
}

export async function updateCartItem(itemId, quantity) {
  const cookieStore = await cookies();
  const cartId = cookieStore.get(CART_COOKIE)?.value;

  if (!cartId) {
    return;
  }

  await fetch(backendUrl(`/api/cart/${cartId}/items/${itemId}`), {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ quantity }),
  });

  revalidatePath("/carrito");
}

export async function removeCartItem(itemId) {
  const cookieStore = await cookies();
  const cartId = cookieStore.get(CART_COOKIE)?.value;

  if (!cartId) {
    return;
  }

  await fetch(backendUrl(`/api/cart/${cartId}/items/${itemId}`), { method: "DELETE" });

  revalidatePath("/carrito");
}

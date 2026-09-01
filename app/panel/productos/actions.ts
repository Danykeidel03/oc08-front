"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { adminHeaders, backendUrl } from "@/lib/backend";
import { PANEL_SESSION_COOKIE } from "@/lib/panelSession";

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete(PANEL_SESSION_COOKIE);
  redirect("/panel/login");
}

export async function toggleProductEnabled(id: string, enabled: boolean) {
  const res = await fetch(backendUrl(`/api/products/${id}/enabled`), {
    method: "PATCH",
    headers: { ...adminHeaders(), "Content-Type": "application/json" },
    body: JSON.stringify({ enabled }),
  });

  if (!res.ok) {
    throw new Error("No se pudo actualizar el producto");
  }

  revalidatePath("/panel/productos");
}

export async function updateProduct(
  id: string,
  _prevState: { error: string | null },
  formData: FormData,
) {
  const payload = {
    name: formData.get("name"),
    description: formData.get("description"),
    price: formData.get("price"),
    category: formData.get("category"),
    badge: formData.get("badge"),
    sizes: formData.get("sizes"),
    inStock: formData.get("inStock") === "true",
  };

  const res = await fetch(backendUrl(`/api/products/${id}`), {
    method: "PATCH",
    headers: { ...adminHeaders(), "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    return { error: body?.error ?? "No se pudo actualizar el producto" };
  }

  revalidatePath("/panel/productos");
  redirect("/panel/productos");
}

export async function createProduct(_prevState: { error: string | null }, formData: FormData) {
  const res = await fetch(backendUrl("/api/products"), {
    method: "POST",
    headers: adminHeaders(),
    body: formData,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    return { error: body?.error ?? "No se pudo crear el producto" };
  }

  revalidatePath("/panel/productos");
  redirect("/panel/productos");
}

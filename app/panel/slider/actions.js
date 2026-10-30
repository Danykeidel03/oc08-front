"use server";

import { revalidatePath } from "next/cache";
import { adminHeaders, backendUrl } from "@/lib/backend";
import { requirePanelSession } from "@/lib/panelAuth";

export async function uploadSliderImage(_prevState, formData) {
  await requirePanelSession();

  const res = await fetch(backendUrl("/api/slider-images"), {
    method: "POST",
    headers: adminHeaders(),
    body: formData,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    return { error: body?.error ?? "No se pudo subir la imagen" };
  }

  revalidatePath("/panel/slider");
  return { error: null };
}

export async function deleteSliderImage(id) {
  await requirePanelSession();

  const res = await fetch(backendUrl(`/api/slider-images/${id}`), {
    method: "DELETE",
    headers: adminHeaders(),
  });

  if (!res.ok) {
    throw new Error("No se pudo eliminar la imagen");
  }

  revalidatePath("/panel/slider");
}

export async function reorderSliderImages(order) {
  await requirePanelSession();

  const res = await fetch(backendUrl("/api/slider-images/reorder"), {
    method: "PATCH",
    headers: { ...adminHeaders(), "Content-Type": "application/json" },
    body: JSON.stringify({ order }),
  });

  if (!res.ok) {
    throw new Error("No se pudo reordenar el slider");
  }

  revalidatePath("/panel/slider");
}

"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { adminHeaders, backendUrl } from "@/lib/backend";

export async function createNews(_prevState, formData) {
  const res = await fetch(backendUrl("/api/news"), {
    method: "POST",
    headers: adminHeaders(),
    body: formData,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    return { error: body?.error ?? "No se pudo crear la noticia" };
  }

  revalidatePath("/panel/noticias");
  redirect("/panel/noticias");
}

export async function updateNews(id, _prevState, formData) {
  const res = await fetch(backendUrl(`/api/news/${id}`), {
    method: "PATCH",
    headers: adminHeaders(),
    body: formData,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    return { error: body?.error ?? "No se pudo actualizar la noticia" };
  }

  revalidatePath("/panel/noticias");
  redirect("/panel/noticias");
}

export async function deleteNews(id) {
  const res = await fetch(backendUrl(`/api/news/${id}`), {
    method: "DELETE",
    headers: adminHeaders(),
  });

  if (!res.ok) {
    throw new Error("No se pudo eliminar la noticia");
  }

  revalidatePath("/panel/noticias");
}

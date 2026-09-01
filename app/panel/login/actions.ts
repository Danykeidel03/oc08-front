"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { isValidPanelPassword } from "@/lib/panelAuth";
import { PANEL_SESSION_COOKIE } from "@/lib/panelSession";

export async function loginAction(_prevState: { error: boolean }, formData: FormData) {
  const password = String(formData.get("password") ?? "");

  if (!isValidPanelPassword(password)) {
    return { error: true };
  }

  const cookieStore = await cookies();
  cookieStore.set(PANEL_SESSION_COOKIE, process.env.PANEL_SESSION_SECRET!, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  redirect("/panel/productos");
}

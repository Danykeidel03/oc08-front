"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import {
  clearFailedLogins,
  isLoginLocked,
  isValidPanelPassword,
  recordFailedLogin,
} from "@/lib/panelAuth";
import {
  createPanelSession,
  PANEL_SESSION_COOKIE,
  PANEL_SESSION_MAX_AGE,
} from "@/lib/panelSession";

export async function loginAction(_prevState, formData) {
  const password = String(formData.get("password") ?? "");

  const headerStore = await headers();
  const ip =
    headerStore.get("cf-connecting-ip") ??
    headerStore.get("x-forwarded-for")?.split(",")[0].trim() ??
    "unknown";

  if (isLoginLocked(ip)) {
    return { error: true, locked: true };
  }

  if (!isValidPanelPassword(password)) {
    recordFailedLogin(ip);
    return { error: true };
  }

  clearFailedLogins(ip);

  const cookieStore = await cookies();
  cookieStore.set(PANEL_SESSION_COOKIE, await createPanelSession(), {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: PANEL_SESSION_MAX_AGE,
  });

  redirect("/panel");
}

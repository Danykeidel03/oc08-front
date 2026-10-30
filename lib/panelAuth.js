import "server-only";
import { timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { isValidPanelSession, PANEL_SESSION_COOKIE } from "@/lib/panelSession";

function safeEqual(a, b) {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);

  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

export function isValidPanelPassword(password) {
  const expected = process.env.PANEL_PASSWORD;
  if (!expected) return false;
  return safeEqual(password, expected);
}

// Las Server Actions son endpoints POST propios: no se puede delegar su
// protección solo en el middleware. Llamar al inicio de toda action del panel.
export async function requirePanelSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get(PANEL_SESSION_COOKIE)?.value;

  if (!(await isValidPanelSession(session))) {
    redirect("/panel/login");
  }
}

// Freno de fuerza bruta en memoria, por IP. En un Worker cada isolate tiene su
// propio contador, así que es una mitigación parcial, no un límite global.
const MAX_FAILED_ATTEMPTS = 5;
const LOCK_WINDOW_MS = 15 * 60 * 1000;
const failedAttempts = new Map();

export function isLoginLocked(ip) {
  const entry = failedAttempts.get(ip);
  if (!entry) return false;

  if (Date.now() - entry.firstAt > LOCK_WINDOW_MS) {
    failedAttempts.delete(ip);
    return false;
  }

  return entry.count >= MAX_FAILED_ATTEMPTS;
}

export function recordFailedLogin(ip) {
  const entry = failedAttempts.get(ip);

  if (!entry || Date.now() - entry.firstAt > LOCK_WINDOW_MS) {
    failedAttempts.set(ip, { count: 1, firstAt: Date.now() });
    return;
  }

  entry.count += 1;
}

export function clearFailedLogins(ip) {
  failedAttempts.delete(ip);
}

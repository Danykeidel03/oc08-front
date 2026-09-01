import "server-only";
import { timingSafeEqual } from "node:crypto";

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);

  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

export function isValidPanelPassword(password: string): boolean {
  const expected = process.env.PANEL_PASSWORD;
  if (!expected) return false;
  return safeEqual(password, expected);
}

export function isValidPanelSession(cookieValue: string | undefined): boolean {
  const expected = process.env.PANEL_SESSION_SECRET;
  if (!expected || !cookieValue) return false;
  return safeEqual(cookieValue, expected);
}

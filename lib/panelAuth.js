import "server-only";
import { timingSafeEqual } from "node:crypto";

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

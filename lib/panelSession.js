import "server-only";

export const PANEL_SESSION_COOKIE = "panel_session";

// Comparación de tiempo constante escrita a mano: el Middleware de Next.js
// corre en Edge Runtime, donde node:crypto (timingSafeEqual) no está disponible.
function constantTimeEqual(a, b) {
  const len = Math.max(a.length, b.length);
  let mismatch = a.length === b.length ? 0 : 1;

  for (let i = 0; i < len; i++) {
    const charA = i < a.length ? a.charCodeAt(i) : 0;
    const charB = i < b.length ? b.charCodeAt(i) : 0;
    mismatch |= charA ^ charB;
  }

  return mismatch === 0;
}

export function isValidPanelSession(cookieValue) {
  const expected = process.env.PANEL_SESSION_SECRET;
  if (!expected || !cookieValue) return false;
  return constantTimeEqual(cookieValue, expected);
}

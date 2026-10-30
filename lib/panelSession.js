import "server-only";

export const PANEL_SESSION_COOKIE = "panel_session";
export const PANEL_SESSION_MAX_AGE = 60 * 60 * 24 * 7;

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

// Web Crypto existe tanto en Edge (middleware) como en Node (server actions).
async function sign(payload, secret) {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));

  return Array.from(new Uint8Array(signature), (b) => b.toString(16).padStart(2, "0")).join("");
}

// La cookie ya no contiene el secreto: es "<expira>.<firma HMAC de expira>".
// Si se roba, caduca sola; rotar PANEL_SESSION_SECRET invalida todas las sesiones.
export async function createPanelSession() {
  const secret = process.env.PANEL_SESSION_SECRET;
  if (!secret) throw new Error("Falta la variable de entorno PANEL_SESSION_SECRET");

  const expiresAt = String(Date.now() + PANEL_SESSION_MAX_AGE * 1000);
  return `${expiresAt}.${await sign(expiresAt, secret)}`;
}

export async function isValidPanelSession(cookieValue) {
  const secret = process.env.PANEL_SESSION_SECRET;
  if (!secret || !cookieValue) return false;

  const [expiresAt, signature] = cookieValue.split(".");
  if (!expiresAt || !signature) return false;

  const expected = await sign(expiresAt, secret);
  if (!constantTimeEqual(signature, expected)) return false;

  return Number(expiresAt) > Date.now();
}

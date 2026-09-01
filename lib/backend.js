import "server-only";

function requireEnv(name) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Falta la variable de entorno ${name}`);
  }

  return value;
}

export function backendUrl(path) {
  return `${requireEnv("BACKEND_URL")}${path}`;
}

export function adminHeaders() {
  return { "x-admin-key": requireEnv("BACKEND_ADMIN_KEY") };
}

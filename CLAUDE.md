# CLAUDE.md — oc08-front

## SEO obligatorio en cada page nueva

Toda ruta nueva bajo `app/` (page.tsx) debe traer metadata completa, sin que se pida explícitamente. Seguir el patrón ya usado en `app/layout.tsx`:

1. **`export const metadata: Metadata`** (o `generateMetadata` si depende de datos dinámicos), con:
   - `title` y `description` específicos de esa página (no reusar el genérico del layout sin adaptarlo).
   - `metadataBase: new URL(SITE_URL)` ya lo hereda del layout raíz — no repetir ahí, pero sí las claves siguientes.
   - `openGraph`: `title`, `description`, `url` (ruta absoluta con `SITE_URL`), `siteName: "Orgullo Cazurro"`, `images` (con `width`/`height`/`alt` reales de la imagen), `locale: "es_ES"`, `type` (`"website"` salvo que aplique otro).
   - `twitter`: `card: "summary_large_image"`, `title`, `description`, `images`.
2. **`SITE_URL`** siempre desde `@/lib/site` (`lib/site.ts`) — nunca hardcodear el dominio.
3. Si la ruta es indexable y estática, agregarla a **`app/sitemap.ts`** (`url`, `lastModified`, `changeFrequency`, `priority`).
4. No tocar `app/robots.ts` salvo que la página deba excluirse del crawl — en ese caso usar `rules` con `disallow` específico, no editar la regla global.

**Por qué:** así se hizo para la home (`app/layout.tsx`, `app/sitemap.ts`, `app/robots.ts`, `lib/site.ts`) — title/description propios, OG + Twitter card completos, imagen representativa con alt, sumado al sitemap. La idea es que cualquier page nueva salga con el mismo nivel de SEO sin tener que pedirlo cada vez.

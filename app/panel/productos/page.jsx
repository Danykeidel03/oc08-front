import Link from "next/link";
import { adminHeaders, backendUrl } from "@/lib/backend";
import { ProductToggle } from "./ProductToggle";
import { logoutAction } from "./actions";

export const metadata = {
  title: "Panel — productos",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

async function getProducts() {
  const res = await fetch(backendUrl("/api/products/admin/all"), {
    headers: adminHeaders(),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("No se pudo cargar el listado de productos");
  }

  return res.json();
}

export default async function PanelProductosPage() {
  const products = await getProducts();

  return (
    <main className="mx-auto flex min-h-screen max-w-4xl flex-col gap-6 px-4 py-10">
      <Link href="/panel" className="text-sm text-[color:var(--color-muted)] underline">
        ← Panel
      </Link>

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Productos</h1>
        <div className="flex items-center gap-3">
          <Link
            href="/panel/productos/nuevo"
            className="rounded-[var(--radius-sm)] bg-[color:var(--color-accent)] px-4 py-2 text-sm font-semibold text-white"
          >
            Nuevo producto
          </Link>
          <form action={logoutAction}>
            <button
              type="submit"
              className="text-sm text-[color:var(--color-muted)] underline"
            >
              Cerrar sesión
            </button>
          </form>
        </div>
      </div>

      {products.length === 0 ? (
        <p className="text-[color:var(--color-muted)]">Todavía no hay productos cargados.</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {products.map((product) => (
            <li
              key={product.id}
              className="flex items-center justify-between gap-4 rounded-[var(--radius-md)] border border-[color:var(--color-border)] bg-[color:var(--color-bg-elevated)] p-4"
            >
              <div className="flex items-center gap-4">
                {product.images[0] && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={product.images[0].url}
                    alt={product.name}
                    className="h-14 w-14 rounded-[var(--radius-sm)] object-cover"
                  />
                )}
                <div>
                  <p className="font-semibold text-white">{product.name}</p>
                  <p className="text-sm text-[color:var(--color-muted)]">
                    {product.category} · {product.price} €
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  href={`/panel/productos/${product.id}/editar`}
                  className="text-sm text-[color:var(--color-muted)] underline"
                >
                  Editar
                </Link>
                <ProductToggle id={product.id} enabled={product.enabled} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

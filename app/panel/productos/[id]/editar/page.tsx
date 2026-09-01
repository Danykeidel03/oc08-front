import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { adminHeaders, backendUrl } from "@/lib/backend";
import type { Product } from "@/types/product";
import { updateProduct } from "../../actions";
import { EditProductForm } from "./EditProductForm";

export const metadata: Metadata = {
  title: "Panel — editar producto",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

async function getProduct(id: string): Promise<Product | null> {
  const res = await fetch(backendUrl(`/api/products/admin/${id}`), {
    headers: adminHeaders(),
    cache: "no-store",
  });

  if (res.status === 404) return null;
  if (!res.ok) throw new Error("No se pudo cargar el producto");

  return res.json();
}

export default async function EditarProductoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) notFound();

  return (
    <main className="mx-auto flex min-h-screen max-w-lg flex-col gap-6 px-4 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Editar producto</h1>
        <Link href="/panel/productos" className="text-sm text-[color:var(--color-muted)] underline">
          Volver
        </Link>
      </div>
      <EditProductForm product={product} action={updateProduct.bind(null, product.id)} />
    </main>
  );
}

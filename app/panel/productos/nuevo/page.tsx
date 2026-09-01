import type { Metadata } from "next";
import Link from "next/link";
import { NewProductForm } from "./NewProductForm";

export const metadata: Metadata = {
  title: "Panel — nuevo producto",
  robots: { index: false, follow: false },
};

export default function NuevoProductoPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-lg flex-col gap-6 px-4 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Nuevo producto</h1>
        <Link href="/panel/productos" className="text-sm text-[color:var(--color-muted)] underline">
          Volver
        </Link>
      </div>
      <NewProductForm />
    </main>
  );
}

import Link from "next/link";
import { NewNewsForm } from "./NewNewsForm";

export const metadata = {
  title: "Panel — nueva noticia",
  robots: { index: false, follow: false },
};

export default function NuevaNoticiaPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-lg flex-col gap-6 px-4 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Nueva noticia</h1>
        <Link href="/panel/noticias" className="text-sm text-[color:var(--color-muted)] underline">
          Volver
        </Link>
      </div>
      <NewNewsForm />
    </main>
  );
}

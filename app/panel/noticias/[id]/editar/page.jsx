import Link from "next/link";
import { notFound } from "next/navigation";
import { backendUrl } from "@/lib/backend";
import { updateNews } from "../../actions";
import { EditNewsForm } from "./EditNewsForm";

export const metadata = {
  title: "Panel — editar noticia",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

async function getNews(id) {
  const res = await fetch(backendUrl(`/api/news/${id}`), { cache: "no-store" });

  if (res.status === 404) return null;
  if (!res.ok) throw new Error("No se pudo cargar la noticia");

  return res.json();
}

export default async function EditarNoticiaPage({ params }) {
  const { id } = await params;
  const news = await getNews(id);

  if (!news) notFound();

  return (
    <main className="mx-auto flex min-h-screen max-w-lg flex-col gap-6 px-4 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Editar noticia</h1>
        <Link href="/panel/noticias" className="text-sm text-[color:var(--color-muted)] underline">
          Volver
        </Link>
      </div>
      <EditNewsForm news={news} action={updateNews.bind(null, news.id)} />
    </main>
  );
}

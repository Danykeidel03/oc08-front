import Link from "next/link";
import { backendUrl } from "@/lib/backend";
import { DeleteNewsButton } from "./DeleteNewsButton";

export const metadata = {
  title: "Panel — noticias",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

async function getNews() {
  const res = await fetch(backendUrl("/api/news"), { cache: "no-store" });

  if (!res.ok) {
    throw new Error("No se pudo cargar el listado de noticias");
  }

  return res.json();
}

export default async function PanelNoticiasPage() {
  const news = await getNews();

  return (
    <main className="mx-auto flex min-h-screen max-w-4xl flex-col gap-6 px-4 py-10">
      <Link href="/panel" className="text-sm text-[color:var(--color-muted)] underline">
        ← Panel
      </Link>

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Noticias</h1>
        <Link
          href="/panel/noticias/nueva"
          className="rounded-[var(--radius-sm)] bg-[color:var(--color-accent)] px-4 py-2 text-sm font-semibold text-white"
        >
          Nueva noticia
        </Link>
      </div>

      {news.length === 0 ? (
        <p className="text-[color:var(--color-muted)]">Todavía no hay noticias cargadas.</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {news.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between gap-4 rounded-[var(--radius-md)] border border-[color:var(--color-border)] bg-[color:var(--color-bg-elevated)] p-4"
            >
              <div className="flex items-center gap-4">
                {item.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-14 w-14 rounded-[var(--radius-sm)] object-cover"
                  />
                )}
                <p className="font-semibold text-white">{item.title}</p>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  href={`/panel/noticias/${item.id}/editar`}
                  className="text-sm text-[color:var(--color-muted)] underline"
                >
                  Editar
                </Link>
                <DeleteNewsButton id={item.id} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { backendUrl } from "@/lib/backend";
import { SITE_URL } from "@/lib/site";

export const revalidate = 300;

const dateFormatter = new Intl.DateTimeFormat("es-ES", { dateStyle: "long" });

async function getNewsItem(id) {
  const res = await fetch(backendUrl(`/api/news/${id}`), { next: { revalidate: 300 } });

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    throw new Error("No se pudo cargar la noticia");
  }

  return res.json();
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const item = await getNewsItem(id);

  if (!item) {
    return { title: "Noticia no encontrada — Orgullo Cazurro" };
  }

  const title = `${item.title} — Orgullo Cazurro`;
  const description = item.content.replace(/\s+/g, " ").trim().slice(0, 160);
  const image = item.image ?? "/images/stadium.jpeg";

  return {
    title,
    description,
    alternates: {
      canonical: `/noticias/${item.id}`,
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/noticias/${item.id}`,
      siteName: "Orgullo Cazurro",
      images: [{ url: image, alt: item.title }],
      locale: "es_ES",
      type: "article",
      publishedTime: item.createdAt,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function NoticiaPage({ params }) {
  const { id } = await params;
  const item = await getNewsItem(id);

  if (!item) {
    notFound();
  }

  return (
    <>
      <SiteHeader />
      <main className="mx-auto min-h-screen max-w-3xl px-6 py-16">
        <Link
          href="/noticias"
          className="text-xs font-semibold tracking-[0.1em] text-[var(--color-muted)] uppercase hover:text-white"
        >
          ← Todas las noticias
        </Link>

        <article className="mt-8 flex flex-col gap-6">
          <header className="flex flex-col gap-3">
            <time
              dateTime={item.createdAt}
              className="text-xs font-semibold tracking-[0.1em] text-[var(--color-muted)] uppercase"
            >
              {dateFormatter.format(new Date(item.createdAt))}
            </time>
            <h1 className="font-display text-3xl font-bold tracking-tight text-white uppercase sm:text-5xl">
              {item.title}
            </h1>
          </header>

          {item.image && (
            <div className="relative aspect-[16/9] overflow-hidden border border-[var(--color-border)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
            </div>
          )}

          <p className="text-base leading-relaxed whitespace-pre-line text-white/85 sm:text-lg">
            {item.content}
          </p>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}

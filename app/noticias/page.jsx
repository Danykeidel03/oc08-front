import Link from "next/link";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { backendUrl } from "@/lib/backend";
import { SITE_URL } from "@/lib/site";

const title = "Noticias — Orgullo Cazurro";
const description =
  "Todos los anuncios y novedades de Orgullo Cazurro: desplazamientos, campañas, material y avisos del grupo.";

export const metadata = {
  title,
  description,
  alternates: {
    canonical: "/noticias",
  },
  openGraph: {
    title,
    description,
    url: `${SITE_URL}/noticias`,
    siteName: "Orgullo Cazurro",
    images: [
      {
        url: "/images/stadium.jpeg",
        width: 2048,
        height: 1152,
        alt: "Grada del estadio en un día de partido",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/stadium.jpeg"],
  },
};

export const revalidate = 300;

const dateFormatter = new Intl.DateTimeFormat("es-ES", { dateStyle: "long" });
const EXCERPT_LENGTH = 160;

function excerpt(text) {
  if (text.length <= EXCERPT_LENGTH) return text;
  return `${text.slice(0, EXCERPT_LENGTH).trimEnd()}…`;
}

async function getNews() {
  try {
    const res = await fetch(backendUrl("/api/news"), { next: { revalidate: 300 } });

    if (!res.ok) return [];

    return res.json();
  } catch {
    return [];
  }
}

export default async function NoticiasPage() {
  const news = await getNews();

  return (
    <>
      <SiteHeader />
      <main className="mx-auto min-h-screen max-w-6xl px-6 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="font-display text-4xl font-bold tracking-tight text-white uppercase sm:text-5xl">
            Noticias
          </h1>
          <p className="mt-4 text-[var(--color-muted)]">
            Lo último del grupo, de primera mano.
          </p>
        </div>

        {news.length === 0 ? (
          <p className="mt-16 text-center text-[var(--color-muted)]">
            Todavía no hay noticias publicadas.
          </p>
        ) : (
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {news.map((item) => (
              <article
                key={item.id}
                className="relative flex flex-col overflow-hidden border border-[var(--color-border)] bg-[var(--color-bg-elevated)] shadow-[var(--shadow-card)]"
              >
                {item.image && (
                  <div className="relative aspect-[16/10] overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
                <div className="flex flex-1 flex-col gap-2 p-5">
                  <time
                    dateTime={item.createdAt}
                    className="text-xs font-semibold tracking-[0.1em] text-[var(--color-muted)] uppercase"
                  >
                    {dateFormatter.format(new Date(item.createdAt))}
                  </time>
                  <h2 className="font-display text-lg font-bold text-white">
                    <Link href={`/noticias/${item.id}`} className="after:absolute after:inset-0 hover:underline">
                      {item.title}
                    </Link>
                  </h2>
                  <p className="text-sm text-[var(--color-muted)]">{excerpt(item.content)}</p>
                  <span className="mt-auto pt-2 text-xs font-semibold tracking-[0.1em] text-white uppercase">
                    Leer más →
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
      <SiteFooter />
    </>
  );
}

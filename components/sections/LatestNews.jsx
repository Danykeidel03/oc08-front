import { backendUrl } from "@/lib/backend";

const MAX_ITEMS = 3;
const EXCERPT_LENGTH = 140;

async function getLatestNews() {
  try {
    const res = await fetch(backendUrl("/api/news"), {
      next: { revalidate: 300 },
    });

    if (!res.ok) return [];

    const news = await res.json();
    return news.slice(0, MAX_ITEMS);
  } catch {
    return [];
  }
}

function excerpt(text) {
  if (text.length <= EXCERPT_LENGTH) return text;
  return `${text.slice(0, EXCERPT_LENGTH).trimEnd()}…`;
}

export async function LatestNews() {
  const news = await getLatestNews();

  if (news.length === 0) return null;

  return (
    <section id="noticias" className="mx-auto max-w-6xl px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-3xl font-bold tracking-tight text-white uppercase sm:text-4xl">
          Últimos anuncios
        </h2>
        <p className="mt-4 text-[var(--color-muted)]">
          Lo último del grupo, de primera mano.
        </p>
      </div>

      <div className="mx-auto mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {news.map((item) => (
          <article
            key={item.id}
            className="flex flex-col overflow-hidden border border-[var(--color-border)] bg-[var(--color-bg-elevated)] shadow-[var(--shadow-card)]"
          >
            {item.image && (
              <div className="relative aspect-[16/10] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover"
                />
              </div>
            )}
            <div className="flex flex-1 flex-col gap-2 p-5">
              <h3 className="font-display text-lg font-bold text-white">{item.title}</h3>
              <p className="text-sm text-[var(--color-muted)]">{excerpt(item.content)}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

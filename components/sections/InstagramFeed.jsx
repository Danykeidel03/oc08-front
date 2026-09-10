import { backendUrl } from "@/lib/backend";

async function getRecentPosts() {
  try {
    const res = await fetch(backendUrl("/api/instagram/recent"), {
      next: { revalidate: 600 },
    });

    if (!res.ok) return [];

    return res.json();
  } catch {
    return [];
  }
}

function thumbnailFor(post) {
  return post.media_type === "VIDEO" ? post.thumbnail_url : post.media_url;
}

export async function InstagramFeed() {
  const posts = await getRecentPosts();

  if (posts.length === 0) return null;

  return (
    <section id="instagram" className="mx-auto max-w-6xl px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-serif text-3xl text-white sm:text-4xl">Síguenos en Instagram</h2>
        <svg
          viewBox="0 0 120 12"
          className="mx-auto mt-3 h-3 w-28 text-[var(--color-accent)]"
          aria-hidden="true"
        >
          <path
            d="M2 6c8-8 12 8 20 0s12-8 20 0 12 8 20 0 12-8 20 0 12 8 18 0"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-3 sm:grid-cols-3">
        {posts.map((post) => (
          <a
            key={post.id}
            href={post.permalink}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block aspect-square overflow-hidden bg-[var(--color-bg-elevated)]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={thumbnailFor(post)}
              alt={post.caption?.slice(0, 80) ?? "Publicación de Instagram"}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition group-hover:bg-black/50 group-hover:opacity-100">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                aria-hidden="true"
                className="h-9 w-9 text-white"
              >
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
              </svg>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

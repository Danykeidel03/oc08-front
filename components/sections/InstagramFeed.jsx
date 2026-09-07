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
        <h2 className="font-display text-3xl font-bold tracking-tight text-white uppercase sm:text-4xl">
          Síguenos en Instagram
        </h2>
        <p className="mt-4 text-[var(--color-muted)]">@orgullocazurro</p>
      </div>

      <div className="mx-auto mt-16 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
        {posts.map((post) => (
          <a
            key={post.id}
            href={post.permalink}
            target="_blank"
            rel="noopener noreferrer"
            className="relative block aspect-square overflow-hidden bg-[var(--color-bg-elevated)]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={thumbnailFor(post)}
              alt={post.caption?.slice(0, 80) ?? "Publicación de Instagram"}
              className="h-full w-full object-cover transition-transform hover:scale-105"
            />
          </a>
        ))}
      </div>
    </section>
  );
}

import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Button } from "@/components/ui/Button";
import { backendUrl } from "@/lib/backend";
import { SITE_URL } from "@/lib/site";
import styles from "./page.module.css";

export const dynamic = "force-dynamic";

const BADGE_LABELS = {
  nuevo: "Nuevo",
  drop: "Drop",
  limitado: "Limitado",
};

async function getProduct(slug) {
  const res = await fetch(backendUrl(`/api/products/${slug}`), {
    cache: "no-store",
  });

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    throw new Error("No se pudo cargar el producto");
  }

  return res.json();
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return { title: "Producto no encontrado — Orgullo Cazurro" };
  }

  const title = `${product.name} — Orgullo Cazurro`;
  const description = product.description.slice(0, 160);
  const image = product.images[0]?.url ?? "/images/stadium.jpeg";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/tienda/${product.slug}`,
      siteName: "Orgullo Cazurro",
      images: [{ url: image, width: 1200, height: 1200, alt: product.name }],
      locale: "es_ES",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  const [mainImage, ...restImages] = product.images;

  return (
    <>
      <SiteHeader />
      <main className={styles.page}>
        <Link href="/tienda" className={styles.backLink}>
          <svg
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden="true"
            className={styles.backLink__icon}
          >
            <path
              d="M16 10H4M9 5l-5 5 5 5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Tienda
        </Link>

        <div className={styles.layout}>
          <div className={styles.gallery}>
            <div className={styles.mainImage}>
              {mainImage && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={mainImage.url}
                  alt={product.name}
                  className={styles.mainImage__img}
                />
              )}
            </div>

            {restImages.length > 0 && (
              <div className={styles.thumbs}>
                {restImages.map((image) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={image.id}
                    src={image.url}
                    alt={product.name}
                    className={styles.thumbs__img}
                  />
                ))}
              </div>
            )}
          </div>

          <div className={styles.info}>
            {product.badge && (
              <span className={styles.badge}>
                {BADGE_LABELS[product.badge] ?? product.badge}
              </span>
            )}

            <p className={styles.category}>{product.category}</p>

            <h1 className={styles.title}>{product.name}</h1>

            <p className={styles.price}>{product.price} €</p>

            <p className={styles.description}>{product.description}</p>

            <Button type="button" variant="primary" disabled className={styles.buyButton}>
              Comprar (próximamente)
            </Button>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

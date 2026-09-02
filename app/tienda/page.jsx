import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ProductCard } from "@/components/tienda/ProductCard";
import { backendUrl } from "@/lib/backend";
import { SITE_URL } from "@/lib/site";
import styles from "./page.module.css";

const title = "Tienda — Orgullo Cazurro";
const description =
  "Camisetas, sudaderas, banderas y material de identidad de Orgullo Cazurro, la afición de la Cultural y Deportiva Leonesa.";

export const metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: `${SITE_URL}/tienda`,
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

export const dynamic = "force-dynamic";

async function getProducts() {
  const res = await fetch(backendUrl("/api/products"), { cache: "no-store" });

  if (!res.ok) {
    throw new Error("No se pudo cargar el catálogo");
  }

  return res.json();
}

export default async function TiendaPage() {
  const products = await getProducts();

  return (
    <>
      <SiteHeader />
      <main className={styles.page}>
        <div className={styles.intro}>
          <h1 className={styles.title}>Tienda</h1>
          <p className={styles.subtitle}>
            Material de identidad, poca tirada y bien cuidado.
          </p>
        </div>

        {products.length === 0 ? (
          <p className={styles.empty}>Todavía no hay productos disponibles.</p>
        ) : (
          <div className={styles.grid}>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
      <SiteFooter />
    </>
  );
}

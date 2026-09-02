import { backendUrl } from "@/lib/backend";
import { SITE_URL } from "@/lib/site";

async function getProducts() {
  try {
    const res = await fetch(backendUrl("/api/products"));

    if (!res.ok) {
      return [];
    }

    return res.json();
  } catch {
    return [];
  }
}

export default async function sitemap() {
  const products = await getProducts();

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/tienda`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...products.map((product) => ({
      url: `${SITE_URL}/tienda/${product.slug}`,
      lastModified: product.updatedAt,
      changeFrequency: "weekly",
      priority: 0.6,
    })),
  ];
}

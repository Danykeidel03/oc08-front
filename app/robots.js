import { SITE_URL } from "@/lib/site";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/panel", "/carrito", "/checkout"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}

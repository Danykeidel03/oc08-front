export type ProductCategory =
  | "camisetas"
  | "sudaderas"
  | "banderas"
  | "accesorios"
  | "fanzines";

export type ProductBadge = "nuevo" | "drop" | "limitado";

export type ProductImage = {
  id: string;
  url: string;
  position: number;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: string;
  category: ProductCategory;
  badge: ProductBadge | null;
  sizes: string[] | null;
  inStock: boolean;
  enabled: boolean;
  images: ProductImage[];
  createdAt: string;
  updatedAt: string;
};

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  "camisetas",
  "sudaderas",
  "banderas",
  "accesorios",
  "fanzines",
];

export const PRODUCT_BADGES: ProductBadge[] = ["nuevo", "drop", "limitado"];

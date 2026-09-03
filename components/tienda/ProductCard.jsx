import Link from "next/link";
import { quickAddToCart } from "@/app/carrito/actions";
import styles from "./ProductCard.module.css";

const BADGE_LABELS = {
  nuevo: "Nuevo",
  drop: "Drop",
  limitado: "Limitado",
};

export function ProductCard({ product }) {
  const image = product.images[0];

  return (
    <div className={styles.card}>
      <Link href={`/tienda/${product.slug}`} className={styles.card__link}>
        <div className={styles.card__media}>
          {image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={image.url} alt={product.name} className={styles.card__image} />
          )}

          {product.badge && (
            <span className={styles.card__badge}>
              {BADGE_LABELS[product.badge] ?? product.badge}
            </span>
          )}
        </div>

        <div className={styles.card__body}>
          <div>
            <h3 className={styles.card__title}>{product.name}</h3>
            <p className={styles.card__category}>{product.category}</p>
          </div>

          <div className={styles.card__footer}>
            <span className={styles.card__price}>{product.price} €</span>
            <span className={styles.card__cta}>Ver producto</span>
          </div>
        </div>
      </Link>

      <form action={quickAddToCart} className={styles.card__addForm}>
        <input type="hidden" name="productId" value={product.id} />
        <input type="hidden" name="quantity" value="1" />
        <button type="submit" disabled={!product.inStock} className={styles.card__addButton}>
          {product.inStock ? "Añadir al carrito" : "Sin stock"}
        </button>
      </form>
    </div>
  );
}

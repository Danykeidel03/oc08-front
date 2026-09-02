import Link from "next/link";
import styles from "./ProductCard.module.css";

const BADGE_LABELS = {
  nuevo: "Nuevo",
  drop: "Drop",
  limitado: "Limitado",
};

export function ProductCard({ product }) {
  const image = product.images[0];

  return (
    <Link href={`/tienda/${product.slug}`} className={styles.card}>
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
  );
}

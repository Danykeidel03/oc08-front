"use client";

import { useActionState, useEffect, useState } from "react";
import { addToCart } from "@/app/carrito/actions";
import styles from "./ProductCard.module.css";

const initialState = { error: null, success: false };
const ADDED_FEEDBACK_MS = 2000;

export function AddToCartButton({ productId, inStock }) {
  const [state, formAction, pending] = useActionState(addToCart, initialState);
  const [showAdded, setShowAdded] = useState(false);

  useEffect(() => {
    if (!state.success) return;

    setShowAdded(true);
    const timer = setTimeout(() => setShowAdded(false), ADDED_FEEDBACK_MS);
    return () => clearTimeout(timer);
  }, [state]);

  if (!inStock) {
    return (
      <div className={styles.card__addForm}>
        <button type="button" disabled className={styles.card__addButton}>
          Sin stock
        </button>
      </div>
    );
  }

  const label = pending
    ? "Añadiendo..."
    : showAdded
      ? "✓ Añadido"
      : state.error
        ? "No se pudo añadir"
        : "Añadir al carrito";

  return (
    <form action={formAction} className={styles.card__addForm}>
      <input type="hidden" name="productId" value={productId} />
      <input type="hidden" name="quantity" value="1" />
      <button
        type="submit"
        disabled={pending}
        aria-live="polite"
        className={`${styles.card__addButton} ${showAdded ? styles["card__addButton--added"] : ""}`}
      >
        {label}
      </button>
    </form>
  );
}

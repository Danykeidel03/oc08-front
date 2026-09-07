"use client";

import { useTransition } from "react";
import { deleteSliderImage, reorderSliderImages } from "./actions";

export function SliderImageList({ images }) {
  const [pending, startTransition] = useTransition();

  function move(index, direction) {
    const target = index + direction;
    if (target < 0 || target >= images.length) return;

    const reordered = [...images];
    [reordered[index], reordered[target]] = [reordered[target], reordered[index]];

    startTransition(() => reorderSliderImages(reordered.map((image) => image.id)));
  }

  function remove(id) {
    if (!confirm("¿Eliminar esta foto del banner?")) return;
    startTransition(() => deleteSliderImage(id));
  }

  if (images.length === 0) {
    return <p className="text-[color:var(--color-muted)]">Todavía no hay fotos en el slider.</p>;
  }

  return (
    <ul className="flex flex-col gap-3">
      {images.map((image, index) => (
        <li
          key={image.id}
          className="flex items-center justify-between gap-4 rounded-[var(--radius-md)] border border-[color:var(--color-border)] bg-[color:var(--color-bg-elevated)] p-4"
        >
          <div className="flex items-center gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image.url}
              alt=""
              className="h-14 w-24 rounded-[var(--radius-sm)] object-cover"
            />
            <span className="text-sm text-[color:var(--color-muted)]">Posición {index + 1}</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              disabled={pending || index === 0}
              onClick={() => move(index, -1)}
              className="text-sm text-[color:var(--color-muted)] underline disabled:opacity-40"
            >
              Subir
            </button>
            <button
              type="button"
              disabled={pending || index === images.length - 1}
              onClick={() => move(index, 1)}
              className="text-sm text-[color:var(--color-muted)] underline disabled:opacity-40"
            >
              Bajar
            </button>
            <button
              type="button"
              disabled={pending}
              onClick={() => remove(image.id)}
              className="text-sm text-[color:var(--color-muted)] underline disabled:opacity-60"
            >
              Eliminar
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

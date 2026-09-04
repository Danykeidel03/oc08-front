const STATUS_LABELS = {
  pending: "Pendiente",
  paid: "Pagado",
  cancelled: "Cancelado",
};

const STATUS_CLASSES = {
  pending: "bg-amber-500/20 text-amber-300",
  paid: "bg-emerald-500/20 text-emerald-300",
  cancelled: "bg-red-500/20 text-red-300",
};

export function OrderStatusBadge({ status }) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${STATUS_CLASSES[status] ?? "bg-white/10 text-white"}`}
    >
      {STATUS_LABELS[status] ?? status}
    </span>
  );
}

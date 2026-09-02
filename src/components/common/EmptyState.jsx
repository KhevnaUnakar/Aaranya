import { Leaf } from "lucide-react";

export default function EmptyState({
  title = "Nothing here yet",
  description = "Please check back soon.",
  actionLabel,
  onAction,
  tone = "default",
}) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-4 py-20 text-center">
      <div
        className={`flex h-14 w-14 items-center justify-center rounded-full ${
          tone === "error" ? "bg-plum-100 text-plum-600" : "bg-moss-100 text-moss-600"
        }`}
      >
        <Leaf size={22} strokeWidth={1.5} />
      </div>
      <h3 className="font-display text-xl text-ink">{title}</h3>
      <p className="text-sm text-ink-faint">{description}</p>
      {actionLabel && onAction && (
        <button onClick={onAction} className="btn-secondary mt-2">
          {actionLabel}
        </button>
      )}
    </div>
  );
}

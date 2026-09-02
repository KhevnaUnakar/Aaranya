export default function StatusBadge({ active }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
        active ? "bg-moss-100 text-moss-700" : "bg-ink/[0.06] text-ink-faint"
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${active ? "bg-moss-500" : "bg-ink-faint"}`} />
      {active ? "Active" : "Inactive"}
    </span>
  );
}

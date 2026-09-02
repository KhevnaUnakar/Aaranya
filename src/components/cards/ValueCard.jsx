export default function ValueCard({ icon: Icon, title, description, index }) {
  return (
    <div className="card-surface flex flex-col gap-4 p-7">
      <div className="flex items-center justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-moss-100 text-moss-600">
          <Icon size={22} strokeWidth={1.5} />
        </div>
        <span className="font-display text-sm text-ink-faint/60">{index}</span>
      </div>
      <h3 className="font-display text-lg text-ink">{title}</h3>
      <p className="text-sm leading-relaxed text-ink-faint">{description}</p>
    </div>
  );
}

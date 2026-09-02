import { Menu } from "lucide-react";

export default function Topbar({ title, onMenuClick }) {
  return (
    <div className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-ink/[0.06] bg-alabaster/90 px-5 backdrop-blur-md lg:px-8">
      <button
        onClick={onMenuClick}
        className="flex h-9 w-9 items-center justify-center rounded-full text-ink lg:hidden"
        aria-label="Open menu"
      >
        <Menu size={20} />
      </button>
      <h1 className="font-display text-lg text-ink">{title}</h1>
    </div>
  );
}

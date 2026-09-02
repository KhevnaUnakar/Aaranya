import { Gem, Sparkles, Leaf, Sun, Flower2 } from "lucide-react";

// Deterministic gradient + icon pairing keyed off a string (image key/name),
// so the same "image" always renders the same placeholder — used in place
// of real photography until brand assets are supplied.

const PALETTES = [
  ["from-moss-100 to-alabaster-dim", "text-moss-600"],
  ["from-plum-100 to-alabaster-dim", "text-plum-600"],
  ["from-gold-200 to-alabaster-dim", "text-gold-600"],
  ["from-alabaster-dim to-moss-100", "text-moss-500"],
];

const ICONS = [Gem, Sparkles, Leaf, Sun, Flower2];

function hashString(str = "") {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export default function ImagePlaceholder({ label = "", className = "", iconSize = 32 }) {
  const hash = hashString(label);
  const [gradient, iconColor] = PALETTES[hash % PALETTES.length];
  const Icon = ICONS[hash % ICONS.length];

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-br ${gradient} ${className}`}
    >
      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/30 blur-2xl" />
      <div className="absolute -bottom-8 -left-8 h-28 w-28 rounded-full bg-white/20 blur-2xl" />
      <Icon size={iconSize} strokeWidth={1.25} className={`relative ${iconColor}`} />
    </div>
  );
}

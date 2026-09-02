import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import ImagePlaceholder from "../common/ImagePlaceholder.jsx";

export default function CrystalCard({ crystal }) {
  return (
    <Link
      to={`/crystals/${crystal.slug}`}
      className="card-surface group flex flex-col overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-soft"
    >
      <ImagePlaceholder label={crystal.image || crystal.name} className="h-52 w-full" iconSize={36} />
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-xl text-ink">{crystal.name}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-faint">{crystal.shortDescription}</p>
        <div className="mt-5 flex items-center justify-between border-t border-ink/[0.06] pt-4">
          <span className="text-xs font-semibold uppercase tracking-wide text-plum-600">{crystal.chakra} Chakra</span>
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-ink transition group-hover:text-moss-600">
            Explore
            <ArrowUpRight size={16} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}

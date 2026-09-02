import { Link } from "react-router-dom";
import ImagePlaceholder from "../common/ImagePlaceholder.jsx";

export default function ProductCard({ product }) {
  return (
    <Link
      to={`/products/${product.slug}`}
      className="card-surface group flex flex-col overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-soft"
    >
      <ImagePlaceholder label={product.images?.[0] || product.name} className="h-56 w-full" iconSize={30} />
      <div className="flex flex-1 flex-col p-5">
        <p className="eyebrow mb-1">{product.type}</p>
        <h3 className="font-display text-lg text-ink">{product.name}</h3>
        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="font-display text-lg text-ink">{product.price}</span>
          <span className="rounded-full border border-ink/15 px-4 py-2 text-xs font-semibold transition group-hover:border-ink group-hover:bg-ink group-hover:text-alabaster">
            View Details
          </span>
        </div>
      </div>
    </Link>
  );
}

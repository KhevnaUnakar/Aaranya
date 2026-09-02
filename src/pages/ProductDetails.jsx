import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Gem } from "lucide-react";
import { useFetch } from "../hooks/useFetch.js";
import { getProductBySlug } from "../api/productsApi.js";
import { getCrystals } from "../api/crystalsApi.js";
import ImagePlaceholder from "../components/common/ImagePlaceholder.jsx";
import Loader from "../components/common/Loader.jsx";
import EmptyState from "../components/common/EmptyState.jsx";

export default function ProductDetails() {
  const { slug } = useParams();
  const { data: product, isLoading } = useFetch(() => getProductBySlug(slug), [slug]);
  const { data: crystals } = useFetch(getCrystals, []);
  const [activeImage, setActiveImage] = useState(0);

  if (isLoading) return <Loader label="Loading product" />;

  if (!product) {
    return (
      <div className="container-page py-24">
        <EmptyState
          title="Product not found"
          description="This item may no longer be available."
          actionLabel="Back to accessories"
          onAction={() => (window.location.href = "/products")}
        />
      </div>
    );
  }

  const relatedCrystal = (crystals || []).find((c) => c.name === product.crystal);
  const images = product.images?.length ? product.images : [product.name];

  return (
    <div className="container-page py-10 lg:py-14">
      <Link to="/products" className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-faint hover:text-ink">
        <ArrowLeft size={15} /> All accessories
      </Link>

      <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-2">
        <div>
          <ImagePlaceholder label={images[activeImage]} className="h-96 w-full rounded-2xl" iconSize={48} />
          {images.length > 1 && (
            <div className="mt-4 flex gap-3">
              {images.map((img, i) => (
                <button
                  key={img}
                  onClick={() => setActiveImage(i)}
                  className={`h-20 w-20 overflow-hidden rounded-xl border-2 transition ${
                    activeImage === i ? "border-moss-500" : "border-transparent"
                  }`}
                >
                  <ImagePlaceholder label={img} className="h-full w-full" iconSize={20} />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <p className="eyebrow mb-3">{product.type}</p>
          <h1 className="font-display text-4xl text-ink sm:text-5xl">{product.name}</h1>
          <p className="mt-5 font-display text-2xl text-moss-600">{product.price}</p>
          <p className="mt-5 text-lg leading-relaxed text-ink-faint">{product.description}</p>

          {relatedCrystal && (
            <Link
              to={`/crystals/${relatedCrystal.slug}`}
              className="mt-8 flex items-center gap-4 rounded-2xl border border-ink/10 p-4 transition hover:border-moss-300"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-moss-100 text-moss-600">
                <Gem size={20} strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-ink-faint">Featuring</p>
                <p className="font-display text-lg text-ink">{relatedCrystal.name}</p>
              </div>
            </Link>
          )}

          <Link to="/contact" className="btn-primary mt-8">
            Inquire About This Piece
          </Link>
          <p className="mt-4 text-xs text-ink-faint">
            Online checkout is coming soon. For now, reach out through our contact page to arrange a purchase.
          </p>
        </div>
      </div>
    </div>
  );
}

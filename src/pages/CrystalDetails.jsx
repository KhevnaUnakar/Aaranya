import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Check } from "lucide-react";
import { useFetch } from "../hooks/useFetch.js";
import { getCrystalBySlug } from "../api/crystalsApi.js";
import { getProducts } from "../api/productsApi.js";
import ImagePlaceholder from "../components/common/ImagePlaceholder.jsx";
import ProductCard from "../components/cards/ProductCard.jsx";
import Loader from "../components/common/Loader.jsx";
import EmptyState from "../components/common/EmptyState.jsx";
import SectionHeading from "../components/common/SectionHeading.jsx";

export default function CrystalDetails() {
  const { slug } = useParams();
  const { data: crystal, isLoading } = useFetch(() => getCrystalBySlug(slug), [slug]);
  const { data: allProducts } = useFetch(getProducts, []);

  if (isLoading) return <Loader label="Loading crystal" />;

  if (!crystal) {
    return (
      <div className="container-page py-24">
        <EmptyState
          title="Crystal not found"
          description="This crystal may no longer be in the collection."
          actionLabel="Back to crystals"
          onAction={() => (window.location.href = "/crystals")}
        />
      </div>
    );
  }

  const relatedProducts = (allProducts || []).filter((p) => p.crystal === crystal.name).slice(0, 3);

  return (
    <div>
      <div className="container-page pt-8">
        <Link to="/crystals" className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-faint hover:text-ink">
          <ArrowLeft size={15} /> All crystals
        </Link>
      </div>

      <div className="container-page grid grid-cols-1 gap-12 py-10 lg:grid-cols-2 lg:py-14">
        <ImagePlaceholder label={crystal.image} className="h-80 w-full rounded-2xl lg:h-full lg:min-h-[420px]" iconSize={48} />

        <div>
          <h1 className="font-display text-4xl text-ink sm:text-5xl">{crystal.name}</h1>
          <p className="mt-5 text-lg leading-relaxed text-ink-faint">{crystal.description}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <span className="rounded-full bg-plum-100 px-4 py-2 text-sm font-semibold text-plum-600">
              {crystal.chakra} Chakra
            </span>
            {crystal.zodiac?.map((sign) => (
              <span key={sign} className="rounded-full bg-gold-200/60 px-4 py-2 text-sm font-semibold text-gold-600">
                {sign}
              </span>
            ))}
          </div>

          {crystal.benefits?.length > 0 && (
            <div className="mt-10 border-t border-ink/[0.06] pt-8">
              <h3 className="font-display text-xl text-ink">Traditional associations</h3>
              <ul className="mt-5 space-y-3">
                {crystal.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3 text-sm text-ink-soft">
                    <Check size={16} className="mt-0.5 shrink-0 text-moss-600" strokeWidth={2} />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div className="bg-alabaster-dim py-16 lg:py-20">
          <div className="container-page">
            <SectionHeading eyebrow="Wear it" title={`Products featuring ${crystal.name}`} />
            <div className="mt-10 grid grid-cols-2 gap-6 lg:grid-cols-3">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

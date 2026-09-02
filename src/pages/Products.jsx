import { useFetch } from "../hooks/useFetch.js";
import { getProducts } from "../api/productsApi.js";
import SectionHeading from "../components/common/SectionHeading.jsx";
import ProductCard from "../components/cards/ProductCard.jsx";
import Loader from "../components/common/Loader.jsx";
import EmptyState from "../components/common/EmptyState.jsx";

export default function Products() {
  const { data: products, isLoading, error, refetch } = useFetch(getProducts, []);

  return (
    <div className="container-page py-16 lg:py-24">
      <SectionHeading
        eyebrow="Accessories catalogue"
        title="Wear the practice"
        description="A browsing catalogue for now — ordering online is coming soon. In the meantime, reach out through our contact page to purchase any piece."
        align="center"
      />

      <div className="mt-14">
        {isLoading && <Loader label="Loading accessories" />}
        {!isLoading && error && (
          <EmptyState title="Something went wrong" description={error} tone="error" actionLabel="Try again" onAction={refetch} />
        )}
        {!isLoading && !error && (!products || products.length === 0) && (
          <EmptyState title="No products available" description="Please check back soon." />
        )}
        {!isLoading && !error && products && products.length > 0 && (
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

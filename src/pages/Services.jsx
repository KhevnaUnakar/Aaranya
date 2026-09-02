import { useFetch } from "../hooks/useFetch.js";
import { getServices } from "../api/servicesApi.js";
import SectionHeading from "../components/common/SectionHeading.jsx";
import ServiceCard from "../components/cards/ServiceCard.jsx";
import Loader from "../components/common/Loader.jsx";
import EmptyState from "../components/common/EmptyState.jsx";

export default function Services() {
  const { data: services, isLoading, error, refetch } = useFetch(getServices, []);

  return (
    <div className="container-page py-16 lg:py-24">
      <SectionHeading
        eyebrow="Guidance services"
        title="Sessions for wherever you're standing"
        description="Every service below is a starting point, not a fixed script. Choose the format that fits the question you're carrying."
        align="center"
      />

      <div className="mt-14">
        {isLoading && <Loader label="Loading services" />}
        {!isLoading && error && (
          <EmptyState title="Something went wrong" description={error} tone="error" actionLabel="Try again" onAction={refetch} />
        )}
        {!isLoading && !error && (!services || services.length === 0) && (
          <EmptyState title="No services available" description="Please check back soon — new sessions are added regularly." />
        )}
        {!isLoading && !error && services && services.length > 0 && (
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

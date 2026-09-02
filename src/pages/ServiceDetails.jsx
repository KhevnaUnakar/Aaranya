import { useParams, Link } from "react-router-dom";
import { Clock, Tag, Check, ArrowLeft } from "lucide-react";
import { useFetch } from "../hooks/useFetch.js";
import { getServiceBySlug, getRelatedServices } from "../api/servicesApi.js";
import ImagePlaceholder from "../components/common/ImagePlaceholder.jsx";
import ServiceCard from "../components/cards/ServiceCard.jsx";
import Loader from "../components/common/Loader.jsx";
import EmptyState from "../components/common/EmptyState.jsx";
import SectionHeading from "../components/common/SectionHeading.jsx";

export default function ServiceDetails() {
  const { slug } = useParams();
  const { data: service, isLoading } = useFetch(() => getServiceBySlug(slug), [slug]);
  const { data: related } = useFetch(() => (service ? getRelatedServices(slug) : Promise.resolve([])), [slug, service?.id]);

  if (isLoading) return <Loader label="Loading service" />;

  if (!service) {
    return (
      <div className="container-page py-24">
        <EmptyState
          title="Service not found"
          description="This service may have been renamed or is no longer offered."
          actionLabel="Back to services"
          onAction={() => (window.location.href = "/services")}
        />
      </div>
    );
  }

  return (
    <div>
      <div className="container-page pt-8">
        <Link to="/services" className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-faint hover:text-ink">
          <ArrowLeft size={15} /> All services
        </Link>
      </div>

      <div className="container-page grid grid-cols-1 gap-12 py-10 lg:grid-cols-2 lg:py-14">
        <ImagePlaceholder label={service.image} className="h-80 w-full rounded-2xl lg:h-full lg:min-h-[420px]" iconSize={48} />

        <div>
          <p className="eyebrow mb-3">{service.category}</p>
          <h1 className="font-display text-4xl text-ink sm:text-5xl">{service.title}</h1>
          <p className="mt-5 text-lg leading-relaxed text-ink-faint">{service.fullDescription}</p>

          <div className="mt-8 flex flex-wrap gap-6">
            {service.price && (
              <div className="flex items-center gap-2 text-ink">
                <Tag size={17} strokeWidth={1.5} className="text-moss-600" />
                <span className="font-display text-xl">{service.price}</span>
              </div>
            )}
            {service.duration && (
              <div className="flex items-center gap-2 text-ink">
                <Clock size={17} strokeWidth={1.5} className="text-moss-600" />
                <span className="text-sm font-medium">{service.duration}</span>
              </div>
            )}
          </div>

          <Link to="/contact" className="btn-primary mt-8">
            Book This Session
          </Link>

          {service.benefits?.length > 0 && (
            <div className="mt-10 border-t border-ink/[0.06] pt-8">
              <h3 className="font-display text-xl text-ink">What you can expect</h3>
              <ul className="mt-5 space-y-3">
                {service.benefits.map((benefit) => (
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

      {related && related.length > 0 && (
        <div className="bg-alabaster-dim py-16 lg:py-20">
          <div className="container-page">
            <SectionHeading eyebrow="Continue exploring" title="Related services" />
            <div className="mt-10 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((s) => (
                <ServiceCard key={s.id} service={s} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

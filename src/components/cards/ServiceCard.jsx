import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import ImagePlaceholder from "../common/ImagePlaceholder.jsx";

export default function ServiceCard({ service }) {
  return (
    <Link
      to={`/services/${service.slug}`}
      className="card-surface group flex flex-col overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-soft"
    >
      <ImagePlaceholder label={service.image || service.title} className="h-48 w-full" />
      <div className="flex flex-1 flex-col p-6">
        {service.duration && <p className="eyebrow mb-2">{service.duration}</p>}
        <h3 className="font-display text-xl text-ink">{service.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-faint">{service.shortDescription}</p>
        <div className="mt-5 flex items-center justify-between border-t border-ink/[0.06] pt-4">
          {service.price && <span className="font-display text-lg text-moss-600">{service.price}</span>}
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-ink transition group-hover:text-moss-600">
            Learn More
            <ArrowUpRight size={16} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}

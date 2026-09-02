import { useFetch } from "../hooks/useFetch.js";
import { getCrystals } from "../api/crystalsApi.js";
import SectionHeading from "../components/common/SectionHeading.jsx";
import CrystalCard from "../components/cards/CrystalCard.jsx";
import CrystalClusterVisual from "../components/common/CrystalClusterVisual.jsx";
import Loader from "../components/common/Loader.jsx";
import EmptyState from "../components/common/EmptyState.jsx";
import { useTiltEffect } from "../hooks/useTiltEffect.js";

export default function Crystals() {
  const { data: crystals, isLoading, error, refetch } = useFetch(getCrystals, []);
  const clusterTiltRef = useTiltEffect({ max: 4 });

  return (
    <div className="container-page py-16 lg:py-24">
      <SectionHeading
        eyebrow="The crystal library"
        title="Stones, chosen with care"
        description="Each crystal is sourced for quality and paired with honest, non-exaggerated associations — a starting point for your own intuition, not a substitute for it."
        align="center"
      />

      <div className="mx-auto mt-10 max-w-2xl">
        <div ref={clusterTiltRef} className="transition-transform duration-150 ease-out">
          <CrystalClusterVisual className="h-64 w-full overflow-hidden rounded-[1.75rem] border border-ink/[0.06] bg-gradient-to-br from-plum-100/40 via-alabaster to-gold-200/30 shadow-card sm:h-80" />
        </div>
      </div>

      <div className="mt-14">
        {isLoading && <Loader label="Loading crystals" />}
        {!isLoading && error && (
          <EmptyState title="Something went wrong" description={error} tone="error" actionLabel="Try again" onAction={refetch} />
        )}
        {!isLoading && !error && (!crystals || crystals.length === 0) && (
          <EmptyState title="No crystals available" description="Please check back soon." />
        )}
        {!isLoading && !error && crystals && crystals.length > 0 && (
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {crystals.map((crystal) => (
              <CrystalCard key={crystal.id} crystal={crystal} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

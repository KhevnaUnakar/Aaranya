import { Link } from "react-router-dom";
import { ArrowUpRight, HeartHandshake, Compass, Gem as GemIcon, Sparkle } from "lucide-react";
import { useFetch } from "../hooks/useFetch.js";
import { getFeaturedServices } from "../api/servicesApi.js";
import { getFeaturedCrystals } from "../api/crystalsApi.js";
import { getFeaturedProducts } from "../api/productsApi.js";
import SectionHeading from "../components/common/SectionHeading.jsx";
import ImagePlaceholder from "../components/common/ImagePlaceholder.jsx";
import HeroCrystalVisual from "../components/common/HeroCrystalVisual.jsx";
import MoonArc from "../components/common/MoonArc.jsx";
import { usePointerParallax } from "../hooks/usePointerParallax.js";
import { useTiltEffect } from "../hooks/useTiltEffect.js";
import ServiceCard from "../components/cards/ServiceCard.jsx";
import CrystalCard from "../components/cards/CrystalCard.jsx";
import ProductCard from "../components/cards/ProductCard.jsx";
import ValueCard from "../components/cards/ValueCard.jsx";
import Loader from "../components/common/Loader.jsx";
import EmptyState from "../components/common/EmptyState.jsx";

const VALUES = [
  { icon: HeartHandshake, title: "Personalized Guidance", description: "Every session is shaped around your actual question, never a generic script." },
  { icon: Sparkle, title: "Meaningful Experiences", description: "We favor unhurried conversation over quick, one-line answers." },
  { icon: GemIcon, title: "Curated Crystal Collection", description: "Each stone is chosen for quality and clear, honest sourcing." },
  { icon: Compass, title: "A Journey of Self-Discovery", description: "Tools meant to build self-trust, not dependency on us." },
];

export default function Home() {
  const { data: services, isLoading: loadingServices } = useFetch(getFeaturedServices, []);
  const { data: crystals, isLoading: loadingCrystals } = useFetch(getFeaturedCrystals, []);
  const { data: products, isLoading: loadingProducts } = useFetch(getFeaturedProducts, []);

  const heroParallaxRef = usePointerParallax(14);
  const heroTiltRef = useTiltEffect({ max: 5 });

  return (
    <div>
      {/* HERO */}
      <section ref={heroParallaxRef} className="relative overflow-hidden">
        <div className="parallax-layer pointer-events-none absolute inset-0 bg-gold-arc" />
        <div className="container-page grid grid-cols-1 items-center gap-14 py-20 lg:grid-cols-12 lg:py-28">
          <div className="lg:col-span-7">
            <p className="eyebrow mb-5 animate-rise">Guidance, gently offered</p>
            <h1 className="animate-rise font-display text-5xl leading-[1.08] text-ink sm:text-6xl lg:text-[4.2rem]" style={{ animationDelay: "0.08s" }}>
              Discover Your
              <br />
              <span className="italic text-moss-600">Inner Journey</span>
            </h1>
            <p className="animate-rise mt-7 max-w-lg text-lg leading-relaxed text-ink-faint" style={{ animationDelay: "0.16s" }}>
              Tarot, numerology, and crystal wisdom for the questions that don't have easy answers.
              A calm space to slow down and listen inward — no predictions, no drama, just clarity.
            </p>
            <div className="animate-rise mt-9 flex flex-col gap-4 sm:flex-row" style={{ animationDelay: "0.24s" }}>
              <Link to="/services" className="btn-primary">
                Explore Our Services
                <ArrowUpRight size={16} />
              </Link>
              <Link to="/crystals" className="btn-secondary">
                Discover Crystals
              </Link>
            </div>
          </div>

          <div className="relative lg:col-span-5">
            <div className="relative mx-auto max-w-sm">
              <div className="parallax-layer-reverse absolute -inset-6 -z-10 rounded-[2.5rem] bg-moss-100/60 blur-2xl" />
              <div className="card-surface animate-drift overflow-hidden rounded-[2rem] p-2">
                {/* Inner wrapper carries the CSS tilt so it doesn't fight
                    the outer element's `animate-drift` keyframe animation. */}
                <div ref={heroTiltRef} className="transition-transform duration-150 ease-out">
                  <HeroCrystalVisual label="hero-main" className="h-80 w-full overflow-hidden rounded-[1.6rem] sm:h-96" />
                </div>
              </div>
              <MoonArc className="absolute -bottom-10 left-1/2 h-24 w-72 -translate-x-1/2" />
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="container-page py-20 lg:py-28">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <ImagePlaceholder label="about-founder" className="h-96 w-full rounded-2xl" iconSize={40} />
          </div>
          <div className="order-1 lg:order-2">
            <SectionHeading
              eyebrow="Our story"
              title="A quieter kind of guidance, rooted in nature"
              description="Aaranya began as a small circle in a forest clearing, and grew into a studio because people kept returning — not for certainty, but for space to think clearly. We still work the same way: unhurried, honest, and rooted in the land."
            />
            <Link to="/about" className="btn-secondary mt-8 inline-flex">
              Learn Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURED SERVICES */}
      <section className="bg-alabaster-dim py-20 lg:py-28">
        <div className="container-page">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading eyebrow="What we offer" title="Featured services" description="Four paths into the same practice: quiet, honest self-reflection." />
            <Link to="/services" className="hidden shrink-0 items-center gap-1 text-sm font-semibold text-ink hover:text-moss-600 sm:inline-flex">
              View all services <ArrowUpRight size={16} />
            </Link>
          </div>

          <div className="mt-12">
            {loadingServices && <Loader label="Loading services" />}
            {!loadingServices && (!services || services.length === 0) && <EmptyState title="No services yet" description="Featured services will appear here soon." />}
            {!loadingServices && services && services.length > 0 && (
              <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">
                {services.map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="container-page py-20 lg:py-28">
        <SectionHeading eyebrow="Why choose us" title="What makes a session with us different" align="center" description="Four things we hold onto in every reading, chart, and recommendation." />
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((value, i) => (
            <ValueCard key={value.title} {...value} index={`0${i + 1}`} />
          ))}
        </div>
      </section>

      {/* FEATURED CRYSTALS */}
      <section className="bg-plum-100/40 py-20 lg:py-28">
        <div className="container-page">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading eyebrow="The collection" title="Featured crystals" description="A small selection from our curated, ethically-sourced range." />
            <Link to="/crystals" className="hidden shrink-0 items-center gap-1 text-sm font-semibold text-ink hover:text-moss-600 sm:inline-flex">
              View all crystals <ArrowUpRight size={16} />
            </Link>
          </div>
          <div className="mt-12">
            {loadingCrystals && <Loader label="Loading crystals" />}
            {!loadingCrystals && crystals && crystals.length > 0 && (
              <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
                {crystals.slice(0, 3).map((crystal) => (
                  <CrystalCard key={crystal.id} crystal={crystal} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FEATURED ACCESSORIES */}
      <section className="container-page py-20 lg:py-28">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading eyebrow="Wear the practice" title="Featured accessories" description="Crystal bracelets, necklaces, and sets — a catalogue for now, a full shop soon." />
          <Link to="/products" className="hidden shrink-0 items-center gap-1 text-sm font-semibold text-ink hover:text-moss-600 sm:inline-flex">
            View all accessories <ArrowUpRight size={16} />
          </Link>
        </div>
        <div className="mt-12">
          {loadingProducts && <Loader label="Loading accessories" />}
          {!loadingProducts && products && products.length > 0 && (
            <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
              {products.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="container-page pb-24">
        <div className="relative overflow-hidden rounded-[2rem] bg-ink px-8 py-16 text-center sm:px-16">
          <div className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-plum-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 -right-16 h-56 w-56 rounded-full bg-gold-400/20 blur-3xl" />
          <p className="eyebrow relative mb-4 text-gold-400">Ready when you are</p>
          <h2 className="relative font-display text-3xl text-alabaster sm:text-4xl">
            Your next chapter doesn't need to start with certainty
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-alabaster/70">
            Book a reading, browse the crystal library, or simply explore — there's no wrong place to begin.
          </p>
          <div className="relative mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link to="/services" className="btn-primary bg-alabaster text-ink hover:bg-gold-200">
              Book a Session
            </Link>
            <Link to="/products" className="btn-secondary border-alabaster/30 text-alabaster hover:bg-alabaster hover:text-ink">
              Shop Accessories
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

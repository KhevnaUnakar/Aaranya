import { Heart, Feather, ShieldCheck, Sparkles } from "lucide-react";
import SectionHeading from "../components/common/SectionHeading.jsx";
import ImagePlaceholder from "../components/common/ImagePlaceholder.jsx";
import MoonArc from "../components/common/MoonArc.jsx";
import ValueCard from "../components/cards/ValueCard.jsx";

const VALUES = [
  { icon: Heart, title: "Compassion first", description: "Every session begins from care, not from performance or theatrics." },
  { icon: Feather, title: "Lightness of touch", description: "We offer perspective, never verdicts. You always leave with the choice in your hands." },
  { icon: ShieldCheck, title: "Honest sourcing", description: "Our crystals are sourced with transparency about origin and quality — no vague claims." },
  { icon: Sparkles, title: "Genuine curiosity", description: "We approach every question as new, because it is — even if we've heard something like it before." },
];

export default function About() {
  return (
    <div>
      <section className="container-page py-16 text-center lg:py-24">
        <p className="eyebrow mb-4">Our story</p>
        <h1 className="mx-auto max-w-3xl font-display text-4xl leading-tight text-ink sm:text-5xl">
          A quieter kind of guidance, rooted in nature
        </h1>
        <p className="mx-auto mt-4 text-xs font-semibold uppercase tracking-[0.25em] text-moss-600">
          Rooted in Nature. Guided Within.
        </p>
        <MoonArc variant="divider" className="mx-auto mt-10 h-5 w-64" />
      </section>

      <section className="container-page pb-20">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
          <ImagePlaceholder label="about-founder" className="h-96 w-full rounded-2xl" iconSize={44} />
          <div>
            <SectionHeading
              eyebrow="How we began"
              title="From a forest clearing to a studio"
              description="Aaranya began as a small circle gathering in a forest clearing outside the city, where a handful of us read cards, charted numbers, and sat with crystals pulled straight from the earth. What people kept coming back for wasn't a prediction — it was a conversation that helped them think more clearly about a choice already in front of them. That's the practice we've built the whole studio around."
            />
          </div>
        </div>
      </section>

      <section className="bg-alabaster-dim py-20 lg:py-24">
        <div className="container-page grid grid-cols-1 gap-14 lg:grid-cols-2">
          <SectionHeading
            eyebrow="Our mission"
            title="Guidance without the guesswork"
            description="We believe self-discovery tools work best when they're demystified, not dramatized. Every reading, chart, and recommendation we offer is meant to leave you steadier than you arrived — never more anxious, never more dependent on the next session."
          />
          <SectionHeading
            eyebrow="Our philosophy"
            title="Tools, not answers"
            description="Tarot, numerology, and crystal work are frameworks for reflection, not fixed predictions. We're careful never to promise certainty about the future — instead, we help you notice what you already sense but haven't put into words."
          />
        </div>
      </section>

      <section className="container-page py-20 lg:py-24">
        <SectionHeading eyebrow="What we value" title="Principles behind every session" align="center" />
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((value, i) => (
            <ValueCard key={value.title} {...value} index={`0${i + 1}`} />
          ))}
        </div>
      </section>
    </div>
  );
}

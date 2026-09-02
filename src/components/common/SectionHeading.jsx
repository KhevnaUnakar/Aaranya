export default function SectionHeading({ eyebrow, title, description, align = "left", light = false }) {
  return (
    <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow && <p className={`eyebrow mb-3 ${light ? "text-gold-400" : ""}`}>{eyebrow}</p>}
      <h2 className={`font-display text-3xl leading-tight sm:text-4xl ${light ? "text-alabaster" : "text-ink"}`}>
        {title}
      </h2>
      {description && (
        <p className={`mt-4 text-base leading-relaxed ${light ? "text-alabaster/70" : "text-ink-faint"}`}>
          {description}
        </p>
      )}
    </div>
  );
}

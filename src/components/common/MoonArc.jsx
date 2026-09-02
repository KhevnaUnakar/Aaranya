// The site's signature motif: eight moon phases traced along a slender arc.
// It appears in the hero (the full journey), as a section divider (a
// flattened rule), and as the loading indicator (one phase lit at a time) —
// each use encodes the same idea of gradual, cyclical progress.

const PHASES = [
  "M12 2a10 10 0 000 20V2z", // new -> partial fill approximations via clipPath below
];

function MoonPhase({ cx, cy, r, fraction, color }) {
  // fraction: 0 = new moon (all dark), 1 = full moon (all lit)
  const clipId = `moon-clip-${cx}-${cy}`;
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth="1" opacity="0.35" />
      <clipPath id={clipId}>
        <rect x={cx - r} y={cy - r} width={r * 2 * fraction} height={r * 2} />
      </clipPath>
      <circle cx={cx} cy={cy} r={r} fill={color} clipPath={`url(#${clipId})`} />
    </g>
  );
}

export default function MoonArc({ className = "", variant = "arc", activeIndex = -1 }) {
  const phaseFractions = [0, 0.15, 0.4, 0.7, 1, 0.7, 0.4, 0.15];

  if (variant === "divider") {
    return (
      <svg viewBox="0 0 320 24" className={className} aria-hidden="true">
        {phaseFractions.map((f, i) => (
          <MoonPhase key={i} cx={20 + i * 40} cy={12} r={7} fraction={f} color="#B8935A" />
        ))}
      </svg>
    );
  }

  if (variant === "loader") {
    return (
      <svg viewBox="0 0 320 40" className={className} aria-hidden="true">
        {phaseFractions.map((f, i) => (
          <g key={i} opacity={i === activeIndex ? 1 : 0.3} style={{ transition: "opacity 0.4s ease" }}>
            <MoonPhase cx={20 + i * 40} cy={20} r={9} fraction={f} color="#8F6C96" />
          </g>
        ))}
      </svg>
    );
  }

  // Default hero "arc": phases traced along a gentle rising curve.
  const points = phaseFractions.map((f, i) => {
    const t = i / (phaseFractions.length - 1);
    const x = 20 + t * 360;
    const y = 160 - Math.sin(t * Math.PI) * 90;
    return { x, y, f };
  });

  const pathD = points.reduce(
    (acc, p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`),
    ""
  );

  return (
    <svg viewBox="0 0 400 200" className={className} aria-hidden="true">
      <path d={pathD} fill="none" stroke="#C9A876" strokeWidth="1" strokeDasharray="2 6" opacity="0.6" />
      {points.map((p, i) => (
        <MoonPhase key={i} cx={p.x} cy={p.y} r={12} fraction={p.f} color={i % 2 === 0 ? "#8F6C96" : "#B8935A"} />
      ))}
    </svg>
  );
}

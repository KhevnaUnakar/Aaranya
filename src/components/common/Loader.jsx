import { useEffect, useState } from "react";
import MoonArc from "./MoonArc.jsx";

export default function Loader({ label = "Gathering your reading" }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setActive((prev) => (prev + 1) % 8), 260);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-[40vh] w-full flex-col items-center justify-center gap-4 py-16" role="status" aria-live="polite">
      <MoonArc variant="loader" activeIndex={active} className="h-10 w-56" />
      <p className="font-body text-sm text-ink-faint">{label}&hellip;</p>
    </div>
  );
}

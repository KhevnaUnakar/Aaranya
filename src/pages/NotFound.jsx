import { Link } from "react-router-dom";
import MoonArc from "../components/common/MoonArc.jsx";

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
      <MoonArc className="h-28 w-72 opacity-80" />
      <p className="eyebrow mt-6">Page not found</p>
      <h1 className="mt-3 font-display text-4xl text-ink sm:text-5xl">This page has wandered off</h1>
      <p className="mt-4 max-w-md text-ink-faint">
        The page you're looking for doesn't exist, or may have moved. Let's guide you back.
      </p>
      <Link to="/" className="btn-primary mt-8">
        Return Home
      </Link>
    </div>
  );
}

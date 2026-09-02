import { Link } from "react-router-dom";
import { Leaf, Instagram, Facebook, Youtube, Mail, MapPin, Phone } from "lucide-react";
import MoonArc from "../common/MoonArc.jsx";

const EXPLORE = [
  { label: "Services", to: "/services" },
  { label: "Crystals", to: "/crystals" },
  { label: "Accessories", to: "/products" },
  { label: "About Us", to: "/about" },
];

const COMPANY = [
  { label: "Our Story", to: "/about" },
  { label: "Contact", to: "/contact" },
  { label: "Admin Login", to: "/admin/login" },
];

export default function Footer() {
  return (
    <footer className="border-t border-ink/[0.06] bg-ink text-alabaster">
      <div className="container-page py-16">
        <MoonArc variant="divider" className="mx-auto mb-12 h-5 w-64 opacity-70" />
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link to="/" className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-alabaster text-ink">
                <Leaf size={16} strokeWidth={1.5} />
              </span>
              <span className="font-display text-xl">Aaranya</span>
            </Link>
            <p className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-gold-400/80">
              Rooted in Nature. Guided Within.
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-alabaster/60">
              A quiet space for tarot, numerology, and crystal wisdom — guidance offered gently, never predicted.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {[Instagram, Facebook, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social media"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-alabaster/15 text-alabaster/70 transition hover:border-alabaster hover:text-alabaster"
                >
                  <Icon size={16} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="eyebrow mb-5 text-gold-400">Explore</p>
            <ul className="space-y-3">
              {EXPLORE.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="text-sm text-alabaster/70 transition hover:text-alabaster">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-5 text-gold-400">Company</p>
            <ul className="space-y-3">
              {COMPANY.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="text-sm text-alabaster/70 transition hover:text-alabaster">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-5 text-gold-400">Contact</p>
            <ul className="space-y-3 text-sm text-alabaster/70">
              <li className="flex items-start gap-2.5">
                <MapPin size={16} strokeWidth={1.5} className="mt-0.5 shrink-0" />
                <span>142 Willow Lane, Portland, OR</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={16} strokeWidth={1.5} className="shrink-0" />
                <span>(555) 018-2094</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={16} strokeWidth={1.5} className="shrink-0" />
                <span>hello@aaranya.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-alabaster/10 pt-8 text-xs text-alabaster/50 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} Aaranya. All rights reserved.</p>
          <p>Guidance offered with care, not certainty.</p>
        </div>
      </div>
    </footer>
  );
}

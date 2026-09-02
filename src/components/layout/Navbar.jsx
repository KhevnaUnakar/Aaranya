import { useEffect, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { Menu, X, Leaf } from "lucide-react";

const LINKS = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Crystals", to: "/crystals" },
  { label: "Accessories", to: "/products" },
  { label: "Contact", to: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => setIsOpen(false), [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled ? "border-ink/[0.06] bg-alabaster/90 backdrop-blur-md" : "border-transparent bg-alabaster/40 backdrop-blur-sm"
      }`}
    >
      <nav className="container-page flex h-20 items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-alabaster">
            <Leaf size={16} strokeWidth={1.5} />
          </span>
          <span className="font-display text-xl tracking-tight text-ink">Aaranya</span>
        </Link>

        <div className="hidden items-center gap-9 lg:flex">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                `text-sm font-medium tracking-wide transition-colors ${
                  isActive ? "text-moss-600" : "text-ink-soft hover:text-ink"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden lg:block">
          <Link to="/services" className="btn-primary">
            Book a Session
          </Link>
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-full text-ink lg:hidden"
          onClick={() => setIsOpen((v) => !v)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {isOpen && (
        <div className="border-t border-ink/[0.06] bg-alabaster px-6 pb-8 pt-4 lg:hidden">
          <div className="flex flex-col gap-1">
            {LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-3 text-base font-medium ${
                    isActive ? "bg-moss-50 text-moss-600" : "text-ink-soft"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
          <Link to="/services" className="btn-primary mt-5 w-full">
            Book a Session
          </Link>
        </div>
      )}
    </header>
  );
}

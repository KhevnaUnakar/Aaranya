import { NavLink } from "react-router-dom";
import { LayoutDashboard, FolderKanban, Sparkles, Gem, ShoppingBag, FileText, LogOut, Leaf } from "lucide-react";
import { useAuth } from "../../hooks/useAuth.js";

const LINKS = [
  { label: "Dashboard", to: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Categories", to: "/admin/categories", icon: FolderKanban },
  { label: "Services", to: "/admin/services", icon: Sparkles },
  { label: "Crystals", to: "/admin/crystals", icon: Gem },
  { label: "Products", to: "/admin/products", icon: ShoppingBag },
  { label: "Website Content", to: "/admin/content", icon: FileText },
];

export default function Sidebar({ onNavigate }) {
  const { logout, user } = useAuth();

  return (
    <div className="flex h-full flex-col bg-ink text-alabaster">
      <div className="flex items-center gap-2.5 px-6 py-7">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-alabaster text-ink">
          <Leaf size={16} strokeWidth={1.5} />
        </span>
        <div>
          <p className="font-display text-lg leading-none">Aaranya</p>
          <p className="mt-1 text-[11px] uppercase tracking-widest text-alabaster/45">Admin</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-4">
        {LINKS.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                isActive ? "bg-alabaster/10 text-alabaster" : "text-alabaster/60 hover:bg-alabaster/5 hover:text-alabaster"
              }`
            }
          >
            <link.icon size={18} strokeWidth={1.5} />
            {link.label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-alabaster/10 p-4">
        <div className="mb-3 flex items-center gap-3 rounded-xl px-2 py-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gold-400/20 text-gold-200 font-display text-sm">
            {user?.name?.[0] || "A"}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-alabaster">{user?.name || "Admin"}</p>
            <p className="truncate text-xs text-alabaster/45">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-alabaster/60 transition hover:bg-alabaster/5 hover:text-alabaster"
        >
          <LogOut size={18} strokeWidth={1.5} />
          Logout
        </button>
      </div>
    </div>
  );
}

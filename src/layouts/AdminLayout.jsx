import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { X } from "lucide-react";
import Sidebar from "../admin/components/Sidebar.jsx";
import Topbar from "../admin/components/Topbar.jsx";

const TITLES = {
  "/admin/dashboard": "Dashboard",
  "/admin/categories": "Categories",
  "/admin/services": "Services",
  "/admin/crystals": "Crystals",
  "/admin/products": "Products",
  "/admin/content": "Website Content",
};

export default function AdminLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const title = TITLES[location.pathname] || "Admin";

  return (
    <div className="flex min-h-screen bg-alabaster-dim">
      <aside className="hidden w-72 shrink-0 lg:block">
        <div className="fixed h-screen w-72">
          <Sidebar />
        </div>
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-ink/40" onClick={() => setMobileOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-72">
            <Sidebar onNavigate={() => setMobileOpen(false)} />
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute right-4 top-6 flex h-8 w-8 items-center justify-center rounded-full bg-alabaster/10 text-alabaster"
              aria-label="Close menu"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar title={title} onMenuClick={() => setMobileOpen(true)} />
        <main className="flex-1 p-5 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

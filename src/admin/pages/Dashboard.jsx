import { FolderKanban, Sparkles, Gem, ShoppingBag } from "lucide-react";
import { useFetch } from "../../hooks/useFetch.js";
import { adminGetSummary } from "../../api/adminApi.js";
import Loader from "../../components/common/Loader.jsx";
import { useAuth } from "../../hooks/useAuth.js";

const CARD_META = [
  { key: "totalCategories", label: "Total Categories", icon: FolderKanban, color: "bg-moss-100 text-moss-600" },
  { key: "totalServices", label: "Total Services", icon: Sparkles, color: "bg-plum-100 text-plum-600" },
  { key: "totalCrystals", label: "Total Crystals", icon: Gem, color: "bg-gold-200/70 text-gold-600" },
  { key: "totalProducts", label: "Total Products", icon: ShoppingBag, color: "bg-moss-100 text-moss-600" },
];

export default function Dashboard() {
  const { data: summary, isLoading } = useFetch(adminGetSummary, []);
  const { user } = useAuth();

  return (
    <div>
      <p className="text-sm text-ink-faint">Welcome back, {user?.name?.split(" ")[0] || "Admin"}.</p>
      <h2 className="mt-1 font-display text-2xl text-ink">Here's what's happening across your site</h2>

      <div className="mt-8">
        {isLoading ? (
          <Loader label="Loading dashboard" />
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {CARD_META.map((meta) => (
              <div key={meta.key} className="card-surface p-6">
                <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-full ${meta.color}`}>
                  <meta.icon size={20} strokeWidth={1.5} />
                </div>
                <p className="font-display text-3xl text-ink">{summary?.[meta.key] ?? 0}</p>
                <p className="mt-1 text-sm text-ink-faint">{meta.label}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="card-surface mt-8 p-7">
        <h3 className="font-display text-lg text-ink">Getting started</h3>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-faint">
          This dashboard runs on local mock data until a live backend is connected. Any changes you make in
          Categories, Services, Crystals, Products, or Website Content are saved to your browser and will
          appear instantly on the public site. Set <code className="rounded bg-alabaster-dim px-1.5 py-0.5">VITE_API_BASE_URL</code> to
          point this dashboard at your Spring Boot API when it's ready.
        </p>
      </div>
    </div>
  );
}

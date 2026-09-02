import { useState } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { Leaf, Eye, EyeOff, AlertCircle } from "lucide-react";
import { useAuth } from "../../hooks/useAuth.js";
import MoonArc from "../../components/common/MoonArc.jsx";

export default function Login() {
  const { login, isLoading, error, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState("");

  if (isAuthenticated) {
    const redirectTo = location.state?.from?.pathname || "/admin/dashboard";
    return <Navigate to={redirectTo} replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    if (!email.trim() || !password) {
      setFormError("Please enter both your email and password.");
      return;
    }
    const success = await login(email, password);
    if (success) {
      navigate("/admin/dashboard", { replace: true });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink px-6 py-12">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-plum-500/10 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-gold-400/10 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="mb-8 flex flex-col items-center text-center">
          <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-alabaster text-ink">
            <Leaf size={20} strokeWidth={1.5} />
          </span>
          <h1 className="font-display text-2xl text-alabaster">Aaranya Admin</h1>
          <p className="mt-1 text-sm text-alabaster/50">Sign in to manage your website</p>
        </div>

        <div className="rounded-2xl bg-alabaster p-8 shadow-soft">
          <form onSubmit={handleSubmit} noValidate>
            {(formError || error) && (
              <div className="mb-5 flex items-start gap-2.5 rounded-xl bg-plum-100 px-4 py-3 text-sm text-plum-600">
                <AlertCircle size={17} className="mt-0.5 shrink-0" />
                <span>{formError || error}</span>
              </div>
            )}

            <label className="mb-4 block">
              <span className="mb-1.5 block text-sm font-semibold text-ink">Email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@aaranya.com"
                autoComplete="email"
                className="w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm text-ink placeholder:text-ink-faint/60 focus:border-moss-500 focus:outline-none focus:ring-2 focus:ring-moss-100"
              />
            </label>

            <label className="mb-2 block">
              <span className="mb-1.5 block text-sm font-semibold text-ink">Password</span>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="w-full rounded-xl border border-ink/15 bg-white px-4 py-3 pr-11 text-sm text-ink placeholder:text-ink-faint/60 focus:border-moss-500 focus:outline-none focus:ring-2 focus:ring-moss-100"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-faint hover:text-ink"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </label>

            <button type="submit" disabled={isLoading} className="btn-primary mt-6 w-full disabled:opacity-60">
              {isLoading ? "Signing in…" : "Sign In"}
            </button>
          </form>

          <div className="mt-6 rounded-xl bg-alabaster-dim px-4 py-3 text-xs text-ink-faint">
            <p className="font-semibold text-ink-soft">Demo credentials</p>
            <p className="mt-1">admin@aaranya.com / aaranya2026</p>
          </div>
        </div>

        <MoonArc variant="divider" className="mx-auto mt-8 h-4 w-56 opacity-50" />
      </div>
    </div>
  );
}

import { Routes, Route } from "react-router-dom";

import PublicLayout from "./layouts/PublicLayout.jsx";
import AdminLayout from "./layouts/AdminLayout.jsx";
import ProtectedRoute from "./admin/components/ProtectedRoute.jsx";

import Home from "./pages/Home.jsx";
import Services from "./pages/Services.jsx";
import ServiceDetails from "./pages/ServiceDetails.jsx";
import Crystals from "./pages/Crystals.jsx";
import CrystalDetails from "./pages/CrystalDetails.jsx";
import Products from "./pages/Products.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import NotFound from "./pages/NotFound.jsx";

import AdminLogin from "./admin/pages/Login.jsx";
import AdminDashboard from "./admin/pages/Dashboard.jsx";
import AdminCategories from "./admin/pages/Categories.jsx";
import AdminServices from "./admin/pages/Services.jsx";
import AdminCrystals from "./admin/pages/Crystals.jsx";
import AdminProducts from "./admin/pages/Products.jsx";
import AdminContent from "./admin/pages/Content.jsx";

export default function App() {
  return (
    <Routes>
      {/* Public website */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:slug" element={<ServiceDetails />} />
        <Route path="/crystals" element={<Crystals />} />
        <Route path="/crystals/:slug" element={<CrystalDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:slug" element={<ProductDetails />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Admin */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="categories" element={<AdminCategories />} />
        <Route path="services" element={<AdminServices />} />
        <Route path="crystals" element={<AdminCrystals />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="content" element={<AdminContent />} />
      </Route>
    </Routes>
  );
}

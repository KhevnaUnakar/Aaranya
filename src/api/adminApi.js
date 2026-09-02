import api from "./axios";
import { createResourceStore } from "./mockStore";
import { mockServices, mockCrystals, mockProducts, mockContent, mockAdminUser } from "../data/mockData";

const delay = (data, ms = 500) => new Promise((resolve) => setTimeout(() => resolve(data), ms));

// ---------- Auth ----------

const DEMO_CREDENTIALS = { email: "admin@aaranya.com", password: "aaranya2026" };

export async function login({ email, password }) {
  try {
    const { data } = await api.post("/auth/login", { email, password });
    return data;
  } catch (err) {
    // Mock auth so the dashboard is explorable pre-backend.
    await delay(null, 600);
    if (email.trim().toLowerCase() === DEMO_CREDENTIALS.email && password === DEMO_CREDENTIALS.password) {
      return { token: `mock-token-${Date.now()}`, user: mockAdminUser };
    }
    const error = new Error("Invalid email or password.");
    error.isAuthError = true;
    throw error;
  }
}

// ---------- Resource stores (mock persistence) ----------

export const servicesStore = createResourceStore("aaranya_services", "srv", mockServices);
export const crystalsStore = createResourceStore("aaranya_crystals", "cry", mockCrystals);
export const productsStore = createResourceStore("aaranya_products", "prod", mockProducts);

// ---------- Admin: Services ----------

export async function adminGetServices() {
  try {
    const { data } = await api.get("/admin/services");
    return data;
  } catch {
    return servicesStore.list();
  }
}
export async function adminCreateService(payload) {
  try {
    const { data } = await api.post("/admin/services", payload);
    return data;
  } catch {
    return servicesStore.create(payload);
  }
}
export async function adminUpdateService(id, payload) {
  try {
    const { data } = await api.put(`/admin/services/${id}`, payload);
    return data;
  } catch {
    return servicesStore.update(id, payload);
  }
}
export async function adminDeleteService(id) {
  try {
    const { data } = await api.delete(`/admin/services/${id}`);
    return data;
  } catch {
    return servicesStore.remove(id);
  }
}
export async function adminToggleService(id) {
  try {
    const { data } = await api.patch(`/admin/services/${id}/toggle`);
    return data;
  } catch {
    return servicesStore.toggleActive(id);
  }
}

// ---------- Admin: Crystals ----------

export async function adminGetCrystals() {
  try {
    const { data } = await api.get("/admin/crystals");
    return data;
  } catch {
    return crystalsStore.list();
  }
}
export async function adminCreateCrystal(payload) {
  try {
    const { data } = await api.post("/admin/crystals", payload);
    return data;
  } catch {
    return crystalsStore.create(payload);
  }
}
export async function adminUpdateCrystal(id, payload) {
  try {
    const { data } = await api.put(`/admin/crystals/${id}`, payload);
    return data;
  } catch {
    return crystalsStore.update(id, payload);
  }
}
export async function adminDeleteCrystal(id) {
  try {
    const { data } = await api.delete(`/admin/crystals/${id}`);
    return data;
  } catch {
    return crystalsStore.remove(id);
  }
}
export async function adminToggleCrystal(id) {
  try {
    const { data } = await api.patch(`/admin/crystals/${id}/toggle`);
    return data;
  } catch {
    return crystalsStore.toggleActive(id);
  }
}

// ---------- Admin: Products ----------

export async function adminGetProducts() {
  try {
    const { data } = await api.get("/admin/products");
    return data;
  } catch {
    return productsStore.list();
  }
}
export async function adminCreateProduct(payload) {
  try {
    const { data } = await api.post("/admin/products", payload);
    return data;
  } catch {
    return productsStore.create(payload);
  }
}
export async function adminUpdateProduct(id, payload) {
  try {
    const { data } = await api.put(`/admin/products/${id}`, payload);
    return data;
  } catch {
    return productsStore.update(id, payload);
  }
}
export async function adminDeleteProduct(id) {
  try {
    const { data } = await api.delete(`/admin/products/${id}`);
    return data;
  } catch {
    return productsStore.remove(id);
  }
}
export async function adminToggleProduct(id) {
  try {
    const { data } = await api.patch(`/admin/products/${id}/toggle`);
    return data;
  } catch {
    return productsStore.toggleActive(id);
  }
}

// ---------- Admin: Dashboard summary ----------

export async function adminGetSummary() {
  try {
    const { data } = await api.get("/admin/summary");
    return data;
  } catch {
    const [categories, services, crystals, products] = await Promise.all([
      import("./categoriesApi").then((m) => m.getCategories()),
      servicesStore.list(),
      crystalsStore.list(),
      productsStore.list(),
    ]);
    return delay({
      totalCategories: categories.length,
      totalServices: services.length,
      totalCrystals: crystals.length,
      totalProducts: products.length,
    });
  }
}

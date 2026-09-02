import api from "./axios";
import { mockServices } from "../data/mockData";

const simulateDelay = (data, ms = 400) => new Promise((resolve) => setTimeout(() => resolve(data), ms));

export async function getServices() {
  try {
    const { data } = await api.get("/services");
    return data;
  } catch (err) {
    // Backend not reachable yet — fall back to mock data so the UI stays usable.
    return simulateDelay(mockServices.filter((s) => s.active));
  }
}

export async function getServiceBySlug(slug) {
  try {
    const { data } = await api.get(`/services/${slug}`);
    return data;
  } catch (err) {
    const found = mockServices.find((s) => s.slug === slug);
    return simulateDelay(found || null);
  }
}

export async function getFeaturedServices() {
  try {
    const { data } = await api.get("/services", { params: { featured: true } });
    return data;
  } catch (err) {
    return simulateDelay(mockServices.filter((s) => s.featured && s.active));
  }
}

export async function getRelatedServices(currentSlug, limit = 3) {
  const all = await getServices();
  return all.filter((s) => s.slug !== currentSlug).slice(0, limit);
}

import api from "./axios";
import { mockCrystals } from "../data/mockData";

const simulateDelay = (data, ms = 400) => new Promise((resolve) => setTimeout(() => resolve(data), ms));

export async function getCrystals() {
  try {
    const { data } = await api.get("/crystals");
    return data;
  } catch (err) {
    return simulateDelay(mockCrystals.filter((c) => c.active));
  }
}

export async function getCrystalBySlug(slug) {
  try {
    const { data } = await api.get(`/crystals/${slug}`);
    return data;
  } catch (err) {
    const found = mockCrystals.find((c) => c.slug === slug);
    return simulateDelay(found || null);
  }
}

export async function getFeaturedCrystals() {
  try {
    const { data } = await api.get("/crystals", { params: { featured: true } });
    return data;
  } catch (err) {
    return simulateDelay(mockCrystals.filter((c) => c.featured && c.active));
  }
}

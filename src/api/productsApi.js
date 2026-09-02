import api from "./axios";
import { mockProducts } from "../data/mockData";

const simulateDelay = (data, ms = 400) => new Promise((resolve) => setTimeout(() => resolve(data), ms));

export async function getProducts() {
  try {
    const { data } = await api.get("/products");
    return data;
  } catch (err) {
    return simulateDelay(mockProducts.filter((p) => p.active));
  }
}

export async function getProductBySlug(slug) {
  try {
    const { data } = await api.get(`/products/${slug}`);
    return data;
  } catch (err) {
    const found = mockProducts.find((p) => p.slug === slug);
    return simulateDelay(found || null);
  }
}

export async function getFeaturedProducts() {
  try {
    const { data } = await api.get("/products", { params: { featured: true } });
    return data;
  } catch (err) {
    return simulateDelay(mockProducts.filter((p) => p.featured && p.active));
  }
}

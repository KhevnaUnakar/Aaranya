import api from "./axios";
import { createResourceStore } from "./mockStore";
import { mockCategories } from "../data/mockData";

const store = createResourceStore("aaranya_categories", "cat", mockCategories);

export async function getCategories() {
  try {
    const { data } = await api.get("/categories");
    return data;
  } catch (err) {
    return store.list();
  }
}

export async function createCategory(payload) {
  try {
    const { data } = await api.post("/categories", payload);
    return data;
  } catch (err) {
    return store.create({ status: "active", itemCount: 0, ...payload });
  }
}

export async function updateCategory(id, payload) {
  try {
    const { data } = await api.put(`/categories/${id}`, payload);
    return data;
  } catch (err) {
    return store.update(id, payload);
  }
}

export async function toggleCategoryStatus(id) {
  try {
    const { data } = await api.patch(`/categories/${id}/toggle`);
    return data;
  } catch (err) {
    const all = await store.list();
    const current = all.find((c) => c.id === id);
    const nextStatus = current?.status === "active" ? "inactive" : "active";
    return store.update(id, { status: nextStatus });
  }
}

export async function deleteCategory(id) {
  try {
    const { data } = await api.delete(`/categories/${id}`);
    return data;
  } catch (err) {
    return store.remove(id);
  }
}

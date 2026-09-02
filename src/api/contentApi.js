import api from "./axios";
import { mockContent } from "../data/mockData";

const delay = (data, ms = 350) => new Promise((resolve) => setTimeout(() => resolve(data), ms));

const STORAGE_KEY = "aaranya_content";

const seedIfEmpty = () => {
  const existing = localStorage.getItem(STORAGE_KEY);
  if (!existing) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockContent));
    return mockContent;
  }
  try {
    return JSON.parse(existing);
  } catch {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockContent));
    return mockContent;
  }
};

export async function getContent() {
  try {
    const { data } = await api.get("/content");
    return data;
  } catch {
    return delay(seedIfEmpty());
  }
}

export async function getContentSection(sectionKey) {
  try {
    const { data } = await api.get(`/content/${sectionKey}`);
    return data;
  } catch {
    const all = seedIfEmpty();
    return delay(all[sectionKey] || null);
  }
}

export async function updateContentSection(sectionKey, payload) {
  try {
    const { data } = await api.put(`/content/${sectionKey}`, payload);
    return data;
  } catch {
    const all = seedIfEmpty();
    const updated = { ...all, [sectionKey]: { ...all[sectionKey], ...payload } };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return delay(updated[sectionKey]);
  }
}

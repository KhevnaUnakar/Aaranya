// A tiny local persistence layer so the Admin Dashboard's CRUD screens are
// fully interactive before a Spring Boot backend is wired up. Each resource
// is seeded once from mockData and then lives in localStorage. Every
// function here has a 1:1 real-API counterpart named the same way in the
// corresponding admin* API modules, so swapping to live endpoints later is
// a matter of removing the fallback, not rewriting the pages.

const seedIfEmpty = (key, seedData) => {
  const existing = localStorage.getItem(key);
  if (!existing) {
    localStorage.setItem(key, JSON.stringify(seedData));
    return seedData;
  }
  try {
    return JSON.parse(existing);
  } catch {
    localStorage.setItem(key, JSON.stringify(seedData));
    return seedData;
  }
};

const write = (key, data) => localStorage.setItem(key, JSON.stringify(data));

const delay = (data, ms = 350) => new Promise((resolve) => setTimeout(() => resolve(data), ms));

const genId = (prefix) => `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

export function createResourceStore(storageKey, idPrefix, seedData) {
  return {
    async list() {
      const data = seedIfEmpty(storageKey, seedData);
      return delay(data);
    },
    async get(id) {
      const data = seedIfEmpty(storageKey, seedData);
      return delay(data.find((item) => item.id === id) || null);
    },
    async create(payload) {
      const data = seedIfEmpty(storageKey, seedData);
      const record = { id: genId(idPrefix), ...payload };
      const updated = [record, ...data];
      write(storageKey, updated);
      return delay(record);
    },
    async update(id, payload) {
      const data = seedIfEmpty(storageKey, seedData);
      const updated = data.map((item) => (item.id === id ? { ...item, ...payload } : item));
      write(storageKey, updated);
      return delay(updated.find((item) => item.id === id));
    },
    async remove(id) {
      const data = seedIfEmpty(storageKey, seedData);
      const updated = data.filter((item) => item.id !== id);
      write(storageKey, updated);
      return delay({ success: true });
    },
    async toggleActive(id) {
      const data = seedIfEmpty(storageKey, seedData);
      const updated = data.map((item) =>
        item.id === id ? { ...item, active: !item.active, status: item.active ? "inactive" : "active" } : item
      );
      write(storageKey, updated);
      return delay(updated.find((item) => item.id === id));
    },
    async reset() {
      write(storageKey, seedData);
      return delay(seedData);
    },
  };
}

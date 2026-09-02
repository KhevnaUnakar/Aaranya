import { useState, useMemo } from "react";
import { Plus, Pencil, Trash2, Power, X } from "lucide-react";
import { useFetch } from "../../hooks/useFetch.js";
import { getCategories } from "../../api/categoriesApi.js";
import {
  adminGetServices,
  adminCreateService,
  adminUpdateService,
  adminDeleteService,
  adminToggleService,
} from "../../api/adminApi.js";
import DataTable from "../components/DataTable.jsx";
import StatusBadge from "../components/StatusBadge.jsx";
import Modal from "../components/Modal.jsx";
import { FormField, TextInput, TextArea, SelectInput } from "../components/FormField.jsx";
import Loader from "../../components/common/Loader.jsx";

const slugify = (text) =>
  text.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const emptyForm = {
  category: "",
  title: "",
  slug: "",
  shortDescription: "",
  fullDescription: "",
  image: "",
  price: "",
  duration: "",
  benefits: [""],
  featured: false,
  active: true,
};

export default function AdminServices() {
  const { data: services, isLoading, refetch } = useFetch(adminGetServices, []);
  const { data: categories } = useFetch(getCategories, []);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const filtered = useMemo(() => {
    if (!services) return [];
    return services.filter((s) => s.title.toLowerCase().includes(search.toLowerCase()));
  }, [services, search]);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (service) => {
    setEditing(service);
    setForm({ ...emptyForm, ...service, benefits: service.benefits?.length ? service.benefits : [""] });
    setModalOpen(true);
  };

  const handleTitleChange = (value) => {
    setForm((f) => ({ ...f, title: value, slug: editing ? f.slug : slugify(value) }));
  };

  const updateBenefit = (index, value) => {
    setForm((f) => {
      const next = [...f.benefits];
      next[index] = value;
      return { ...f, benefits: next };
    });
  };

  const addBenefit = () => setForm((f) => ({ ...f, benefits: [...f.benefits, ""] }));
  const removeBenefit = (index) => setForm((f) => ({ ...f, benefits: f.benefits.filter((_, i) => i !== index) }));

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    const payload = { ...form, benefits: form.benefits.filter((b) => b.trim() !== "") };
    try {
      if (editing) {
        await adminUpdateService(editing.id, payload);
      } else {
        await adminCreateService(payload);
      }
      setModalOpen(false);
      refetch();
    } finally {
      setSaving(false);
    }
  };

  const handleToggle = async (service) => {
    await adminToggleService(service.id);
    refetch();
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    await adminDeleteService(deleteTarget.id);
    setDeleteTarget(null);
    refetch();
  };

  if (isLoading) return <Loader label="Loading services" />;

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl text-ink">Services</h2>
          <p className="mt-1 text-sm text-ink-faint">Manage tarot, numerology, and guidance sessions.</p>
        </div>
        <button onClick={openCreate} className="btn-primary">
          <Plus size={16} /> Add Service
        </button>
      </div>

      <DataTable
        searchTerm={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search services…"
        rows={filtered}
        columns={[
          { key: "title", header: "Title", render: (row) => <span className="font-medium text-ink">{row.title}</span> },
          { key: "category", header: "Category" },
          { key: "price", header: "Price" },
          { key: "featured", header: "Featured", render: (row) => (row.featured ? "Yes" : "—") },
          { key: "active", header: "Status", render: (row) => <StatusBadge active={row.active} /> },
          {
            key: "actions",
            header: "Actions",
            render: (row) => (
              <div className="flex items-center gap-1.5">
                <button onClick={() => openEdit(row)} className="rounded-lg p-2 text-ink-faint hover:bg-ink/5 hover:text-ink" aria-label="Edit">
                  <Pencil size={15} />
                </button>
                <button onClick={() => handleToggle(row)} className="rounded-lg p-2 text-ink-faint hover:bg-ink/5 hover:text-ink" aria-label="Toggle status">
                  <Power size={15} />
                </button>
                <button onClick={() => setDeleteTarget(row)} className="rounded-lg p-2 text-ink-faint hover:bg-plum-100 hover:text-plum-600" aria-label="Delete">
                  <Trash2 size={15} />
                </button>
              </div>
            ),
          },
        ]}
      />

      {modalOpen && (
        <Modal title={editing ? "Edit Service" : "Add Service"} onClose={() => setModalOpen(false)}>
          <form onSubmit={handleSave}>
            <div className="grid grid-cols-1 gap-x-5 sm:grid-cols-2">
              <FormField label="Category" required>
                <SelectInput value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))} required>
                  <option value="">Select category</option>
                  {(categories || []).map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </SelectInput>
              </FormField>
              <FormField label="Title" required>
                <TextInput value={form.title} onChange={(e) => handleTitleChange(e.target.value)} placeholder="Tarot Reading" required />
              </FormField>
            </div>

            <FormField label="Slug" hint="Used in the page URL, e.g. /services/tarot-reading">
              <TextInput value={form.slug} onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))} />
            </FormField>

            <FormField label="Short Description" required>
              <TextArea
                value={form.shortDescription}
                onChange={(e) => setForm((f) => ({ ...f, shortDescription: e.target.value }))}
                placeholder="One or two sentences shown on the card"
                required
              />
            </FormField>

            <FormField label="Full Description" required>
              <TextArea
                value={form.fullDescription}
                onChange={(e) => setForm((f) => ({ ...f, fullDescription: e.target.value }))}
                placeholder="Detailed description shown on the service page"
                required
                className="min-h-[140px]"
              />
            </FormField>

            <div className="grid grid-cols-1 gap-x-5 sm:grid-cols-3">
              <FormField label="Image Key" hint="A short label for the placeholder image">
                <TextInput value={form.image} onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))} placeholder="tarot" />
              </FormField>
              <FormField label="Price">
                <TextInput value={form.price} onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))} placeholder="$85" />
              </FormField>
              <FormField label="Duration">
                <TextInput value={form.duration} onChange={(e) => setForm((f) => ({ ...f, duration: e.target.value }))} placeholder="50 min" />
              </FormField>
            </div>

            <FormField label="Benefits">
              <div className="space-y-2">
                {form.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <TextInput
                      value={benefit}
                      onChange={(e) => updateBenefit(i, e.target.value)}
                      placeholder={`Benefit ${i + 1}`}
                    />
                    {form.benefits.length > 1 && (
                      <button type="button" onClick={() => removeBenefit(i)} className="shrink-0 rounded-lg p-2 text-ink-faint hover:bg-plum-100 hover:text-plum-600" aria-label="Remove benefit">
                        <X size={15} />
                      </button>
                    )}
                  </div>
                ))}
                <button type="button" onClick={addBenefit} className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-moss-600 hover:text-moss-700">
                  <Plus size={14} /> Add another benefit
                </button>
              </div>
            </FormField>

            <div className="mt-2 flex items-center gap-6">
              <label className="flex items-center gap-2 text-sm font-medium text-ink">
                <input type="checkbox" checked={form.featured} onChange={(e) => setForm((f) => ({ ...f, featured: e.target.checked }))} className="h-4 w-4 rounded border-ink/30 text-moss-600 focus:ring-moss-300" />
                Featured
              </label>
              <label className="flex items-center gap-2 text-sm font-medium text-ink">
                <input type="checkbox" checked={form.active} onChange={(e) => setForm((f) => ({ ...f, active: e.target.checked }))} className="h-4 w-4 rounded border-ink/30 text-moss-600 focus:ring-moss-300" />
                Active
              </label>
            </div>

            <div className="mt-6 flex justify-end gap-3 border-t border-ink/[0.06] pt-5">
              <button type="button" onClick={() => setModalOpen(false)} className="btn-secondary">
                Cancel
              </button>
              <button type="submit" disabled={saving} className="btn-primary disabled:opacity-60">
                {saving ? "Saving…" : editing ? "Save Changes" : "Add Service"}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {deleteTarget && (
        <Modal title="Delete service?" onClose={() => setDeleteTarget(null)} maxWidth="max-w-sm">
          <p className="text-sm text-ink-faint">
            This will permanently remove <span className="font-semibold text-ink">{deleteTarget.title}</span>. This can't be undone.
          </p>
          <div className="mt-6 flex justify-end gap-3">
            <button onClick={() => setDeleteTarget(null)} className="btn-secondary">
              Cancel
            </button>
            <button onClick={handleDelete} className="rounded-full bg-plum-600 px-6 py-3 text-sm font-semibold text-alabaster transition hover:bg-plum-500">
              Delete
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

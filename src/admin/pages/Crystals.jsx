import { useState, useMemo } from "react";
import { Plus, Pencil, Trash2, Power, X } from "lucide-react";
import { useFetch } from "../../hooks/useFetch.js";
import {
  adminGetCrystals,
  adminCreateCrystal,
  adminUpdateCrystal,
  adminDeleteCrystal,
  adminToggleCrystal,
} from "../../api/adminApi.js";
import DataTable from "../components/DataTable.jsx";
import StatusBadge from "../components/StatusBadge.jsx";
import Modal from "../components/Modal.jsx";
import { FormField, TextInput, TextArea } from "../components/FormField.jsx";
import Loader from "../../components/common/Loader.jsx";

const slugify = (text) => text.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const CHAKRAS = ["Root", "Sacral", "Solar Plexus", "Heart", "Throat", "Third Eye", "Crown"];

const emptyForm = {
  name: "",
  slug: "",
  shortDescription: "",
  description: "",
  image: "",
  chakra: "Heart",
  zodiac: "",
  benefits: [""],
  featured: false,
  active: true,
};

export default function AdminCrystals() {
  const { data: crystals, isLoading, refetch } = useFetch(adminGetCrystals, []);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const filtered = useMemo(() => {
    if (!crystals) return [];
    return crystals.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()));
  }, [crystals, search]);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (crystal) => {
    setEditing(crystal);
    setForm({
      ...emptyForm,
      ...crystal,
      zodiac: (crystal.zodiac || []).join(", "),
      benefits: crystal.benefits?.length ? crystal.benefits : [""],
    });
    setModalOpen(true);
  };

  const handleNameChange = (value) => setForm((f) => ({ ...f, name: value, slug: editing ? f.slug : slugify(value) }));

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
    const payload = {
      ...form,
      benefits: form.benefits.filter((b) => b.trim() !== ""),
      zodiac: form.zodiac.split(",").map((z) => z.trim()).filter(Boolean),
    };
    try {
      if (editing) {
        await adminUpdateCrystal(editing.id, payload);
      } else {
        await adminCreateCrystal(payload);
      }
      setModalOpen(false);
      refetch();
    } finally {
      setSaving(false);
    }
  };

  const handleToggle = async (crystal) => {
    await adminToggleCrystal(crystal.id);
    refetch();
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    await adminDeleteCrystal(deleteTarget.id);
    setDeleteTarget(null);
    refetch();
  };

  if (isLoading) return <Loader label="Loading crystals" />;

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl text-ink">Crystals</h2>
          <p className="mt-1 text-sm text-ink-faint">Manage the crystal library shown across the site.</p>
        </div>
        <button onClick={openCreate} className="btn-primary">
          <Plus size={16} /> Add Crystal
        </button>
      </div>

      <DataTable
        searchTerm={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search crystals…"
        rows={filtered}
        columns={[
          { key: "name", header: "Name", render: (row) => <span className="font-medium text-ink">{row.name}</span> },
          { key: "chakra", header: "Chakra" },
          { key: "zodiac", header: "Zodiac", render: (row) => (row.zodiac || []).join(", ") },
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
        <Modal title={editing ? "Edit Crystal" : "Add Crystal"} onClose={() => setModalOpen(false)}>
          <form onSubmit={handleSave}>
            <div className="grid grid-cols-1 gap-x-5 sm:grid-cols-2">
              <FormField label="Name" required>
                <TextInput value={form.name} onChange={(e) => handleNameChange(e.target.value)} placeholder="Rose Quartz" required />
              </FormField>
              <FormField label="Slug">
                <TextInput value={form.slug} onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))} />
              </FormField>
            </div>

            <FormField label="Short Description" required>
              <TextArea value={form.shortDescription} onChange={(e) => setForm((f) => ({ ...f, shortDescription: e.target.value }))} required />
            </FormField>

            <FormField label="Full Description" required>
              <TextArea value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} required className="min-h-[120px]" />
            </FormField>

            <div className="grid grid-cols-1 gap-x-5 sm:grid-cols-3">
              <FormField label="Image Key">
                <TextInput value={form.image} onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))} placeholder="rose-quartz" />
              </FormField>
              <FormField label="Chakra">
                <select
                  value={form.chakra}
                  onChange={(e) => setForm((f) => ({ ...f, chakra: e.target.value }))}
                  className="w-full rounded-xl border border-ink/15 bg-alabaster px-4 py-2.5 text-sm text-ink focus:border-moss-500 focus:outline-none focus:ring-2 focus:ring-moss-100"
                >
                  {CHAKRAS.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </FormField>
              <FormField label="Zodiac Signs" hint="Comma-separated">
                <TextInput value={form.zodiac} onChange={(e) => setForm((f) => ({ ...f, zodiac: e.target.value }))} placeholder="Taurus, Libra" />
              </FormField>
            </div>

            <FormField label="Benefits">
              <div className="space-y-2">
                {form.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <TextInput value={benefit} onChange={(e) => updateBenefit(i, e.target.value)} placeholder={`Benefit ${i + 1}`} />
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
                {saving ? "Saving…" : editing ? "Save Changes" : "Add Crystal"}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {deleteTarget && (
        <Modal title="Delete crystal?" onClose={() => setDeleteTarget(null)} maxWidth="max-w-sm">
          <p className="text-sm text-ink-faint">
            This will permanently remove <span className="font-semibold text-ink">{deleteTarget.name}</span>. This can't be undone.
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

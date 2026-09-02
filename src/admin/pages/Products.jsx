import { useState, useMemo } from "react";
import { Plus, Pencil, Trash2, Power, X } from "lucide-react";
import { useFetch } from "../../hooks/useFetch.js";
import { getCrystals } from "../../api/crystalsApi.js";
import {
  adminGetProducts,
  adminCreateProduct,
  adminUpdateProduct,
  adminDeleteProduct,
  adminToggleProduct,
} from "../../api/adminApi.js";
import DataTable from "../components/DataTable.jsx";
import StatusBadge from "../components/StatusBadge.jsx";
import Modal from "../components/Modal.jsx";
import { FormField, TextInput, TextArea, SelectInput } from "../components/FormField.jsx";
import Loader from "../../components/common/Loader.jsx";

const slugify = (text) => text.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const PRODUCT_TYPES = ["Bracelet", "Necklace", "Ring", "Earrings", "Set"];

const emptyForm = {
  name: "",
  slug: "",
  crystal: "",
  description: "",
  type: "Bracelet",
  price: "",
  featured: false,
  active: true,
  images: [""],
};

export default function AdminProducts() {
  const { data: products, isLoading, refetch } = useFetch(adminGetProducts, []);
  const { data: crystals } = useFetch(getCrystals, []);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const filtered = useMemo(() => {
    if (!products) return [];
    return products.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
  }, [products, search]);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (product) => {
    setEditing(product);
    setForm({ ...emptyForm, ...product, images: product.images?.length ? product.images : [""] });
    setModalOpen(true);
  };

  const handleNameChange = (value) => setForm((f) => ({ ...f, name: value, slug: editing ? f.slug : slugify(value) }));

  const updateImage = (index, value) => {
    setForm((f) => {
      const next = [...f.images];
      next[index] = value;
      return { ...f, images: next };
    });
  };
  const addImage = () => setForm((f) => ({ ...f, images: [...f.images, ""] }));
  const removeImage = (index) => setForm((f) => ({ ...f, images: f.images.filter((_, i) => i !== index) }));

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    const payload = { ...form, images: form.images.filter((i) => i.trim() !== "") };
    try {
      if (editing) {
        await adminUpdateProduct(editing.id, payload);
      } else {
        await adminCreateProduct(payload);
      }
      setModalOpen(false);
      refetch();
    } finally {
      setSaving(false);
    }
  };

  const handleToggle = async (product) => {
    await adminToggleProduct(product.id);
    refetch();
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    await adminDeleteProduct(deleteTarget.id);
    setDeleteTarget(null);
    refetch();
  };

  if (isLoading) return <Loader label="Loading products" />;

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl text-ink">Products</h2>
          <p className="mt-1 text-sm text-ink-faint">Manage the accessories catalogue.</p>
        </div>
        <button onClick={openCreate} className="btn-primary">
          <Plus size={16} /> Add Product
        </button>
      </div>

      <DataTable
        searchTerm={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search products…"
        rows={filtered}
        columns={[
          { key: "name", header: "Name", render: (row) => <span className="font-medium text-ink">{row.name}</span> },
          { key: "type", header: "Type" },
          { key: "price", header: "Price" },
          { key: "crystal", header: "Crystal" },
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
        <Modal title={editing ? "Edit Product" : "Add Product"} onClose={() => setModalOpen(false)}>
          <form onSubmit={handleSave}>
            <div className="grid grid-cols-1 gap-x-5 sm:grid-cols-2">
              <FormField label="Product Name" required>
                <TextInput value={form.name} onChange={(e) => handleNameChange(e.target.value)} placeholder="Rose Quartz Bracelet" required />
              </FormField>
              <FormField label="Slug">
                <TextInput value={form.slug} onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))} />
              </FormField>
            </div>

            <div className="grid grid-cols-1 gap-x-5 sm:grid-cols-3">
              <FormField label="Product Type">
                <SelectInput value={form.type} onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}>
                  {PRODUCT_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </SelectInput>
              </FormField>
              <FormField label="Price">
                <TextInput value={form.price} onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))} placeholder="$42" />
              </FormField>
              <FormField label="Related Crystal">
                <SelectInput value={form.crystal} onChange={(e) => setForm((f) => ({ ...f, crystal: e.target.value }))}>
                  <option value="">None</option>
                  {(crystals || []).map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </SelectInput>
              </FormField>
            </div>

            <FormField label="Description" required>
              <TextArea value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} required />
            </FormField>

            <FormField label="Product Images" hint="Short image keys used to render placeholder art (e.g. rose-quartz-bracelet-1)">
              <div className="space-y-2">
                {form.images.map((img, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <TextInput value={img} onChange={(e) => updateImage(i, e.target.value)} placeholder={`Image key ${i + 1}`} />
                    {form.images.length > 1 && (
                      <button type="button" onClick={() => removeImage(i)} className="shrink-0 rounded-lg p-2 text-ink-faint hover:bg-plum-100 hover:text-plum-600" aria-label="Remove image">
                        <X size={15} />
                      </button>
                    )}
                  </div>
                ))}
                <button type="button" onClick={addImage} className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-moss-600 hover:text-moss-700">
                  <Plus size={14} /> Add another image
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
                {saving ? "Saving…" : editing ? "Save Changes" : "Add Product"}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {deleteTarget && (
        <Modal title="Delete product?" onClose={() => setDeleteTarget(null)} maxWidth="max-w-sm">
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

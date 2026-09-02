import { useState, useMemo } from "react";
import { Plus, Pencil, Trash2, Power } from "lucide-react";
import { useFetch } from "../../hooks/useFetch.js";
import { getCategories, createCategory, updateCategory, toggleCategoryStatus, deleteCategory } from "../../api/categoriesApi.js";
import DataTable from "../components/DataTable.jsx";
import StatusBadge from "../components/StatusBadge.jsx";
import Modal from "../components/Modal.jsx";
import { FormField, TextInput } from "../components/FormField.jsx";
import Loader from "../../components/common/Loader.jsx";

const slugify = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const emptyForm = { name: "", slug: "", status: "active" };

export default function Categories() {
  const { data: categories, isLoading, refetch } = useFetch(getCategories, []);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const filtered = useMemo(() => {
    if (!categories) return [];
    return categories.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()));
  }, [categories, search]);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (category) => {
    setEditing(category);
    setForm({ name: category.name, slug: category.slug, status: category.status });
    setModalOpen(true);
  };

  const handleNameChange = (value) => {
    setForm((f) => ({ ...f, name: value, slug: editing ? f.slug : slugify(value) }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editing) {
        await updateCategory(editing.id, form);
      } else {
        await createCategory(form);
      }
      setModalOpen(false);
      refetch();
    } finally {
      setSaving(false);
    }
  };

  const handleToggle = async (category) => {
    await toggleCategoryStatus(category.id);
    refetch();
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    await deleteCategory(deleteTarget.id);
    setDeleteTarget(null);
    refetch();
  };

  if (isLoading) return <Loader label="Loading categories" />;

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl text-ink">Categories</h2>
          <p className="mt-1 text-sm text-ink-faint">Organize services, crystals, and products into groups.</p>
        </div>
        <button onClick={openCreate} className="btn-primary">
          <Plus size={16} /> Add Category
        </button>
      </div>

      <DataTable
        searchTerm={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search categories…"
        rows={filtered}
        columns={[
          { key: "name", header: "Name", render: (row) => <span className="font-medium text-ink">{row.name}</span> },
          { key: "slug", header: "Slug", render: (row) => <span className="text-ink-faint">{row.slug}</span> },
          { key: "itemCount", header: "Items", render: (row) => row.itemCount ?? 0 },
          { key: "status", header: "Status", render: (row) => <StatusBadge active={row.status === "active"} /> },
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
        <Modal title={editing ? "Edit Category" : "Add Category"} onClose={() => setModalOpen(false)} maxWidth="max-w-lg">
          <form onSubmit={handleSave}>
            <FormField label="Category Name" required>
              <TextInput value={form.name} onChange={(e) => handleNameChange(e.target.value)} placeholder="e.g. Guidance Services" required />
            </FormField>
            <FormField label="Slug" hint="Used in URLs and API references.">
              <TextInput value={form.slug} onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))} placeholder="guidance-services" />
            </FormField>
            <div className="mt-6 flex justify-end gap-3">
              <button type="button" onClick={() => setModalOpen(false)} className="btn-secondary">
                Cancel
              </button>
              <button type="submit" disabled={saving} className="btn-primary disabled:opacity-60">
                {saving ? "Saving…" : editing ? "Save Changes" : "Add Category"}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {deleteTarget && (
        <Modal title="Delete category?" onClose={() => setDeleteTarget(null)} maxWidth="max-w-sm">
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

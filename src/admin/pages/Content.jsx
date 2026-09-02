import { useState } from "react";
import { Save, Check } from "lucide-react";
import { useFetch } from "../../hooks/useFetch.js";
import { getContent, updateContentSection } from "../../api/contentApi.js";
import { FormField, TextInput, TextArea } from "../components/FormField.jsx";
import Loader from "../../components/common/Loader.jsx";

const SECTION_TABS = [
  { key: "hero", label: "Hero Section" },
  { key: "about", label: "About Section" },
  { key: "mission", label: "Mission" },
  { key: "whyChooseUs", label: "Why Choose Us" },
];

export default function Content() {
  const { data: content, isLoading, refetch } = useFetch(getContent, []);
  const [activeTab, setActiveTab] = useState("hero");
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const activeSection = form || content?.[activeTab];

  const handleTabChange = (key) => {
    setActiveTab(key);
    setForm(null);
    setSaved(false);
  };

  const handleChange = (field, value) => {
    setForm({ ...(form || content[activeTab]), [field]: value });
    setSaved(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateContentSection(activeTab, form || content[activeTab]);
      await refetch();
      setForm(null);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } finally {
      setSaving(false);
    }
  };

  if (isLoading || !content) return <Loader label="Loading website content" />;

  const section = activeSection || {};

  return (
    <div>
      <h2 className="font-display text-2xl text-ink">Website Content</h2>
      <p className="mt-1 text-sm text-ink-faint">Edit the copy and imagery shown across your public site's key sections.</p>

      <div className="mt-6 flex flex-wrap gap-2">
        {SECTION_TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => handleTabChange(tab.key)}
            className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
              activeTab === tab.key ? "bg-ink text-alabaster" : "bg-white text-ink-faint hover:text-ink"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSave} className="card-surface mt-6 max-w-2xl p-7">
        <FormField label="Section Name">
          <TextInput value={section.sectionName || ""} onChange={(e) => handleChange("sectionName", e.target.value)} disabled />
        </FormField>
        <FormField label="Title" required>
          <TextInput value={section.title || ""} onChange={(e) => handleChange("title", e.target.value)} required />
        </FormField>
        <FormField label="Subtitle">
          <TextInput value={section.subtitle || ""} onChange={(e) => handleChange("subtitle", e.target.value)} />
        </FormField>
        <FormField label="Description">
          <TextArea value={section.description || ""} onChange={(e) => handleChange("description", e.target.value)} className="min-h-[110px]" />
        </FormField>
        {"image" in section && (
          <FormField label="Image Key" hint="A short label for the placeholder image">
            <TextInput value={section.image || ""} onChange={(e) => handleChange("image", e.target.value)} />
          </FormField>
        )}
        {"buttonText" in section && (
          <div className="grid grid-cols-1 gap-x-5 sm:grid-cols-2">
            <FormField label="Button Text">
              <TextInput value={section.buttonText || ""} onChange={(e) => handleChange("buttonText", e.target.value)} />
            </FormField>
            <FormField label="Button Link">
              <TextInput value={section.buttonLink || ""} onChange={(e) => handleChange("buttonLink", e.target.value)} />
            </FormField>
          </div>
        )}

        <label className="mt-2 flex items-center gap-2 text-sm font-medium text-ink">
          <input
            type="checkbox"
            checked={section.active ?? true}
            onChange={(e) => handleChange("active", e.target.checked)}
            className="h-4 w-4 rounded border-ink/30 text-moss-600 focus:ring-moss-300"
          />
          Active on public site
        </label>

        <div className="mt-6 flex items-center gap-3 border-t border-ink/[0.06] pt-5">
          <button type="submit" disabled={saving} className="btn-primary disabled:opacity-60">
            <Save size={16} />
            {saving ? "Saving…" : "Save Changes"}
          </button>
          {saved && (
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-moss-600">
              <Check size={16} /> Saved
            </span>
          )}
        </div>
      </form>
    </div>
  );
}

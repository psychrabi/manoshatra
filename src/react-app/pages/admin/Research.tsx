import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { useAdminResearch, useCreateResearch, useDeleteResearch } from "../../hooks/useQueries";
import type { Publication } from "../../types";

export default function Research() {
  const { data: pubs = [] } = useAdminResearch();
  const createMutation = useCreateResearch();
  const deleteMutation = useDeleteResearch();

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: "",
    authors: "",
    abstract: "",
    journal: "",
    year: new Date().getFullYear().toString(),
    doi: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate(
      { ...form, year: parseInt(form.year) } as Omit<Publication, "id">,
      {
        onSuccess: () => {
          setShowForm(false);
          setForm({
            title: "",
            authors: "",
            abstract: "",
            journal: "",
            year: new Date().getFullYear().toString(),
            doi: "",
          });
        },
      },
    );
  };

  const handleDelete = (id: string) => {
    if (!window.confirm("Delete this publication?")) return;
    deleteMutation.mutate(id);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-heading text-2xl font-bold text-brand-text">
          Research Publications
        </h1>
        <button
          onClick={() => setShowForm(true)}
          className="btn-primary text-sm py-2 px-4"
        >
          <Plus size={16} /> Add Publication
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl p-6 mb-6 space-y-4 border border-border"
        >
          <input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Title *"
            className="input-field"
            required
          />
          <input
            value={form.authors}
            onChange={(e) => setForm({ ...form, authors: e.target.value })}
            placeholder="Authors *"
            className="input-field"
            required
          />
          <textarea
            value={form.abstract}
            onChange={(e) => setForm({ ...form, abstract: e.target.value })}
            placeholder="Abstract *"
            rows={4}
            className="input-field resize-none"
            required
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              value={form.journal}
              onChange={(e) => setForm({ ...form, journal: e.target.value })}
              placeholder="Journal"
              className="input-field"
            />
            <input
              value={form.year}
              onChange={(e) => setForm({ ...form, year: e.target.value })}
              placeholder="Year *"
              type="number"
              className="input-field"
              required
            />
            <input
              value={form.doi}
              onChange={(e) => setForm({ ...form, doi: e.target.value })}
              placeholder="DOI (optional)"
              className="input-field"
            />
          </div>
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={createMutation.isPending}
              className="btn-primary text-sm py-2 px-5"
            >
              {createMutation.isPending ? "Adding..." : "Add Publication"}
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="btn-outline text-sm py-2 px-5"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="space-y-3">
        {pubs.map((pub) => (
          <div
            key={pub.id}
            className="bg-white rounded-2xl p-4 border border-border flex items-start justify-between gap-4"
          >
            <div>
              <h3 className="font-heading font-bold text-brand-text text-sm mb-1">
                {pub.title}
              </h3>
              <p className="text-xs text-brand-muted">
                {pub.authors} • {pub.year} • {pub.journal}
              </p>
            </div>
            <button
              onClick={() => handleDelete(pub.id)}
              disabled={deleteMutation.isPending}
              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors shrink-0 disabled:opacity-50"
            >
              <Trash2 size={15} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

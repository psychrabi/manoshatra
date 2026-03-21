import axios from "axios";
import { Edit, Plus, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { BlogPost } from "../../types";

export default function Blog() {
  const token = useMemo(() => localStorage.getItem("admin_token"), []);
  const headers = useMemo(
    () => (token ? { Authorization: `Bearer ${token}` } : {}),
    [token]
  );
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editPost, setEditPost] = useState<BlogPost | null>(null);
  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    content: "",
    author: "",
    category: "Mental Health",
    image_url: "",
    tags: "",
    published: true,
  });

  const loadPosts = () => {
    setLoading(true);
    axios
      .get(`/api/admin/blog`, { headers })
      .then((r) => setPosts(r.data))
      .catch(() => { })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadPosts();
  }, [headers]);

  const resetForm = () => {
    setForm({
      title: "",
      excerpt: "",
      content: "",
      author: "",
      category: "Mental Health",
      image_url: "",
      tags: "",
      published: true,
    });
    setEditPost(null);
    setShowForm(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editPost) {
      await axios.put(`/api/admin/blog/${editPost.id}`, form, { headers });
    } else {
      await axios.post(`/api/admin/blog`, form, { headers });
    }
    loadPosts();
    resetForm();
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this post?")) return;
    await axios.delete(`/api/admin/blog/${id}`, { headers });
    loadPosts();
  };

  const startEdit = (post: BlogPost) => {
    setForm({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      author: post.author,
      category: post.category,
      image_url: post.image_url || "",
      tags: post.tags || "",
      published: post.published,
    });
    setEditPost(post);
    setShowForm(true);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-heading text-2xl font-bold text-brand-text">
          Blog Posts
        </h1>
        <button
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          className="btn-primary text-sm py-2 px-4"
        >
          <Plus size={16} /> New Post
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl p-6 mb-6 space-y-4 border border-border"
        >
          <h3 className="font-heading font-bold text-brand-text">
            {editPost ? "Edit Post" : "New Blog Post"}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Title *"
              className="input-field"
              required
            />
            <input
              value={form.author}
              onChange={(e) => setForm({ ...form, author: e.target.value })}
              placeholder="Author *"
              className="input-field"
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              placeholder="Category"
              className="input-field"
            />
            <input
              value={form.image_url}
              onChange={(e) => setForm({ ...form, image_url: e.target.value })}
              placeholder="Image URL (optional)"
              className="input-field"
            />
          </div>
          <textarea
            value={form.excerpt}
            onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
            placeholder="Excerpt (short summary) *"
            rows={2}
            className="input-field resize-none"
            required
          />
          <textarea
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            placeholder="Full content *"
            rows={8}
            className="input-field resize-none"
            required
          />
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={form.published}
              onChange={(e) => setForm({ ...form, published: e.target.checked })}
              id="published"
            />
            <label htmlFor="published" className="text-sm font-semibold text-brand-text">
              Published
            </label>
          </div>
          <div className="flex gap-3">
            <button
              type="submit"
              className="btn-primary text-sm py-2 px-5"
            >
              {editPost ? "Update Post" : "Create Post"}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="btn-outline text-sm py-2 px-5"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <p className="text-brand-muted">Loading...</p>
      ) : (
        <div className="space-y-3">
          {posts.map((post, i) => (
            <div
              key={post.id}
              className="bg-white rounded-2xl p-4 border border-border flex items-center justify-between gap-4"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-heading font-bold text-brand-text text-sm truncate">
                    {post.title}
                  </h3>
                  {!post.published && (
                    <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full shrink-0">
                      Draft
                    </span>
                  )}
                </div>
                <p className="text-xs text-brand-muted">
                  {post.author} • {post.category} •{" "}
                  {new Date(post.created_at).toLocaleDateString()}
                </p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => startEdit(post)}
                  className="p-2 text-brand-blue hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Edit size={15} />
                </button>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

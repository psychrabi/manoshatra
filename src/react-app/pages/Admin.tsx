import { useState, useEffect } from "react";
import axios from "axios";
import {
  Lock,
  LogOut,
  Calendar,
  BookOpen,
  FlaskConical,
  MessageSquare,
  Plus,
  Trash2,
  Edit,
  Check,
  X,
  Eye,
  EyeOff,
} from "lucide-react";
import type {
  Appointment,
  BlogPost,
  Publication,
  ContactMessage,
} from "../types";

const TABS = ["Appointments", "Blog Posts", "Research", "Messages"];

function useAdmin() {
  const [token, setToken] = useState(
    () => localStorage.getItem("admin_token") || ""
  );
  const login = (t: string) => {
    setToken(t);
    localStorage.setItem("admin_token", t);
  };
  const logout = () => {
    setToken("");
    localStorage.removeItem("admin_token");
  };
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  return { token, login, logout, headers };
}

function LoginPanel({ onLogin }: { onLogin: (token: string) => void }) {
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await axios.post(`/api/admin/login`, { password: pwd });
      onLogin(res.data.token);
    } catch {
      setError("Invalid password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-brand-beige flex items-center justify-center px-4 pt-20"
      data-testid="admin-login"
    >
      <div className="bg-white rounded-3xl shadow-xl p-10 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Lock size={28} className="text-brand-green" />
          </div>
          <h1 className="font-heading text-2xl font-bold text-brand-text">
            Admin Access
          </h1>
          <p className="text-brand-muted text-sm mt-2">
            ManoShastra Management Portal
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type={show ? "text" : "password"}
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              placeholder="Enter admin password"
              className="input-field pr-12"
              data-testid="admin-password"
            />
            <button
              type="button"
              onClick={() => setShow(!show)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-muted hover:text-brand-text"
            >
              {show ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {error && (
            <p className="text-red-500 text-sm" data-testid="admin-error">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full justify-center"
            data-testid="admin-login-btn"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

function AppointmentsTab({ headers }) {
  const [appts, setAppts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`/api/admin/appointments`, { headers })
      .then((r) => setAppts(r.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [headers]);

  const updateStatus = async (id: number, status: string) => {
    await axios.patch(`/api/admin/appointments/${id}`, { status }, { headers });
    setAppts((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
  };

  const statusColor = {
    pending: "bg-yellow-50 text-yellow-700",
    confirmed: "bg-green-50 text-brand-green",
    cancelled: "bg-red-50 text-red-600",
  };

  return (
    <div data-testid="appointments-tab">
      <h2 className="font-heading text-xl font-bold text-brand-text mb-6">
        Appointment Requests ({appts.length})
      </h2>
      {loading ? (
        <p className="text-brand-muted">Loading...</p>
      ) : appts.length === 0 ? (
        <p className="text-brand-muted text-center py-12">
          No appointments yet.
        </p>
      ) : (
        <div className="space-y-4">
          {appts.map((a, i) => (
            <div
              key={a.id}
              className="bg-white rounded-2xl p-5 border border-border"
              data-testid={`appt-row-${i}`}
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-heading font-bold text-brand-text">
                      {a.name}
                    </h3>
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                        statusColor[a.status] || "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {a.status}
                    </span>
                  </div>
                  <p className="text-sm text-brand-muted">
                    {a.email} • {a.phone}
                  </p>
                  <p className="text-sm text-brand-text font-semibold mt-1">
                    {a.service} — {a.preferred_date}
                  </p>
                  {a.message && (
                    <p className="text-xs text-brand-muted mt-1 italic">
                      "{a.message}"
                    </p>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => updateStatus(a.id, "confirmed")}
                    className="flex items-center gap-1 text-xs bg-green-50 text-brand-green px-3 py-1.5 rounded-full font-semibold hover:bg-green-100 transition-colors"
                    data-testid={`confirm-appt-${i}`}
                  >
                    <Check size={12} /> Confirm
                  </button>
                  <button
                    onClick={() => updateStatus(a.id, "cancelled")}
                    className="flex items-center gap-1 text-xs bg-red-50 text-red-600 px-3 py-1.5 rounded-full font-semibold hover:bg-red-100 transition-colors"
                    data-testid={`cancel-appt-${i}`}
                  >
                    <X size={12} /> Cancel
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function BlogTab({ headers }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editPost, setEditPost] = useState(null);
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

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);
    axios
      .get(`/api/admin/blog`, { headers })
      .then((r) => setPosts(r.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [headers]);

  const loadPosts = () => {
    setLoading(true);
    axios
      .get(`/api/admin/blog`, { headers })
      .then((r) => setPosts(r.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editPost) {
      await axios.put(`/api/admin/blog/${editPost.id}`, form, { headers });
    } else {
      await axios.post(`/api/admin/blog`, form, { headers });
    }
    loadPosts();
    resetForm();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this post?")) return;
    await axios.delete(`/api/admin/blog/${id}`, { headers });
    loadPosts();
  };

  const startEdit = (post) => {
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
    <div data-testid="blog-tab">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading text-xl font-bold text-brand-text">
          Blog Posts ({posts.length})
        </h2>
        <button
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          className="btn-primary text-sm py-2 px-4"
          data-testid="new-post-btn"
        >
          <Plus size={16} /> New Post
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-brand-beige rounded-2xl p-6 mb-6 space-y-4"
          data-testid="blog-form"
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
              data-testid="blog-title-input"
              required
            />
            <input
              value={form.author}
              onChange={(e) => setForm({ ...form, author: e.target.value })}
              placeholder="Author *"
              className="input-field"
              data-testid="blog-author-input"
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              placeholder="Category"
              className="input-field"
              data-testid="blog-category-input"
            />
            <input
              value={form.image_url}
              onChange={(e) => setForm({ ...form, image_url: e.target.value })}
              placeholder="Image URL (optional)"
              className="input-field"
              data-testid="blog-image-input"
            />
          </div>
          <textarea
            value={form.excerpt}
            onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
            placeholder="Excerpt (short summary) *"
            rows={2}
            className="input-field resize-none"
            data-testid="blog-excerpt-input"
            required
          />
          <textarea
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            placeholder="Full content *"
            rows={8}
            className="input-field resize-none"
            data-testid="blog-content-input"
            required
          />
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={form.published}
              onChange={(e) =>
                setForm({ ...form, published: e.target.checked })
              }
              id="published"
              data-testid="blog-published-check"
            />
            <label
              htmlFor="published"
              className="text-sm font-semibold text-brand-text"
            >
              Published
            </label>
          </div>
          <div className="flex gap-3">
            <button
              type="submit"
              className="btn-primary text-sm py-2 px-5"
              data-testid="blog-submit"
            >
              {editPost ? "Update Post" : "Create Post"}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="btn-outline text-sm py-2 px-5"
              data-testid="blog-cancel"
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
              data-testid={`blog-row-${i}`}
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
                  data-testid={`edit-post-${i}`}
                >
                  <Edit size={15} />
                </button>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  data-testid={`delete-post-${i}`}
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

function ResearchTab({ headers }) {
  const [pubs, setPubs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: "",
    authors: "",
    abstract: "",
    journal: "",
    year: new Date().getFullYear().toString(),
    doi: "",
  });

  const loadPubs = () =>
    axios
      .get(`/api/admin/research`, { headers: headers })
      .then((r) => setPubs(r.data))
      .catch(() => {});
  useEffect(() => {
    axios
      .get(`/api/research`)
      .then((r) => setPubs(r.data))
      .catch(() => {});
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(
      `/api/admin/research`,
      { ...form, year: parseInt(form.year) },
      { headers }
    );
    loadPubs();
    setShowForm(false);
    setForm({
      title: "",
      authors: "",
      abstract: "",
      journal: "",
      year: new Date().getFullYear().toString(),
      doi: "",
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this publication?")) return;
    await axios.delete(`/api/admin/research/${id}`, { headers });
    loadPubs();
  };

  return (
    <div data-testid="research-tab">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading text-xl font-bold text-brand-text">
          Research Publications ({pubs.length})
        </h2>
        <button
          onClick={() => setShowForm(true)}
          className="btn-primary text-sm py-2 px-4"
          data-testid="new-research-btn"
        >
          <Plus size={16} /> Add Publication
        </button>
      </div>
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-brand-beige rounded-2xl p-6 mb-6 space-y-4"
          data-testid="research-form"
        >
          <input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Title *"
            className="input-field"
            required
            data-testid="research-title-input"
          />
          <input
            value={form.authors}
            onChange={(e) => setForm({ ...form, authors: e.target.value })}
            placeholder="Authors *"
            className="input-field"
            required
            data-testid="research-authors-input"
          />
          <textarea
            value={form.abstract}
            onChange={(e) => setForm({ ...form, abstract: e.target.value })}
            placeholder="Abstract *"
            rows={4}
            className="input-field resize-none"
            required
            data-testid="research-abstract-input"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              value={form.journal}
              onChange={(e) => setForm({ ...form, journal: e.target.value })}
              placeholder="Journal"
              className="input-field"
              data-testid="research-journal-input"
            />
            <input
              value={form.year}
              onChange={(e) => setForm({ ...form, year: e.target.value })}
              placeholder="Year *"
              type="number"
              className="input-field"
              required
              data-testid="research-year-input"
            />
            <input
              value={form.doi}
              onChange={(e) => setForm({ ...form, doi: e.target.value })}
              placeholder="DOI (optional)"
              className="input-field"
              data-testid="research-doi-input"
            />
          </div>
          <div className="flex gap-3">
            <button
              type="submit"
              className="btn-primary text-sm py-2 px-5"
              data-testid="research-submit"
            >
              Add Publication
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="btn-outline text-sm py-2 px-5"
              data-testid="research-cancel"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
      <div className="space-y-3">
        {pubs.map((pub, i) => (
          <div
            key={pub.id}
            className="bg-white rounded-2xl p-4 border border-border flex items-start justify-between gap-4"
            data-testid={`research-row-${i}`}
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
              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors shrink-0"
              data-testid={`delete-research-${i}`}
            >
              <Trash2 size={15} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function MessagesTab({ headers }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`/api/admin/contact`, { headers })
      .then((r) => setMessages(r.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [headers]);

  const markRead = async (id: number) => {
    await axios.patch(`/api/admin/contact/${id}/read`, {}, { headers });
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, read: true } : m))
    );
  };

  return (
    <div data-testid="messages-tab">
      <h2 className="font-heading text-xl font-bold text-brand-text mb-6">
        Contact Messages ({messages.filter((m) => !m.read).length} unread)
      </h2>
      {loading ? (
        <p className="text-brand-muted">Loading...</p>
      ) : messages.length === 0 ? (
        <p className="text-brand-muted text-center py-12">No messages yet.</p>
      ) : (
        <div className="space-y-3">
          {messages.map((m, i) => (
            <div
              key={m.id}
              className={`rounded-2xl p-5 border ${
                m.read
                  ? "bg-white border-border"
                  : "bg-green-50 border-green-200"
              }`}
              data-testid={`message-${i}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-heading font-bold text-brand-text text-sm">
                      {m.name}
                    </h3>
                    {!m.read && (
                      <span className="text-xs bg-brand-green text-white px-2 py-0.5 rounded-full">
                        New
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-brand-muted mb-2">
                    {m.email}
                    {m.phone && ` • ${m.phone}`} •{" "}
                    {new Date(m.created_at).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-brand-text">{m.message}</p>
                </div>
                {!m.read && (
                  <button
                    onClick={() => markRead(m.id)}
                    className="shrink-0 text-xs bg-white text-brand-green px-3 py-1.5 rounded-full font-semibold border border-brand-green hover:bg-green-50 transition-colors"
                    data-testid={`mark-read-${i}`}
                  >
                    Mark Read
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const Admin = () => {
  const { token, login, logout, headers } = useAdmin();
  const [activeTab, setActiveTab] = useState(0);

  if (!token) return <LoginPanel onLogin={login} />;

  const tabComponents = [
    <AppointmentsTab headers={headers} />,
    <BlogTab headers={headers} />,
    <ResearchTab headers={headers} />,
    <MessagesTab headers={headers} />,
  ];

  const tabIcons = [Calendar, BookOpen, FlaskConical, MessageSquare];

  return (
    <div
      className="min-h-screen bg-brand-beige pt-20"
      data-testid="admin-dashboard"
    >
      <div className="container mx-auto px-4 md:px-6 max-w-7xl py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-heading text-2xl font-bold text-brand-text">
              Admin Dashboard
            </h1>
            <p className="text-brand-muted text-sm">
              ManoShastra Management Portal
            </p>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-2 text-sm text-brand-muted hover:text-red-500 transition-colors duration-200"
            data-testid="admin-logout"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {TABS.map((tab, i) => {
            const Icon = tabIcons[i];
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(i)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                  activeTab === i
                    ? "bg-brand-green text-white shadow-md"
                    : "bg-white text-brand-muted hover:bg-brand-beige-dark"
                }`}
                data-testid={`admin-tab-${tab
                  .toLowerCase()
                  .replace(/\s/g, "-")}`}
              >
                <Icon size={15} /> {tab}
              </button>
            );
          })}
        </div>

        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm">
          {tabComponents[activeTab]}
        </div>
      </div>
    </div>
  );
};
export default Admin;

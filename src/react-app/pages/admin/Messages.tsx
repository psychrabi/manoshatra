import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import type { ContactMessage } from "../../types";

export default function Messages() {
  const token = useMemo(() => localStorage.getItem("admin_token"), []);
  const headers = useMemo(
    () => (token ? { Authorization: `Bearer ${token}` } : {}),
    [token]
  );
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`/api/admin/contact`, { headers })
      .then((r) => setMessages(r.data))
      .catch(() => { })
      .finally(() => setLoading(false));
  }, [headers]);

  const markRead = async (id: string) => {
    await axios.patch(`/api/admin/contact/${id}/read`, {}, { headers });
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, read: true } : m))
    );
  };

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-brand-text mb-6">
        Contact Messages
      </h1>

      {loading ? (
        <p className="text-brand-muted">Loading...</p>
      ) : messages.length === 0 ? (
        <p className="text-brand-muted text-center py-12">
          No messages yet.
        </p>
      ) : (
        <div className="space-y-3">
          {messages.map((m, i) => (
            <div
              key={m.id}
              className={`rounded-2xl p-5 border ${m.read
                  ? "bg-white border-border"
                  : "bg-green-50 border-green-200"
                }`}
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

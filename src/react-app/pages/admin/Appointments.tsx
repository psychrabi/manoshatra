import axios from "axios";
import {
  Calendar,
  Check,
  Clock,
  Mail,
  MoreVertical,
  Phone,
  Trash,
  User,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

interface Appointment {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  preferred_date: string;
  message: string | null;
  status: "pending" | "confirmed" | "cancelled";
  created_at: string;
}

export default function Appointments() {
  const token = useMemo(() => localStorage.getItem("admin_token"), []);
  const headers = useMemo(
    () => (token ? { Authorization: `Bearer ${token}` } : {}),
    [token]
  );
  const [appts, setAppts] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [reschedulingId, setReschedulingId] = useState<string | null>(null);
  const [rescheduleDate, setRescheduleDate] = useState("");
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get(`/api/admin/appointments`, { headers })
      .then((r) => setAppts(r.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [headers]);

  const updateStatus = async (id: string, status: Appointment["status"]) => {
    await axios.patch(
      `/api/admin/appointments/${id}/status`,
      { status },
      { headers }
    );
    setAppts((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
    setOpenDropdownId(null);
  };

  const handleReschedule = async (id: string) => {
    if (!rescheduleDate) return;
    await axios.patch(
      `/api/admin/appointments/${id}/reschedule`,
      { preferred_date: rescheduleDate },
      { headers }
    );
    setAppts((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, preferred_date: rescheduleDate } : a
      )
    );
    setReschedulingId(null);
    setRescheduleDate("");
    setOpenDropdownId(null);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this appointment?")) return;
    await axios.delete(`/api/admin/appointments/${id}`, { headers });
    setAppts((prev) => prev.filter((a) => a.id !== id));
    setOpenDropdownId(null);
  };

  const statusConfig = {
    pending: {
      bg: "bg-amber-50",
      text: "text-amber-700",
      border: "border-amber-200",
      dot: "bg-amber-400",
      label: "Pending",
    },
    confirmed: {
      bg: "bg-emerald-50",
      text: "text-emerald-700",
      border: "border-emerald-200",
      dot: "bg-emerald-400",
      label: "Confirmed",
    },
    cancelled: {
      bg: "bg-red-50",
      text: "text-red-600",
      border: "border-red-200",
      dot: "bg-red-400",
      label: "Cancelled",
    },
  };

  const formatRelativeTime = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div>
        <h1 className="font-heading text-2xl font-bold text-brand-text mb-6">
          Appointment Requests
        </h1>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-5 border border-border animate-pulse"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-3 flex-1">
                  <div className="flex items-center gap-3">
                    <div className="h-5 w-32 bg-gray-200 rounded" />
                    <div className="h-5 w-16 bg-gray-200 rounded-full" />
                  </div>
                  <div className="h-4 w-48 bg-gray-100 rounded" />
                  <div className="h-4 w-40 bg-gray-100 rounded" />
                </div>
                <div className="h-8 w-8 bg-gray-100 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading text-2xl font-bold text-brand-text">
            Appointment Requests
          </h1>
          <p className="text-sm text-brand-muted mt-1">
            {appts.length} total {appts.length === 1 ? "request" : "requests"}
          </p>
        </div>
        {appts.filter((a) => a.status === "pending").length > 0 && (
          <div className="flex items-center gap-2 bg-amber-50 text-amber-700 px-3 py-1.5 rounded-full text-sm font-medium">
            <span className="h-2 w-2 bg-amber-400 rounded-full animate-pulse" />
            {appts.filter((a) => a.status === "pending").length} pending
          </div>
        )}
      </div>

      {appts.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 border border-border text-center">
          <div className="w-16 h-16 bg-brand-beige rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="text-brand-green" size={28} />
          </div>
          <h3 className="font-heading font-bold text-brand-text text-lg mb-2">
            No appointments yet
          </h3>
          <p className="text-sm text-brand-muted max-w-sm mx-auto">
            Appointment requests from your website will appear here. You can
            confirm, reschedule, or cancel them.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {appts.map((a) => {
            const status = statusConfig[a.status] || statusConfig.pending;
            return (
              <div
                key={a.id}
                className={`bg-white rounded-2xl border border-border hover:shadow-md transition-shadow duration-200 overflow-hidden`}
              >
                <div className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-heading font-bold text-brand-text text-lg">
                          {a.name}
                        </h3>
                        <span
                          className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${status.bg} ${status.text} ${status.border} border`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${status.dot}`}
                          />
                          {status.label}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-brand-muted mb-3">
                        <span className="flex items-center gap-1.5">
                          <Mail size={14} className="text-brand-muted/60" />
                          {a.email}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Phone size={14} className="text-brand-muted/60" />
                          {a.phone}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <span className="font-semibold text-brand-text">
                          {a.service}
                        </span>
                        <span className="text-brand-muted">·</span>
                        <span className="flex items-center gap-1.5 text-brand-muted">
                          <Calendar size={14} className="text-brand-muted/60" />
                          {formatDate(a.preferred_date)}
                        </span>
                      </div>

                      {a.message && (
                        <div className="mt-3 p-3 bg-brand-beige rounded-xl">
                          <p className="text-sm text-brand-text italic leading-relaxed">
                            "{a.message}"
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="relative">
                      <button
                        onClick={() =>
                          setOpenDropdownId(
                            openDropdownId === a.id ? null : a.id
                          )
                        }
                        className="p-2 text-brand-muted hover:bg-brand-beige rounded-xl transition-colors"
                        aria-label="More actions"
                      >
                        <MoreVertical size={18} />
                      </button>
                      {openDropdownId === a.id && (
                        <>
                          <div
                            className="fixed inset-0 z-10"
                            onClick={() => setOpenDropdownId(null)}
                          />
                          <div className="absolute right-0 mt-1 bg-white rounded-xl shadow-lg border border-border py-1.5 z-20 min-w-[180px]">
                            {a.status === "pending" && (
                              <>
                                <button
                                  onClick={() => updateStatus(a.id, "confirmed")}
                                  className="w-full flex items-center gap-2.5 text-sm text-emerald-600 px-4 py-2.5 hover:bg-emerald-50 transition-colors"
                                >
                                  <Check size={16} /> Confirm
                                </button>
                                <button
                                  onClick={() => updateStatus(a.id, "cancelled")}
                                  className="w-full flex items-center gap-2.5 text-sm text-red-600 px-4 py-2.5 hover:bg-red-50 transition-colors"
                                >
                                  <X size={16} /> Cancel
                                </button>
                              </>
                            )}
                            {a.status === "confirmed" && (
                              <>
                                <button
                                  onClick={() => {
                                    setOpenDropdownId(null);
                                    setReschedulingId(a.id);
                                    setRescheduleDate(a.preferred_date);
                                  }}
                                  className="w-full flex items-center gap-2.5 text-sm text-brand-blue px-4 py-2.5 hover:bg-blue-50 transition-colors"
                                >
                                  <Clock size={16} /> Reschedule
                                </button>
                                <button
                                  onClick={() => updateStatus(a.id, "cancelled")}
                                  className="w-full flex items-center gap-2.5 text-sm text-red-600 px-4 py-2.5 hover:bg-red-50 transition-colors"
                                >
                                  <X size={16} /> Cancel
                                </button>
                              </>
                            )}
                            {a.status === "cancelled" && (
                              <button
                                onClick={() => handleDelete(a.id)}
                                className="w-full flex items-center gap-2.5 text-sm text-red-600 px-4 py-2.5 hover:bg-red-50 transition-colors"
                              >
                                <Trash size={16} /> Delete
                              </button>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {reschedulingId === a.id && (
                  <div className="px-5 py-4 bg-brand-beige border-t border-border">
                    <p className="text-xs font-semibold text-brand-muted uppercase tracking-wider mb-3">
                      Reschedule Appointment
                    </p>
                    <div className="flex items-center gap-3">
                      <input
                        type="date"
                        value={rescheduleDate}
                        onChange={(e) => setRescheduleDate(e.target.value)}
                        className="flex-1 max-w-xs px-3 py-2 text-sm border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green"
                      />
                      <button
                        onClick={() => handleReschedule(a.id)}
                        className="text-sm bg-brand-green text-white px-5 py-2 rounded-xl font-semibold hover:bg-brand-green-light transition-colors"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => {
                          setReschedulingId(null);
                          setRescheduleDate("");
                        }}
                        className="text-sm bg-white text-brand-muted px-4 py-2 rounded-xl font-semibold hover:bg-gray-50 border border-border transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                <div className="px-5 py-2.5 bg-gray-50/50 border-t border-border/50">
                  <p className="text-xs text-brand-muted flex items-center gap-1.5">
                    <Clock size={12} />
                    Requested {formatRelativeTime(a.created_at)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

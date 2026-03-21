import axios from "axios";
import { Check, Clock, MoreVertical, Trash, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

export default function Appointments() {
  const token = useMemo(() => localStorage.getItem("admin_token"), []);
  const headers = useMemo(
    () => (token ? { Authorization: `Bearer ${token}` } : {}),
    [token]
  );
  const [appts, setAppts] = useState([]);
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

  const updateStatus = async (id: string, status: string) => {
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

  const statusColor = {
    pending: "bg-yellow-50 text-yellow-700",
    confirmed: "bg-green-50 text-brand-green",
    cancelled: "bg-red-50 text-red-600",
  };

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-brand-text mb-6">
        Appointment Requests
      </h1>

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
                <div className="relative">
                  <button
                    onClick={() =>
                      setOpenDropdownId(openDropdownId === a.id ? null : a.id)
                    }
                    className="p-2 text-brand-muted hover:bg-brand-beige rounded-lg transition-colors"
                  >
                    <MoreVertical size={18} />
                  </button>
                  {openDropdownId === a.id && (
                    <>
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setOpenDropdownId(null)}
                      />
                      <div className="absolute right-0 mt-1 bg-white rounded-xl shadow-lg border border-border py-2 z-20 min-w-[160px]">
                        {a.status === "pending" && (
                          <>
                            <button
                              onClick={() => updateStatus(a.id, "confirmed")}
                              className="w-full flex items-center gap-2 text-sm text-brand-green px-4 py-2 hover:bg-green-50 transition-colors"
                            >
                              <Check size={16} /> Confirm
                            </button>
                            <button
                              onClick={() => updateStatus(a.id, "cancelled")}
                              className="w-full flex items-center gap-2 text-sm text-red-600 px-4 py-2 hover:bg-red-50 transition-colors"
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
                              className="w-full flex items-center gap-2 text-sm text-brand-blue px-4 py-2 hover:bg-blue-50 transition-colors"
                            >
                              <Clock size={16} /> Reschedule
                            </button>
                            <button
                              onClick={() => updateStatus(a.id, "cancelled")}
                              className="w-full flex items-center gap-2 text-sm text-red-600 px-4 py-2 hover:bg-red-50 transition-colors"
                            >
                              <X size={16} /> Cancel
                            </button>
                          </>
                        )}
                        {a.status === "cancelled" && (
                          <button
                            onClick={() => handleDelete(a.id)}
                            className="w-full flex items-center gap-2 text-sm text-red-600 px-4 py-2 hover:bg-red-50 transition-colors"
                          >
                            <Trash size={16} /> Delete
                          </button>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>
              {reschedulingId === a.id && (
                <div className="mt-4 pt-4 border-t border-border flex items-center gap-3">
                  <input
                    type="date"
                    value={rescheduleDate}
                    onChange={(e) => setRescheduleDate(e.target.value)}
                    className="input-field py-2 px-3 text-sm"
                  />
                  <button
                    onClick={() => handleReschedule(a.id)}
                    className="text-xs bg-brand-green text-white px-4 py-2 rounded-full font-semibold hover:bg-green-600 transition-colors"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setReschedulingId(null);
                      setRescheduleDate("");
                    }}
                    className="text-xs bg-gray-100 text-gray-600 px-4 py-2 rounded-full font-semibold hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

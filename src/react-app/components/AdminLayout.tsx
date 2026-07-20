import {
  BookOpen,
  Calendar,
  FlaskConical,
  MessageSquare,
  X
} from "lucide-react";
import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
import { useAdminAppointments, useAdminContact } from "../hooks/useQueries";
import { useAuthStore } from "../stores/authStore";
import { useUIStore } from "../stores/uiStore";
import AdminNavbar from "./AdminNavbar";

const navigation = [
  { name: "Appointments", href: "/admin/appointments", icon: Calendar, badge: "appointments" as const },
  { name: "Contact Messages", href: "/admin/messages", icon: MessageSquare, badge: "messages" as const },
  { name: "Blog Posts", href: "/admin/blog", icon: BookOpen },
  { name: "Research", href: "/admin/research", icon: FlaskConical },
];

export default function AdminLayout() {
  const location = useLocation();
  const token = useAuthStore((s) => s.token);
  const isAuthenticated = !!token;
  const sidebarOpen = useUIStore((s) => s.sidebarOpen);
  const setSidebarOpen = useUIStore((s) => s.setSidebarOpen);

  const { data: appts } = useAdminAppointments();
  const { data: msgs } = useAdminContact();

  const pendingAppts = appts?.filter((a) => a.status === "pending").length ?? 0;
  const unreadMsgs = msgs?.filter((m) => !m.read).length ?? 0;
  const counts = { appointments: pendingAppts, messages: unreadMsgs };

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-brand-beige">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-72 bg-white border-r border-border transform transition-transform duration-200 lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-border">
            <Link
              to="/"
              className="flex items-center gap-3"
              data-testid="navbar-logo"
            >
              <img
                src="/logo-48.png"
                alt="ManoShastra Logo"
                className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
              />
              <div className="hidden sm:block">
                <p className="font-heading font-bold text-brand-text text-sm md:text-base leading-tight">
                  ManoShastra
                </p>
                <p className="text-brand-muted text-xs leading-tight">
                  Counseling & Research Center
                </p>
              </div>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-brand-muted hover:text-brand-text"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              const badgeCount = item.badge ? counts[item.badge] : 0;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${isActive
                    ? "bg-brand-green text-white"
                    : "text-brand-muted hover:bg-brand-beige hover:text-brand-text"
                    }`}
                >
                  <Icon size={18} />
                  <span className="flex-1">{item.name}</span>
                  {badgeCount > 0 && (
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-red-500 text-white"
                      }`}
                    >
                      {badgeCount}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-72">
        <AdminNavbar onMenuClick={() => setSidebarOpen(true)} />

        {/* Page content is rendered by parent route via Outlet */}
        <main className="p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
